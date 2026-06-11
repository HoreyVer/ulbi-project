import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    use: {
        // URL, по которому доступен Storybook
        baseURL: 'http://localhost:6006',
        trace: 'on-first-retry',
    },
    webServer: {
        // Команда для автоматического запуска Storybook перед тестами
        command: 'npm run storybook',
        url: 'http://localhost:6006',
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});