import OlFeature from 'ol/Feature';
import OlSelect from 'ol/interaction/Select';
import { OlSelectEvent } from 'ol/events/Event';

import { VectorLayer } from '@igo2/geo';

import { Subscription } from 'rxjs';

import { EntityStore, State, getEntityId } from 'src/lib/entity';
import { moveToFeatures } from '../feature.utils';
import { Feature, FeatureSelectStrategyOptions } from '../feature.interfaces';
import { FeatureStrategy } from './strategy';

export class FeatureSelectStrategy extends FeatureStrategy {

  private selectInteraction: OlSelect;
  private storeSelection$$: Subscription;

  constructor(
    protected layer: VectorLayer,
    protected store: EntityStore<Feature>,
    private options?: FeatureSelectStrategyOptions
  ) {
    super(layer, store);
  }

  activate() {
    this.deactivate();

    this.addSelectInteraction();
    this.storeSelection$$ = this.store
      .observeBy((feature: Feature, state: State) => state.selected === true)
      .subscribe((features: Feature[]) => this.onStoreSelectionChange(features));
  }

  deactivate() {
    this.removeSelectInteraction();
    if (this.storeSelection$$ === undefined) {
      return;
    }
    this.storeSelection$$.unsubscribe();
  }

  private addSelectInteraction() {
    const selectInteraction = new OlSelect({
      layers: [this.layer.ol],
      style: this.options ? this.options.style : undefined
    });
    this.map.ol.addInteraction(selectInteraction);
    selectInteraction.on('select', (event: OlSelectEvent) => {
      this.onSelectInteractionSelectionChange(event);
    });
    this.selectInteraction = selectInteraction;
  }

  private removeSelectInteraction() {
    if (this.selectInteraction !== undefined) {
      this.map.ol.removeInteraction(this.selectInteraction);
    }
    this.selectInteraction = undefined;
  }

  private onStoreSelectionChange(features: Feature[]) {
    if (this.selectInteraction === undefined) {
      return;
    }
    if (features.length === 0) {
      this.clearOverlay();
    } else {
      this.setOverlayFeatures(features);
    }
  }

  private onSelectInteractionSelectionChange(event: OlSelectEvent) {
    const olFeatures = event.selected;

    if (olFeatures.length > 0) {
      const featureIds = olFeatures.map((olFeature: OlFeature) => olFeature.getId());
      const features = this.store.entities.filter((feature: Feature) => {
        return featureIds.indexOf(getEntityId(feature)) >= 0;
      });
      this.store.updateEntitiesState(features, {selected: true}, true);
    } else {
      this.store.updateAllEntitiesState({selected: false});
    }
  }

  private setOverlayFeatures(features: Feature[]) {
    const olOverlay = this.selectInteraction.getOverlay();
    const olOverlaySource = olOverlay.getSource();
    const olOverlayFeatures = olOverlaySource.getFeatures();

    const overlayFeaturesIds = olOverlayFeatures.map((feature: OlFeature) => feature.getId());
    const selectOlFeatures = features.
      filter((feature: Feature) => {
        return overlayFeaturesIds.indexOf(getEntityId(feature)) < 0;
      })
      .map((feature: Feature) => {
        return this.source.ol.getFeatureById(getEntityId(feature));
      });

    if (selectOlFeatures.length > 0) {
      olOverlaySource.clear();
      olOverlaySource.addFeatures(selectOlFeatures);
      moveToFeatures(this.map, selectOlFeatures, this.options.motion);
    }
  }

  private clearOverlay() {
    const olOverlay = this.selectInteraction.getOverlay();
    const olOverlaySource = olOverlay.getSource();
    olOverlaySource.clear();
  }
}
