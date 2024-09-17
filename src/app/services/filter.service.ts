import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  valuesMap = new Map<string, string>();
  filter = new BehaviorSubject<Map<string, string>>(this.valuesMap);

  constructor() {}

  onFilter(key: string, value: string) {
    this.valuesMap.set(key, value);
    this.filter.next(this.valuesMap);
  }

  onDelete(key: string) {
    this.valuesMap.delete(key);
    this.filter.next(this.valuesMap);
  }
}
