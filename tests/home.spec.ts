import { test, expect } from '@playwright/test';
import { HomePage } from './home.page';

test.describe('Portfolio Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test.describe('Hero Section', () => {
    test('should display correct hero information', async () => {
      await expect(homePage.heroGreeting).toBeVisible();
      await expect(homePage.heroGreeting).toHaveText("Hello, I'm Łukasz");

      await expect(homePage.heroTitle).toBeVisible();
      await expect(homePage.heroTitle).toHaveText('Senior Support & QA Automation');

      await expect(homePage.heroDescription).toBeVisible();
      await expect(homePage.heroDescription).toContainText('Senior L3 Support Engineer');
      await expect(homePage.heroDescription).toContainText('PowerShell scripting');
      await expect(homePage.heroDescription).toContainText('Playwright automation');
    });
  });

  test.describe('Navigation', () => {
    test('should have navigation elements', async () => {
      await expect(homePage.nav.logoLink).toBeVisible();
      await expect(homePage.nav.homeLink).toBeVisible();
      await expect(homePage.nav.projectsLink).toBeVisible();
      await expect(homePage.nav.languageButton).toBeVisible();
    });

    test('should navigate to projects via navbar', async ({ page }) => {
      await homePage.nav.projectsLink.click();
      await expect(page).toHaveURL(/.*projects/);
    });
  });

  test.describe('Experience Section', () => {
    test('should display "Professional Trajectory" title', async () => {
      await expect(homePage.experienceSectionTitle).toBeVisible();
      await expect(homePage.experienceSectionTitle).toHaveText('02. Professional Trajectory');
    });

    const experiences = [
      {
        role: 'Senior L3 Support',
        company: 'STX Next',
        period: 'Sep 2024 - Present',
        tags: ['Monitoring (Grafana/Kibana)', 'API Testing (Postman)', 'Dashboard Automation (15h -> 40min)']
      },
      {
        role: 'Prompt Engineer',
        company: 'OneForma',
        period: 'Jan 2025 - Jun 2025',
        tags: ['AI Model training', 'NLP']
      },
      {
        role: 'L1/L2 Support',
        company: 'PTW International',
        period: 'Dec 2022 - Jul 2024',
        tags: ['PowerShell Automation', 'SLA 21s', 'Mentorship']
      },
      {
        role: 'Tier 2 Support',
        company: 'ModSquad',
        period: 'Apr 2021 - Apr 2024',
        tags: ['CSAT 95%', 'Bug Diagnosis']
      }
    ];

    for (const exp of experiences) {
      test(`should display experience card: ${exp.role}`, async () => {
        const card = homePage.getExperienceCard(exp.role);
        await expect(card).toBeVisible();
        await expect(card).toContainText(exp.company);
        await expect(card).toContainText(exp.period);
        
        for (const tag of exp.tags) {
          await expect(card).toContainText(tag);
        }
      });
    }
  });

  test.describe('Technical Arsenal Section', () => {
    test('should display "Technical Arsenal" title', async () => {
      await expect(homePage.techStackSectionTitle).toBeVisible();
      await expect(homePage.techStackSectionTitle).toHaveText('03. Technical Arsenal');
    });

    const techStacks = [
      {
        category: 'Automation & Scripting',
        skills: ['PowerShell', 'Python', 'Bash']
      },
      {
        category: 'Testing & QA',
        skills: ['Playwright', 'Postman', 'API Testing', 'Manual Testing']
      },
      {
        category: 'Observability',
        skills: ['Grafana', 'Kibana', 'SQL']
      },
      {
        category: 'Management',
        skills: ['ITIL 4', 'Jira', 'Confluence']
      }
    ];

    for (const stack of techStacks) {
      test(`should display tech stack category: ${stack.category}`, async () => {
        const card = homePage.getTechStackCard(stack.category);
        await expect(card).toBeVisible();

        for (const skill of stack.skills) {
          const hasSkill = await homePage.hasSkill(stack.category, skill);
          expect(hasSkill, `Skill ${skill} should be visible in ${stack.category}`).toBeTruthy();
        }
      });
    }
  });

  test.describe('Contact Section', () => {
    test('should display "Get In Touch" title', async () => {
      await expect(homePage.contactSectionTitle).toBeVisible();
      await expect(homePage.contactSectionTitle).toHaveText('Get In Touch');
    });

    test('should have correct LinkedIn button', async () => {
      await expect(homePage.linkedInButton).toBeVisible();
      await expect(homePage.linkedInButton).toHaveAttribute('href', 'https://www.linkedin.com/in/lukstr1997/');
      await expect(homePage.linkedInButton).toHaveAttribute('target', '_blank');
      await expect(homePage.linkedInButton).toContainText('LinkedIn');
    });

    test('should have correct Email button', async () => {
      await expect(homePage.emailButton).toBeVisible();
      await expect(homePage.emailButton).toHaveAttribute('href', 'mailto:lukaszstrzelewicz797@gmail.com');
      await expect(homePage.emailButton).toContainText('Email Me');
    });
  });

  test.describe('Footer', () => {
    test('should display footer text', async () => {
      await expect(homePage.footerText).toBeVisible();
      await expect(homePage.footerText).toContainText('Built with React, Tailwind & Playwright pipelines');
    });
  });
});