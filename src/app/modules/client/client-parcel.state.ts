import { Injectable} from '@angular/core';

import {
  Action,
  ActionStore,
  Editor,
  EntityStore,
  EntityTableColumn
} from '@igo2/common';
import { FeatureStore } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import {
  Client,
  ClientParcel,
  ClientParcelDiagram,
  ClientParcelYear,
  ClientParcelYearService,
  ClientParcelTableService
} from 'src/lib/client';
import { entitiesToRowData, exportToCSV } from 'src/lib/utils/export';

@Injectable({
  providedIn: 'root'
})
export class ClientParcelState {

  editor: Editor;

  private client: Client;

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
      entityStore: new FeatureStore<ClientParcel>([], {
        getKey: (entity: ClientParcel) => entity.properties.id,
        map: mapState.map
      }),
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
