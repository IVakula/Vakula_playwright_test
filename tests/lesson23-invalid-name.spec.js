import { test, expect } from '@playwright/test';
import { invalidUserRegistration } from '../credentials/invalidCredentials.js'
import {MainPage,RegistrationForm} from '../poms';

let mainPage;
let registrationForm;

test.describe('Registration with invalid data in the Name field', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        registrationForm = new RegistrationForm(page);

        await page.goto('https://qauto.forstudy.space/'); 
        await expect(page).toHaveTitle('Hillel Qauto'); 
    });

    test('Empty the Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndClearSignUpNameInputField();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpName('rgb(220, 53, 69)', 'Name required');
    });

    test('Digital characters in the Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(invalidUserRegistration.digits);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpName('rgb(220, 53, 69)', 'Name is invalid');
    });

    test('One characters in the Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(invalidUserRegistration.oneSymbol);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpName('rgb(220, 53, 69)', 'Name has to be from 2 to 20 characters long');
    });

    test('30 characters in the Name field', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();
        await registrationForm.checkAndInputSignUpName(invalidUserRegistration.manySymbols);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await registrationForm.checkErrorSingUpName('rgb(220, 53, 69)', 'Name has to be from 2 to 20 characters long');
    });

});