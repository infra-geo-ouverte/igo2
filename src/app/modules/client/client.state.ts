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
  ClientSchemaElement,
  ClientSchemaElementService,
  ClientSchemaElementEditorService
} from 'src/lib/client';
import {
  EntityRecord,
  EntityStore,
  EntityTransaction
} from 'src/lib/entity';
import { FeatureStore, moveToFeatures } from 'src/lib/feature';

import { EditionState } from '../edition/edition.state';

/**
 * Service that holds the state of the client module
 */
@Injectable({
  providedIn: 'root'
})
export class ClientState implements OnDestroy {

  /** Observable of the active client */
  public client$ = new BehaviorSubject<Client>(undefined);

  /** Observable of the active schema */
  public schema$ = new BehaviorSubject<ClientSchema>(undefined);

  /** Subscription to the selected diagram  */
  private selectedDiagram$$: Subscription;

  /** Subscription to the selected parcel year  */
  private selectedParcelYear$$: Subscription;

  /** Subscription to the selected schema  */
  private selectedSchema$$: Subscription;

  private schemaElementTransaction: EntityTransaction;
  private parcelYear: ClientParcelYear = undefined;

  /** Active client */
  get client(): Client { return this.client$.value; }

  /** Active client schema */
  get schema(): ClientSchema { return this.schema$.value; }

  /** Store that holds the diagrams of the active client */
  get diagramStore(): EntityStore<ClientParcelDiagram> { return this._diagramStore; }
  private _diagramStore: EntityStore<ClientParcelDiagram>;

  /** Store that holds all the "parcel years". This is not on a per client basis. */
  get parcelYearStore(): EntityStore<ClientParcelYear> { return this._parcelYearStore; }
  private _parcelYearStore: EntityStore<ClientParcelYear>;

  /** Parcel editor */
  get parcelEditor(): ClientParcelEditorService { return this.clientParcelEditorService; }

  /** Store that holds the parcels of the active client */
  get parcelStore(): FeatureStore<ClientParcel> {
    return this.parcelEditor.entityStore as FeatureStore<ClientParcel>;
  }

  /** Schema editor */
  get schemaEditor(): ClientSchemaEditorService {
    return this.clientSchemaEditorService;
  }

  /** Store that holds the schemas of the active client */
  get schemaStore(): EntityStore<ClientSchema> {
    return this.schemaEditor.entityStore as EntityStore<ClientSchema>;
  }

  /** Schema elements editor */
  get schemaElementEditor(): ClientSchemaElementEditorService {
    return this.clientSchemaElementEditorService;
  }

  /** Store that holds the elements of the active schema */
  get schemaElementStore(): FeatureStore<ClientSchemaElement> {
    return this.schemaElementEditor.entityStore as FeatureStore<ClientSchemaElement>;
  }

  constructor(
    private clientService: ClientService,
    private clientParcelYearService: ClientParcelYearService,
    private clientParcelEditorService: ClientParcelEditorService,
    private clientSchemaEditorService: ClientSchemaEditorService,
    private clientSchemaElementService: ClientSchemaElementService,
    private clientSchemaElementEditorService: ClientSchemaElementEditorService,
    private editionState: EditionState
  ) {
    this._diagramStore = new EntityStore<ClientParcelDiagram>([]);
    this._parcelYearStore = new EntityStore<ClientParcelYear>([]);

    this.schemaElementTransaction = new EntityTransaction();

    this.selectedDiagram$$ = this._diagramStore.stateView
      .firstBy$((record: EntityRecord<ClientParcelDiagram>) => record.state.selected === true)
      .subscribe((record: EntityRecord<ClientParcelDiagram>) => {
        const diagram = record ? record.entity : undefined;
        this.onSelectDiagram(diagram);
      });

    this.selectedParcelYear$$ = this._parcelYearStore.stateView
      .firstBy$((record: EntityRecord<ClientParcelYear>) => record.state.selected === true)
      .pipe(skip(1))
      .subscribe((record: EntityRecord<ClientParcelYear>) => {
        const parcelYear = record ? record.entity : undefined;
        this.onSelectParcelYear(parcelYear);
      });

    this.selectedSchema$$ = this.schemaStore.stateView
      .firstBy$((record: EntityRecord<ClientSchema>) => record.state.selected === true)
      .subscribe((record: EntityRecord<ClientSchema>) => {
        const schema = record ? record.entity : undefined;
        this.onSelectSchema(schema);
      });

    this.loadParcelYears();
  }

  ngOnDestroy() {
    this.selectedDiagram$$.unsubscribe();
    this.selectedParcelYear$$.unsubscribe();
    this.selectedSchema$$.unsubscribe();
  }

  getClientByNum(clientNum: string): Observable<Client> {
    const annee = this.parcelYear ? this.parcelYear.annee : undefined;
    return this.clientService.getClientByNum(clientNum, annee);
  }

  clearClient() {
    if (this.client === undefined) {
      return;
    }

    this.clearSchema();

    this.diagramStore.clear();
    this.parcelStore.clear();
    this.schemaStore.clear();

    this.parcelEditor.deactivate();
    this.schemaEditor.deactivate();
    this.schemaElementEditor.deactivate();

    this.editionState.unregister(this.parcelEditor);
    this.editionState.unregister(this.schemaEditor);

    this.client$.next(undefined);
  }

  setClient(client: Client | undefined) {
    this.clearClient();
    if (client === undefined) {
      return;
    }

    this.diagramStore.load(client.diagrams);
    this.diagramStore.view.sort({valueAccessor: (diagram) => diagram.id, direction: 'asc'});
    this.parcelStore.load(client.parcels);
    // moveToFeatures(
    //   this.parcelStore.map,
    //   this.parcelStore.source.ol.getFeatures()
    // );
    this.schemaStore.load(client.schemas);
    this.schemaEditor.setClient(client);

    this.editionState.register(this.parcelEditor);
    this.editionState.register(this.schemaEditor);

    this.client$.next(client);
  }

  private onSelectDiagram(diagram: ClientParcelDiagram) {
    this.parcelStore.state.clear();
    if (diagram === undefined) {
      this.parcelStore.view.filter(undefined);
    } else {
      const filterClause = function(parcel: ClientParcel): boolean {
        return parcel.properties.noDiagramme === diagram.id;
      };
      this.parcelStore.view.filter(filterClause);
    }
  }

  private onSelectParcelYear(parcelYear: ClientParcelYear) {
    this.parcelYear = parcelYear;
    if (this.client !== undefined) {
      this.getClientByNum(this.client.info.numero)
        .subscribe((client?: Client) => this.setClient(client));
    }
  }

  private onSelectSchema(schema: ClientSchema) {
    if (schema === undefined) {
      this.clearSchema();
    } else if  (this.schema === undefined) {
      this.setSchema(schema);
    } else if (schema.id !== this.schema.id) {
      this.setSchema(schema);
    }
  }

  private setSchema(schema: ClientSchema) {
    this.clearSchema();

    this.parcelStore.state.updateAll({selected: false});
    this.loadSchemaElements(schema);
    this.schemaElementEditor.setSchema(schema);
    this.schemaElementEditor.setTransaction(this.schemaElementTransaction);

    this.editionState.register(this.schemaElementEditor);

    this.schema$.next(schema);
  }

  private clearSchema() {
    if (this.schema === undefined) {
      return;
    }

    this.schemaElementTransaction.clear();
    this.clearSchemaElements();

    this.editionState.unregister(this.schemaElementEditor);

    this.schema$.next(undefined);
  }

  private loadSchemaElements(schema: ClientSchema) {
    this.clientSchemaElementService.getElements(schema)
      .subscribe((elements: ClientSchemaElement[]) => {
        this.schemaElementStore.load(elements);
      });
  }

  private clearSchemaElements() {
    this.schemaElementStore.clear();
  }

  private loadParcelYears() {
    this.clientParcelYearService.getParcelYears()
      .subscribe((parcelYears: ClientParcelYear[]) => {
        const current = parcelYears.find((parcelYear: ClientParcelYear) => {
          return parcelYear.current === true;
        });
        this.parcelYearStore.load(parcelYears);
        this.parcelYearStore.view.sort({
          valueAccessor: (year: ClientParcelYear) => year.annee,
          direction: 'desc'
        });
        if (current !== undefined) {
          this.parcelYearStore.state.update(current, {selected: true});
        }
      });
  }

}
