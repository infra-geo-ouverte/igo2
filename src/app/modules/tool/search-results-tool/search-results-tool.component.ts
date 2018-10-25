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
import { FEATURE } from '../../feature/shared/feature.enum';
import { Feature } from '../../feature/shared/feature.interface';
import { LAYER } from '../../map/shared/map.enum';
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

  get dataStore(): DataStore {
    return this.searchStoreService.getStore();
  }

  constructor(
    private overlayService: OverlayService,
    private mapService: MapService,
    private layerService: LayerService,
    private searchStoreService: SearchStoreService
  ) {}

  handleRecordFocus(record: Record) {
    if (record.meta.dataType === FEATURE) {
      this.addFeatureRecordToMap(record);
    }
  }

  handleRecordSelect(record: Record) {
    if (record.meta.dataType === FEATURE) {
      this.addFeatureRecordToMap(record);
    } else if (record.meta.dataType === LAYER) {
      this.addLayerRecordToMap(record);
    }
  }

  private addFeatureRecordToMap(record: Record) {
    const feature = record.data as Feature;
    // this.overlayService.setFeatures([feature], OverlayAction.ZoomIfOutMapExtent);
  }

  private addLayerRecordToMap(record: Record) {
    const map = this.mapService.getMap();
    if (map === undefined) {
      return;
    }

    const layerOptions = record.data.layer as LayerOptions;
    this.layerService
      .createAsyncLayer(layerOptions)
      .subscribe(layer => map.addLayer(layer));
  }
}
