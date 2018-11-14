import { Injectable } from '@angular/core';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Client, ClientSchema } from './client.interface';
import { clientSchemaToEntity } from './client.utils';

@Injectable({
  providedIn: 'root'
})
export class ClientStoreService {

  private client: Client;
  private schemaStore: EntityStore<Entity<ClientSchema>>;

  constructor() {
    this.schemaStore = new EntityStore<Entity<ClientSchema>>();
  }

  setClient(client: Client) {
    this.client = client;
    this.schemaStore.setEntities(client.schemas.map(clientSchemaToEntity));
  }

  getClient(): Client {
    return this.client;
  }

  getSchemaStore(): EntityStore<Entity<ClientSchema>> {
    return this.schemaStore;
  }
}
