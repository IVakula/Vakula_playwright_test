import { test, expect } from '@playwright/test';
import { invalidUserRegistration } from '../credentials/invalidCredentials.js'
import { validUserRegistration } from '../credentials/validCredentials.js'
import {MainPage,RegistrationForm} from '../poms';

let mainPage;
let registrationForm;

test.describe('Registration with invalid data in the Password field', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        registrationForm = new RegistrationForm(page);

        await page.goto('https://qauto.forstudy.space/');
        await expect(page).toHaveTitle('Hillel Qauto');
    });

    test('Empty the Password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndClearSignUpPasswordInputField();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpPassword('rgb(220, 53, 69)', 'Password required');
    });

    test('One symbol in the Password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(invalidUserRegistration.passwordOneSymbol);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpPassword('rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('16 symbol in the Password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(invalidUserRegistration.passwordManySymbols);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpPassword('rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Only capital symbols in the Password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(invalidUserRegistration.passwordOnlyCapitalSymbols);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpPassword('rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Only character symbols in the Password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(invalidUserRegistration.passwordOnlyCharacters);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpPassword('rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Without capital characters in the Password field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(invalidUserRegistration.passwordWithoutCapitalSymbol);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpPassword('rgb(220, 53, 69)', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

});