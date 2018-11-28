import { Editor } from 'src/app/modules/edition';
import { EntityStore, EntityTableModel } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { ClientParcel } from './client.interface';

export class ClientParcelEditor extends Editor {

  static tableModel: EntityTableModel = {
    selection: true,
    columns: [
      {
        name: 'properties.noParcelleAgricole',
        title: 'Numéro de parcelle',
        sortable: true
      },
      {
        name: 'properties.noDiagramme',
        title: 'Numéro de diagramme',
        sortable: true
      },
      {
        name: 'properties.codeProduction',
        title: 'Code de production',
        sortable: true
      }
    ]
  };

  constructor() {
    super({
      id: 'fadq.client-parcels-store',
      title: 'Parcelles du client',
      tableModel: ClientParcelEditor.tableModel
    });

    this.bindEntityStore(new EntityStore<ClientParcel>());
    this.bindWidgetStore(new EntityStore<Widget>());
  }
}
