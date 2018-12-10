import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { skip, tap, zip } from 'rxjs/operators';

import {
  Client,
  ClientService,
  ClientParcelDiagram,
  ClientParcel,
  ClientParcelYear,
  ClientParcelYearService,
  ClientSchema,
  ClientParcelEditor,
  ClientSchemaEditor,
  ClientSchemaElements,
  ClientSchemaElementService,
  ClientSchemaElementSurface,
  ClientSchemaElementSurfaceEditor
} from 'src/lib/client';
import { EntityStore, State } from 'src/lib/entity';
import { Widget } from 'src/lib/widget';

import { EditionState } from '../edition/edition.state';

@Injectable({
  providedIn: 'root'
})
export class ClientState {

  public client$ = new BehaviorSubject<Client>(undefined);
  public schema$ = new BehaviorSubject<ClientSchema>(undefined);

  private selectedDiagram$$: Subscription;
  private selectedParcelYear$$: Subscription;
  private selectedSchema$$: Subscription;

  get client(): Client {
    return this.client$.value;
  }

  get schema(): ClientSchema {
    return this.schema$.value;
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

  get schemaElementSurfaceEditor(): ClientSchemaElementSurfaceEditor {
    return this._schemaElementSurfaceEditor;
  }
  private _schemaElementSurfaceEditor: ClientSchemaElementSurfaceEditor;

  get schemaElementSurfaceStore(): EntityStore<ClientSchemaElementSurface> {
    return this.schemaElementSurfaceEditor.entityStore as EntityStore<ClientSchemaElementSurface>;
  }

  get schemaElementSurfaceWidgetStore(): EntityStore<Widget> {
    return this.schemaElementSurfaceEditor.widgetStore as EntityStore<Widget>;
  }

  private parcelYear: ClientParcelYear = undefined;

  constructor(
    private clientService: ClientService,
    private clientParcelYearService: ClientParcelYearService,
    private clientSchemaElementService: ClientSchemaElementService,
    private editionState: EditionState
  ) {
    this._diagramStore = new EntityStore<ClientParcelDiagram>();
    this._parcelYearStore = new EntityStore<ClientParcelYear>();

    this._parcelEditor = new ClientParcelEditor();
    this.editionState.register(this._parcelEditor);

    this._schemaEditor = new ClientSchemaEditor();
    this.editionState.register(this._schemaEditor);

    this._schemaElementSurfaceEditor = new ClientSchemaElementSurfaceEditor();
    this.editionState.register(this._schemaElementSurfaceEditor);

    this.selectedDiagram$$ = this._diagramStore
      .observeFirstBy((diagram: ClientParcelDiagram, state: State) => state.selected === true)
      .subscribe((diagram: ClientParcelDiagram) => this.onSelectDiagram(diagram));

    this.selectedParcelYear$$ = this._parcelYearStore
      .observeFirstBy((parcelYear: ClientParcelYear, state: State) => state.selected === true)
      .pipe(skip(1))
      .subscribe((parcelYear: ClientParcelYear) => this.onSelectParcelYear(parcelYear));

    this.selectedSchema$$ = this.schemaStore
      .observeFirstBy((schema: ClientSchema, state: State) => state.selected === true)
      .subscribe((schema: ClientSchema) => this.onSelectSchema(schema));

    this.loadParcelYears();
  }

  getSetClientByNum(clientNum: string): Observable<Client> {
    const annee = this.parcelYear ? this.parcelYear.annee : undefined;
    return this.clientService.getClientByNum(clientNum, annee).pipe(
      tap((client?: Client) => {
        if (client === undefined) {
          this.clearClient();
        } else {
          this.setClient(client);
        }
      })
    );
  }

  setClient(client: Client) {
    this.diagramStore.setEntities(client.diagrams);
    this.diagramStore.sorter.set({property: 'id', direction: 'asc'});
    this.parcelStore.setEntities(client.parcels);
    this.schemaStore.setEntities(client.schemas);
    this.schemaEditor.setClient(client);
    this.client$.next(client);
  }

  clearClient() {
    if (this.client === undefined) {
      return;
    }

    this.diagramStore.clear();
    this.parcelStore.clear();
    this.schemaStore.clear();
    this.client$.next(undefined);
  }

  private onSelectDiagram(diagram: ClientParcelDiagram) {
    this.parcelStore.state.reset();
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

  private onSelectSchema(schema: ClientSchema) {
    if (schema !== undefined) {
      this.setSchema(schema);
    } else {
      this.clearSchema();
    }
  }

  private setSchema(schema: ClientSchema) {
    this.loadSchemaElements(schema);
    this.schemaElementSurfaceEditor.setSchema(schema);
    this.schema$.next(schema);
  }

  private clearSchema() {
    if (this.schema === undefined) {
      return;
    }

    this.clearSchemaElements();
    this.schema$.next(undefined);
  }

  private loadSchemaElements(schema: ClientSchema) {
    this.clientSchemaElementService.getElements(schema)
      .subscribe((elements: ClientSchemaElements) => {
        const [points, lines, surfaces] = elements;
        this.schemaElementSurfaceStore.setEntities(surfaces);
      });
  }

  private clearSchemaElements() {
    this.schemaElementSurfaceStore.clear();
  }

  private loadParcelYears() {
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

}
