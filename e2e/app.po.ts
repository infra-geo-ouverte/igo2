import { browser, element, by } from 'protractor';

export class IgoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('igo-app h1')).getText();
  }
}
