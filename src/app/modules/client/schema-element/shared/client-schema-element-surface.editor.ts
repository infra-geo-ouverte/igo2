import { Editor } from 'src/app/modules/edition';
import { EntityStore, EntityTableTemplate } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from './client-schema-element.interfaces';

export class ClientSchemaElementSurfaceEditor extends Editor {

  static tableTemplate: EntityTableTemplate = {
    selection: true,
    sort: true,
    columns: [
      {
        name: 'properties.idElementGeometrique',
        title: 'ID élément'
      },
      {
        name: 'properties.typeElement',
        title: 'Type d\'élément'
      },
      {
        name: 'properties.etiquette',
        title: 'Étiquette'
      },
      {
        name: 'properties.description',
        title: 'Description'
      },
      {
        name: 'properties.anneImage',
        title: 'Année d\'image'
      },
      {
        name: 'properties.timbreMaj',
        title: 'Date de mise à jour'
      },
      {
        name: 'properties.usagerMaj',
        title: 'Usager mise à jour'
      }
    ]
  };

  // TODO: widgets should class instances
  private widgets: Widget[] = [
    {
      id: 'create',
      icon: 'add',
      title: 'client.schemaElement.create',
      tooltip: 'client.schemaElement.create.tooltip',
      isReady: ClientSchemaElementSurfaceEditor.schemaBoundWidgetIsReady
    },
    {
      id: 'update',
      icon: 'edit',
      title: 'client.schemaElement.update',
      tooltip: 'client.schemaElement.update.tooltip',
      isReady: ClientSchemaElementSurfaceEditor.elementBoundWidgetIsReady
    },
    {
      id: 'delete',
      icon: 'delete',
      title: 'client.schemaElement.delete',
      tooltip: 'client.schemaElement.delete.tooltip',
      isReady: ClientSchemaElementSurfaceEditor.elementBoundWidgetIsReady
    },
    {
      id: 'move',
      icon: 'pan_tool',
      title: 'client.schemaElement.move',
      tooltip: 'client.schemaElement.move.tooltip',
      isReady: ClientSchemaElementSurfaceEditor.elementBoundWidgetIsReady
    },
    {
      id: 'save',
      icon: 'save',
      title: 'client.schemaElement.save',
      tooltip: 'client.schemaElement.save.tooltip',
      isReady: ClientSchemaElementSurfaceEditor.elementBoundWidgetIsReady
    }
  ];

  private schema: ClientSchema;

  static schemaBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.schema !== undefined;
  };

  static elementBoundWidgetIsReady = function(data: { [key: string]: any}) {
    return data.element !== undefined;
  };

  constructor() {
    super({
      id: 'fadq.client-schema-element-surface-editor',
      title: 'Surfaces du schéma',
      tableTemplate: ClientSchemaElementSurfaceEditor.tableTemplate
    });

    this.bindEntityStore(new EntityStore<ClientSchemaElementSurface>());

    const widgetStore = new EntityStore<Widget>();
    widgetStore.setEntities(this.widgets);
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
