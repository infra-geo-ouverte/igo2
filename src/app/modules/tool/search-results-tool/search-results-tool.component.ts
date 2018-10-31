import { Component } from '@angular/core';

import { Register } from '@igo2/context';

import {
  MapService,
  LayerService,
  LayerOptions,
  OverlayService,
  OverlayAction,
} from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { getFeatureFromRecord } from '../../feature/shared/feature.utils';
import { getLayerOptionsFromRecord } from '../../map/shared/map.utils';
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

  get store(): DataStore<Record> {
    return this.searchStoreService.getStore();
  }

  constructor(
    private overlayService: OverlayService,
    private mapService: MapService,
    private layerService: LayerService,
    private searchStoreService: SearchStoreService
  ) {}

  handleRecordFocus(record: Record) {
    this.tryAddFeatureToMap(record);
  }

  handleRecordSelect(record: Record) {
    this.tryAddFeatureToMap(record);
    this.tryAddLayerToMap(record);
  }

  private tryAddFeatureToMap(record: Record) {
    const feature = getFeatureFromRecord(record);
    if (feature !== undefined) {
      // this.overlayService.setFeatures([feature], OverlayAction.ZoomIfOutMapExtent);
    }
  }

  private tryAddLayerToMap(record: Record) {
    const map = this.mapService.getMap();
    const layerOptions = getLayerOptionsFromRecord(record);
    if (map === undefined || layerOptions === undefined) {
      return;
    }

    this.layerService
      .createAsyncLayer(layerOptions)
      .subscribe(layer => map.addLayer(layer));
  }
}
