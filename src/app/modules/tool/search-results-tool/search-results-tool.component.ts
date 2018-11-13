import { Component, OnInit } from '@angular/core';

import { Register } from '@igo2/context';

import {
  MapService,
  LayerService,
  LayerOptions
} from '@igo2/geo';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { getFeatureFromEntity } from '../../feature/shared/feature.utils';
import { getLayerOptionsFromEntity } from '../../map/shared/map.utils';
import { Overlay } from '../../overlay/shared/overlay';
import { OverlayAction } from '../../overlay/shared/overlay.enum';
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
export class SearchResultsToolComponent implements OnInit {

  private overlay: Overlay;

  get store(): EntityStore<Entity> {
    return this.searchStoreService.getStore();
  }

  constructor(
    private mapService: MapService,
    private layerService: LayerService,
    private searchStoreService: SearchStoreService
  ) {}

  ngOnInit() {
    this.overlay = new Overlay(this.mapService.getMap());
  }

  handleEntityFocus(entity: Entity) {
    this.tryAddFeatureToMap(entity);
  }

  handleEntitySelect(entity: Entity) {
    this.tryAddFeatureToMap(entity);
    this.tryAddLayerToMap(entity);
  }

  private tryAddFeatureToMap(entity: Entity) {
    const feature = getFeatureFromEntity(entity);
    if (feature !== undefined) {
      this.overlay.setFeatures([feature], OverlayAction.Default);
    }
  }

  private tryAddLayerToMap(entity: Entity) {
    const map = this.mapService.getMap();
    const layerOptions = getLayerOptionsFromEntity(entity);
    if (map === undefined || layerOptions === undefined) {
      return;
    }

    this.layerService
      .createAsyncLayer(layerOptions)
      .subscribe(layer => map.addLayer(layer));
  }
}
