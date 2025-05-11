import { test as setup, expect } from '@playwright/test';
import { MainPage, SignInForm } from '../poms/index.js';
import { fixturesSetupCredentials } from '../credentials/fixturesSetupCredentials.js'


let mainPage;
let signInForm;

const authFile = 'session-storage.json';

setup('Login before settings tests',
  async({ page, baseURL }) => {
    mainPage = new MainPage(page);
    signInForm =  new SignInForm(page);

    await page.goto(baseURL);
    await mainPage.checkSignInButtonAndClick();
    await signInForm.checkAndInputSignInEmail(fixturesSetupCredentials.email);
    await signInForm.checkAndInputSignInPassword(fixturesSetupCredentials.password);
    await signInForm.checkAndClickLogInButton();

    await expect(page).toHaveURL('panel/garage');
    
    await page.context().storageState({ path: authFile });
  });