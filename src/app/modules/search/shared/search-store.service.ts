import { Injectable } from '@angular/core';

import { DataStore } from '../../data/shared/datastore';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  private store: DataStore;

  constructor() {
    this.store = new DataStore();
  }

  getStore(): DataStore {
    return this.store;
  }
}
