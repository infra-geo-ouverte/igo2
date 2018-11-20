import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { zip } from 'rxjs';

import { Layer, LayerService } from '@igo2/geo';

import { IgoMap } from '../../map/shared/map';
import { getEntityId } from '../../entity/shared/entity.utils';
import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import {
  CatalogItem,
  CatalogItemLayer,
  CatalogItemGroup,
  CatalogItemState
} from '../shared/catalog.interface';
import { CatalogItemType } from '../shared/catalog.enum';

@Component({
  selector: 'fadq-catalog-browser',
  templateUrl: './catalog-browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserComponent implements OnInit, OnDestroy {

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<CatalogItem, CatalogItemState> {
    return this._store;
  }
  set store(value: EntityStore<CatalogItem, CatalogItemState>) {
    this._store = value;
  }
  private _store;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map;

  @Output() layerSelect = new EventEmitter<CatalogItemLayer>();
  @Output() layerAdd = new EventEmitter<CatalogItemLayer>();
  @Output() layerRemove = new EventEmitter<CatalogItemLayer>();

  constructor(
    private layerService: LayerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    const currentLayerIds = this.map.layers.map((layer: Layer) => layer.id);
    this.store.state.setByKeys(currentLayerIds, {added: true});
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  isGroup(item: CatalogItem): boolean {
    return item.type === CatalogItemType.Group;
  }

  isLayer(item: CatalogItem): boolean {
    return item.type === CatalogItemType.Layer;
  }

  selectLayer(layer: CatalogItemLayer) {
    this.controller.updateEntityState(layer, {
      selected: true,
      focused: true,
    }, true);

    this.layerSelect.emit(layer);
  }

  addLayer(layer: CatalogItemLayer) {
    this.controller.updateEntityState(layer, {added: true}, false);
    this.addLayerToMap(layer);
  }

  removeLayer(layer: CatalogItemLayer) {
    this.controller.updateEntityState(layer, {added: false}, false);
    this.removeLayerFromMap(layer);
  }

  addGroup(group: CatalogItemGroup, items: CatalogItemLayer[]) {
    this.controller.updateEntityState(group, {added: true}, false);
    const layers = items.filter((item: CatalogItem) => {
      const added = this.store.getEntityState(item).added || false;
      return this.isLayer(item) && added === false;
    });
    this.addLayersToMap(layers);
  }

  removeGroup(group: CatalogItemGroup, items: CatalogItemLayer[]) {
    this.controller.updateEntityState(group, {added: false}, false);
    const layers = items.filter((item: CatalogItem) => {
      const added = this.store.getEntityState(item).added || false;
      return this.isLayer(item) && added === true;
      });
    this.removeLayersFromMap(layers);
  }

  private addLayerToMap(layer: CatalogItemLayer) {
    this.layerService.createAsyncLayer(layer.options)
      .subscribe((oLayer: Layer) => this.map.addLayer(oLayer));
  }

  private removeLayerFromMap(layer: CatalogItemLayer) {
    const oLayer = this.map.getLayerById(getEntityId(layer));
    if (oLayer !== undefined) {
      this.map.removeLayer(oLayer);
    }
  }

  private addLayersToMap(layers: CatalogItemLayer[]) {
    const layers$ = [];
    layers.forEach((layer: CatalogItemLayer) => {
      this.controller.updateEntityState(layer, {added: true}, false);
      layers$.push(this.layerService.createAsyncLayer(layer.options));
    });

    zip(...layers$).subscribe((oLayers: Layer[]) => {
      this.map.addLayers(oLayers);
    });
  }

  private removeLayersFromMap(layers: CatalogItemLayer[]) {
    layers.forEach((layer: CatalogItemLayer) => {
      this.controller.updateEntityState(layer, {added: false}, false);
      this.removeLayerFromMap(layer);
    });
  }
}
