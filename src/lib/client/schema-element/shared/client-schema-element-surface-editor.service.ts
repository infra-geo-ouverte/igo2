import { Inject, Injectable } from '@angular/core';

import { Action } from 'src/lib/action';
import { Editor } from 'src/lib/edition';
import { EntityStore, EntityTransaction } from 'src/lib/entity';
import { FeatureStore } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { Widget } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface, AnyClientSchemaElement } from './client-schema-element.interfaces';
import { ClientSchemaElementTableService } from './client-schema-element-table.service';
import {
  ClientSchemaElementSaverWidget,
  ClientSchemaElementSurfaceCreateWidget,
  ClientSchemaElementSurfaceUpdateWidget,
  ClientSchemaElementSurfaceSliceWidget
} from './client-schema-element.widgets';
import { generateOperationTitle } from './client-schema-element.utils';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementSurfaceEditorService extends Editor {

  private map: IgoMap;
  private schema: ClientSchema;
  private transaction: EntityTransaction;

  constructor(
    private clientSchemaElementTableService: ClientSchemaElementTableService,
    @Inject(ClientSchemaElementSaverWidget) private clientSchemaElementSaverWidget: Widget,
    @Inject(ClientSchemaElementSurfaceCreateWidget) private clientSchemaElementSurfaceCreateWidget: Widget,
    @Inject(ClientSchemaElementSurfaceUpdateWidget) private clientSchemaElementSurfaceUpdateWidget: Widget,
    @Inject(ClientSchemaElementSurfaceSliceWidget) private clientSchemaElementSurfaceSliceWidget: Widget
  ) {
    super({
      id: 'fadq.client-schema-element-surface-editor',
      title: 'Surfaces du schéma',
      tableTemplate: clientSchemaElementTableService.buildSurfaceTable(),
      entityStore: new FeatureStore<ClientSchemaElementSurface>(),
      actionStore: new EntityStore<Action>()
    });

    this.actionStore.setEntities(this.buildActions());
  }

  setMap(map: IgoMap) {
    this.map = map;
  }

  setSchema(schema: ClientSchema) {
    this.schema = schema;
  }

  setTransaction(transaction: EntityTransaction) {
    this.transaction = transaction;
  }

  private buildActions(): Array<Action> {
    const schemaIsDefined = () => this.schema !== undefined;
    const elementIsDefined = () => this.entity !== undefined;
    const transactionIsNotEmpty = () => {
      return this.transaction !== undefined && this.transaction.empty === false;
    };
    const transactionIsNotInCommitPhase = () => {
      return this.transaction !== undefined && this.transaction.isInCommitPhase === false;
    };

    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schemaElement.create',
        tooltip: 'client.schemaElement.create.tooltip',
        handler: () => this.activateWidget(this.clientSchemaElementSurfaceCreateWidget, {
          schema: this.schema,
          map: this.map,
          transaction: this.transaction,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schemaElement.update',
        tooltip: 'client.schemaElement.update.tooltip',
        handler: () => this.activateWidget(this.clientSchemaElementSurfaceUpdateWidget, {
          schema: this.schema,
          map: this.map,
          element: this.entity,
          transaction: this.transaction,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined, elementIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schemaElement.delete',
        tooltip: 'client.schemaElement.delete.tooltip',
        handler: () => {
          const element = this.entity as AnyClientSchemaElement;
          this.transaction.delete(element, this.entityStore, {
            title: generateOperationTitle(element)
          });
        },
        conditions: [schemaIsDefined, elementIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'save',
        icon: 'save',
        title: 'client.schemaElement.save',
        tooltip: 'client.schemaElement.save.tooltip',
        handler: () => this.activateWidget(this.clientSchemaElementSaverWidget, {
          schema: this.schema,
          transaction: this.transaction
        }),
        conditions: [schemaIsDefined, transactionIsNotEmpty, transactionIsNotInCommitPhase]
      },
      {
        id: 'slice',
        icon: 'flip',
        title: 'client.schemaElement.slice',
        tooltip: 'client.schemaElement.slice.tooltip',
        handler: () => this.activateWidget(this.clientSchemaElementSurfaceSliceWidget, {
          schema: this.schema,
          map: this.map,
          element: this.entity,
          transaction: this.transaction,
          store: this.entityStore
        }),
        conditions: [schemaIsDefined, elementIsDefined, transactionIsNotInCommitPhase]
      },
    ];
  }

}
