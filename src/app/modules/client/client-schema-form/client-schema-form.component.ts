import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { ClientSchema } from '../shared/client.interface';

@Component({
  selector: 'fadq-client-schema-form',
  templateUrl: './client-schema-form.component.html',
  styleUrls: ['./client-schema-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaFormComponent {

  @Input()
  get schema(): ClientSchema {
    return this._schema;
  }
  set schema(value: ClientSchema) {
    this._schema = value;
    this.cdRef.detectChanges();
  }
  private _schema: ClientSchema;

  constructor(private cdRef: ChangeDetectorRef) {}

}
