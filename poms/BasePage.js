import { expect } from '@playwright/test';
export default class BasePage {
  /**
     * @param {import('@playwright/test').Page} page
     */
  constructor(page) {
    this.page = page;
  }

  async checkButtonAndClick(locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  };

  async checkElementIsVisible(locator) {
    await expect(locator).toBeVisible();
  };

  async checkInputFieldAndFill(locator, inputText) {
    await expect(locator).toBeVisible();
    await locator.clear();
    await locator.fill(inputText);
    await expect(locator).toHaveValue(inputText);
  };

  async checkURL(page, url) {
    await expect(page).toHaveURL(url);
  };

  async checkAndClearInputField(locator) {
    await expect(locator).toBeVisible();
    await locator.clear();
  };

  async selectValueByText(locator, text){
    await locator.selectOption(text);
  };

  async checkElementByText(locator, text){
    await expect(locator).toHaveText(text);
  };
}