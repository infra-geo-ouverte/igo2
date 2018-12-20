import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';

import {
  Client,
  ClientService,
  ClientParcelDiagram,
  ClientParcel,
  ClientParcelYear,
  ClientParcelYearService,
  ClientSchema,
  ClientParcelEditorService,
  ClientSchemaEditorService,
  ClientSchemaElements,
  ClientSchemaElementPoint,
  ClientSchemaElementLine,
  ClientSchemaElementSurface,
  ClientSchemaElementService,
  ClientSchemaElementPointEditorService,
  ClientSchemaElementLineEditorService,
  ClientSchemaElementSurfaceEditorService
} from 'src/lib/client';
import { EntityStore, State, EntityTransaction } from 'src/lib/entity';
import { FeatureStore } from 'src/lib/feature';

import { EditionState } from '../edition/edition.state';

@Injectable({
  providedIn: 'root'
})
export class ClientState implements OnDestroy {

  public client$ = new BehaviorSubject<Client>(undefined);
  public schema$ = new BehaviorSubject<ClientSchema>(undefined);

  private selectedDiagram$$: Subscription;
  private selectedParcelYear$$: Subscription;
  private selectedSchema$$: Subscription;

  private schemaElementTransaction: EntityTransaction;

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

  get parcelEditor(): ClientParcelEditorService {
    return this.clientParcelEditorService;
  }

  get parcelStore(): FeatureStore<ClientParcel> {
    return this.parcelEditor.entityStore as FeatureStore<ClientParcel>;
  }

  get schemaEditor(): ClientSchemaEditorService {
    return this.clientSchemaEditorService;
  }

  get schemaStore(): EntityStore<ClientSchema> {
    return this.schemaEditor.entityStore as EntityStore<ClientSchema>;
  }

  get schemaElementPointEditor(): ClientSchemaElementPointEditorService {
    return this.clientSchemaElementPointEditorService;
  }

  get schemaElementPointStore(): FeatureStore<ClientSchemaElementPoint> {
    return this.schemaElementPointEditor.entityStore as FeatureStore<ClientSchemaElementPoint>;
  }

  get schemaElementLineEditor(): ClientSchemaElementLineEditorService {
    return this.clientSchemaElementLineEditorService;
  }

  get schemaElementLineStore(): FeatureStore<ClientSchemaElementLine> {
    return this.schemaElementLineEditor.entityStore as FeatureStore<ClientSchemaElementLine>;
  }

  get schemaElementSurfaceEditor(): ClientSchemaElementSurfaceEditorService {
    return this.clientSchemaElementSurfaceEditorService;
  }

  get schemaElementSurfaceStore(): FeatureStore<ClientSchemaElementSurface> {
    return this.schemaElementSurfaceEditor.entityStore as FeatureStore<ClientSchemaElementSurface>;
  }

  private parcelYear: ClientParcelYear = undefined;

  constructor(
    private clientService: ClientService,
    private clientParcelYearService: ClientParcelYearService,
    private clientParcelEditorService: ClientParcelEditorService,
    private clientSchemaEditorService: ClientSchemaEditorService,
    private clientSchemaElementService: ClientSchemaElementService,
    private clientSchemaElementPointEditorService: ClientSchemaElementPointEditorService,
    private clientSchemaElementLineEditorService: ClientSchemaElementLineEditorService,
    private clientSchemaElementSurfaceEditorService: ClientSchemaElementSurfaceEditorService,
    private editionState: EditionState
  ) {
    this._diagramStore = new EntityStore<ClientParcelDiagram>();
    this._parcelYearStore = new EntityStore<ClientParcelYear>();

    this.schemaElementTransaction = new EntityTransaction();

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

  ngOnDestroy() {
    this.selectedDiagram$$.unsubscribe();
    this.selectedParcelYear$$.unsubscribe();
    this.selectedSchema$$.unsubscribe();
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

  clearClient() {
    if (this.client === undefined) {
      return;
    }

    this.clearSchema();

    this.diagramStore.clear();
    this.parcelStore.clear();
    this.schemaStore.clear();

    this.editionState.unregister(this.parcelEditor);
    this.editionState.unregister(this.schemaEditor);

    this.client$.next(undefined);
  }

  private setClient(client: Client) {
    this.clearClient();

    this.diagramStore.setEntities(client.diagrams);
    this.diagramStore.sorter.set({property: 'id', direction: 'asc'});
    this.parcelStore.setEntities(client.parcels);
    this.schemaStore.setEntities(client.schemas);
    this.schemaEditor.setClient(client);

    this.editionState.register(this.parcelEditor);
    this.editionState.register(this.schemaEditor);

    this.client$.next(client);
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
    if (schema === undefined) {
      this.clearSchema();
    } else if (schema !== this.schema) {
      this.setSchema(schema);
    }
  }

  private setSchema(schema: ClientSchema) {
    this.clearSchema();

    // TODO: disable the parcels select strategy to avoid zooming
    // on the selected parcel, if any.
    this.loadSchemaElements(schema);
    this.schemaElementPointEditor.setSchema(schema);
    this.schemaElementPointEditor.setTransaction(this.schemaElementTransaction);
    this.schemaElementLineEditor.setSchema(schema);
    this.schemaElementLineEditor.setTransaction(this.schemaElementTransaction);
    this.schemaElementSurfaceEditor.setSchema(schema);
    this.schemaElementSurfaceEditor.setTransaction(this.schemaElementTransaction);

    this.editionState.register(this.schemaElementPointEditor);
    this.editionState.register(this.schemaElementLineEditor);
    this.editionState.register(this.schemaElementSurfaceEditor);

    this.schema$.next(schema);
  }

  private clearSchema() {
    if (this.schema === undefined) {
      return;
    }

    this.schemaElementTransaction.clear();
    this.clearSchemaElements();

    this.editionState.unregister(this.schemaElementPointEditor);
    this.editionState.unregister(this.schemaElementLineEditor);
    this.editionState.unregister(this.schemaElementSurfaceEditor);

    this.schema$.next(undefined);
  }

  private loadSchemaElements(schema: ClientSchema) {
    this.clientSchemaElementService.getElements(schema)
      .subscribe((elements: ClientSchemaElements) => {
        const [points, lines, surfaces] = elements;
        this.schemaElementPointStore.setEntities(points);
        this.schemaElementLineStore.setEntities(lines);
        this.schemaElementSurfaceStore.setEntities(surfaces);
      });
  }

  private clearSchemaElements() {
    this.schemaElementPointStore.clear();
    this.schemaElementLineStore.clear();
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
