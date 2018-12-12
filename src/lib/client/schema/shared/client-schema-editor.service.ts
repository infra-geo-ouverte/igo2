import { Injectable} from '@angular/core';

import { Editor } from 'src/lib/edition';
import { EntityStore } from 'src/lib/entity';
import { Widget } from 'src/lib/widget';

import { Client } from '../../shared/client.interfaces';

import { ClientSchema } from './client-schema.interfaces';
import { ClientSchemaTableService } from './client-schema-table.service';
import { ClientSchemaWidgetService } from './client-schema-widget.service';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaEditorService extends Editor {

  private client: Client;

  constructor(
    private clientSchemaTableService: ClientSchemaTableService,
    private clientSchemaWidgetService: ClientSchemaWidgetService
  ) {
    super({
      id: 'fadq.client-schema-editor',
      title: 'Schemas du client',
      tableTemplate: clientSchemaTableService.buildTable()
    });

    this.bindEntityStore(new EntityStore<ClientSchema>());

    const widgetStore = new EntityStore<Widget>();
    widgetStore.setEntities(clientSchemaWidgetService.buildWidgets());
    this.bindWidgetStore(widgetStore);
  }

  setClient(client: Client) {
    this.client = client;
  }

  protected computeWidgetData(): Object {
    return Object.assign(super.computeWidgetData(), {
      schema: this.entity,
      client: this.client
    });
  }

}
