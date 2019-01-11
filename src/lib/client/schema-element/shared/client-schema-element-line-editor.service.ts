import { Inject, Injectable } from '@angular/core';

import { Action } from 'src/lib/action';
import { Editor } from 'src/lib/edition';
import { EntityStore, EntityTransaction } from 'src/lib/entity';
import { FeatureStore } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { Widget } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementLine, AnyClientSchemaElement } from './client-schema-element.interfaces';
import { ClientSchemaElementTableService } from './client-schema-element-table.service';
import {
  ClientSchemaElementSaverWidget,
  ClientSchemaElementSurfaceCreateWidget,
  ClientSchemaElementSurfaceUpdateWidget
} from './client-schema-element.widgets';
import { generateOperationTitle } from './client-schema-element.utils';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementLineEditorService extends Editor {

  private map: IgoMap;
  private schema: ClientSchema;
  private transaction: EntityTransaction;

  static schemaIsDefined = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static elementIsDefined = function(data: { [key: string]: any}) {
    return data.element !== undefined;
  };

  constructor(
    private clientSchemaElementTableService: ClientSchemaElementTableService,
    @Inject(ClientSchemaElementSaverWidget) private clientSchemaElementSaverWidget: Widget,
    @Inject(ClientSchemaElementSurfaceCreateWidget) private clientSchemaElementSurfaceCreateWidget: Widget,
    @Inject(ClientSchemaElementSurfaceUpdateWidget) private clientSchemaElementSurfaceUpdateWidget: Widget
  ) {
    super({
      id: 'fadq.client-schema-element-line-editor',
      title: 'Lignes du schéma',
      tableTemplate: clientSchemaElementTableService.buildSurfaceTable(),
      entityStore: new FeatureStore<ClientSchemaElementLine>(),
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
          schema: this.entity,
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
          schema: this.entity,
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
          schema: this.entity,
          transaction: this.transaction
        }),
        conditions: [schemaIsDefined, transactionIsNotEmpty, transactionIsNotInCommitPhase]
      }
    ];
  }

}
