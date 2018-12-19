import { Injectable} from '@angular/core';

import { Widget } from 'src/lib/widget';

import {
  ClientSchemaElementSaverComponent
} from '../schema-element-saver/client-schema-element-saver.component';
import {
  ClientSchemaElementSurfaceCreateFormComponent
} from '../schema-element-surface-create-form/client-schema-element-surface-create-form.component';
import {
  ClientSchemaElementSurfaceUpdateFormComponent
} from '../schema-element-surface-update-form/client-schema-element-surface-update-form.component';

import { deleteClientSchemaElementHandler } from './client-schema-element.utils';


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

  static transactionIsNotInCommitPhase = function(data: { [key: string]: any}) {
    return data.transaction !== undefined && data.transaction.inCommitPhase === false;
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
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.transactionIsNotInCommitPhase
        ]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schemaElement.update',
        tooltip: 'client.schemaElement.update.tooltip',
        component: ClientSchemaElementSurfaceUpdateFormComponent,
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.elementIsDefined,
          ClientSchemaElementWidgetService.transactionIsNotInCommitPhase
        ]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schemaElement.delete',
        tooltip: 'client.schemaElement.delete.tooltip',
        handler: deleteClientSchemaElementHandler,
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.elementIsDefined,
          ClientSchemaElementWidgetService.transactionIsNotInCommitPhase
        ]
      },
      {
        id: 'save',
        icon: 'save',
        title: 'client.schemaElement.save',
        tooltip: 'client.schemaElement.save.tooltip',
        component: ClientSchemaElementSaverComponent,
        conditions: [
          ClientSchemaElementWidgetService.schemaIsDefined,
          ClientSchemaElementWidgetService.transactionIsNotEmpty,
          ClientSchemaElementWidgetService.transactionIsNotInCommitPhase
        ]
      }
    ];
  }
}
