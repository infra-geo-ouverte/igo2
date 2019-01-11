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
import {
  EntityStore,
  EntityStoreController,
  getEntityId
} from 'src/lib/entity';

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
  private controller: EntityStoreController;

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
  ) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  /**
   * @internal
   */
  ngOnInit() {
    const currentLayerIds = this.map.layers.map((layer: Layer) => layer.id);
    this.store.state.setByKeys(currentLayerIds, {added: true});
    this.controller.bindStore(this.store);
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.controller.unbindStore();
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
    this.controller.updateEntityState(layer, {added: event.added}, false);
    event.added ? this.addLayerToMap(layer) : this.removeLayerFromMap(layer);
  }

  /**
   * When a froup is added or removed, add or remove it from the map
   * @internal
   * @param event Group added event
   */
  onGroupAddedChange(event: {added: boolean, group: CatalogItemGroup}) {
    const group = event.group;
    this.controller.updateEntityState(group, {added: event.added}, false);
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
      this.controller.updateEntitiesState(layers, {added: true});
      this.map.addLayers(oLayers);
    });
  }

  /**
   * Remove multiple layers from map
   * @param layers Catalog layers
   */
  private removeLayersFromMap(layers: CatalogItemLayer[]) {
    layers.forEach((layer: CatalogItemLayer) => {
      this.controller.updateEntityState(layer, {added: false});
      const oLayer = this.map.getLayerById(getEntityId(layer));
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
      const added = this.store.getEntityState(item).added || false;
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
      const added = this.store.getEntityState(item).added || false;
      return this.isLayer(item) && added === true;
    });
    this.removeLayersFromMap(layers as CatalogItemLayer[]);
  }
}
