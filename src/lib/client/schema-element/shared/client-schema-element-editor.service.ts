import { Inject, Injectable } from '@angular/core';

import { Action } from 'src/lib/action';
import { Editor } from 'src/lib/edition';
import { EntityStore, EntityTransaction, getEntityRevision } from 'src/lib/entity';
import { FeatureStore } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { Widget } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElement } from './client-schema-element.interfaces';
import { ClientSchemaElementTableService } from './client-schema-element-table.service';
import {
  ClientSchemaElementSaverWidget,
  ClientSchemaElementCreateWidget,
  ClientSchemaElementUpdateWidget,
  ClientSchemaElementSliceWidget
} from './client-schema-element.widgets';
import { generateOperationTitle } from './client-schema-element.utils';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementEditorService extends Editor {

  private map: IgoMap;
  private schema: ClientSchema;
  private transaction: EntityTransaction;

  constructor(
    private clientSchemaElementTableService: ClientSchemaElementTableService,
    @Inject(ClientSchemaElementSaverWidget) private clientSchemaElementSaverWidget: Widget,
    @Inject(ClientSchemaElementCreateWidget) private clientSchemaElementCreateWidget: Widget,
    @Inject(ClientSchemaElementUpdateWidget) private clientSchemaElementUpdateWidget: Widget,
    @Inject(ClientSchemaElementSliceWidget) private clientSchemaElementSliceWidget: Widget
  ) {
    super({
      id: 'fadq.client-schema-element-editor',
      title: 'Éléments du schéma',
      tableTemplate: clientSchemaElementTableService.buildTable(),
      entityStore: new FeatureStore<ClientSchemaElement>([], {
        getKey: (entity: ClientSchemaElement) => entity.properties.idElementGeometrique
      }),
      actionStore: new EntityStore<Action>([])
    });

    this.actionStore.load(this.buildActions());
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
      return this.transaction !== undefined && this.transaction.inCommitPhase === false;
    };
    const elementCanBeFilled = () => {
      const element = this.entity as ClientSchemaElement;
      return element.geometry.type === 'Polygon' &&
        element.geometry.coordinates.length > 1;
    };

    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schemaElement.create',
        tooltip: 'client.schemaElement.create.tooltip',
        handler: () => this.activateWidget(this.clientSchemaElementCreateWidget, {
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
        handler: () => this.activateWidget(this.clientSchemaElementUpdateWidget, {
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
          const element = this.entity as ClientSchemaElement;
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
        id: 'fill',
        icon: 'select_all',
        title: 'client.schemaElement.fill',
        tooltip: 'client.schemaElement.fill.tooltip',
        handler: () => {
          const element = this.entity as ClientSchemaElement;
          const newElementMeta = Object.assign({}, element.meta, {
            revision: getEntityRevision(element) + 1
          });
          const newElement = Object.assign({}, element, {
            meta: newElementMeta,
            geometry: {
              type: 'Polygon',
              coordinates: [element.geometry.coordinates[0]]
            }
          });

          this.transaction.update(element, newElement, this.entityStore, {
            title: generateOperationTitle(element)
          });
        },
        conditions: [
          schemaIsDefined,
          elementIsDefined,
          transactionIsNotInCommitPhase,
          elementCanBeFilled
        ]
      },
      {
        id: 'slice',
        icon: 'flip',
        title: 'client.schemaElement.slice',
        tooltip: 'client.schemaElement.slice.tooltip',
        handler: () => this.activateWidget(this.clientSchemaElementSliceWidget, {
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
