import { Editor } from '../../edition/shared/editor';
import { EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';

import { ClientParcel } from './client.interface';

export class ClientParcelEditor extends Editor {

  static tableModel: EntityTableModel = {
    selection: true,
    columns: [
      {
        name: 'properties.diagramme',
        title: 'Diagramme',
        sortable: true
      },
      {
        name: 'properties.id',
        title: 'Numéro de parcelle',
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
