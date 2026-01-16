import { Page, Locator } from '@playwright/test';

export class NavigationComponent {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly homeLink: Locator;
  readonly projectsLink: Locator;
  readonly languageButton: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Elementy nawigacji
    this.logoLink = page.locator('nav a[href="#/"]').first(); // Logo z imieniem
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.projectsLink = page.getByRole('link', { name: 'Projects' });
    this.languageButton = page.locator('button').filter({ hasText: 'EN' });
    
    // Mobile
    this.mobileMenuButton = page.locator('.md\\:hidden button');
  }
}