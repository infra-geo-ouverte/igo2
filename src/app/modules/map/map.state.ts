import { Injectable, OnDestroy } from '@angular/core';

import { IgoMap, ProjectionService } from 'src/lib/map';

import {
  createParcelLayer,
  createSchemaElementPointLayer,
  createSchemaElementLineLayer,
  createSchemaElementSurfaceLayer,
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
    this.clientState.schemaElementPointEditor.setMap(this._map);
    this.clientState.schemaElementLineEditor.setMap(this._map);
    this.clientState.schemaElementSurfaceEditor.setMap(this._map);
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.clientState.parcelStore.strategies
      .forEach((strategy: FeatureStoreStrategy) => strategy.deactivate());
    this.clientState.schemaElementSurfaceStore.strategies
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

    const clientSchemaElementPointLayer = createSchemaElementPointLayer();
    this.map.addLayer(clientSchemaElementPointLayer, false);
    this.clientState.schemaElementPointStore.bindLayer(clientSchemaElementPointLayer);

    const clientSchemaElementLineLayer = createSchemaElementLineLayer();
    this.map.addLayer(clientSchemaElementLineLayer, false);
    this.clientState.schemaElementLineStore.bindLayer(clientSchemaElementLineLayer);

    const clientSchemaElementSurfaceLayer = createSchemaElementSurfaceLayer();
    this.map.addLayer(clientSchemaElementSurfaceLayer, false);
    this.clientState.schemaElementSurfaceStore.bindLayer(clientSchemaElementSurfaceLayer);

    const parcelLoadingStrategy = new FeatureStoreLoadingStrategy();
    this.clientState.parcelStore.addStrategy(parcelLoadingStrategy);

    const schemaElementLoadingStrategy = new FeatureStoreLoadingStrategy();
    this.clientState.schemaElementPointStore.addStrategy(schemaElementLoadingStrategy);
    this.clientState.schemaElementLineStore.addStrategy(schemaElementLoadingStrategy);
    this.clientState.schemaElementSurfaceStore.addStrategy(schemaElementLoadingStrategy);
    schemaElementLoadingStrategy.activate();

    const sharedSelectionStrategy = new FeatureStoreSelectionStrategy({
      map: this.map,
      style: createClientDefaultSelectionStyle()
    });
    this.clientState.parcelStore.addStrategy(sharedSelectionStrategy);
    this.clientState.schemaElementPointStore.addStrategy(sharedSelectionStrategy);
    this.clientState.schemaElementLineStore.addStrategy(sharedSelectionStrategy);
    this.clientState.schemaElementSurfaceStore.addStrategy(sharedSelectionStrategy);

    parcelLoadingStrategy.activate();
    schemaElementLoadingStrategy.activate();
    sharedSelectionStrategy.activate();
  }
}
