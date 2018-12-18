import { Injectable} from '@angular/core';

import { Widget } from 'src/lib/widget';

import { ClientSchemaFileManagerComponent } from '../../schema-file/client-schema-file-manager/client-schema-file-manager.component';
import { ClientSchemaCreateFormComponent } from '../client-schema-create-form/client-schema-create-form.component';
import { ClientSchemaUpdateFormComponent } from '../client-schema-update-form/client-schema-update-form.component';
import { ClientSchemaDeleteFormComponent } from '../client-schema-delete-form/client-schema-delete-form.component';
import { ClientSchemaDuplicateFormComponent } from '../client-schema-duplicate-form/client-schema-duplicate-form.component';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaWidgetService {

  static schemaIsDefined = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static clientIsDefined = function(data: { [key: string]: any}) {
    return data.client !== undefined;
  };

  constructor() {}

  buildWidgets(): Widget[] {
    return [
      {
        id: 'create',
        icon: 'add',
        title: 'client.schema.create',
        tooltip: 'client.schema.create.tooltip',
        component: ClientSchemaCreateFormComponent,
        conditions: [
          ClientSchemaWidgetService.clientIsDefined
        ]
      },
      {
        id: 'update',
        icon: 'edit',
        title: 'client.schema.update',
        tooltip: 'client.schema.update.tooltip',
        component: ClientSchemaUpdateFormComponent,
        conditions: [
          ClientSchemaWidgetService.clientIsDefined,
          ClientSchemaWidgetService.schemaIsDefined
        ]
      },
      {
        id: 'delete',
        icon: 'delete',
        title: 'client.schema.delete',
        tooltip: 'client.schema.delete.tooltip',
        component: ClientSchemaDeleteFormComponent,
        conditions: [
          ClientSchemaWidgetService.clientIsDefined,
          ClientSchemaWidgetService.schemaIsDefined
        ]
      },
      {
        id: 'duplicate',
        icon: 'queue',
        title: 'client.schema.duplicate',
        tooltip: 'client.schema.duplicate.tooltip',
        component: ClientSchemaDuplicateFormComponent,
        conditions: [
          ClientSchemaWidgetService.clientIsDefined,
          ClientSchemaWidgetService.schemaIsDefined
        ]
      },
      {
        id: 'manageFiles',
        icon: 'attach_file',
        title: 'client.schema.manageFiles',
        tooltip: 'client.schema.manageFiles.tooltip',
        component: ClientSchemaFileManagerComponent,
        conditions: [
          ClientSchemaWidgetService.clientIsDefined,
          ClientSchemaWidgetService.schemaIsDefined
        ]
      },
      {
        id: 'transfer',
        icon: 'swap_horiz',
        title: 'client.schema.transfer',
        tooltip: 'client.schema.transfer.tooltip',
        conditions: [
          ClientSchemaWidgetService.clientIsDefined,
          ClientSchemaWidgetService.schemaIsDefined
        ]
      },
      {
        id: 'createMap',
        icon: 'image',
        title: 'client.schema.createMap',
        tooltip: 'client.schema.createMap.tooltip',
        conditions: [
          ClientSchemaWidgetService.clientIsDefined,
          ClientSchemaWidgetService.schemaIsDefined
        ]
      }
    ];
  }
}
