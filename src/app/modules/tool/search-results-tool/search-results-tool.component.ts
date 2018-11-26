import { Component, OnInit } from '@angular/core';

import { Register } from '@igo2/context';
import { LayerService, LayerOptions } from '@igo2/geo';

import { EntityStore } from '../../entity/shared/store';
import { FEATURE } from '../../feature/shared/feature.enum';
import { Feature } from '../../feature/shared/feature.interface';
import { LAYER } from '../../map/shared/map.enum';
import { IgoMap } from '../../map/shared/map';
import { MapService } from '../../map/shared/map.service';
import { OverlayAction } from '../../overlay/shared/overlay.enum';
import { SearchResult } from '../../search/shared/search.interface';
import { SearchStoreService } from '../../search/shared/search-store.service';

@Register({
  name: 'searchResultsFadq',
  title: 'igo.tools.searchResults',
  icon: 'search'
})
@Component({
  selector: 'fadq-search-results-tool',
  templateUrl: './search-results-tool.component.html'
})
export class SearchResultsToolComponent {

  get store(): EntityStore<SearchResult> {
    return this.searchStoreService.store;
  }

  get map(): IgoMap {
    return this.mapService.getMap();
  }

  constructor(
    private mapService: MapService,
    private layerService: LayerService,
    private searchStoreService: SearchStoreService
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
    this.map.overlay.setFeatures([feature], OverlayAction.Default);
  }

  private tryAddLayerToMap(result: SearchResult) {
    const map = this.mapService.getMap();
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
