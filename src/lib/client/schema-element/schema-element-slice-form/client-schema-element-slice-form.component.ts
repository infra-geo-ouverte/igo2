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

import { Subscription, Subject, BehaviorSubject } from 'rxjs';

import OlFeature from 'ol/Feature';
import OlGeometry from 'ol/geom/Geometry';
import OlGeoJSON from 'ol/format/GeoJSON';

import { LanguageService } from '@igo2/core';
import { uuid } from '@igo2/utils';

import { EntityTransaction, WidgetComponent, OnUpdateInputs } from '@igo2/common';
import {
  FeatureStore,
  IgoMap,
  SliceControl,
  GeometrySliceError,
  GeometrySliceMultiPolygonError,
  GeometrySliceLineStringError,
  GeometrySliceTooManyIntersectionError
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
export class ClientSchemaElementSliceFormComponent
    implements OnInit, OnDestroy, OnUpdateInputs, WidgetComponent {

  /**
   * Slice error, if any
   * @internal
   */
  errorMessage$: Subject<string> = new Subject();

  /**
   * Wether the submit button is enabled
   * @internal
   */
  submitEnabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Slice control
   */
  private sliceControl: SliceControl;

  /**
   * Subscription to slice end
   */
  private sliceEnd$$: Subscription;

  /**
   * Subscription to slice error
   */
  private sliceError$$: Subscription;

  /**
   * Error classes -> i18n key mapping
   */
  private errorMessages = new Map([
    [GeometrySliceMultiPolygonError, 'geometry.slice.error.multiPolygon'],
    [GeometrySliceLineStringError, 'geometry.slice.error.lineString'],
    [GeometrySliceTooManyIntersectionError, 'geometry.slice.error.tooManyIntersection']
  ]);

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
    private languageService: LanguageService,
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
   * Implemented as part of OnUpdateInputs
   */
  onUpdateInputs() {
    this.cdRef.detectChanges();
  }

  onSubmit() {
    const newElements = this.getNewElements();
    console.log(newElements);
    this.onSubmitSuccess(newElements);
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(newElements: ClientSchemaElement[]) {
    this.submitEnabled$.next(false);
    if (newElements.length > 0) {
      this.transaction.delete(this.element, this.store, {
        title: generateOperationTitle(this.element)
      });
      newElements.forEach((element: ClientSchemaElement) => {
        this.transaction.insert(element, this.store, {
          title: generateOperationTitle(element)
        });
      });
    }
    this.deactivateSliceControl();
    this.complete.emit();
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
      .subscribe((olGeometries: OlGeometry[]) => this.onSliceEnd(olGeometries));
    this.sliceError$$ = this.sliceControl.error$
      .subscribe((error: GeometrySliceError) => this.onSliceError(error));

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
    this.sliceError$$.unsubscribe();
    this.sliceControl.setOlMap(undefined);
  }

  /**
   * Remove draw line control
   */
  private removeSliceControl() {
    this.deactivateSliceControl();
    this.sliceControl.getSource().clear();
  }

  private getNewElements(): ClientSchemaElement[] {
    const olFeatures = this.sliceControl.getSource().getFeatures();
    if (olFeatures.length <= 1) { return []; }

    const olGeoJSON = new OlGeoJSON();
    const baseElement = this.element;
    return olFeatures.map((olFeature: OlFeature) => {
      const olGeometry = olFeature.getGeometry();
      const meta = Object.assign({}, baseElement.meta, {
        id: uuid()
      });
      const properties = Object.assign({}, baseElement.properties, {
        idElementGeometrique: undefined
      });

      return Object.assign({}, baseElement, {
        meta,
        properties,
        geometry: olGeoJSON.writeGeometryObject(olGeometry, {
          dataProjection: baseElement.projection,
          featureProjection: this.map.projection
        })
      });
    });
  }

  /**
   * On slice end, enable the submit button
   */
  private onSliceEnd(olGeometries: OlGeometry[]) {
    if (olGeometries.length > 0) {
      this.submitEnabled$.next(true);
    }
  }

  /**
   * On slice error, display a nice, translated message, or display
   * the error's default message.
   * @param error Slice error object
   */
  private onSliceError(error: GeometrySliceError) {
    if (error === undefined) {
      this.errorMessage$.next(undefined);
      return;
    }

    let message = error.message;

    // We need to use instanceof instead of directly accessing the map with the error's prototype
    // because GeometrySliceError all share the same GeometrySliceError
    const key = Array.from(this.errorMessages.keys()).find((cls: typeof GeometrySliceError) => {
      return error instanceof cls;
    });
    const messageKey = this.errorMessages.get(key);

    try {
      message = this.languageService.translate.instant(messageKey);
    } catch (e) {}
    this.errorMessage$.next(message);
  }
}
