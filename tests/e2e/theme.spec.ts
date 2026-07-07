import { expect, test } from '@playwright/test';

test('checking theme', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByTestId('theme-switcher').click();
    let localStorageTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(localStorageTheme).toBe('app_dark_theme');
    expect(await page.evaluate(() => document.body.className)).toContain('app_dark_theme');
    await page.getByTestId('theme-switcher').click();
    localStorageTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(localStorageTheme).toBe('app_light_theme');
    expect(await page.evaluate(() => document.body.className)).toContain('app_light_theme');
});
