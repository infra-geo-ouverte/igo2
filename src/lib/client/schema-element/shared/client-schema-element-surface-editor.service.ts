import { Injectable } from '@angular/core';

import { Editor } from 'src/lib/edition';
import { EntityStore } from 'src/lib/entity';
import { Widget } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from './client-schema-element.interfaces';
import { ClientSchemaElementTableService } from './client-schema-element-table.service';
import { ClientSchemaElementWidgetService } from './client-schema-element-widget.service';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementSurfaceEditorService extends Editor {

  private schema: ClientSchema;

  static schemaBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static elementBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.element !== undefined;
  };

  constructor(
    private clientSchemaElementTableService: ClientSchemaElementTableService,
    private clientSchemaElementWidgetService: ClientSchemaElementWidgetService
  ) {
    super({
      id: 'fadq.client-schema-element-surface-editor',
      title: 'Surfaces du schéma',
      tableTemplate: clientSchemaElementTableService.buildSurfaceTable()
    });

    this.bindEntityStore(new EntityStore<ClientSchemaElementSurface>());

    const widgetStore = new EntityStore<Widget>();
    widgetStore.setEntities(clientSchemaElementWidgetService.buildSurfaceWidgets());
    this.bindWidgetStore(widgetStore);
  }

  setSchema(schema: ClientSchema) {
    this.schema = schema;
  }

  protected computeWidgetData(): Object {
    return Object.assign(super.computeWidgetData(), {
      element: this.entity,
      schema: this.schema
    });
  }

}
