import { Inject, Injectable } from '@angular/core';

import {
  Action,
  ActionStore,
  EntityTransaction,
  getEntityRevision,
  Widget
} from '@igo2/common';
import { FeatureStore, IgoMap } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { Editor } from 'src/lib/edition';
import {
  ClientSchema,
  ClientSchemaElement,
  ClientSchemaElementTableService,
  ClientSchemaElementCreateWidget,
  ClientSchemaElementUpdateWidget,
  ClientSchemaElementSliceWidget,
  ClientSchemaElementSaverWidget,
  ClientSchemaElementUndoWidget,
  ClientSchemaElementImportDataWidget,
  ClientSchemaElementService,
  generateOperationTitle
} from 'src/lib/client';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementState {

  editor: Editor;

  private schema: ClientSchema;
  private transaction: EntityTransaction = new EntityTransaction();

  get map(): IgoMap { return this.mapState.map; }

  get element(): ClientSchemaElement {
    return this.editor.entity as ClientSchemaElement;
  }

  get elementStore():  FeatureStore<ClientSchemaElement> {
    return this.editor.entityStore as  FeatureStore<ClientSchemaElement>;
  }

  constructor(
    private mapState: MapState,
    private clientSchemaElementTableService: ClientSchemaElementTableService,
    private clientSchemaElementService: ClientSchemaElementService,
    @Inject(ClientSchemaElementCreateWidget) private clientSchemaElementCreateWidget: Widget,
    @Inject(ClientSchemaElementUpdateWidget) private clientSchemaElementUpdateWidget: Widget,
    @Inject(ClientSchemaElementSliceWidget) private clientSchemaElementSliceWidget: Widget,
    @Inject(ClientSchemaElementSaverWidget) private clientSchemaElementSaverWidget: Widget,
    @Inject(ClientSchemaElementUndoWidget) private clientSchemaElementUndoWidget: Widget,
    @Inject(ClientSchemaElementImportDataWidget) private clientSchemaElementImportDataWidget: Widget
  ) {
    this.editor = new Editor({
      id: 'fadq.client-schema-element-editor',
      title: 'Éléments du schéma',
      tableTemplate: clientSchemaElementTableService.buildTable(),
      entityStore: new FeatureStore<ClientSchemaElement>([], {
        getKey: (entity: ClientSchemaElement) => {
          return entity.properties.idElementGeometrique || entity.meta.id;
        },
        map: mapState.map
      }),
      actionStore: new ActionStore(this.buildActions())
    });
  }

  setSchema(schema: ClientSchema | undefined) {
    this.schema = schema;

    if (schema !== undefined) {
      this.loadSchemaElements(schema);
    } else {
      this.transaction.clear();
      this.elementStore.clear();
      this.editor.deactivate();
    }
  }

  private buildActions(): Action[] {
    const schemaIsDefined = () => this.schema !== undefined;
    const elementIsDefined = () => this.element !== undefined;
    const transactionIsNotEmpty = () => {
      return this.transaction !== undefined && this.transaction.empty === false;
    };
    const transactionIsNotInCommitPhase = () => {
      return this.transaction !== undefined && this.transaction.inCommitPhase === false;
    };
    const elementCanBeFilled = () => {
      return this.element.geometry.type === 'Polygon' && this.element.geometry.coordinates.length > 1;
    };
    const elementIsAPolygon = () => {
      return this.element.geometry.type === 'Polygon';
    };

    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schemaElement.create',
        tooltip: 'client.schemaElement.create.tooltip',
        handler: () => this.editor.activateWidget(this.clientSchemaElementCreateWidget, {
          schema: this.schema,
          map: this.map,
          transaction: this.transaction,
          store: this.elementStore
        }),
        conditions: [schemaIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schemaElement.update',
        tooltip: 'client.schemaElement.update.tooltip',
        handler: () => this.editor.activateWidget(this.clientSchemaElementUpdateWidget, {
          schema: this.schema,
          map: this.map,
          element: this.element,
          transaction: this.transaction,
          store: this.elementStore
        }),
        conditions: [schemaIsDefined, elementIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schemaElement.delete',
        tooltip: 'client.schemaElement.delete.tooltip',
        handler: () => {
          const element = this.element;
          this.transaction.delete(element, this.elementStore, {
            title: generateOperationTitle(element)
          });
        },
        conditions: [schemaIsDefined, elementIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'fill',
        icon: 'select_all',
        title: 'client.schemaElement.fill',
        tooltip: 'client.schemaElement.fill.tooltip',
        handler: () => {
          const element = this.element;
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

          this.transaction.update(element, newElement, this.elementStore, {
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
        handler: () => this.editor.activateWidget(this.clientSchemaElementSliceWidget, {
          schema: this.schema,
          map: this.map,
          element: this.element,
          transaction: this.transaction,
          store: this.elementStore
        }),
        conditions: [
          schemaIsDefined,
          elementIsDefined,
          transactionIsNotInCommitPhase,
          elementIsAPolygon
        ]
      },
      {
        id: 'importData',
        icon: 'input',
        title: 'client.schemaElement.importData',
        tooltip: 'client.schemaElement.importData.tooltip',
        handler: () => this.editor.activateWidget(this.clientSchemaElementImportDataWidget, {
          schema: this.schema,
          element: this.element,
          transaction: this.transaction,
          store: this.elementStore
        }),
        conditions: [schemaIsDefined, transactionIsNotInCommitPhase]
      },
      {
        id: 'save',
        icon: 'save',
        title: 'client.schemaElement.save',
        tooltip: 'client.schemaElement.save.tooltip',
        handler: () => this.editor.activateWidget(this.clientSchemaElementSaverWidget, {
          schema: this.schema,
          transaction: this.transaction
        }),
        conditions: [schemaIsDefined, transactionIsNotEmpty, transactionIsNotInCommitPhase]
      },
      {
        id: 'undo',
        icon: 'undo',
        title: 'client.schemaElement.undo',
        tooltip: 'client.schemaElement.undo.tooltip',
        handler: () => this.editor.activateWidget(this.clientSchemaElementUndoWidget, {
          transaction: this.transaction
        }),
        conditions: [schemaIsDefined, transactionIsNotEmpty, transactionIsNotInCommitPhase]
      }
    ];
  }

  private loadSchemaElements(schema: ClientSchema) {
    this.clientSchemaElementService.getElements(schema)
      .subscribe((elements: ClientSchemaElement[]) => this.elementStore.load(elements));
  }

}
