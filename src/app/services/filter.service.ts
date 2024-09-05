import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filter = new BehaviorSubject<string>('');

  constructor() {}

  onFilter(filter: any) {
    this.filter.next(filter);
  }
}
