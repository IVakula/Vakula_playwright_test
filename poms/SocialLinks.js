import { BasePage } from '.';

export default class SocialLinks extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.facebookSocialLinkButton = this.page.locator('//a[@href="https://www.facebook.com/Hillel.IT.School"]');
    this.telegramSocialLinkButton = this.page.locator('//a[@href="https://t.me/ithillel_kyiv"]');
    this.youtubeSocialLinkButton = this.page.locator('//a[@href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]');
    this.instagramSocialLinkButton = this.page.locator('//a[@href="https://www.instagram.com/hillel_itschool/"]');
    this.linkedinSocialLinkButton = this.page.locator('//a[@href="https://www.linkedin.com/school/ithillel/"]');
  };

  async checkFacebookSocialLinkButtonAndClick() {
    await this.checkButtonAndClick(this.facebookSocialLinkButton);
  };

  async checkTelegramSocialLinkButtonAndClick() {
    await this.checkButtonAndClick(this.telegramSocialLinkButton);
  };

  async checkYoutubeSocialLinkButtonAndClick() {
    await this.checkButtonAndClick(this.youtubeSocialLinkButton);
  };

  async checkInstagramSocialLinkButtonAndClick() {
    await this.checkButtonAndClick(this.instagramSocialLinkButton);
  };

  async checkLinkedinSocialLinkButtonAndClick() {
    await this.checkButtonAndClick(this.linkedinSocialLinkButton);
  };
}