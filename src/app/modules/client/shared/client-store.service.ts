import { Injectable } from '@angular/core';

import { EditorService } from '../../edition/shared/editor.service';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';
import { Client, ClientParcel, ClientSchema } from './client.interface';
import { ClientParcelEditor } from './client-parcel-editor';
import { ClientSchemaEditor } from './client-schema-editor';

@Injectable({
  providedIn: 'root'
})
export class ClientStoreService {

  private client: Client;

  get parcelEditor(): ClientParcelEditor {
    return this._parcelEditor;
  }
  private _parcelEditor: ClientParcelEditor;

  get parcelStore(): EntityStore<ClientParcel> {
    return this.parcelEditor.entityStore as EntityStore<ClientParcel>;
  }

  get parcelWidgetStore(): EntityStore<Widget> {
    return this.parcelEditor.widgetStore as EntityStore<Widget>;
  }

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
    this._parcelEditor = new ClientParcelEditor();
    this.editorService.register(this._parcelEditor);

    this._schemaEditor = new ClientSchemaEditor();
    this.editorService.register(this._schemaEditor);
  }

  setClient(client: Client) {
    this.client = client;
    this.parcelStore.setEntities(client.parcels);
    this.schemaStore.setEntities(client.schemas);
  }

  getClient(): Client {
    return this.client;
  }

  getParcelStore(): EntityStore<ClientParcel> {
    return this.parcelStore;
  }

  getSchemaStore(): EntityStore<ClientSchema> {
    return this.schemaStore;
  }
}
