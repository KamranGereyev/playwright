import test, { expect, Locator, Page } from '@playwright/test';

interface IElements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: IElements[];

  constructor(page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel('GitHub repository'),
        name: 'GitHub repository link',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel('Discord server'),
        name: 'Discord server link',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'),
        name: 'Switch between dark and light button',
      },
      {
        locator: (page: Page): Locator => page.getByLabel('Search (Command+K)'),
        name: 'Search Input',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }

  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }

  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      test.step(`Проверка отображения элементов ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible;
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (!text) return;
      test.step(`Проверка названий элементов ${name}`, async () => {
        await expect(locator(this.page)).toContainText(text);
      });
    }
  }

  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (!attribute) return;
      test.step(`Проверка атрибута href ${name}`, async () => {
        await expect(locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
      });
    }
  }

  async clickSwitchLightModeIcon() {
    await this.page.getByLabel('Switch between dark and light').click();
  }
  async checkDataThemeAttributeLight() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }
  async checkDataThemeAttributeDark() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }
  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot('pageWithDarkMode.png');
  }

  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot('pageWithLightMode.png');
  }
}
