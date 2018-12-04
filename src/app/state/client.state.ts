import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  Client,
  ClientService,
  ClientParcelDiagram,
  ClientParcel,
  ClientParcelYear,
  ClientParcelYearService,
  ClientSchema,
  ClientParcelEditor,
  ClientSchemaEditor
} from 'src/app/modules/client';
import { EntityStore, State } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { EditionState } from './edition.state';

@Injectable({
  providedIn: 'root'
})
export class ClientState {

  public client$ = new BehaviorSubject<Client>(undefined);

  get client(): Client {
    return this.client$.value;
  }

  get diagramStore(): EntityStore<ClientParcelDiagram> {
    return this._diagramStore;
  }
  private _diagramStore: EntityStore<ClientParcelDiagram>;

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

  private parcelYear: ClientParcelYear = undefined;

  constructor(
    private clientService: ClientService,
    private clientParcelYearService: ClientParcelYearService,
    private editionState: EditionState
  ) {
    this._diagramStore = new EntityStore<ClientParcelDiagram>();
    this._parcelYearStore = new EntityStore<ClientParcelYear>();

    this._parcelEditor = new ClientParcelEditor();
    this.editionState.register(this._parcelEditor);

    this._schemaEditor = new ClientSchemaEditor();
    this.editionState.register(this._schemaEditor);

    this._diagramStore
      .observeFirstBy((diagram: ClientParcelDiagram, state: State) => state.selected === true)
      .subscribe((diagram: ClientParcelDiagram) => this.onSelectDiagram(diagram));

    this._parcelYearStore
      .observeFirstBy((parcelYear: ClientParcelYear, state: State) => state.selected === true)
      .subscribe((parcelYear: ClientParcelYear) => this.onSelectParcelYear(parcelYear));

    this.clientParcelYearService.getParcelYears()
      .subscribe((parcelYears: ClientParcelYear[]) => {
        const current = parcelYears.find((parcelYear: ClientParcelYear) => {
          return parcelYear.current === true;
        });
        this.parcelYearStore.setEntities(parcelYears);
        this.parcelYearStore.sorter.set({property: 'annee', direction: 'desc'});
        if (current !== undefined) {
          this.parcelYearStore.updateEntityState(current, {selected: true});
        }
      });
  }

  getSetClientByNum(clientNum: string): Observable<Client> {
    const annee = this.parcelYear ? this.parcelYear.annee : undefined;
    return this.clientService.getClientByNum(clientNum, annee).pipe(
      tap((client: Client) => this.setClient(client))
    );
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

  private onSelectDiagram(diagram: ClientParcelDiagram) {
    if (diagram === undefined) {
      this.parcelStore.filter.reset();
    } else {
      const filterClause = function(parcel: ClientParcel, state: State): boolean {
        return parcel.properties.noDiagramme === diagram.id;
      };
      this.parcelStore.filter.set([filterClause]);
    }
  }

  private onSelectParcelYear(parcelYear: ClientParcelYear) {
    this.parcelYear = parcelYear;
    if (this.client !== undefined) {
      this.getSetClientByNum(this.client.info.numero).subscribe();
    }
  }

}
