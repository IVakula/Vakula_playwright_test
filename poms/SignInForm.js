import { BasePage } from '../poms';

export default class SignInForm extends BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page);
        this.inputFieldEmail = this.page.locator('form input[name="email"]');
        this.inputFieldPassword = this.page.locator('form input[name="password"]');
        this.logInButton = this.page.locator('//button[contains(text(), "Login")]')
    };

    async checkAndInputSignInEmail(inputEmail) {
        await this.checkInputFieldAndFill(this.inputFieldEmail, inputEmail);
    };

    async checkAndInputSignInPassword(inputPassword) {
        await this.checkInputFieldAndFill(this.inputFieldPassword, inputPassword);
    };

    async checkAndClickLogInButton() {
        await this.checkButtonAndClick(this.logInButton);
    };
}