import { test, expect } from '@playwright/test';

test('Скриншоты всех сторисов', async ({ page }) => {
    // Увеличиваем таймаут для этого тяжелого теста до 5 минут
    test.setTimeout(300000);

    // Получаем список всех сторисов через API Storybook
    const response = await page.goto('http://localhost:6006/stories.json');
    const data = await response?.json();

    const stories = Object.entries(data.stories)
        .map(([id, entry]: [string, any]) => ({
            id,
            name: `${entry.title}-${entry.name}`.replace(/\//g, '-'),
        }));

    // eslint-disable-next-line no-restricted-syntax
    for (const story of stories) {
        // eslint-disable-next-line no-await-in-loop
        await page.goto(
            `http://localhost:6006/iframe.html?id=${story.id}&viewMode=story`
        );

        // Используем универсальный селектор: проверяем и #storybook-root, и #root
        // eslint-disable-next-line no-await-in-loop
        const rootSelector = await page.locator('#storybook-root, #root').first();

        // Ожидаем появления самого контейнера, а не его детей (это быстрее и надежнее)
        // eslint-disable-next-line no-await-in-loop
        await rootSelector.waitFor({ state: 'visible', timeout: 5000 });

        // eslint-disable-next-line no-await-in-loop
        await expect(rootSelector).toHaveScreenshot(
            `${story.name}.png`,
            {
                animations: 'disabled',
            },
        );
    }
});