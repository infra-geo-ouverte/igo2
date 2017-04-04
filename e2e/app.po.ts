import { browser, element, by } from 'protractor';

export class IgoPage {
  navigateTo() {
    return browser.get('/igo2/');
  }

  getNavigatorDiv() {
    return element(by.css('igo-app igo-navigator'));
  }

  getSearchBarInput() {
    return element(by.css('igo-app igo-search-bar input'));
  }

}
