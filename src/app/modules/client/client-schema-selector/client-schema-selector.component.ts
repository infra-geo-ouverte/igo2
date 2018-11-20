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

import { getEntityTitle } from '../../entity/shared/entity.utils';
import { State } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { ClientSchema } from '../shared/client.interface';

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

  @Output() select = new EventEmitter<ClientSchema>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store.state.reset();
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

  selectSchema(schema: ClientSchema) {
    this.controller.updateEntityState(schema, {selected: true}, true);
    this.select.emit(schema);
  }

}
