import { Editor } from '../../edition/shared/editor';
import { Entity, EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';

import { ClientSchema } from './client.interface';

export class ClientSchemaEditor extends Editor {

  static tableModel: EntityTableModel = {
    selection: true,
    columns: [
      {
        name: 'id',
        title: 'Numéro de schéma',
        sortable: true
      },
      {
        name: 'type',
        title: 'Type de schéma',
        sortable: true
      },
      {
        name: 'description',
        title: 'Description'
      },
      {
        name: 'annee',
        title: 'Année',
        sortable: true
      },
      {
        name: 'etat',
        title: 'État',
        sortable: true
      }
    ]
  };

  constructor() {
    super({
      id: 'fadq.client-schemas-store',
      title: 'Schemas du client',
      tableModel: ClientSchemaEditor.tableModel
    });
    this.bindDataStore(new EntityStore<Entity<ClientSchema>>());
    this.bindWidgetStore(new EntityStore<Entity<Widget>>());
  }
}
