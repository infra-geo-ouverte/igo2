import { Editor } from 'src/lib/edition';
import { EntityStore, EntityTableTemplate } from 'src/lib/entity';
import { Widget } from 'src/lib/widget';

import { Client } from '../../shared/client.interfaces';
import { ClientSchemaFileManagerComponent } from '../../schema-file/client-schema-file-manager/client-schema-file-manager.component';

import { ClientSchema } from './client-schema.interfaces';
import { ClientSchemaCreateFormComponent } from '../client-schema-create-form/client-schema-create-form.component';
import { ClientSchemaUpdateFormComponent } from '../client-schema-update-form/client-schema-update-form.component';
import { ClientSchemaDeleteFormComponent } from '../client-schema-delete-form/client-schema-delete-form.component';
import { ClientSchemaDuplicateFormComponent } from '../client-schema-duplicate-form/client-schema-duplicate-form.component';

export class ClientSchemaEditor extends Editor {

  static tableTemplate: EntityTableTemplate = {
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
        title: 'Description'
      },
      {
        name: 'annee',
        title: 'Année'
      },
      {
        name: 'etat',
        title: 'État'
      },
      {
        name: 'timbreMaj',
        title: 'Date de mise à jour'
      },
      {
        name: 'usagerMaj',
        title: 'Usager mise à jour'
      },
      {
        name: 'nbDocuments',
        title: 'Fichiers joints'
      }
    ]
  };

  // TODO: widgets should class instances
  private widgets: Widget[] = [
    {
      id: 'create',
      icon: 'add',
      title: 'client.schema.create',
      tooltip: 'client.schema.create.tooltip',
      component: ClientSchemaCreateFormComponent,
      isReady: ClientSchemaEditor.clientBoundWidgetIsReady
    },
    {
      id: 'update',
      icon: 'edit',
      title: 'client.schema.update',
      tooltip: 'client.schema.update.tooltip',
      component: ClientSchemaUpdateFormComponent,
      isReady: ClientSchemaEditor.schemaBoundWidgetIsReady
    },
    {
      id: 'delete',
      icon: 'delete',
      title: 'client.schema.delete',
      tooltip: 'client.schema.delete.tooltip',
      component: ClientSchemaDeleteFormComponent,
      isReady: ClientSchemaEditor.schemaBoundWidgetIsReady
    },
    {
      id: 'duplicate',
      icon: 'queue',
      title: 'client.schema.duplicate',
      tooltip: 'client.schema.duplicate.tooltip',
      component: ClientSchemaDuplicateFormComponent,
      isReady: ClientSchemaEditor.schemaBoundWidgetIsReady
    },
    {
      id: 'manageFiles',
      icon: 'attach_file',
      title: 'client.schema.manageFiles',
      tooltip: 'client.schema.manageFiles.tooltip',
      component: ClientSchemaFileManagerComponent,
      isReady: ClientSchemaEditor.schemaBoundWidgetIsReady
    },
    {
      id: 'transfer',
      icon: 'swap_horiz',
      title: 'client.schema.transfer',
      tooltip: 'client.schema.transfer.tooltip',
      isReady: ClientSchemaEditor.schemaBoundWidgetIsReady
    },
    {
      id: 'createMap',
      icon: 'image',
      title: 'client.schema.createMap',
      tooltip: 'client.schema.createMap.tooltip',
      isReady: ClientSchemaEditor.schemaBoundWidgetIsReady
    }
  ];

  private client: Client;

  static schemaBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static clientBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.client !== undefined;
  };

  constructor() {
    super({
      id: 'fadq.client-schema-editor',
      title: 'Schemas du client',
      tableTemplate: ClientSchemaEditor.tableTemplate
    });

    this.bindEntityStore(new EntityStore<ClientSchema>());

    const widgetStore = new EntityStore<Widget>();
    widgetStore.setEntities(this.widgets);
    this.bindWidgetStore(widgetStore);
  }

  setClient(client: Client) {
    this.client = client;
  }

  protected computeWidgetData(): Object {
    return Object.assign(super.computeWidgetData(), {
      schema: this.entity,
      client: this.client
    });
  }

}
