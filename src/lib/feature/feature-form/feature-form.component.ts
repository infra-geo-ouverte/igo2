import * as olstyle from 'ol/style';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { uuid } from '@igo2/utils';

import { getEntityRevision } from 'src/lib/entity';
import { Form } from 'src/lib/form';

import { FEATURE } from '../shared/feature.enum';
import { Feature } from '../shared/feature.interfaces';
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
export class FeatureFormComponent implements OnChanges, OnDestroy {

  public feature$: BehaviorSubject<Feature> = new BehaviorSubject(undefined);

  /**
   * Form
   */
  @Input() form: Form;

  /**
   * Feature to update
   */
  @Input() feature: Feature | undefined;

  /**
   * The store the feature belongs to. Required to manage the
   * visiblity and selection.
   */
  @Input() store: FeatureStore | undefined;

  /**
   * Event emitted when the form is submitted
   */
  @Output() submitForm = new EventEmitter<Feature>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const store = changes.store;
    if (store && store.currentValue !== store.previousValue) {
     this.setStore(store.currentValue);
    }

    const feature = changes.feature;
    if (feature && feature.currentValue !== feature.previousValue) {
      this.feature$.next(feature.currentValue);
    }
  }

  /**
   * Show the original feature and reactivate the selection
   * @internal
   */
  ngOnDestroy() {
    this.setStore(undefined);
  }

  /**
   * Transform the form data to a feature and emit an event
   * @param event Form submit event
   * @internal
   */
  onSubmit(data: {[key: string]: any}) {
    const feature = this.formDataToFeature(data);
    this.submitForm.emit(feature);
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

  private setStore(store: FeatureStore) {
    if (this.store !== undefined) {
      this.activateStoreSelection(this.store);
    }
    if (store !== undefined) {
      this.deactivateStoreSelection(store);
    }
    this.store = store;
  }

  /**
   * Deactivate feature selection from the store and from the map
   */
  private deactivateStoreSelection(store: FeatureStore) {
    const selectionStrategy = store.getStrategyOfType(FeatureStoreSelectionStrategy);
    if (selectionStrategy !== undefined) {
      selectionStrategy.deactivate();
      (selectionStrategy as FeatureStoreSelectionStrategy).unselectAll();
    }
  }

  /**
   * Reactivate feature selection from the store and from the map
   */
  private activateStoreSelection(store: FeatureStore) {
    // TODO: maybe we should recativate the strategies only if they
    // were active in the first place
    store.activateStrategyOfType(FeatureStoreSelectionStrategy);
  }

}
