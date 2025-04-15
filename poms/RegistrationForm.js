import { expect } from '@playwright/test';
import { BasePage } from '../poms';

import { validUserRegistration } from '../credentials/validCredentials.js'

export default class RegistrationForm extends BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page);
        this.registrationForm = this.page.locator('div.modal-content');
        this.signUpName = this.page.locator('[id="signupName"]');
        this.signUpLastName = this.page.locator('[id="signupLastName"]');
        this.signUpEmail = this.page.locator('[id="signupEmail"]');
        this.signUpPassword = this.page.locator('[id="signupPassword"]');
        this.sigUpRepeatPassword = this.page.locator('[id="signupRepeatPassword"]');
        this.registrationButton = this.page.locator('//button[contains(text(), "Register")]'); 
        this.registrationFormWindow = this.page.locator('//h4[contains(text(),"Registration")]');
        this.invalidFeedback = this.page.locator('.invalid-feedback');
    };

    async checkRegistrationFormIsVisible() {
        await this.checkElementIsVisible(this.registrationForm);
    };

    async checkAndInputSignUpName(inputName) {
        await this.checkInputFieldAndFill(this.signUpName, inputName);
    };

    async checkAndInputSignUpLastName(inputLastName) {
        await this.checkInputFieldAndFill(this.signUpLastName, inputLastName);
    };

    async checkAndInputSignUpEmail(inputEmail) {
        await this.checkInputFieldAndFill(this.signUpEmail, inputEmail);
    };

    async checkAndInputSignUpPassword(inputPassword) {
        await this.checkInputFieldAndFill(this.signUpPassword, inputPassword);
    };

    async checkAndInputSignUpRepeatPassword(inputPassword) {
        await this.checkInputFieldAndFill(this.sigUpRepeatPassword, inputPassword);
    };

    async checkRegistrationButtonAndClick() {
        await this.checkButtonAndClick(this.registrationButton);
    };

    generateEmail() {
        const randomValue = Math.floor(Math.random() * 100000);
        return validUserRegistration.prefixEmail + randomValue + validUserRegistration.email;
    };

    async checkAndClearSignUpNameInputField() {
        await this.checkAndClearInputField(this.signUpName);
    };

    async checkAndClearSignUpLastNameInputField() {
        await this.checkAndClearInputField(this.signUpLastName);
    };

    async checkAndClearSignUpEmailInputField() {
        await this.checkAndClearInputField(this.signUpEmail);
    };
    async checkAndClearSignUpPasswordInputField() {
        await this.checkAndClearInputField(this.signUpPassword);
    };
    async checkAndClearSignUpRepeatPasswordInputField() {
        await this.checkAndClearInputField(this.sigUpRepeatPassword);
    };

    async checkAndClickRegistrationFormWindow() {
        await expect(this.registrationFormWindow).toBeVisible();
        await this.registrationFormWindow.click();
    };

    async #checkError(locator,color, message){
        const borderColor= await locator.evaluate((el) =>
            window.getComputedStyle(el).getPropertyValue('border-color'));
        expect(borderColor.trim()).toBe(color);
        await expect(this.invalidFeedback).toHaveText(message);
        await expect(this.registrationButton).not.toBeEnabled();
    };

    async checkErrorSingUpName(color, message){
        await this.#checkError(this.signUpName, color, message);
    };

    async checkErrorSingUpLastName(color, message){
        await this.#checkError(this.signUpLastName, color, message);
    };

    async checkErrorSingUpEmail(color, message){
        await this.#checkError(this.signUpEmail, color, message);
    };

    async checkErrorSingUpPassword(color, message){
        await this.#checkError(this.signUpPassword, color, message);
    };

    async checkErrorSingUpRepeatPassword(color, message){
        await this.#checkError(this.sigUpRepeatPassword, color, message);
    };

}
