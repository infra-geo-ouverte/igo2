describe('App', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('IGO 2');
  });

  /*it('should have <nav>', () => {
    expect(element(by.css('igo-app sd-navbar nav')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', () => {
    expect(element(by.css('igo-app sd-navbar nav a:first-child')).getText()).toEqual('Carte');
  });

  it('should have correct nav text for About', () => {
    expect(element(by.css('igo-app sd-navbar nav a:nth-child(2)')).getText()).toEqual('Données');
  });*/

});
