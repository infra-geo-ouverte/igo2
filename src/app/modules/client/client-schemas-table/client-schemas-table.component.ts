import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { ClientSchema } from '../shared/client.interface';

export interface Column {
  name: string;
  label: string;
}


@Component({
  selector: 'fadq-client-schemas-table',
  templateUrl: './client-schemas-table.component.html',
  styleUrls: ['./client-schemas-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemasTableComponent {

  public columns: Column[] = [
    {name: 'id', label: 'Numéro de schéma'},
    {name: 'type', label: 'Type de schéma'},
    {name: 'description', label: 'Description'},
    {name: 'annee', label: 'Année'},
    {name: 'etat', label: 'État'}
  ];

  get headers(): string[] {
    return this.columns.map(column => column.label);
  }

  get dataSource(): Observable<Entity<ClientSchema>[]> {
    return this.store.observable;
  }

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Entity<ClientSchema>> {
    return this._store;
  }
  set store(value: EntityStore<Entity<ClientSchema>>) {
    this._store = value;
  }
  private _store;

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
  }

}
