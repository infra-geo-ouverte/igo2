import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { EntityRecord, EntityStore } from '@igo2/common';
import {
  FeatureStore,
  FeatureStoreLoadingStrategy,
  FeatureStoreSelectionStrategy
} from '@igo2/geo';
import { EditionState, MapState } from '@igo2/integration';

import {
  Client,
  ClientService,
  ClientParcelDiagram,
  ClientParcel,
  ClientParcelYear,
  ClientParcelYearService,
  ClientSchema,
  ClientSchemaElement,
  createParcelLayer,
  createSchemaElementLayer,
  createClientDefaultSelectionStyle
} from 'src/lib/client';

import { ClientParcelState} from './client-parcel.state';
import { ClientSchemaState} from './client-schema.state';
import { ClientSchemaElementState } from './client-schema-element.state';

/**
 * Service that holds the state of the client module
 */
@Injectable({
  providedIn: 'root'
})
export class ClientState implements OnDestroy {

  /** Observable of the active client */
  public client$ = new BehaviorSubject<Client>(undefined);

  /** Observable of the client error, if any */
  public clientError$ = new BehaviorSubject<string>(undefined);

  /** Observable of the active schema */
  public schema$ = new BehaviorSubject<ClientSchema>(undefined);

  /** Subscription to the selected diagram  */
  private selectedDiagram$$: Subscription;

  /** Subscription to the selected parcel year  */
  private selectedParcelYear$$: Subscription;

  /** Subscription to the selected schema  */
  private selectedSchema$$: Subscription;

  /** Current parcel year  */
  private parcelYear: ClientParcelYear = undefined;

  /** Active client */
  get client(): Client { return this.client$.value; }

  /** Active schema */
  get schema(): ClientSchema { return this.schema$.value; }

  /** Store that holds the diagrams of the active client */
  get diagramStore(): EntityStore<ClientParcelDiagram> {
    return this.parcelState.diagramStore;
  }

  /** Store that holds all the "parcel years". This is not on a per client basis. */
  get parcelYearStore(): EntityStore<ClientParcelYear> {
    return this.parcelState.parcelYearStore;
  }

  /** Store that holds the parcels of the active client */
  get parcelStore(): FeatureStore<ClientParcel> {
    return this.parcelState.parcelStore;
  }

  /** Store that holds the schemas of the active client */
  get schemaStore(): EntityStore<ClientSchema> {
    return this.schemaState.schemaStore;
  }

  /** Store that holds the elements of the active schema */
  get schemaElementStore(): FeatureStore<ClientSchemaElement> {
    return this.elementState.elementStore;
  }

  constructor(
    private parcelState: ClientParcelState,
    private schemaState: ClientSchemaState,
    private elementState: ClientSchemaElementState,
    private editionState: EditionState,
    private mapState: MapState,
    private clientService: ClientService
  ) {
    this.selectedDiagram$$ = this.diagramStore.stateView
      .firstBy$((record: EntityRecord<ClientParcelDiagram>) => record.state.selected === true)
      .subscribe((record: EntityRecord<ClientParcelDiagram>) => {
        const diagram = record ? record.entity : undefined;
        this.onSelectDiagram(diagram);
      });

    this.selectedParcelYear$$ = this.parcelYearStore.stateView
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

    this.addClientLayers();
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

  setClient(client: Client | undefined) {
    this.clearClient();

    if (client === undefined) { return; }

    this.parcelState.setClient(client);
    this.schemaState.setClient(client);

    this.editionState.register(this.parcelState.editor);
    this.editionState.register(this.schemaState.editor);
    this.editionState.setEditor(this.parcelState.editor);

    this.client$.next(client);
  }

  setClientError(error: string | undefined) {
    this.clientError$.next(error);
  }

  clearClient() {
    if (this.client === undefined) { return; }

    this.clearSchema();

    this.parcelState.setClient(undefined);
    this.schemaState.setClient(undefined);

    this.editionState.register(this.parcelState.editor);
    this.editionState.register(this.schemaState.editor);

    this.client$.next(undefined);
  }

  private onSelectDiagram(diagram: ClientParcelDiagram) {
    this.parcelState.setDiagram(diagram);
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
    this.elementState.setSchema(schema);

    this.editionState.register(this.elementState.editor);
    this.editionState.setEditor(this.schemaState.editor);

    this.schema$.next(schema);
  }

  private clearSchema() {
    if (this.schema === undefined) { return; }

    this.elementState.setSchema(undefined);
    this.editionState.unregister(this.elementState.editor);
    this.schema$.next(undefined);
  }

  /**
   * Add all kinds of layers related to a client;
   * parcels, schema points, schema lines, schema surfaces.
   * Also bind them to a feature store and initialize the loading and selection strategies.
   */
  private addClientLayers() {
    const map = this.mapState.map;

    const clientParcelLayer = createParcelLayer();
    map.addLayer(clientParcelLayer, false);
    this.parcelStore.bindLayer(clientParcelLayer);

    const clientSchemaElementLayer = createSchemaElementLayer();
    map.addLayer(clientSchemaElementLayer, false);
    this.schemaElementStore.bindLayer(clientSchemaElementLayer);

    const parcelLoadingStrategy = new FeatureStoreLoadingStrategy({});
    this.parcelStore.addStrategy(parcelLoadingStrategy);

    const schemaElementLoadingStrategy = new FeatureStoreLoadingStrategy({});
    this.schemaElementStore.addStrategy(schemaElementLoadingStrategy);
    schemaElementLoadingStrategy.activate();

    const sharedSelectionStrategy = new FeatureStoreSelectionStrategy({
      map: map,
      style: createClientDefaultSelectionStyle()
    });
    this.parcelStore.addStrategy(sharedSelectionStrategy);
    this.schemaElementStore.addStrategy(sharedSelectionStrategy);

    parcelLoadingStrategy.activate();
    schemaElementLoadingStrategy.activate();
    sharedSelectionStrategy.activate();
  }

}
