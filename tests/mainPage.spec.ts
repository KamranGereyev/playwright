import { test, expect, Page, Locator } from '@playwright/test';

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
];

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
  test('Проверка переключение дарк моде', async ({ page }) => {
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
  test('Проверка загаловки страницы', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable end-to-end testing for modern web apps.',
    );
  });
  // metod soft -eto maqkaya proverka, proxodit po vsem testam esli test polomalsa
  test('Проверка кнопки Get Started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
