import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { uuid } from '@igo2/utils';

import OlVectorSource from 'ol/source/Vector';
import OlLineString from 'ol/geom/LineString';
import OlGeoJSON from 'ol/format/GeoJSON';

import { EntityFormTemplate, EntityTransaction } from 'src/lib/entity';
import { Feature, FeatureStore, FeatureFormSubmitEvent, splitOlGeometry } from 'src/lib/feature';
import { IgoMap, DrawControl } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

import { generateOperationTitle } from '../shared/client-schema-element.utils';


@Component({
  selector: 'fadq-client-schema-element-surface-split-form',
  templateUrl: './client-schema-element-surface-split-form.component.html',
  styleUrls: ['./client-schema-element-surface-split-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSurfaceSplitFormComponent
    extends WidgetComponent implements OnInit, OnDestroy {

  public template$ = new Subject<EntityFormTemplate>();

  /**
   * Subscription to draw end
   */
  private drawLineEnd$: Subscription;

  /**
   * Draw line control
   */
  private drawLineControl: DrawControl;

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
    this.clientSchemaElementFormService.buildSplitSurfaceForm()
      .subscribe((template: EntityFormTemplate) => this.template$.next(template));
    this.createDrawLineControl();
    this.activateDrawLineControl();
  }

  /**
   * Remove the draw line control
   * @internal
   */
  ngOnDestroy() {
    this.removeDrawLineControl();
  }

  onSubmit(event: FeatureFormSubmitEvent) {
    const element = this.formDataToElement(event.data);
    this.onSubmitSuccess(element);
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElementSurface) {
    // this.transaction.split(this.element, element, this.store, {
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
  private createDrawLineControl() {
    this.drawLineControl = new DrawControl({
      geometryType: 'LineString',
      source: new OlVectorSource(),
      // drawStyle: createMeasureInteractionStyle(),
      // layerStyle: createMeasureLayerStyle()
    });
  }

  /**
   * Activate a given control
   * @param drawControl Draw control
   */
  private activateDrawLineControl() {
    this.drawLineEnd$ = this.drawLineControl.end$
      .subscribe((olGeometry: OlLineString) => this.onDrawLineEnd(olGeometry));
    this.drawLineControl.setMap(this.map.ol);
  }

  /**
   * Deactivate the active draw control
   */
  private deactivateDrawLineControl() {
    this.drawLineEnd$.unsubscribe();
    this.drawLineControl.setMap(undefined);
  }

  /**
   * Remove draw line control
   */
  private removeDrawLineControl() {
    this.deactivateDrawLineControl();
    this.drawLineControl.getSource().clear();
  }

  /**
   * Clear the draw source and track the geometry being draw
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawLineEnd(olGeometry:  OlLineString) {
    const element = this.element;
    const olGeoJSON = new OlGeoJSON();
    const olSourceGeometry = olGeoJSON.readGeometry(element.geometry, {
      dataProjection: element.projection,
      featureProjection: this.map.projection
    });

    const olGeometries = splitOlGeometry(olSourceGeometry, olGeometry);

    const meta1 = Object.assign({}, element.meta, {
      id: uuid()
    });
    const element1 = Object.assign({}, element, {
      meta: meta1,
      geometry: olGeoJSON.writeGeometryObject(olGeometries[0], {
        featureProjection: this.map.projection,
        dataProjection: element.projection
      })
    });

    const meta2 = Object.assign({}, element.meta, {
      id: uuid()
    });
    const element2 = Object.assign({}, element, {
      meta: meta2,
      geometry: olGeoJSON.writeGeometryObject(olGeometries[1], {
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
    this.deactivateDrawLineControl();
  }

}
