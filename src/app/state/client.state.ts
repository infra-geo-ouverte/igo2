import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  Client,
  ClientDiagram,
  ClientParcel,
  ClientParcelYear,
  ClientSchema,
  ClientParcelEditor,
  ClientSchemaEditor
} from 'src/app/modules/client';
import { EntityStore, EntityFilterClause, State } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { EditionState } from './edition.state';

@Injectable({
  providedIn: 'root'
})
export class ClientState {

  public client$ = new BehaviorSubject<Client>(undefined);

  get diagramStore(): EntityStore<ClientDiagram> {
    return this._diagramStore;
  }
  private _diagramStore: EntityStore<ClientDiagram>;

  get parcelYearStore(): EntityStore<ClientParcelYear> {
    return this._parcelYearStore;
  }
  private _parcelYearStore: EntityStore<ClientParcelYear>;

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
    this._diagramStore = new EntityStore<ClientDiagram>();
    this._parcelYearStore = new EntityStore<ClientParcelYear>();

    this._parcelEditor = new ClientParcelEditor();
    this.editionState.register(this._parcelEditor);

    this._schemaEditor = new ClientSchemaEditor();
    this.editionState.register(this._schemaEditor);

    this._diagramStore
      .observeFirstBy((diagram: ClientDiagram, state: State) => state.selected === true)
      .subscribe((diagram: ClientDiagram) => this.onSelectDiagram(diagram));
  }

  setClient(client: Client) {
    this.diagramStore.setEntities(client.diagrams);
    this.diagramStore.sorter.set({property: 'id', direction: 'asc'});
    this.parcelStore.setEntities(client.parcels);
    this.schemaStore.setEntities(client.schemas);
    this.client$.next(client);
  }

  clearClient() {
    this.diagramStore.clear();
    this.parcelStore.clear();
    this.schemaStore.clear();
    this.client$.next(undefined);
  }

  private onSelectDiagram(diagram: ClientDiagram) {
    if (diagram === undefined) {
      this.parcelStore.filter.reset();
    } else {
      const filterClause = function(parcel: ClientParcel, state: State): boolean {
        return parcel.properties.noDiagramme === diagram.id;
      };
      this.parcelStore.filter.set([filterClause]);
    }
  }

}
