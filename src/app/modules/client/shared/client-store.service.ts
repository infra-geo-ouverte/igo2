import { Injectable } from '@angular/core';

import { EditorService } from '../../edition/shared/editor.service';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';
import { Client, ClientSchema } from './client.interface';
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

  get schemaStore(): EntityStore<ClientSchema> {
    return this.schemaEditor.entityStore as EntityStore<ClientSchema>;
  }

  get schemaWidgetStore(): EntityStore<Widget> {
    return this.schemaEditor.widgetStore as EntityStore<Widget>;
  }

  constructor(private editorService: EditorService) {
    this._schemaEditor = new ClientSchemaEditor();
    this.editorService.register(this._schemaEditor);
  }

  setClient(client: Client) {
    this.client = client;
    this.schemaStore.setEntities(client.schemas);
  }

  getClient(): Client {
    return this.client;
  }

  getSchemaStore(): EntityStore<ClientSchema> {
    return this.schemaStore;
  }
}
