import { Injectable, OnDestroy } from '@angular/core';

import { IgoMap, ProjectionService } from 'src/lib/map';

import {
  createParcelLayer,
  createSchemaElementLayer,
  createClientDefaultSelectionStyle
} from 'src/lib/client';

import {
  FeatureStoreStrategy,
  FeatureStoreLoadingStrategy,
  FeatureStoreSelectionStrategy
} from 'src/lib/feature';

import { ClientState } from 'src/app/modules/client/client.state';

/**
 * Service that holds the state of the map module
 */
@Injectable({
  providedIn: 'root'
})
export class MapState implements OnDestroy {

  /**
   * Active map
   */
  get map(): IgoMap { return this._map; }
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
    this.clientState.schemaElementEditor.setMap(this._map);
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.clientState.parcelStore.strategies
      .forEach((strategy: FeatureStoreStrategy) => strategy.deactivate());
    this.clientState.schemaElementStore.strategies
      .forEach((strategy: FeatureStoreStrategy) => strategy.deactivate());
  }

  /**
   * Add all kinds of layers related to a client;
   * parcels, schema points, schema lines, schema surfaces.
   * Also bind them to a feature store and initialize the loading and selection strategies.
   */
  private addClientLayers() {
    // TODO: Clean this up
    const clientParcelLayer = createParcelLayer();
    this.map.addLayer(clientParcelLayer, false);
    this.clientState.parcelStore.bindLayer(clientParcelLayer);

    const clientSchemaElementLayer = createSchemaElementLayer();
    this.map.addLayer(clientSchemaElementLayer, false);
    this.clientState.schemaElementStore.bindLayer(clientSchemaElementLayer);

    const parcelLoadingStrategy = new FeatureStoreLoadingStrategy();
    this.clientState.parcelStore.addStrategy(parcelLoadingStrategy);

    const schemaElementLoadingStrategy = new FeatureStoreLoadingStrategy();
    this.clientState.schemaElementStore.addStrategy(schemaElementLoadingStrategy);
    schemaElementLoadingStrategy.activate();

    const sharedSelectionStrategy = new FeatureStoreSelectionStrategy({
      map: this.map,
      style: createClientDefaultSelectionStyle()
    });
    this.clientState.parcelStore.addStrategy(sharedSelectionStrategy);
    this.clientState.schemaElementStore.addStrategy(sharedSelectionStrategy);

    parcelLoadingStrategy.activate();
    schemaElementLoadingStrategy.activate();
    sharedSelectionStrategy.activate();
  }
}
