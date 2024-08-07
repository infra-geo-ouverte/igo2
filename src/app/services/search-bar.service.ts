import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  searchBarOpened = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggle() {
    if (this.searchBarOpened.getValue()) this.close();
    else this.open();
  }

  open() {
    this.searchBarOpened.next(true);
  }

  close() {
    this.searchBarOpened.next(false);
  }
}
