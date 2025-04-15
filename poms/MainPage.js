import { BasePage } from '../poms';

export default class MainPage extends BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page);
        this.signUpButton = this.page.locator('//button[contains(text(), "Sign up")]');
        this.signInButton = this.page.locator('//button[contains(text(), "Sign In")]');
    };

    async checkSignUpButtonAndClick() {
        this.checkButtonAndClick(this.signUpButton);
    };

    async checkSignInButtonAndClick() {
        this.checkButtonAndClick(this.signInButton);
    };
}