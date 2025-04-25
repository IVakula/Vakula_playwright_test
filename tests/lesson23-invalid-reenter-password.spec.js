import { test, expect } from '@playwright/test';
import { invalidUserRegistration } from '../credentials/invalidCredentials.js'
import { validUserRegistration } from '../credentials/validCredentials.js'
import {MainPage,RegistrationForm} from '../poms';

let mainPage;
let registrationForm;


test.describe('Registration with invalid data in the Re-enter Password field', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        registrationForm = new RegistrationForm(page);

        await page.goto('');
        await expect(page).toHaveTitle('Hillel Qauto');
    });

    test('Re-entered password does not match', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(validUserRegistration.password);
        await registrationForm.checkAndInputSignUpRepeatPassword(invalidUserRegistration.reenterpasswordInvalid);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpRepeatPassword('rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Empty the Re-entered password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(validUserRegistration.password);
        await registrationForm.checkAndClearSignUpRepeatPasswordInputField();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpRepeatPassword('rgb(220, 53, 69)', 'Re-enter password required');
    });
});