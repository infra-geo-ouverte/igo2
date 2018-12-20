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

import { EntityFormTemplate, getEntityId, getEntityRevision } from 'src/lib/entity';

import { FEATURE } from '../shared/feature.enum';
import { Feature } from '../shared/feature.interfaces';
import { hideOlFeature } from '../shared/feature.utils';
import { FeatureStore } from '../shared/store';
import { FeatureStoreSelectionStrategy } from '../shared/strategies/selection';

@Component({
  selector: 'fadq-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFormComponent implements OnInit, OnDestroy {

  private olFeatureStyle: olstyle.Style;

  @Input()
  get template(): EntityFormTemplate {
    return this._template;
  }
  set template(value: EntityFormTemplate) {
    if (this.template !== undefined) {
      return;
    }
    this._template = value;
  }
  private _template: EntityFormTemplate;

  @Input()
  get feature(): Feature | undefined {
    return this._feature;
  }
  set feature(value: Feature | undefined) {
    if (this.feature !== undefined) {
      return;
    }
    this._feature = value;
  }
  private _feature: Feature | undefined;

  @Input()
  get store(): FeatureStore | undefined {
    return this._store;
  }
  set store(value: FeatureStore | undefined) {
    if (this.store !== undefined) {
      return;
    }
    this._store = value;
  }
  private _store: FeatureStore | undefined;

  @Output() submitForm = new EventEmitter<{
    feature: Feature | undefined;
    data: Feature;
  }>();

  @Output() cancel = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.hideFeature();
    this.deactivateSelection();
  }

  ngOnDestroy() {
    this.showFeature();
    this.activateSelection();
  }

  onSubmit(event: {entity: undefined, data: { [key: string]: any }}) {
    const data = this.formDataToFeature(event.data);
    this.submitForm.emit({feature: this.feature, data});
  }

  onCancel() {
    this.cancel.emit();
  }

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

  private deactivateSelection() {
    if (this.store === undefined) {
      return;
    }

    this.store.deactivateStrategiesOfType(FeatureStoreSelectionStrategy);
  }

  private activateSelection() {
    if (this.store === undefined) {
      return;
    }
    // TODO: maybe we should recativate the strategies only if they
    // were active in the first place
    this.store.activateStrategiesOfType(FeatureStoreSelectionStrategy);
  }

}
