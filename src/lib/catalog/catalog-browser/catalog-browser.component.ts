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

import { IgoMap } from 'src/lib/map';
import { EntityStore, EntityStoreController } from 'src/lib/entity';

import {
  CatalogItem,
  CatalogItemLayer,
  CatalogItemGroup,
  CatalogItemState,
  CatalogItemType
} from '../shared';

/**
 * Component to browse a catalog's groups and layers and display them on a map.
 */
@Component({
  selector: 'fadq-catalog-browser',
  templateUrl: './catalog-browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserComponent implements OnInit, OnDestroy {

  /**
   * Catalog items store controller
   */
  private controller: EntityStoreController<CatalogItem>;

  /**
   * Store holding the catalog's items
   */
  @Input() store: EntityStore<CatalogItem, CatalogItemState>;

  /**
   * Map to add the catalog items to
   */
  @Input() map: IgoMap;

  constructor(
    private layerService: LayerService,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * @internal
   */
  ngOnInit() {
    const currentItems = this.map.layers.map((layer: Layer) => {
      return {
        id: layer.id,
        title: layer.title,
        type: CatalogItemType.Layer
      };
    });
    this.store.state.setMany(currentItems, {added: true});
    this.controller = new EntityStoreController(this.store, this.cdRef);
  }

  ngOnDestroy() {
    this.controller.destroy();
  }

  /**
   * @internal
   */
  isGroup(item: CatalogItem): boolean {
    return item.type === CatalogItemType.Group;
  }

  /**
   * @internal
   */
  isLayer(item: CatalogItem): boolean {
    return item.type === CatalogItemType.Layer;
  }

  /**
   * When a layer is added or removed, add or remove it from the map
   * @internal
   * @param event Layer added event
   */
  onLayerAddedChange(event: {added: boolean, layer: CatalogItemLayer}) {
    const layer = event.layer;
    this.store.state.update(layer, {added: event.added}, false);
    event.added ? this.addLayerToMap(layer) : this.removeLayerFromMap(layer);
  }

  /**
   * When a froup is added or removed, add or remove it from the map
   * @internal
   * @param event Group added event
   */
  onGroupAddedChange(event: {added: boolean, group: CatalogItemGroup}) {
    const group = event.group;
    this.store.state.update(group, {added: event.added}, false);
    event.added ? this.addGroupToMap(group) : this.removeGroupFromMap(group);
  }

  /**
   * Add layer to map
   * @param layer Catalog layer
   */
  private addLayerToMap(layer: CatalogItemLayer) {
    this.addLayersToMap([layer]);
  }

  /**
   * Remove layer from map
   * @param layer Catalog layer
   */
  private removeLayerFromMap(layer: CatalogItemLayer) {
    this.removeLayersFromMap([layer]);
  }

  /**
   * Add multiple layers to map
   * @param layers Catalog layers
   */
  private addLayersToMap(layers: CatalogItemLayer[]) {
    const layers$ = layers.map((layer: CatalogItemLayer) => {
      return this.layerService.createAsyncLayer(layer.options);
    });

    zip(...layers$).subscribe((oLayers: Layer[]) => {
      this.store.state.updateMany(layers, {added: true});
      this.map.addLayers(oLayers);
    });
  }

  /**
   * Remove multiple layers from map
   * @param layers Catalog layers
   */
  private removeLayersFromMap(layers: CatalogItemLayer[]) {
    layers.forEach((layer: CatalogItemLayer) => {
      this.store.state.update(layer, {added: false});
      const oLayer = this.map.getLayerById(layer.id);
      if (oLayer !== undefined) {
        this.map.removeLayer(oLayer);
      }
    });
  }

  /**
   * Add all the layers of a group to map
   * @param group Catalog group
   */
  private addGroupToMap(group: CatalogItemGroup) {
    const layers = group.items.filter((item: CatalogItem) => {
      const added = this.store.state.get(item).added || false;
      return this.isLayer(item) && added === false;
    });
    this.addLayersToMap(layers as CatalogItemLayer[]);
  }

  /**
   * Remove all the layers of a groufrom map
   * @param group Catalog group
   */
  private removeGroupFromMap(group: CatalogItemGroup) {
    const layers = group.items.filter((item: CatalogItem) => {
      const added = this.store.state.get(item).added || false;
      return this.isLayer(item) && added === true;
    });
    this.removeLayersFromMap(layers as CatalogItemLayer[]);
  }
}
