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

import { BehaviorSubject, Subscription } from 'rxjs';

import { EntityRecord, EntityStore, EntityStoreController } from '@igo2/common';

import { ClientSchema } from '../shared/client-schema.interfaces';
import { getClientSchemaTitle } from '../shared/client-schema.utils';

@Component({
  selector: 'fadq-client-schema-selector',
  templateUrl: './client-schema-selector.component.html',
  styleUrls: ['./client-schema-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaSelectorComponent implements OnInit, OnDestroy {

  /**
   * The current schema
   * @internal
   */
  public current$ = new BehaviorSubject<ClientSchema>(undefined);

  private selected$$: Subscription;

  private controller: EntityStoreController<ClientSchema>;

  @Input() store: EntityStore<ClientSchema>;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    schema: ClientSchema;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
    this.selected$$ = this.store.stateView
      .firstBy$((record: EntityRecord<ClientSchema>) => record.state.selected === true)
      .subscribe((record: EntityRecord<ClientSchema>) => {
        this.current$.next(record ? record.entity : undefined);
      });
  }

  ngOnDestroy() {
    this.controller.destroy();
    this.selected$$.unsubscribe();
  }

  getSchemaTitle(schema: ClientSchema): string {
    return getClientSchemaTitle(schema);
  }

  onSelectionChange(event: {value: ClientSchema}) {
    const schema = event.value;
    this.store.state.update(schema, {selected: true}, true);
    this.selectedChange.emit({selected: true, schema});
  }

}
