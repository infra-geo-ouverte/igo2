import { Editor } from '../../edition/shared/editor';
import { EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';

import { ClientSchema } from './client.interface';
import { MAP_DEFAULT_WIDGETS } from '../../map';

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

  static widgets: Widget[] = MAP_DEFAULT_WIDGETS;

  constructor() {
    super({
      id: 'fadq.client-schemas-store',
      title: 'Schemas du client',
      tableModel: ClientSchemaEditor.tableModel
    });

    const dataStore = new EntityStore<ClientSchema>();
    this.bindDataStore(dataStore);

    const widgetStore = new EntityStore<Widget>();
    widgetStore.setEntities(ClientSchemaEditor.widgets);
    this.bindWidgetStore(widgetStore);
  }
}
