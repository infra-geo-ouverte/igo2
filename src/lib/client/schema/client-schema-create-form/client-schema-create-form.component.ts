import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import { EntityStore } from 'src/lib/entity';
import { Form } from 'src/lib/form';
import { WidgetComponent } from 'src/lib/widget';

import { Client } from '../../shared/client.interfaces';
import { ClientSchema, ClientSchemaCreateData } from '../shared/client-schema.interfaces';
import { ClientSchemaService } from '../shared/client-schema.service';
import { ClientSchemaFormService } from '../shared/client-schema-form.service';

@Component({
  selector: 'fadq-client-schema-create-form',
  templateUrl: './client-schema-create-form.component.html',
  styleUrls: ['./client-schema-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaCreateFormComponent extends WidgetComponent implements OnInit {

  public form$ = new Subject<Form>();

  @Input() client: Client;

  @Input()
  get schema(): ClientSchema {
    return this._schema;
  }
  set schema(value: ClientSchema) {
    this._schema = value;
    this.cdRef.detectChanges();
  }
  private _schema: ClientSchema;

  @Input() store: EntityStore<ClientSchema>;

  constructor(
    private clientSchemaService: ClientSchemaService,
    private clientSchemaFormService: ClientSchemaFormService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.clientSchemaFormService.buildCreateForm()
      .subscribe((form: Form) => this.form$.next(form));
  }

  onSubmit(data: {[key: string]: any}) {
    const schemaData = Object.assign({
      numeroClient: this.client.info.numero
    }, data) as ClientSchemaCreateData;

    this.clientSchemaService.createSchema(schemaData)
      .subscribe((schema: ClientSchema) => this.onSubmitSuccess(schema));
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(schema: ClientSchema) {
    if (this.store !== undefined) {
      this.store.addEntities([schema]);
    }
    this.complete.emit();
  }

}
