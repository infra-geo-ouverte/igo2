import { Injectable} from '@angular/core';

import { Widget } from 'src/lib/widget';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementWidgetService {

  static schemaBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static elementBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.element !== undefined;
  };

  constructor() {}

  buildSurfaceWidgets(): Widget[] {
    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schemaElement.create',
        tooltip: 'client.schemaElement.create.tooltip',
        conditions: [ClientSchemaElementWidgetService.schemaBoundWidgetIsReady]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schemaElement.update',
        tooltip: 'client.schemaElement.update.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaBoundWidgetIsReady,
          ClientSchemaElementWidgetService.elementBoundWidgetIsReady
        ]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schemaElement.delete',
        tooltip: 'client.schemaElement.delete.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaBoundWidgetIsReady,
          ClientSchemaElementWidgetService.elementBoundWidgetIsReady
        ]
      },
      {
        id: 'move',
        icon: 'pan_tool',
        title: 'client.schemaElement.move',
        tooltip: 'client.schemaElement.move.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaBoundWidgetIsReady,
          ClientSchemaElementWidgetService.elementBoundWidgetIsReady
        ]
      },
      {
        id: 'save',
        icon: 'save',
        title: 'client.schemaElement.save',
        tooltip: 'client.schemaElement.save.tooltip',
        conditions: [
          ClientSchemaElementWidgetService.schemaBoundWidgetIsReady,
          ClientSchemaElementWidgetService.elementBoundWidgetIsReady
        ]
      }
    ];
  }
}
