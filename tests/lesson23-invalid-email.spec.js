import { test, expect } from '@playwright/test';
import { invalidUserRegistration } from '../credentials/invalidCredentials.js'
import { validUserRegistration } from '../credentials/validCredentials.js'
import {MainPage,RegistrationForm} from '../poms';

let mainPage;
let registrationForm;


test.describe('Registration with invalid data in the Email field', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        registrationForm = new RegistrationForm(page);

        await page.goto('https://qauto.forstudy.space/');
        await expect(page).toHaveTitle('Hillel Qauto');
    });

    test('Empty the Email field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        await registrationForm.checkAndClearSignUpEmailInputField();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpEmail('rgb(220, 53, 69)', 'Email required');
    });

    test('Wrong data in the Email field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        await registrationForm.checkAndInputSignUpEmail(invalidUserRegistration.emailInvalid);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpEmail('rgb(220, 53, 69)', 'Email is incorrect');
    });
});