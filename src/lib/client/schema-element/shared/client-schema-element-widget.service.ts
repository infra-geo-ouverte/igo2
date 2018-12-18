import { Injectable} from '@angular/core';

import { Widget } from 'src/lib/widget';

import {
  ClientSchemaElementSurfaceCreateFormComponent
} from '../schema-element-surface-create-form/client-schema-element-surface-create-form.component';
import {
  ClientSchemaElementSurfaceSaverComponent
} from '../schema-element-surface-saver/client-schema-element-surface-saver.component';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementWidgetService {

  static schemaIsDefined = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static elementIsDefined = function(data: { [key: string]: any}) {
    return data.element !== undefined;
  };

  static transactionIsNotEmpty = function(data: { [key: string]: any}) {
    return data.transaction !== undefined && data.transaction.empty === false;
  };

  constructor() {}

  buildSurfaceWidgets(): Widget[] {
    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schemaElement.create',
        tooltip: 'client.schemaElement.create.tooltip',
        component: ClientSchemaElementSurfaceCreateFormComponent,
        conditions: [ClientSchemaElementWidgetService.schemaIsDefined]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schemaElement.update',
        tooltip: 'client.schemaElement.update.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.elementIsDefined
        ]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schemaElement.delete',
        tooltip: 'client.schemaElement.delete.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.elementIsDefined
        ]
      },
      {
        id: 'move',
        icon: 'pan_tool',
        title: 'client.schemaElement.move',
        tooltip: 'client.schemaElement.move.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.elementIsDefined
        ]
      },
      {
        id: 'save',
        icon: 'save',
        title: 'client.schemaElement.save',
        tooltip: 'client.schemaElement.save.tooltip',
        component: ClientSchemaElementSurfaceSaverComponent,
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.transactionIsNotEmpty
        ]
      }
    ];
  }
}
