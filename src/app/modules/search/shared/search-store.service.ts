import { Injectable } from '@angular/core';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  private store: DataStore<Record>;

  constructor() {
    this.store = new DataStore();
  }

  getStore(): DataStore<Record> {
    return this.store;
  }
}
