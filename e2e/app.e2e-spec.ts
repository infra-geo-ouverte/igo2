import { browser, element, by } from 'protractor';
import { IgoPage } from './app.po';

describe('igo App', function() {
  let page: IgoPage;

  beforeEach(() => {
    page = new IgoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('igo works!');
  });
});
