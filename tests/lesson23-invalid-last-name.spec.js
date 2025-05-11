import { test, expect } from '@playwright/test';
import { invalidUserRegistration } from '../credentials/invalidCredentials.js'
import { validUserRegistration } from '../credentials/validCredentials.js'
import {MainPage,RegistrationForm} from '../poms';

let mainPage;
let registrationForm;


test.describe('Registration with invalid data in the Last Name field', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        registrationForm = new RegistrationForm(page);

        await page.goto(''); 
        await expect(page).toHaveTitle('Hillel Qauto'); 
    });

    test('Empty the Last Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name)
        await registrationForm.checkAndClearSignUpLastNameInputField();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpLastName('rgb(220, 53, 69)', 'Last name required');
    });

    test('Digital characters in the Last Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name)
        await registrationForm.checkAndInputSignUpLastName(invalidUserRegistration.digits);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpLastName('rgb(220, 53, 69)', 'Last name is invalid');
    });

    test('One characters in the Last Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name)
        await registrationForm.checkAndInputSignUpLastName(invalidUserRegistration.oneSymbol);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpLastName('rgb(220, 53, 69)', 'Last name has to be from 2 to 20 characters long');
    });

    test('30 characters in the Last Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(validUserRegistration.name)
        await registrationForm.checkAndInputSignUpLastName(invalidUserRegistration.manySymbols);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpLastName('rgb(220, 53, 69)', 'Last name has to be from 2 to 20 characters long');
    });

});