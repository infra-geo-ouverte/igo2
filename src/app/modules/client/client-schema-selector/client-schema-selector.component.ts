import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  EntityStore,
  EntityStoreController,
  State,
  getEntityTitle
} from 'src/app/modules/entity';

import { ClientSchema } from '../shared';

@Component({
  selector: 'fadq-client-schema-selector',
  templateUrl: './client-schema-selector.component.html',
  styleUrls: ['./client-schema-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaSelectorComponent implements OnInit, OnDestroy {

  public schema$: Observable<ClientSchema>;

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<ClientSchema> {
    return this._store;
  }
  set store(value: EntityStore<ClientSchema>) {
    this._store = value;
  }
  private _store;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    schema: ClientSchema;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
    this.schema$ = this.store
      .observeFirstBy((schema: ClientSchema, state: State) => state.selected === true);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  getSchemaTitle(schema: ClientSchema): string {
    return getEntityTitle(schema);
  }

  onSelectionChange(event: {value: ClientSchema}) {
    const schema = event.value;
    this.controller.updateEntityState(schema, {selected: true}, true);
    this.selectedChange.emit({selected: true, schema});
  }

}
