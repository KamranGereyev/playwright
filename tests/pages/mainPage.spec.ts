import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';
// metod soft -eto maqkaya proverka, proxodit po vsem testam esli test polomalsa

test.describe('тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хеадер', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });
  test('Проверка названий элементов навигации хеадер', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });
  test('Проверка атрибута href элементов навигации хеадер', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });
  test('Проверка переключения лайт мода', async ({ mainPage }) => {
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeLight();
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeDark();
  });
  test(`Проверка стилей светлой темой`, async ({ mainPage }) => {
    await mainPage.setLightMode();
    await mainPage.checkLayoutWithLightMode();
  });

  test(`Проверка стилей темной темой`, async ({ mainPage }) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
