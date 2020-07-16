import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleText() {
    return element(by.css('app-root app-network .network-table-title span')).getText();
  }

  getCdkVirtualScrollElement() {
    return element(by.tagName('cdk-virtual-scroll-viewport'));
  }

  getTableTotalElements() {
    return element.all(by.css('.network-table-items .table-row'));
  }
}
