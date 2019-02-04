import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import { EntityStore, getEntityId } from 'src/lib/entity';
import { Form } from 'src/lib/form';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema, ClientSchemaUpdateData } from '../shared/client-schema.interfaces';
import { ClientSchemaService } from '../shared/client-schema.service';
import { ClientSchemaFormService } from '../shared/client-schema-form.service';

@Component({
  selector: 'fadq-client-schema-update-form',
  templateUrl: './client-schema-update-form.component.html',
  styleUrls: ['./client-schema-update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaUpdateFormComponent extends WidgetComponent implements OnInit {

  public form$ = new Subject<Form>();

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
    private clientSchemaFormService: ClientSchemaFormService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.clientSchemaFormService.buildUpdateForm()
      .subscribe((form: Form) => this.form$.next(form));
  }

  onSubmit(data: {[key: string]: any}) {
    const schemaData = Object.assign({}, data, {
      id: parseInt(getEntityId(this.schema), 10)
    }) as ClientSchemaUpdateData;

    this.clientSchemaService.updateSchema(this.schema, schemaData)
      .subscribe((schema: ClientSchema) => this.onSubmitSuccess(schema));
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(schema: ClientSchema) {
    this.store.putEntities([schema]);
    this.complete.emit();
  }

}
