import { test as base } from '@playwright/test';
import { GaragePage } from '../poms';

export const test = base.extend({
    garagePage: async ({ page, baseURL }, use) => {
        // before test
        const garagePage = new GaragePage(page);
        await page.goto(baseURL);

        //for test
        await use(garagePage);

        // after test
        await garagePage.removeAllCars();
    }
});

export { expect } from '@playwright/test';