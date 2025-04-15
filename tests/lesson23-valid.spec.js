import { test, expect } from '@playwright/test';
import { validUserRegistration } from '../credentials/validCredentials.js'
import {MainPage,RegistrationForm,GaragePage,SignInForm} from '../poms';

let mainPage;
let registrationForm;
let garagePage;
let signInForm;

test.describe('Tests with valid credentials', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        registrationForm = new RegistrationForm(page);
        garagePage = new GaragePage(page);
        signInForm = new SignInForm(page);

        await page.goto('https://qauto.forstudy.space/');
        await expect(page).toHaveTitle('Hillel Qauto');
    });

    test('Registration with valid credentials', async ({ page }) => {
        await mainPage.checkSignUpButtonAndClick();
        await registrationForm.checkRegistrationFormIsVisible();

        await registrationForm.checkAndInputSignUpName(validUserRegistration.name);
        await registrationForm.checkAndInputSignUpLastName(validUserRegistration.lastName);
        const email = registrationForm.generateEmail();
        await registrationForm.checkAndInputSignUpEmail(email);
        await registrationForm.checkAndInputSignUpPassword(validUserRegistration.password);
        await registrationForm.checkAndInputSignUpRepeatPassword(validUserRegistration.password);
        await registrationForm.checkRegistrationButtonAndClick();

        await expect(page).toHaveURL('panel/garage');
        await garagePage.chechLogOutButtonAndClick();
        await expect(page).toHaveURL('');

        //checking log in and log out for the created user
        await mainPage.checkSignInButtonAndClick();
        await signInForm.checkAndInputSignInEmail(email);
        await signInForm.checkAndInputSignInPassword(validUserRegistration.password);
        await signInForm.checkAndClickLogInButton();

        await expect(page).toHaveURL('panel/garage');
        await garagePage.chechLogOutButtonAndClick();
        await expect(page).toHaveURL('');
    });
}); 