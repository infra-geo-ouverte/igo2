import { Injectable } from '@angular/core';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/store';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  private store: DataStore<Record>;

  constructor() {
    this.store = new DataStore<Record>();
  }

  getStore(): DataStore<Record> {
    return this.store;
  }
}
