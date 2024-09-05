import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search = new BehaviorSubject<{
    key: string;
    value: string;
  }>({
    key: '',
    value: '',
  });

  constructor() {}

  onTitle(value: string) {
    this.search.next({
      key: 'title',
      value,
    });
  }

  onSeries(value: string) {
    this.search.next({
      key: 'series',
      value,
    });
  }

  onTag(value: string) {
    this.search.next({
      key: 'tag',
      value,
    });
  }
}
