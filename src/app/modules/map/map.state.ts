import { Injectable, OnDestroy } from '@angular/core';

import { IgoMap, ProjectionService } from 'src/lib/map';

import {
  createParcelLayer,
  createSchemaElementSurfaceLayer,
  createClientDefaultSelectionStyle
} from 'src/lib/client';

import {
  FeatureStoreStrategy,
  FeatureStoreLoadingStrategy,
  FeatureStoreSelectionStrategy
} from 'src/lib/feature';

import { ClientState } from 'src/app/modules/client/client.state';

@Injectable({
  providedIn: 'root'
})
export class MapState implements OnDestroy {

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

    this.addClientLayers();
    this.clientState.schemaElementSurfaceEditor.setMap(this._map);
  }

  ngOnDestroy() {
    this.clientState.parcelStore.strategies
      .forEach((strategy: FeatureStoreStrategy) => strategy.deactivate());
    this.clientState.schemaElementSurfaceStore.strategies
      .forEach((strategy: FeatureStoreStrategy) => strategy.deactivate());
  }

  private addClientLayers() {
    const clientParcelLayer = createParcelLayer();
    this.map.addLayer(clientParcelLayer, false);

    const clientSchemaElementSurfaceLayer = createSchemaElementSurfaceLayer();
    this.map.addLayer(clientSchemaElementSurfaceLayer, false);

    const selectionStrategy = new FeatureStoreSelectionStrategy({
      map: this.map,
      style: createClientDefaultSelectionStyle()
    });

    const parcelLoadingStrategy = new FeatureStoreLoadingStrategy();
    this.clientState.parcelStore
      .bindLayer(clientParcelLayer)
      .addStrategy(parcelLoadingStrategy)
      .addStrategy(selectionStrategy);

    const schemaElementLoadingStrategy = new FeatureStoreLoadingStrategy();
    this.clientState.schemaElementSurfaceStore
      .bindLayer(clientSchemaElementSurfaceLayer)
      .addStrategy(schemaElementLoadingStrategy)
      .addStrategy(selectionStrategy);

    parcelLoadingStrategy.activate();
    schemaElementLoadingStrategy.activate();
    selectionStrategy.activate();
  }
}
