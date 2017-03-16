import { IgoPage } from './app.po';
import {} from 'jasmine';

describe('igo App', () => {
  let page: IgoPage;

  beforeEach(() => {
    page = new IgoPage();
  });

  it('should have navigator div', () => {
    page.navigateTo();
    expect(page.getNavigatorDiv().isPresent()).toBeTruthy();
  });

  // it('should display placeholder in search bar', () => {
  //   page.navigateTo();
  //   expect(page.getSearchBarInput().getAttribute('placeholder'))
  //   .toEqual('Search for an address or a place');
  // });

});
