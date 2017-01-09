import { browser, element, by } from 'protractor';

describe('About', () => {

  beforeEach(async () => {
    // TODO: utiliser env file
    return await browser.get('/igo2/login');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('h1')).getText()).toEqual('IGO 2');
  });

});
