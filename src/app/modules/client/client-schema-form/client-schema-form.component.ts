import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { EntityFormModel } from '../../entity/shared/entity.interface';
import { ClientSchema } from '../shared/client.interface';

@Component({
  selector: 'fadq-client-schema-form',
  templateUrl: './client-schema-form.component.html',
  styleUrls: ['./client-schema-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaFormComponent {

  static model: EntityFormModel = {
    fields: [
      {
        name: 'id',
        title: 'Numéro de schéma',
        cols: 1
      },
      {
        name: 'type',
        title: 'Type de schéma',
        cols: 1
      },
      {
        name: 'description',
        title: 'Description',
        cols: 2
      },
      {
        name: 'annee',
        title: 'Année',
        cols: 1
      },
      {
        name: 'etat',
        title: 'État',
        cols: 1
      }
    ]
  };

  @Input()
  get schema(): ClientSchema {
    return this._schema;
  }
  set schema(value: ClientSchema) {
    this._schema = value;
    this.cdRef.detectChanges();
  }
  private _schema: ClientSchema;

  get model(): EntityFormModel {
    return ClientSchemaFormComponent.model;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

}
