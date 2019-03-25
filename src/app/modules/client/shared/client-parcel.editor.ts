import { Injectable} from '@angular/core';

import { Action, ActionStore, EntityTableColumn, getEntityProperty } from '@igo2/common';
import { FeatureStore } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { Editor } from 'src/lib/edition';
import { Client, ClientParcel, ClientParcelTableService } from 'src/lib/client';
import { exportToCSV } from 'src/lib/utils/export';

@Injectable()
export class ClientParcelEditor extends Editor {

  private client: Client;

  constructor(
    private mapState: MapState,
    private clientParcelTableService: ClientParcelTableService
  ) {
    super({
      id: 'fadq.client-parcel-editor',
      title: 'Parcelles du client',
      tableTemplate: clientParcelTableService.buildTable(),
      entityStore: new FeatureStore<ClientParcel>([], {
        getKey: (entity: ClientParcel) => entity.properties.id,
        map: mapState.map
      }),
      actionStore: new ActionStore([])
    });

    this.actionStore.load(this.buildActions());
  }

  setClient(client: Client) {
    this.client = client;
  }

  private buildActions(): Action[] {
    return [
      {
        id: 'export',
        icon: 'move_to_inbox',
        title: 'client.parcel.exportToCSV',
        tooltip: 'client.parcel.exportToCSV.tooltip',
        handler: () => {
          const columns = this.tableTemplate.columns;
          const headers = columns.map((column: EntityTableColumn) => column.title);
          const rows = this.entityStore.view.all().map((parcel: ClientParcel) => {
            return columns.map((column: EntityTableColumn) => {
              return getEntityProperty(parcel, column.name);
            });
          });

          const fileName = `Parcelles du client ${this.client.info.numero}.csv`;
          exportToCSV([headers].concat(rows), fileName, ';');
        }
      }
    ];
  }
}
