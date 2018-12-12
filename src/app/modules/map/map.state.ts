import { Injectable, OnDestroy } from '@angular/core';

import { IgoMap, ProjectionService } from 'src/lib/map';

import {
  createParcelLayer,
  createSchemaElementSurfaceLayer,
  createClientDefaultSelectionStyle
} from 'src/lib/client';

import {
  LayerStore,
  LayerStoreLoadStrategy,
  LayerStoreSelectStrategy
} from 'src/lib/layer';

import { ClientState } from 'src/app/modules/client/client.state';

@Injectable({
  providedIn: 'root'
})
export class MapState implements OnDestroy {

  private clientParcelLayerStore: LayerStore;
  private clientSchemaElementSurfaceLayerStore: LayerStore;

  private clientLayerStoresLoadStrategy: LayerStoreLoadStrategy;
  private clientLayerStoresSelectStrategy: LayerStoreSelectStrategy;

  get map(): IgoMap {
    return this._map;
  }
  private _map: IgoMap;

  constructor(
    private projectionService: ProjectionService,
    private clientState: ClientState
  ) {
    this._map = new IgoMap({
      controls: {
        scaleLine: true,
        attribution: {
          collapsed: false
        }
      }
    });

    this.clientParcelLayerStore = this.createClientParcelLayerStore();
    this.clientSchemaElementSurfaceLayerStore = this.createClientSchemaElementSurfaceLayerStore();
    this.initClientLayerStoresStrategies();
  }

  ngOnDestroy() {
    if (this.clientLayerStoresLoadStrategy !== undefined) {
      this.clientLayerStoresLoadStrategy.deactivate();
    }
    if (this.clientLayerStoresSelectStrategy !== undefined) {
      this.clientLayerStoresSelectStrategy.deactivate();
    }
  }

  private createClientParcelLayerStore() {
    const clientParcelStore = this.clientState.parcelStore;
    const clientParcelLayer = createParcelLayer();
    this.map.addLayer(clientParcelLayer, false);

    return new LayerStore(clientParcelLayer, clientParcelStore);
  }

  private createClientSchemaElementSurfaceLayerStore() {
    const clientSchemaElementSurfaceStore = this.clientState.schemaElementSurfaceStore;
    const clientSchemaElementSurfaceLayer = createSchemaElementSurfaceLayer();
    this.map.addLayer(clientSchemaElementSurfaceLayer, false);

    return new LayerStore(
      clientSchemaElementSurfaceLayer,
      clientSchemaElementSurfaceStore
    );
  }

  private initClientLayerStoresStrategies() {
    this.clientLayerStoresLoadStrategy = new LayerStoreLoadStrategy([
      this.clientParcelLayerStore,
      this.clientSchemaElementSurfaceLayerStore
    ]);
    this.clientLayerStoresLoadStrategy.activate();

    this.clientLayerStoresSelectStrategy = new LayerStoreSelectStrategy([
      this.clientParcelLayerStore,
      this.clientSchemaElementSurfaceLayerStore
    ], {style: createClientDefaultSelectionStyle()});
    this.clientLayerStoresSelectStrategy.activate();
  }
}
