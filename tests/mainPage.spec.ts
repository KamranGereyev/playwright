import { test, expect, Page, Locator } from '@playwright/test';
// metod soft -eto maqkaya proverka, proxodit po vsem testam esli test polomalsa

interface IElements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: IElements[] = [
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

const lightMods = ['light', 'dark'];

test.describe('тесты главной страницы', () => {
  // qruppirovka testov
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хеадер', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элементов ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible;
      });
    });
  });
  test('Проверка названий элементов навигации хеадер', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (!text) return;
      test.step(`Проверка названий элементов ${name}`, async () => {
        await expect(locator(page)).toContainText(text);
      });
    });
  });
  test('Проверка атрибута href элементов навигации хеадер', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (!attribute) return;
      test.step(`Проверка атрибута href ${name}`, async () => {
        await expect(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
      });
    });
  });
  lightMods.forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
