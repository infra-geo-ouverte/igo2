import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Entity, EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { ClientSchema } from '../shared/client.interface';

@Component({
  selector: 'fadq-client-schemas-table',
  templateUrl: './client-schemas-table.component.html',
  styleUrls: ['./client-schemas-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemasTableComponent {

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

  get model(): EntityTableModel {
    return ClientSchemasTableComponent.model;
  }

  @Input()
  get store(): EntityStore<Entity<ClientSchema>> {
    return this._store;
  }
  set store(value: EntityStore<Entity<ClientSchema>>) {
    this._store = value;
  }
  private _store;

}
