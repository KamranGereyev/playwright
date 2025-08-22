import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';
// metod soft -eto maqkaya proverka, proxodit po vsem testam esli test polomalsa

let mainPage: MainPage;

test.describe('тесты главной страницы', () => {
  // qruppirovka testov
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });
  test('Проверка отображения элементов навигации хеадер', async ({ page }) => {
    await mainPage.checkElementsVisibility();
  });
  test('Проверка названий элементов навигации хеадер', async ({ page }) => {
    await mainPage.checkElementsText();
  });
  test('Проверка атрибута href элементов навигации хеадер', async ({ page }) => {
    await mainPage.checkElementsHrefAttribute();
  });
  test('Проверка переключения лайт мода', async ({ page }) => {
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeLight();
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeDark();
  });
  test(`Проверка стилей светлой темой`, async ({ page }) => {
    await mainPage.setLightMode();
    await mainPage.checkLayoutWithLightMode();
  });

  test(`Проверка стилей темной темой`, async ({ page }) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
