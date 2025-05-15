import { BasePage } from '../poms';

export default class GaragePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.logOutButton = this.page.locator('//span[@class="icon icon-logout"]/parent::a');
    this.addCarButton = this.page.locator('app-garage button[class="btn btn-primary"]');
    this.carBrand = this.page.locator('select[id="addCarBrand"]');
    this.carModel = this.page.locator('select[id="addCarModel"]');
    this.carMileage = this.page.locator('input[id="addCarMileage"]');
    this.popupAddButton = this.page.locator('app-add-car-modal button[class="btn btn-primary"]');
    this.carInGarage = this.page.locator('div[class="car jumbotron"]');
    this.addedCarName = this.page.locator('app-car div p[class="car_name h2"]')
    this.profileButton = this.page.locator('a[routerlink="profile"]');
    this.profileName = this.page.locator('//p[contains( @class, "profile_name")]');
  };

  async checkButtonAddCarAndClick() {
    await this.checkButtonAndClick(this.addCarButton);
  };

  async checkButtonProfileAndClick() {
    await this.checkButtonAndClick(this.profileButton);
  };

  async checkProfileName(text) {
    await this.checkElementByText(this.profileName, text);
  };

  async selectBrand(text) {
    await this.selectValueByText(this.carBrand, text);
  };

  async selectModel(text) {
    await this.selectValueByText(this.carModel, text);
  };

  async checkAndInputMileage(text) {
    await this.checkInputFieldAndFill(this.carMileage, text);
  };

  async checkAndClickPopupAddCarButton() {
    await this.checkButtonAndClick(this.popupAddButton);
  };

  async checkAddedCar() {
    await this.checkElementIsVisible(this.carInGarage);
  };

  async checkAddedCarName(text) {
    await this.checkElementByText(this.addedCarName, text);
  };

  async removeAllCars() {
    const cars = await this.page.request.get('/api/cars')
    const body = JSON.parse(await cars.body());

    for (const elm of body.data) {
      await this.page.request.delete(`/api/cars/${elm.id}`);
    }
  };
}