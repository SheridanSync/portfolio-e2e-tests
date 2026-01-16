import { test, expect } from '@playwright/test';
import { HomePage } from './home.page';

test.describe('Portfolio Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display correct hero information', async () => {
    await expect(homePage.heroGreeting).toBeVisible();
    await expect(homePage.heroTitle).toContainText('Senior Support & QA Automation');
  });

  test('should navigate to projects via navbar', async ({ page }) => {
    await homePage.nav.projectsLink.click();
    await expect(page).toHaveURL(/.*projects/);
  });

  test('should display specific work experience', async () => {
    const currentJob = homePage.getExperienceCard('Senior L3 Support');
    
    await expect(currentJob).toBeVisible();
    await expect(currentJob).toContainText('STX Next');
    await expect(currentJob).toContainText('Monitoring (Grafana/Kibana)');
  });

  test('should list Playwright in Testing & QA arsenal', async () => {
    const hasPlaywright = await homePage.hasSkill('Testing & QA', 'Playwright');
    expect(hasPlaywright).toBeTruthy();
  });

  test('should have contact buttons', async () => {
    await expect(homePage.linkedInButton).toBeVisible();
    await expect(homePage.emailButton).toBeVisible();
  });
});