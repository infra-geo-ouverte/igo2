import { Injectable } from '@angular/core';

import { EditorService } from '../../edition/shared/editor.service';
import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';
import { Client, ClientSchema } from './client.interface';
import { clientSchemaToEntity } from './client.utils';
import { ClientSchemaEditor } from './client-schema-editor';

@Injectable({
  providedIn: 'root'
})
export class ClientStoreService {

  private client: Client;

  get schemaEditor(): ClientSchemaEditor {
    return this._schemaEditor;
  }
  private _schemaEditor: ClientSchemaEditor;

  get schemaStore(): EntityStore<Entity<ClientSchema>> {
    return this.schemaEditor.dataStore as EntityStore<Entity<ClientSchema>>;
  }

  get schemaWidgetStore(): EntityStore<Entity<Widget>> {
    return this.schemaEditor.widgetStore as EntityStore<Entity<Widget>>;
  }

  constructor(private editorService: EditorService) {
    this._schemaEditor = new ClientSchemaEditor();
    this.editorService.register(this._schemaEditor);
  }

  setClient(client: Client) {
    this.client = client;
    this.schemaStore.setEntities(client.schemas.map(clientSchemaToEntity));
  }

  getClient(): Client {
    return this.client;
  }

  getSchemaStore(): EntityStore<Entity<ClientSchema>> {
    return this.schemaStore;
  }
}
