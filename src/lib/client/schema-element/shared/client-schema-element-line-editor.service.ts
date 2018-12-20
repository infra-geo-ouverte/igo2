import { Injectable } from '@angular/core';

import { Editor } from 'src/lib/edition';
import { EntityStore, EntityTransaction } from 'src/lib/entity';
import { FeatureStore } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { Widget } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementLine } from './client-schema-element.interfaces';
import { ClientSchemaElementTableService } from './client-schema-element-table.service';
import { ClientSchemaElementWidgetService } from './client-schema-element-widget.service';

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
    private clientSchemaElementWidgetService: ClientSchemaElementWidgetService
  ) {
    super({
      id: 'fadq.client-schema-element-line-editor',
      title: 'Lignes du schéma',
      tableTemplate: clientSchemaElementTableService.buildSurfaceTable()
    });

    this.bindEntityStore(new FeatureStore<ClientSchemaElementLine>());

    const widgetStore = new EntityStore<Widget>();
    widgetStore.setEntities(clientSchemaElementWidgetService.buildSurfaceWidgets());
    this.bindWidgetStore(widgetStore);
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

  protected computeWidgetData(): Object {
    return Object.assign(super.computeWidgetData(), {
      map: this.map,
      element: this.entity,
      schema: this.schema,
      transaction: this.transaction
    });
  }

}
