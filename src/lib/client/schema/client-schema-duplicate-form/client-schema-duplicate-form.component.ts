import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { EntityStore } from 'src/lib/entity';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../shared/client-schema.interfaces';
import { ClientSchemaService } from '../shared/client-schema.service';

@Component({
  selector: 'fadq-client-schema-duplicate-form',
  templateUrl: './client-schema-duplicate-form.component.html',
  styleUrls: ['./client-schema-duplicate-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaDuplicateFormComponent extends WidgetComponent {

  @Input() store: EntityStore<ClientSchema>;

  @Input()
  set schema(value: ClientSchema) {
    this._schema = value;
    this.cdRef.detectChanges();
  }
  get schema(): ClientSchema { return this._schema; }
  private _schema: ClientSchema;

  constructor(
    private clientSchemaService: ClientSchemaService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  onSubmit() {
    this.clientSchemaService.duplicateSchema(this.schema)
      .subscribe((schema: ClientSchema) => this.onSubmitSuccess(schema));
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(schema: ClientSchema) {
    this.store.addEntities([schema]);
    this.complete.emit();
  }

}
