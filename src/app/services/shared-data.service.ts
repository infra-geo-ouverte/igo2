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

  private sidenavTemplateSubject = new BehaviorSubject<TemplateRef<any> | null>(
    null
  );
  sidenavTemplate$ = this.sidenavTemplateSubject.asObservable();

  private sidenavResultsSubject = new BehaviorSubject<boolean>(false);
  sidenavResults$ = this.sidenavResultsSubject.asObservable();

  constructor() {}

  setShowSearchBar(value: boolean) {
    this.showSearchBarSubject.next(value);
  }

  setSearchBarTemplate(template: TemplateRef<any>) {
    this.searchBarTemplateSubject.next(template);
  }

  setSidenavTemplate(template: TemplateRef<any>) {
    this.sidenavTemplateSubject.next(template);
  }

  setSidenavResults(hasResults: boolean) {
    this.sidenavResultsSubject.next(hasResults);
  }
}
