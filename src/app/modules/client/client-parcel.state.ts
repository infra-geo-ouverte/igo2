import { Injectable} from '@angular/core';

import {
  Action,
  ActionStore,
  Editor,
  EntityStore,
  EntityTableColumn
} from '@igo2/common';
import {
  FeatureStore,
  FeatureStoreLoadingStrategy,
  FeatureStoreSelectionStrategy,
  FeatureDataSource,
  IgoMap,
  VectorLayer,
  entitiesToRowData,
  exportToCSV
} from '@igo2/geo';
import { MapState } from '@igo2/integration';

import {
  Client,
  ClientParcel,
  ClientParcelDiagram,
  ClientParcelYear,
  ClientParcelYearService,
  ClientParcelTableService,
  createParcelLayer,
  createClientDefaultSelectionStyle
} from 'src/lib/client';

@Injectable({
  providedIn: 'root'
})
export class ClientParcelState {

  editor: Editor;

  private client: Client;

  get map(): IgoMap { return this.mapState.map; }

  get parcelStore(): FeatureStore<ClientParcel> {
    return this.editor.entityStore as FeatureStore<ClientParcel>;
  }

  /** Store that holds the diagrams of the active client */
  get diagramStore(): EntityStore<ClientParcelDiagram> { return this._diagramStore; }
  private _diagramStore: EntityStore<ClientParcelDiagram>;

  /** Store that holds all the "parcel years". This is not on a per client basis. */
  get parcelYearStore(): EntityStore<ClientParcelYear> { return this._parcelYearStore; }
  private _parcelYearStore: EntityStore<ClientParcelYear>;

  constructor(
    private mapState: MapState,
    private clientParcelTableService: ClientParcelTableService,
    private clientParcelYearService: ClientParcelYearService
  ) {
    this.editor = new Editor({
      id: 'fadq.client-parcel-editor',
      title: 'Parcelles du client',
      tableTemplate: clientParcelTableService.buildTable(),
      entityStore: this.createStore(),
      actionStore: new ActionStore([])
    });
    this.editor.actionStore.load(this.buildActions());

    this._diagramStore = new EntityStore<ClientParcelDiagram>([]);
    this._parcelYearStore = new EntityStore<ClientParcelYear>([]);

    this.loadParcelYears();
  }

  setClient(client: Client | undefined) {
    this.client = client;

    if (client !== undefined) {
      this.addLayer();
      this.diagramStore.load(client.diagrams);
      this.diagramStore.view.sort({
        valueAccessor: (diagram: ClientParcelDiagram) => diagram.id,
        direction: 'asc'
      });

      this.parcelStore.load(client.parcels);
      this.parcelStore.view.sort({
        valueAccessor: (parcel: ClientParcel) => parcel.properties.noParcelleAgricole,
        direction: 'asc'
      });
    } else {
      this.removeLayer();
      this.diagramStore.clear();
      this.parcelStore.clear();
      this.editor.deactivate();
    }
  }

  setDiagram(diagram: ClientParcelDiagram) {
    this.parcelStore.state.clear();
    if (diagram === undefined) {
      this.parcelStore.view.filter(undefined);
    } else {
      const filterClause = function(parcel: ClientParcel): boolean {
        return parcel.properties.noDiagramme === diagram.id;
      };
      this.parcelStore.view.filter(filterClause);
    }
  }

  private addLayer() {
    if (this.parcelStore.layer.map === undefined) {
      this.parcelStore.activateStrategyOfType(FeatureStoreLoadingStrategy);
      this.parcelStore.activateStrategyOfType(FeatureStoreSelectionStrategy);
      this.map.addLayer(this.parcelStore.layer);
    }
  }

  private removeLayer() {
    if (this.parcelStore.layer.map !== undefined) {
      this.parcelStore.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
      this.parcelStore.deactivateStrategyOfType(FeatureStoreSelectionStrategy);
      this.map.removeLayer(this.parcelStore.layer);
    }
  }

  private createStore(): FeatureStore<ClientParcel> {
    const store = new FeatureStore<ClientParcel>([], {
      getKey: (entity: ClientParcel) => entity.properties.id,
      map: this.map
    });

    const layer = createParcelLayer();
    store.bindLayer(layer);

    const viewScale: [number, number, number, number] = [0, 0, 0.8, 0.6];
    const loadingStrategy = new FeatureStoreLoadingStrategy({
      viewScale
    });
    store.addStrategy(loadingStrategy, true);

    const selectionStrategy = new FeatureStoreSelectionStrategy({
      map: this.map,
      layer: new VectorLayer({
        title: 'Parcelles sélectionnées',
        zIndex: 102,
        source: new FeatureDataSource(),
        style: createClientDefaultSelectionStyle(),
        showInLayerList: true,
        removable: false,
        browsable: false
      }),
      many: true,
      viewScale,
      areaRatio: 0.004
    });
    store.addStrategy(selectionStrategy, true);

    return store;
  }

  private buildActions(): Action[] {
    return [
      {
        id: 'export',
        icon: 'file_download',
        title: 'client.parcel.exportToCSV',
        tooltip: 'client.parcel.exportToCSV.tooltip',
        handler: () => {
          const columns = this.editor.tableTemplate.columns;
          const headers = columns.map((column: EntityTableColumn) => column.title);
          const rows = entitiesToRowData(this.parcelStore.view.all(), columns);

          const fileName = `Parcelles du client ${this.client.info.numero}.csv`;
          exportToCSV([headers].concat(rows), fileName, ';');
        }
      }
    ];
  }

  /**
   * Load the parcel years
   */
  private loadParcelYears() {
    this.clientParcelYearService.getParcelYears()
      .subscribe((parcelYears: ClientParcelYear[]) => {
        const current = parcelYears.find((parcelYear: ClientParcelYear) => {
          return parcelYear.current === true;
        });
        this.parcelYearStore.load(parcelYears);
        this.parcelYearStore.view.sort({
          valueAccessor: (year: ClientParcelYear) => year.annee,
          direction: 'desc'
        });
        if (current !== undefined) {
          this.parcelYearStore.state.update(current, {selected: true});
        }
      });
  }
}
