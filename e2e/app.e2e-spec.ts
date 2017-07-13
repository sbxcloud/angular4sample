import { AngularRxSbxPage } from './app.po';

describe('angular-rx-sbx App', () => {
  let page: AngularRxSbxPage;

  beforeEach(() => {
    page = new AngularRxSbxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
