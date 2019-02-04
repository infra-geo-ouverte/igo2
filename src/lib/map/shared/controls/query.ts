import OlMap from 'ol/Map';
import {
  MapBrowserPointerEvent as OlMapBrowserPointerEvent
} from 'ol/MapEvent';
import OlLayer from 'ol/layer/Layer';
import OlDragBoxInteraction from 'ol/interaction/DragBox';
import { DragBoxEvent as OlDragBoxEvent } from 'ol/interaction/DragBox';
import { unByKey } from 'ol/Observable';
import { ListenerFunction } from 'ol/events';
import { MAC } from 'ol/has';

import { QueryService } from '@igo2/geo';

import { BehaviorSubject, Subject } from 'rxjs';

export interface QueryControlOptions {
  queryService: QueryService;
}

/**
 * Control to query a map's layers by click
 */
export class QueryControl {

  private olMap: OlMap;
  private olDragBoxInteraction: OlDragBoxInteraction;
  private onDragBoxEndKey: string;

  /**
   * Listener to the map click event that allows selecting a feature
   * by clicking on the map
   */
  private mapClickListener: ListenerFunction;

  get queryService(): QueryService {
    return this.options.queryService;
  }

  constructor(private options: QueryControlOptions) {}

  /**
   * Add or remove this control to/from a map.
   * @param map OL Map
   */
  setOlMap(olMap: OlMap | undefined) {
    if (olMap === undefined) {
      this.removeOlClickInteraction();
      this.removeOlDragBoxInteraction();
      this.olMap = olMap;
      return;
    }

    this.olMap = olMap;
    this.addOlClickInteraction();
    this.addOlDragBoxInteraction();
  }

  /**
   * Add a click interaction to the map an set up some listeners
   */
  private addOlClickInteraction() {
    this.mapClickListener = this.olMap.on('singleclick', (event: OlMapBrowserPointerEvent) => {
      this.onMapClick(event);
    });
  }

  /**
   * Remove the click interaction
   */
  private removeOlClickInteraction() {

  }

  /**
   * Add a click interaction to the map an set up some listeners
   */
  private addOlDragBoxInteraction() {
    const olDragBoxInteraction = new OlDragBoxInteraction({
      condition: this.platformModifierKeyOnly
    });

    this.onDragBoxEndKey = olDragBoxInteraction
      .on('boxend', (event: OlDragBoxEvent) => this.onDragBoxEnd(event));
      this.olMap.addInteraction(olDragBoxInteraction);
    this.olDragBoxInteraction = olDragBoxInteraction;
  }

  /**
   * Remove the drag box interaction
   */
  private removeOlDragBoxInteraction() {

  }

  private onMapClick(event: OlMapBrowserPointerEvent) {
    console.log(event);
  }

  private onDragBoxEnd(event: OlDragBoxEvent) {
    console.log(event);
  }

  private platformModifierKeyOnly(event: OlMapBrowserPointerEvent) {
    console.log(event);
    const originalEvent = event.originalEvent;
    return (
      !originalEvent.altKey &&
      (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
      !originalEvent.shiftKey
    );
  }

  private cancelOngoingQueries() {

  }

  private handleMapClick(event: OlMapBrowserPointerEvent) {
    // const features = this.queryService.queryByCoordinates(
    //   this.olMap,
    //   event.coordinates, {
    //     conditions: [
    //       (olLayer: OlLayer) => this.olLayerIsQueryable(olLayer),

    //     ]
    //   }
    // );
    // console.log(features);
  }

  private olLayerIsQueryable(olLayer: OlLayer): boolean {
    return true;
  }

  // private queryVectorLayers(): OlFeature[] {
  //   return [];
  // }

}
