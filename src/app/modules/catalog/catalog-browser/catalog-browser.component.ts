import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { zip } from 'rxjs';

import { Layer, LayerService } from '@igo2/geo';

import { IgoMap } from 'src/app/modules/map';
import {
  EntityStore,
  EntityStoreController,
  getEntityId
} from 'src/app/modules/entity';

import {
  CatalogItem,
  CatalogItemLayer,
  CatalogItemGroup,
  CatalogItemState,
  CatalogItemType
} from '../shared';

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

  onLayerAddedChange(event: {added: boolean, layer: CatalogItemLayer}) {
    const layer = event.layer;
    this.controller.updateEntityState(layer, {added: event.added}, false);
    event.added ? this.addLayerToMap(layer) : this.removeLayerFromMap(layer);
  }

  onGroupAddedChange(event: {added: boolean, group: CatalogItemGroup}) {
    const group = event.group;
    this.controller.updateEntityState(group, {added: event.added}, false);
    event.added ? this.addGroupToMap(group) : this.removeGroupFromMap(group);
  }

  private addLayerToMap(layer: CatalogItemLayer) {
    this.addLayersToMap([layer]);
  }

  private removeLayerFromMap(layer: CatalogItemLayer) {
    this.removeLayersFromMap([layer]);
  }

  private addLayersToMap(layers: CatalogItemLayer[]) {
    const layers$ = layers.map((layer: CatalogItemLayer) => {
      return this.layerService.createAsyncLayer(layer.options);
    });

    zip(...layers$).subscribe((oLayers: Layer[]) => {
      this.controller.updateEntitiesState(layers, {added: true});
      this.map.addLayers(oLayers);
    });
  }

  private removeLayersFromMap(layers: CatalogItemLayer[]) {
    layers.forEach((layer: CatalogItemLayer) => {
      this.controller.updateEntityState(layer, {added: false});
      const oLayer = this.map.getLayerById(getEntityId(layer));
      if (oLayer !== undefined) {
        this.map.removeLayer(oLayer);
      }
    });
  }

  private addGroupToMap(group: CatalogItemGroup) {
    const layers = group.items.filter((item: CatalogItem) => {
      const added = this.store.getEntityState(item).added || false;
      return this.isLayer(item) && added === false;
    });
    this.addLayersToMap(layers as CatalogItemLayer[]);
  }

  private removeGroupFromMap(group: CatalogItemGroup) {
    const layers = group.items.filter((item: CatalogItem) => {
      const added = this.store.getEntityState(item).added || false;
      return this.isLayer(item) && added === true;
    });
    this.removeLayersFromMap(layers as CatalogItemLayer[]);
  }
}
