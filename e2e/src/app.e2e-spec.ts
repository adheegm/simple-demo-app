import { AppPage } from './app.po';

describe('Simple demo app Network page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('page title should be Recent transactions', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Recent transaction');
  });

  it('should have cdkVirtualScrollViewport', () => {
    page.navigateTo();
    expect(page.getCdkVirtualScrollElement()).toBeTruthy();
  });

  it('total element on table should be 10', () => {
    page.navigateTo();
    expect(page.getTableTotalElements().count()).toEqual(10);
  });
});
