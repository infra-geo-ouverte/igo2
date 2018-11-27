import { Injectable } from '@angular/core';

import {
  Client,
  ClientParcel,
  ClientSchema,
  ClientParcelEditor,
  ClientSchemaEditor
} from 'src/app/modules/client';
import { EntityStore } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { EditionState } from './edition.state';

@Injectable({
  providedIn: 'root'
})
export class ClientState {

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

  constructor(private editionState: EditionState) {
    this._parcelEditor = new ClientParcelEditor();
    this.editionState.register(this._parcelEditor);

    this._schemaEditor = new ClientSchemaEditor();
    this.editionState.register(this._schemaEditor);
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
