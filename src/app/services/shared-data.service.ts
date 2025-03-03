import { Injectable, TemplateRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private showSearchBarSubject = new BehaviorSubject<boolean>(false);
  showSearchBar$ = this.showSearchBarSubject.asObservable();

  private searchBarTemplateSubject =
    new BehaviorSubject<TemplateRef<any> | null>(null);
  searchBarTemplate$ = this.searchBarTemplateSubject.asObservable();

  constructor() {}

  setShowSearchBar(value: boolean) {
    this.showSearchBarSubject.next(value);
  }

  setSearchBarTemplate(template: TemplateRef<any>) {
    this.searchBarTemplateSubject.next(template);
  }
}
