import { Editor } from 'src/app/modules/edition';
import { EntityStore, EntityTableModel } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { ClientSchema } from './client.interface';
import { ClientSchemaFormComponent } from '../client-schema-form/client-schema-form.component';

export class ClientSchemaEditor extends Editor {

  static tableModel: EntityTableModel = {
    selection: true,
    sort: true,
    columns: [
      {
        name: 'id',
        title: 'Numéro de schéma'
      },
      {
        name: 'type',
        title: 'Type de schéma'
      },
      {
        name: 'description',
        title: 'Description',
        sort: false
      },
      {
        name: 'annee',
        title: 'Année'
      },
      {
        name: 'etat',
        title: 'État'
      }
    ]
  };

  private widgets: Widget[] = [
    {
      id: 'create',
      icon: 'add',
      title: 'client.schema.create',
      tooltip: 'client.schema.create.tooltip',
      component: ClientSchemaFormComponent,
      subscribers: {
        complete: () => {
          this.handleWidgetComplete();
        }
      }
    },
    {
      id: 'delete',
      icon: 'delete',
      title: 'client.schema.delete',
      tooltip: 'client.schema.delete.tooltip'
    },
    {
      id: 'duplicate',
      icon: 'queue',
      title: 'client.schema.duplicate',
      tooltip: 'client.schema.duplicate.tooltip'
    },
    {
      id: 'manageFiles',
      icon: 'attach_file',
      title: 'client.schema.manageFiles',
      tooltip: 'client.schema.manageFiles.tooltip'
    },
    {
      id: 'transfer',
      icon: 'swap_horiz',
      title: 'client.schema.transfer',
      tooltip: 'client.schema.transfer.tooltip'
    },
    {
      id: 'createMap',
      icon: 'image',
      title: 'client.schema.createMap',
      tooltip: 'client.schema.createMap.tooltip'
    }
  ];

  constructor() {
    super({
      id: 'fadq.client-schema-editor',
      title: 'Schemas du client',
      tableModel: ClientSchemaEditor.tableModel
    });

    this.bindEntityStore(new EntityStore<ClientSchema>());
    this.bindWidgetStore(new EntityStore<Widget>());
  }

  init() {
    super.init();
    this.initWidgets();
  }

  getComponentData(): Object {
    return Object.assign({}, {schema: this.entity});
  }

  private initWidgets() {
    // TODO: handle initial state.
    // Some widgets should be disabled if no schema is selected
    this.widgetStore.setEntities(this.widgets);
  }

  private handleWidgetComplete() {
    this.widget$.next(undefined);
  }
}
