import { Page, Locator } from '@playwright/test';
import { NavigationComponent } from '../tests/navigation.component';

export abstract class BasePage {
  readonly page: Page;
  readonly nav: NavigationComponent;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavigationComponent(page);
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }
}