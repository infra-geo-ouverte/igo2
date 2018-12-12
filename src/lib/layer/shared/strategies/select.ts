import OlFeature from 'ol/Feature';
import { ListenerFunction } from 'ol/events';

import { Subscription, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { EntityStore, State, getEntityId } from 'src/lib/entity';
import { Feature } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';

import { LayerStoreSelectStrategyOptions } from '../layer.interfaces';
import { LayerStore } from '../layer-store';
import { LayerStoreStrategy } from './strategy';

export class LayerStoreSelectStrategy implements LayerStoreStrategy {

  private mapClick: ListenerFunction;
  private overlayLayerStore: LayerStore;
  private stores$$: Subscription;

  get map(): IgoMap {
    return this.layerStores.length > 0 ? this.layerStores[0].map : undefined;
  }

  constructor(
    private layerStores: LayerStore[],
    private options?: LayerStoreSelectStrategyOptions
  ) {
    this.overlayLayerStore = this.createOverlayLayerStore();
  }

  activate() {
    this.deactivate();
    this.bindMapClick();

    const stores$ = this.layerStores.map((layerStore: LayerStore) => layerStore.store
        .observeBy((feature: Feature, state: State) => state.selected === true));
    this.stores$$ = combineLatest(...stores$)
      .pipe(
        debounceTime(50),
        map((features: Array<Feature[]>) => features.reduce((a, b) => a.concat(b)))
      ).subscribe((features: Feature[]) => this.onSelectFromStore(features));
  }

  deactivate() {
    if (this.stores$$ !== undefined) {
      this.stores$$.unsubscribe();
    }
    this.unbindMapClick();
  }

  private bindMapClick() {
    this.mapClick = this.map.ol.on('singleclick', (event) => {
      const olFeatures = event.map.getFeaturesAtPixel(event.pixel, {
        layerFilter: (olLayer) => {
          const olLayers = this.layerStores
            .map((layerStore: LayerStore) => layerStore.layer.ol);
          return olLayers.indexOf(olLayer) >= 0;
        }
      });
      this.onSelectFromMap(olFeatures);
    });
  }

  private unbindMapClick() {
    if (this.mapClick !== undefined) {
      this.map.ol.un('click', this.mapClick);
      this.mapClick = undefined;
    }
  }

  private onSelectFromStore(features: Feature[]) {
    const motion = this.options ? this.options.motion : undefined;
    this.overlayLayerStore.setLayerFeatures(features, motion);
  }

  private onSelectFromMap(olFeatures?: OlFeature[]) {
    const groupedFeatures = this.groupFeatureByLayerStore(olFeatures);

    this.layerStores.forEach((layerStore) => {
      const store = layerStore.store;
      const features = groupedFeatures.get(layerStore);
      if (features === undefined) {
        store.updateAllEntitiesState({selected: false});
      } else {
        store.updateEntitiesState(features, {selected: true}, true);
      }
    });
  }

  private groupFeatureByLayerStore(olFeatures: OlFeature[]): Map<LayerStore, Feature[]> {
    const groupedFeatures = new Map<LayerStore, Feature[]>();
    if (olFeatures === null || olFeatures === undefined) {
      return groupedFeatures;
    }

    olFeatures.forEach((olFeature: OlFeature) => {
      const layerStore = olFeature.get('layerStore');

      let features = groupedFeatures.get(layerStore);
      if (features === undefined) {
        features = [];
        groupedFeatures.set(layerStore, features);
      }

      const feature = layerStore.store.getEntityById(olFeature.getId());
      if (feature !== undefined) {
        features.push(layerStore.store.getEntityById(olFeature.getId()));
      }
    });

    return groupedFeatures;
  }

  private createOverlayLayerStore() {
    const overlayLayer = new VectorLayer({
      zIndex: 200,
      source: new FeatureDataSource(),
      style: this.options ? this.options.style : undefined
    });
    this.map.addLayer(overlayLayer, false);

    return new LayerStore(overlayLayer, new EntityStore<Feature>());
  }
}
