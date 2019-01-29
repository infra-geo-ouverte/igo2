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

/**
 * Tool to browse the search results
 */
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

  /**
   * Store holding the search results
   * @internal
   */
  get store(): EntityStore<SearchResult> { return this.searchState.store; }

  /**
   * Map to display the results on
   * @internal
   */
  get map(): IgoMap { return this.mapState.map; }

  constructor(
    private mapState: MapState,
    private layerService: LayerService,
    private searchState: SearchState
  ) {}

  /**
   * Try to add a feature to the map when it's being focused
   * @internal
   * @param result A search result that could be a feature
   */
  onResultFocus(result: SearchResult) {
    this.tryAddFeatureToMap(result);
  }

  /**
   * Try to add a feature or a layer to the map when it's being selected
   * @internal
   * @param result A search result that could be a feature or some layer options
   */
  onResultSelect(result: SearchResult) {
    this.tryAddFeatureToMap(result);
    this.tryAddLayerToMap(result);
  }

  /**
   * Try to add a feature to the map overlay
   * @param result A search result that could be a feature
   */
  private tryAddFeatureToMap(result: SearchResult) {
    if (result.meta.dataType !== FEATURE) {
      return undefined;
    }
    const feature = (result as SearchResult<Feature>).data;

    // Somethimes features have no geometry. It happens with some GetFeatureInfo
    if (feature.geometry === undefined) {
      return;
    }
    this.map.overlay.setFeatures([feature], FeatureMotion.Default);
  }

  /**
   * Try to add a layer to the map
   * @param result A search result that could be some layer options
   */
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
