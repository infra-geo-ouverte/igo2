import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { ClientSchema } from '../shared/client.interface';

@Component({
  selector: 'fadq-client-schema-table',
  templateUrl: './client-schema-table.component.html',
  styleUrls: ['./client-schema-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaTableComponent {

  static model: EntityTableModel = {
    selection: true,
    columns: [
      {
        name: 'id',
        title: 'Numéro de schéma',
        sortable: true
      },
      {
        name: 'type',
        title: 'Type de schéma',
        sortable: true
      },
      {
        name: 'description',
        title: 'Description'
      },
      {
        name: 'annee',
        title: 'Année',
        sortable: true
      },
      {
        name: 'etat',
        title: 'État',
        sortable: true
      }
    ]
  };

  @Input()
  get store(): EntityStore<ClientSchema> {
    return this._store;
  }
  set store(value: EntityStore<ClientSchema>) {
    this._store = value;
  }
  private _store;

  get model(): EntityTableModel {
    return ClientSchemaTableComponent.model;
  }

  constructor() {}

}
