import {
  Directive,
  Self,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

import { Subscription, Observable, zip } from 'rxjs';

import OlDragBoxInteraction from 'ol/interaction/DragBox';
import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';
import { ListenerFunction } from 'ol/events';
import { unByKey } from 'ol/Observable';
import { MAC } from 'ol/has';

import {
  Feature as IgoFeature,
  Layer,
  MapBrowserComponent,
  QueryableDataSource,
  QueryService
} from '@igo2/geo';

import { IgoMap } from 'src/lib/map';

/**
 * This directive makes a map queryable with a click of with a drag box.
 * By default, all layers are queryable but this cna ben controlled at
 * the layer level.
 */
@Directive({
  selector: '[fadqQueryable]'
})
export class QueryableDirective implements AfterViewInit, OnDestroy {

  /**
   * Map browser component
   */
  private component: MapBrowserComponent;

  /**
   * Subscriptions to ongoing queries
   */
  private queries$$: Subscription[] = [];

  /**
   * Listener to the map click event
   */
  private mapClickListener: ListenerFunction;

  /**
   * OL drag box interaction
   */
  private olDragBoxInteraction: OlDragBoxInteraction;

  /**
   * Ol drag box "end" event key
   */
  private olDragBoxInteractionEndKey: string;

  /**
   * Whether all query should complete before emitting an event
   */
  @Input() waitForAllQueries: boolean = false;

  /**
   * Event emitted when a query (or all queries) complete
   */
  @Output() query = new EventEmitter<{
    features: IgoFeature[] | IgoFeature[][];
    event: OlMapBrowserPointerEvent;
  }>();

  /**
   * IGO map
   * @internal
   */
  get map(): IgoMap { return this.component.map as IgoMap; }

  constructor(
    component: MapBrowserComponent,
    private queryService: QueryService
  ) {
    this.component = component;
  }

  /**
   * Start listening to click and drag box events
   * @internal
   */
  ngAfterViewInit() {
    this.listenToMapClick();
    this.addDragBoxInteraction();
  }

  /**
   * Stop listening to click and drag box events and cancel ongoind requests
   * @internal
   */
  ngOnDestroy() {
    this.cancelOngoingQueries();
    this.unlistenToMapClick();
    this.removeDragBoxInteraction();
  }

  /**
   * On map click, issue queries
   */
  private listenToMapClick() {
    this.mapClickListener = this.map.ol.on(
      'singleclick',
      (event: OlMapBrowserPointerEvent) => this.onMapEvent(event)
    );
  }

  /**
   * Stop listenig for map clicks
   */
  private unlistenToMapClick() {
    this.map.ol.un(
      this.mapClickListener.type,
      this.mapClickListener.listener
    );
    this.mapClickListener = undefined;
  }

  /**
   * Add a drag box interaction and, on drag box end, issue queries
   */
  private addDragBoxInteraction() {
    this.olDragBoxInteraction = new OlDragBoxInteraction({
      condition: this.platformModifierKeyOnly
    });
    this.olDragBoxInteractionEndKey = this.olDragBoxInteraction.on(
      'boxend',
      (event: OlMapBrowserPointerEvent) => this.onMapEvent(event)
    );
    this.map.ol.addInteraction(this.olDragBoxInteraction);
  }

  /**
   * Remove drag box interaction
   */
  private removeDragBoxInteraction() {
    unByKey(this.olDragBoxInteractionEndKey);
    this.map.ol.removeInteraction(this.olDragBoxInteraction);
    this.olDragBoxInteraction = undefined;
  }

  /**
   * Issue queries from a map event and emit events with the results
   * @param event OL map browser pointer event
   */
  private onMapEvent(event: OlMapBrowserPointerEvent) {
    this.cancelOngoingQueries();
    if (!this.queryService.queryEnabled) {
      return;
    }

    const resolution = this.map.ol.getView().getResolution();
    const queryLayers = this.map.layers.filter((layer: Layer) => this.layerIsQueryable(layer));
    const queries$ = this.queryService.query(queryLayers, {
      coordinates: event.coordinate,
      projection: this.map.projection,
      resolution: resolution
    });

    if (queries$.length === 0) {
      return;
    }

    if (this.waitForAllQueries) {
      this.queries$$.push(
        zip(...queries$).subscribe((results: IgoFeature[][]) => {
          const features = [].concat(...results);
          this.query.emit({features, event});
        })
      );
    } else {
      this.queries$$ = queries$.map((query$: Observable<IgoFeature[]>) => {
        return query$.subscribe((features: IgoFeature[]) => {
          this.query.emit({features, event});
        });
      });
    }
  }

  /**
   * Cancel ongoing requests, if any
   */
  private cancelOngoingQueries() {
    this.queries$$.forEach((sub: Subscription) => sub.unsubscribe());
    this.queries$$ = [];
  }

  /**
   * Whether a layer is queryable
   * @param layer Layer
   * @returns True if the layer si queryable
   */
  private layerIsQueryable(layer: Layer): boolean {
    const dataSource = layer.dataSource as QueryableDataSource;
    return dataSource.options.queryable !== undefined
      ? dataSource.options.queryable
      : true;
  }

  /**
   * Whether a drag box event should issue a query
   * @param event OL map browser pointer event
   * @returns True if a certain key is pressed when dragging
   */
  private platformModifierKeyOnly(event: OlMapBrowserPointerEvent): boolean {
    const originalEvent = event.originalEvent;
    return (
      !originalEvent.altKey &&
      (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
      !originalEvent.shiftKey
    );
  }
}
