import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  EntityRecord,
  EntityTransaction,
  EntityTableTemplate,
  WidgetComponent,
  getEntityRevision
} from '@igo2/common';
import {
  IgoMap,
  VectorLayer,
  FEATURE,
  Feature,
  FeatureStore,
  FeatureDataSource,
  FeatureStoreSelectionStrategy,
  FeatureStoreLoadingStrategy,
  FeatureMotion
} from '@igo2/geo';

import { generateOperationTitle, computeSchemaElementArea } from '../shared/client-schema-element.utils';

import { ClientSchemaElement } from '../shared/client-schema-element.interfaces';

@Component({
  selector: 'fadq-client-schema-element-reinclude-form',
  templateUrl: './client-schema-element-reinclude-form.component.html',
  styleUrls: ['./client-schema-element-reinclude-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementReincludeFormComponent implements OnInit, OnDestroy, WidgetComponent {

  tableTemplate: EntityTableTemplate = {
    sort: false,
    selection: true,
    selectMany: true,
    selectionCheckbox: true,
    columns: [
      {
        name: 'properties.title',
        title: 'Exclusion'
      }
    ]
  };

  exclusionStore: FeatureStore;

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

  constructor() {}

  ngOnInit() {
    this.exclusionStore = this.createExclusionStore();
    this.map.addLayer(this.exclusionStore.layer);
  }

  ngOnDestroy() {
    this.map.removeLayer(this.exclusionStore.layer);
    this.exclusionStore.clear();
  }

  private createExclusionStore(): FeatureStore {
    const exclusionStore = new FeatureStore([], {
      map: this.map,
      getKey: (exclusion: Feature) => exclusion.properties.id
    });

    const layer = new VectorLayer({
      zIndex: 205,
      source: new FeatureDataSource(),
      // style: createMeasureLayerStyle(),
      showInLayerList: false
    });
    exclusionStore.bindLayer(layer);

    const loadingStrategy = new FeatureStoreLoadingStrategy({
      motion: FeatureMotion.None
    });
    exclusionStore.addStrategy(loadingStrategy, true);

    const selectionStrategy = new FeatureStoreSelectionStrategy({
      map: this.map,
      many: true,
      motion: FeatureMotion.None
    });
    exclusionStore.addStrategy(selectionStrategy, true);

    const exclusionCoordinates = this.element.geometry.coordinates.slice(1);
    const exclusions = exclusionCoordinates.map((coordinates: number[], index: number) => {
      return {
        type: FEATURE,
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        },
        properties: {
          index: index + 1,
          id: index,
          title: `Exclusion #${index}`
        }
      };
    });

    exclusionStore.load(exclusions);

    return exclusionStore;
  }

  onSubmit() {
    const element = this.updateElement();
    this.complete.emit();
    this.onSubmitSuccess(element);
  }

  onClose() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElement) {
    this.transaction.update(this.element, element, this.store, {
      title: generateOperationTitle(element)
    });
    this.complete.emit();
  }

  private updateElement() {
    const keepExclusions = this.exclusionStore.stateView
      .manyBy((record: EntityRecord<Feature>) => record.state.selected !== true)
      .map((record: EntityRecord<Feature>) => record.entity);

    const exclusionCoordinates = keepExclusions.map(( exclusion: Feature) => exclusion.geometry.coordinates[0]);
    const newCoordinates = [this.element.geometry.coordinates[0], ...exclusionCoordinates];

    const elementMeta = Object.assign({}, this.element.meta, {
      revision: getEntityRevision(this.element) + 1
    });
    const element = Object.assign({}, this.element, {
      meta: elementMeta,
      geometry: {
        type: 'Polygon',
        coordinates: newCoordinates
      }
    });
    element.properties.superficie = computeSchemaElementArea(element);

    return element;
  }

}
