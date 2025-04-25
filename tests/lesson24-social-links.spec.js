import { test, expect } from '@playwright/test';
import { SocialLinks } from '../poms';

let socialLinks;

test.describe('Checking Contacts menu', () => {
    test.beforeEach(async ({ page }) => {
        socialLinks = new SocialLinks(page);
        await page.goto('');
        await expect(page).toHaveTitle('Hillel Qauto');
    });

    test('Check Facebook social link', async ({ page }) => {
        await socialLinks.checkFacebookSocialLinkButtonAndClick();
        const pagePromise = page.waitForEvent('popup');
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://www.facebook.com/Hillel.IT.School');
    });

    test('Check Telegram social link', async ({ page }) => {
        await socialLinks.checkTelegramSocialLinkButtonAndClick();
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toEqual('Open Telegram?');
            await dialog.dismiss();
        });
        const pagePromise = page.waitForEvent('popup');
        const newTab = await pagePromise;
        await expect(newTab).toHaveURL('https://t.me/ithillel_kyiv');
    });

    test('Check Youtube social link', async ({ page }) => {
        await socialLinks.checkYoutubeSocialLinkButtonAndClick();
        const pagePromise = page.waitForEvent('popup');
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        expect(newTab.url()).toContain('www.youtube.com');
    });

    test('Check Instagram social link', async ({ page }) => {
        await socialLinks.checkInstagramSocialLinkButtonAndClick();
        const pagePromise = page.waitForEvent('popup');
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://www.instagram.com/hillel_itschool/');

    });

    test('Check Linkenin social link', async ({ page }) => {
        await socialLinks.checkLinkedinSocialLinkButtonAndClick();
        const pagePromise = page.waitForEvent('popup');
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        expect(newTab.url()).toContain('www.linkedin.com');
    });
});