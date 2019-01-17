import * as olstyle from 'ol/style';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { uuid } from '@igo2/utils';

import {
  EntityFormTemplate,
  EntityFormSubmitEvent,
  getEntityId,
  getEntityRevision
} from 'src/lib/entity';

import { FEATURE } from '../shared/feature.enum';
import { Feature, FeatureFormSubmitEvent } from '../shared/feature.interfaces';
import { hideOlFeature } from '../shared/feature.utils';
import { FeatureStore } from '../shared/store';
import { FeatureStoreSelectionStrategy } from '../shared/strategies/selection';

/**
 * A configurable form, optionnally bound to a feature.
 * This component creates an entity form and, on submit,
 * returns a feature made out of the submitted data. It also
 * does things like managing the feature visibility while it's being updated
 * as well as disabling the selection of another feature.
 */
@Component({
  selector: 'fadq-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFormComponent implements OnInit, OnDestroy {

  /**
   * Reference to the original feature style. This si required
   * when toggling the feature's visibility.
   */
  private olFeatureStyle: olstyle.Style;

  /**
   * Form template
   */
  @Input()
  set template(value: EntityFormTemplate) {
    if (this.template !== undefined) {
      return;
    }
    this._template = value;
  }
  get template(): EntityFormTemplate { return this._template; }
  private _template: EntityFormTemplate;

  /**
   * Feature to update
   */
  @Input()
  set feature(value: Feature | undefined) {
    if (this.feature !== undefined) {
      return;
    }
    this._feature = value;
  }
  get feature(): Feature | undefined { return this._feature; }
  private _feature: Feature | undefined;

  /**
   * The store the feature belongs to. Required to manage the
   * visiblity and selection.
   */
  @Input()
  set store(value: FeatureStore | undefined) {
    if (this.store !== undefined) {
      return;
    }
    this._store = value;
  }
  get store(): FeatureStore | undefined { return this._store; }
  private _store: FeatureStore | undefined;

  /**
   * Event emitted when the form is submitted
   */
  @Output() submitForm = new EventEmitter<FeatureFormSubmitEvent>();

  /**
   * Event emitted when the cancel button is clicked
   */
  @Output() cancel = new EventEmitter();

  constructor() {}

  /**
   * Hide the original feature and deactivate the selection
   * @internal
   */
  ngOnInit() {
    // this.hideFeature();
    this.deactivateSelection();
  }

  /**
   * Show the original feature and reactivate the selection
   * @internal
   */
  ngOnDestroy() {
    // this.showFeature();
    this.activateSelection();
  }

  /**
   * Transform the form data to a feature and emit an event
   * @param event Form submit event
   * @internal
   */
  onSubmit(event: EntityFormSubmitEvent) {
    const feature = event.entity as Feature;
    // Unselect the feature to avoid some kind of display glitch
    if (feature !== undefined) {
      this.store.updateEntityState(feature, {selected: false});
    }
    const data = this.formDataToFeature(event.data);
    this.submitForm.emit({form: event.form, feature, data});
  }

  /**
   * Emit cancel event
   * @internal
   */
  onCancel() {
    this.cancel.emit();
  }

  /**
   * Transform the form data to a feature
   * @param data Form data
   * @returns A feature
   */
  private formDataToFeature(data: { [key: string]: any }): Feature {
    const properties = {};
    const meta = {};
    if (this.feature === undefined) {
      meta['id'] = uuid();
    } else {
      Object.assign(properties, this.feature.properties);
      Object.assign(meta, this.feature.meta, {
        revision: getEntityRevision(this.feature) + 1
      });
    }

    const propertyPrefix = 'properties.';
    Object.entries(data).forEach((entry: [string, any]) => {
      const [key, value] = entry;
      if (key.startsWith(propertyPrefix)) {
        const property = key.substr(propertyPrefix.length);
        properties[property] = value;
      }
    });

    let geometry = data.geometry;
    if (geometry === undefined && this.feature !== undefined) {
      geometry = this.feature.geometry;
    }

    return {
      meta,
      type: FEATURE,
      geometry: geometry,
      projection: 'EPSG:4326',
      properties
    };
  }

  /**
   * Hide the original feature because the geometry input
   * already adds one to it's overlay
   */
  private hideFeature() {
    if (this.feature === undefined || this.store === undefined) {
      return;
    }

    const featureId = getEntityId(this.feature);
    const olFeature = this.store.source.ol.getFeatureById(featureId);
    if (olFeature !== undefined) {
      this.olFeatureStyle = olFeature.getStyle();
      hideOlFeature(olFeature);
    }
  }

  /**
   * Show the original feature when eveything is done
   */
  private showFeature() {
    if (this.feature === undefined || this.store === undefined) {
      return;
    }

    const featureId = getEntityId(this.feature);
    const olFeature = this.store.source.ol.getFeatureById(featureId);
    if (olFeature !== undefined) {
      olFeature.setStyle(this.olFeatureStyle);
    }
  }

  /**
   * Deactivate feature selection from the store and from the map
   */
  private deactivateSelection() {
    if (this.store === undefined) {
      return;
    }

    this.store.deactivateStrategiesOfType(FeatureStoreSelectionStrategy);
  }

  /**
   * Reactivate feature selection from the store and from the map
   */
  private activateSelection() {
    if (this.store === undefined) {
      return;
    }
    // TODO: maybe we should recativate the strategies only if they
    // were active in the first place
    this.store.activateStrategiesOfType(FeatureStoreSelectionStrategy);
  }

}
