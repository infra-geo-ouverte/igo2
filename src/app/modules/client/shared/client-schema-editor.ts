import { Editor } from '../../edition/shared/editor';
import { EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';

import { ClientSchema } from './client.interface';
import { ClientSchemaFormComponent } from '../client-schema-form/client-schema-form.component';

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
      id: 'fadq.client-schemas-store',
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
