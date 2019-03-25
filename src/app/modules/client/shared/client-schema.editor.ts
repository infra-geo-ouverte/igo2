import { Inject, Injectable} from '@angular/core';

import { Action, ActionStore, EntityStore, Widget } from '@igo2/common';

import { Editor } from 'src/lib/edition';
import {
  Client,
  ClientSchema,
  ClientSchemaTableService,
  ClientSchemaCreateWidget,
  ClientSchemaUpdateWidget,
  ClientSchemaDeleteWidget,
  ClientSchemaDuplicateWidget,
  ClientSchemaTransferWidget,
  ClientSchemaFileManagerWidget
} from 'src/lib/client';

@Injectable()
export class ClientSchemaEditor extends Editor {

  private client: Client;

  constructor(
    private clientSchemaTableService: ClientSchemaTableService,
    @Inject(ClientSchemaCreateWidget) private clientSchemaCreateWidget: Widget,
    @Inject(ClientSchemaUpdateWidget) private clientSchemaUpdateWidget: Widget,
    @Inject(ClientSchemaDeleteWidget) private clientSchemaDeleteWidget: Widget,
    @Inject(ClientSchemaDuplicateWidget) private clientSchemaDuplicateWidget: Widget,
    @Inject(ClientSchemaTransferWidget) private clientSchemaTransferWidget: Widget,
    @Inject(ClientSchemaFileManagerWidget) private clientSchemaFileManagerWidget: Widget,
  ) {
    super({
      id: 'fadq.client-schema-editor',
      title: 'Schémas du client',
      tableTemplate: clientSchemaTableService.buildTable(),
      entityStore: new EntityStore<ClientSchema>([]),
      actionStore: new ActionStore([])
    });

    this.actionStore.load(this.buildActions());
  }

  setClient(client: Client) {
    this.client = client;
  }

  private buildActions(): Action[] {
    const clientIsDefined = () => this.client !== undefined;
    const schemaIsDefined = () => this.entity !== undefined;

    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schema.create',
        tooltip: 'client.schema.create.tooltip',
        handler: () => this.activateWidget(this.clientSchemaCreateWidget, {
          schema: this.entity,
          client: this.client,
          store: this.entityStore
        }),
        conditions: [clientIsDefined]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schema.update',
        tooltip: 'client.schema.update.tooltip',
        handler: () => this.activateWidget(this.clientSchemaUpdateWidget, {
          schema: this.entity,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schema.delete',
        tooltip: 'client.schema.delete.tooltip',
        handler: () => this.activateWidget(this.clientSchemaDeleteWidget, {
          schema: this.entity,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined]
      },
      {
        id: 'duplicate',
        icon: 'queue',
        title: 'client.schema.duplicate',
        tooltip: 'client.schema.duplicate.tooltip',
        handler: () => this.activateWidget(this.clientSchemaDuplicateWidget, {
          schema: this.entity,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined]
      },
      {
        id: 'manageFiles',
        icon: 'attach_file',
        title: 'client.schema.manageFiles',
        tooltip: 'client.schema.manageFiles.tooltip',
        handler: () => this.activateWidget(this.clientSchemaFileManagerWidget, {
          schema: this.entity
        }),
        conditions: [schemaIsDefined]
      },
      {
        id: 'transfer',
        icon: 'swap_horiz',
        title: 'client.schema.transfer',
        tooltip: 'client.schema.transfer.tooltip',
        handler: () => this.activateWidget(this.clientSchemaTransferWidget, {
          schema: this.entity,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined]
      },
      {
        id: 'createMap',
        icon: 'image',
        title: 'client.schema.createMap',
        tooltip: 'client.schema.createMap.tooltip',
        handler: () => {},
        conditions: [schemaIsDefined]
      }
    ];
  }

}
