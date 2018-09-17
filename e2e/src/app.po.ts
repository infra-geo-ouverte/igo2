import { browser, element, by } from 'protractor';

export class IgoPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavigatorDiv() {
    return element(by.css('app-portal'));
  }

  getSearchBarInput() {
    return element(by.css('app-portal igo-search-bar input'));
  }

}
