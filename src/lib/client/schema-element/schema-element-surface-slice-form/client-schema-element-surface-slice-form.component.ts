import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import OlPolygon from 'ol/geom/Polygon';
import OlGeoJSON from 'ol/format/GeoJSON';

import { uuid } from '@igo2/utils';

import { EntityFormTemplate, EntityTransaction } from 'src/lib/entity';
import { Feature, FeatureStore, FeatureFormSubmitEvent } from 'src/lib/feature';
import { IgoMap, SliceControl } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

import { generateOperationTitle } from '../shared/client-schema-element.utils';


@Component({
  selector: 'fadq-client-schema-element-surface-slice-form',
  templateUrl: './client-schema-element-surface-slice-form.component.html',
  styleUrls: ['./client-schema-element-surface-slice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSurfaceSliceFormComponent
    extends WidgetComponent implements OnInit, OnDestroy {

  public template$ = new Subject<EntityFormTemplate>();

  private sliceEnd$$: Subscription;

  /**
   * Slice control
   */
  private sliceControl: SliceControl;

  @Input() map: IgoMap;

  @Input() store: FeatureStore<ClientSchemaElementSurface>;

  @Input() transaction: EntityTransaction;

  @Input()
  set schema(value: ClientSchema) {
    if (this.schema !== undefined) {
      return;
    }
    this._schema = value;
    this.cdRef.detectChanges();
  }
  get schema(): ClientSchema { return this._schema; }
  private _schema: ClientSchema;

  @Input()
  set element(value: ClientSchemaElementSurface) {
    this._element = value;
    this.cdRef.detectChanges();
  }
  get element(): ClientSchemaElementSurface { return this._element; }
  private _element: ClientSchemaElementSurface;

  constructor(
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  /**
   * Add the draw line control
   * @internal
   */
  ngOnInit() {
    this.clientSchemaElementFormService.buildSliceSurfaceForm()
      .subscribe((template: EntityFormTemplate) => this.template$.next(template));
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

  onSubmit(event: FeatureFormSubmitEvent) {
    const element = this.formDataToElement(event.data);
    this.onSubmitSuccess(element);
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElementSurface) {
    // this.transaction.slice(this.element, element, this.store, {
    //   title: generateOperationTitle(element)
    // });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElementSurface {
    return Object.assign({}, data as ClientSchemaElementSurface);
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
