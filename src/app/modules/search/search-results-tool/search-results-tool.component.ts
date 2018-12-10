import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Register } from '@igo2/context';
import { LayerService, LayerOptions } from '@igo2/geo';

import { EntityStore } from 'src/lib/entity';
import { FEATURE, Feature, FeatureMotion } from 'src/lib/feature';
import { LAYER } from 'src/lib/layer';
import { IgoMap } from 'src/lib/map';
import { SearchResult } from 'src/lib/search';

import { MapState } from 'src/app/modules/map/map.state';
import { SearchState } from '../search.state';

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
