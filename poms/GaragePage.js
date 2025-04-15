import { BasePage } from '../poms';

export default class GaragePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.logOutButton = this.page.locator('//span[@class="icon icon-logout"]/parent::a');
  };

  async chechLogOutButtonAndClick() {
    await this.checkButtonAndClick(this.logOutButton);
  };
}