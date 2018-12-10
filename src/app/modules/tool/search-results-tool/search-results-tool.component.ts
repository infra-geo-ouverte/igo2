import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Register } from '@igo2/context';
import { LayerService, LayerOptions } from '@igo2/geo';

import { MapState, SearchState } from 'src/app/state';
import { EntityStore } from 'src/app/modules/entity';
import { FEATURE, Feature, FeatureMotion } from 'src/app/modules/feature';
import { LAYER } from 'src/app/modules/layer';
import { IgoMap } from 'src/app/modules/map';
import { SearchResult } from 'src/app/modules/search';

@Register({
  name: 'searchResultsFadq',
  title: 'igo.tools.searchResults',
  icon: 'search'
})
@Component({
  selector: 'fadq-search-results-tool',
  templateUrl: './search-results-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsToolComponent {

  get store(): EntityStore<SearchResult> {
    return this.searchState.store;
  }

  get map(): IgoMap {
    return this.mapState.map;
  }

  constructor(
    private mapState: MapState,
    private layerService: LayerService,
    private searchState: SearchState
  ) {}

  onResultFocus(result: SearchResult) {
    this.tryAddFeatureToMap(result);
  }

  onResultSelect(result: SearchResult) {
    this.tryAddFeatureToMap(result);
    this.tryAddLayerToMap(result);
  }

  private tryAddFeatureToMap(result: SearchResult) {
    if (result.meta.dataType !== FEATURE) {
      return undefined;
    }
    const feature = (result as SearchResult<Feature>).data;
    this.map.overlay.setFeatures([feature], FeatureMotion.Default);
  }

  private tryAddLayerToMap(result: SearchResult) {
    const map = this.mapState.map;
    if (map === undefined) {
      return;
    }

    if (result.meta.dataType !== LAYER) {
      return undefined;
    }
    const layerOptions = (result as SearchResult<LayerOptions>).data;
    this.layerService
      .createAsyncLayer(layerOptions)
      .subscribe(layer => map.addLayer(layer));
  }
}
