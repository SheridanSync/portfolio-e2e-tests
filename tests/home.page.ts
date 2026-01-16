import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  // --- Hero Section ---
  readonly heroGreeting: Locator;
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;

  // --- Experience Section ---
  readonly experienceSectionTitle: Locator;
  readonly experienceCards: Locator;

  // --- Technical Arsenal Section ---
  readonly techStackSectionTitle: Locator;
  readonly techStackCards: Locator;

  // --- Contact Section ---
  readonly contactSectionTitle: Locator;
  readonly linkedInButton: Locator;
  readonly emailButton: Locator;

  // --- Footer ---
  readonly footerText: Locator;

  constructor(page: Page) {
    super(page);

    // Hero
    this.heroGreeting = page.getByText("Hello, I'm Łukasz");
    this.heroTitle = page.getByRole('heading', { name: 'Senior Support & QA Automation' });
    this.heroDescription = page.locator('section').first().locator('.bg-navy-900\\/50');

    // Experience (02. Professional Trajectory)
    this.experienceSectionTitle = page.getByRole('heading', { name: '02. Professional Trajectory' });
    // Pobieramy wszystkie karty doświadczenia (divy wewnątrz sekcji experience)
    this.experienceCards = page.locator('#experience .relative.pl-8');

    // Tech Stack (03. Technical Arsenal)
    this.techStackSectionTitle = page.getByRole('heading', { name: '03. Technical Arsenal' });
    this.techStackCards = page.locator('section').filter({ hasText: '03. Technical Arsenal' }).locator('.grid > div');

    // Contact
    this.contactSectionTitle = page.getByRole('heading', { name: 'Get In Touch' });
    this.linkedInButton = page.getByRole('link', { name: 'LinkedIn' });
    this.emailButton = page.getByRole('link', { name: 'Email Me' });

    // Footer
    this.footerText = page.locator('footer');
  }

  /**
   * Pobiera konkretną kartę doświadczenia na podstawie tytułu stanowiska.
   * Ułatwia to testowanie konkretnych wpisów bez polegania na indeksach.
   */
  getExperienceCard(jobTitle: string): Locator {
    return this.experienceCards.filter({ hasText: jobTitle });
  }

  /**
   * Pobiera kartę technologii na podstawie nazwy kategorii (np. "Automation & Scripting")
   */
  getTechStackCard(categoryName: string): Locator {
    return this.techStackCards.filter({ hasText: categoryName });
  }

  /**
   * Sprawdza czy dana umiejętność (np. "Playwright") znajduje się w konkretnej kategorii
   */
  async hasSkill(categoryName: string, skillName: string): Promise<boolean> {
    const card = this.getTechStackCard(categoryName);
    const skill = card.getByText(skillName);
    return await skill.isVisible();
  }
}