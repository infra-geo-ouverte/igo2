import { Injectable, OnDestroy } from '@angular/core';

import { IgoMap, ProjectionService } from 'src/lib/map';

import {
  createParcelLayer,
  createParcelLayerSelectionStyle
} from 'src/lib/client/parcel/shared/client-parcel.utils';
import {
  createSchemaElementSurfaceLayer,
  createSchemaElementSurfaceLayerSelectionStyle,
} from 'src/lib/client/schema-element/shared/client-schema-element-surface.utils';

import {
  FeatureStrategy,
  FeatureLoadStrategy,
  FeatureSelectStrategy
} from 'src/lib/feature';

import { ClientState } from 'src/app/modules/client/client.state';

@Injectable({
  providedIn: 'root'
})
export class MapState implements OnDestroy {

  private clientParcelStrategies: {
    load: FeatureLoadStrategy;
    select: FeatureSelectStrategy;
  };

  private clientSchemaElementSurfaceStrategies: {
    load: FeatureLoadStrategy;
    select: FeatureSelectStrategy;
  };

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

    this.addClientSchemaElementSurfaceLayer();
    this.addClientParcelLayer();
  }

  ngOnDestroy() {
    Object.values(this.clientParcelStrategies).forEach((strategy: FeatureStrategy) => {
      strategy.deactivate();
    });

    Object.values(this.clientSchemaElementSurfaceStrategies).forEach((strategy: FeatureStrategy) => {
      strategy.deactivate();
    });
  }

  private addClientParcelLayer() {
    const clientParcelLayer = createParcelLayer();
    this.map.addLayer(clientParcelLayer, false);

    const clientParcelStore = this.clientState.parcelStore;
    const loadStrategy = new FeatureLoadStrategy(
      clientParcelLayer,
      clientParcelStore
    );
    loadStrategy.activate();

    const selectStrategyOptions = {
      style: createParcelLayerSelectionStyle()
    };
    const selectStrategy = new FeatureSelectStrategy(
      clientParcelLayer,
      clientParcelStore, selectStrategyOptions
    );
    selectStrategy.activate();

    this.clientParcelStrategies = {
      load: loadStrategy,
      select: selectStrategy
    };
  }

  private addClientSchemaElementSurfaceLayer() {
    const clientSchemaElementSurfaceLayer = createSchemaElementSurfaceLayer();
    this.map.addLayer(clientSchemaElementSurfaceLayer, false);

    const clientSchemaElementSurfaceStore = this.clientState.schemaElementSurfaceStore;
    const loadStrategy = new FeatureLoadStrategy(
      clientSchemaElementSurfaceLayer,
      clientSchemaElementSurfaceStore
    );
    loadStrategy.activate();

    const selectStrategyOptions = {
      style: createSchemaElementSurfaceLayerSelectionStyle()
    };
    const selectStrategy = new FeatureSelectStrategy(
      clientSchemaElementSurfaceLayer,
      clientSchemaElementSurfaceStore, selectStrategyOptions
    );
    selectStrategy.activate();

    this.clientSchemaElementSurfaceStrategies = {
      load: loadStrategy,
      select: selectStrategy
    };
  }
}
