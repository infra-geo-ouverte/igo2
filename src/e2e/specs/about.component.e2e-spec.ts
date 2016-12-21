describe('About', () => {

  beforeEach(async () => {
    return await browser.get('/about');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('h1')).getText()).toEqual('IGO 2');
  });

});
