import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';

import OlPolygon from 'ol/geom/Polygon';
import OlGeoJSON from 'ol/format/GeoJSON';

import { uuid } from '@igo2/utils';

import { EntityTransaction, WidgetComponent } from '@igo2/common';
import {
  Feature,
  FeatureStore,
  FeatureFormSubmitEvent,
  IgoMap,
  SliceControl
} from '@igo2/geo';

import { ClientSchemaElement } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

import { generateOperationTitle } from '../shared/client-schema-element.utils';

@Component({
  selector: 'fadq-client-schema-element-slice-form',
  templateUrl: './client-schema-element-slice-form.component.html',
  styleUrls: ['./client-schema-element-slice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSliceFormComponent implements OnInit, OnDestroy, WidgetComponent {

  private sliceEnd$$: Subscription;

  /**
   * Slice control
   */
  private sliceControl: SliceControl;

  /**
   * Map to draw elements on
   */
  @Input() map: IgoMap;

  /**
   * Schema element store
   */
  @Input() store: FeatureStore<ClientSchemaElement>;

  /**
   * Schema element transaction
   */
  @Input() transaction: EntityTransaction;

  /**
   * Schema element
   */
  @Input() element: ClientSchemaElement;

  /**
   * Event emitted on complete
   */
  @Output() complete = new EventEmitter<void>();

  /**
   * Event emitted on cancel
   */
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Add the draw line control
   * @internal
   */
  ngOnInit() {
    this.createSliceControl();
    this.activateSliceControl();
  }

  /**
   * Remove the draw line control
   * @internal
   */
  ngOnDestroy() {
    this.removeSliceControl();
  }

  /**
   * Implemented as part of WidgetComponent
   */
  onUpdateInputs() {
    this.cdRef.detectChanges();
  }

  onSubmit(event: FeatureFormSubmitEvent) {
    const element = this.formDataToElement(event.data);
    this.onSubmitSuccess(element);
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElement) {
    // this.transaction.slice(this.element, element, this.store, {
    //   title: generateOperationTitle(element)
    // });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElement {
    return Object.assign({}, data as ClientSchemaElement);
  }

  /**
   * Create a draw line control
   */
  private createSliceControl() {
    this.sliceControl = new SliceControl({});
  }

  /**
   * Activate a given control
   * @param drawControl Draw control
   */
  private activateSliceControl() {
    this.sliceEnd$$ = this.sliceControl.end$
      .subscribe((olPolygons: OlPolygon[]) => this.onSliceEnd(olPolygons));

    const olGeometry = new OlGeoJSON().readGeometry(this.element.geometry, {
      dataProjection: this.element.projection,
      featureProjection: this.map.projection
    });
    this.sliceControl.setOlGeometry(olGeometry);
    this.sliceControl.setOlMap(this.map.ol);
  }

  /**
   * Deactivate the active draw control
   */
  private deactivateSliceControl() {
    this.sliceEnd$$.unsubscribe();
    this.sliceControl.setOlMap(undefined);
  }

  /**
   * Remove draw line control
   */
  private removeSliceControl() {
    this.deactivateSliceControl();
    this.sliceControl.getSource().clear();
  }

  /**
   * Clear the draw source and track the geometry being draw
   * @param olGeometry Ol linestring or polygon
   */
  private onSliceEnd(olPolygons: OlPolygon[]) {
    if (olPolygons.length === 0) {
      return;
    }

    const element = this.element;
    const olGeoJSON = new OlGeoJSON();

    const meta1 = Object.assign({}, element.meta, {
      id: uuid()
    });
    const element1 = Object.assign({}, element, {
      meta: meta1,
      geometry: olGeoJSON.writeGeometryObject(olPolygons[0], {
        featureProjection: this.map.projection,
        dataProjection: element.projection
      })
    });

    const meta2 = Object.assign({}, element.meta, {
      id: uuid()
    });
    const element2 = Object.assign({}, element, {
      meta: meta2,
      geometry: olGeoJSON.writeGeometryObject(olPolygons[1], {
        featureProjection: this.map.projection,
        dataProjection: element.projection
      })
    });

    this.transaction.delete(element, this.store, {
      title: generateOperationTitle(element)
    });
    this.transaction.insert(element1, this.store, {
      title: generateOperationTitle(element1)
    });
    this.transaction.insert(element2, this.store, {
      title: generateOperationTitle(element2)
    });
    this.deactivateSliceControl();
  }

}
