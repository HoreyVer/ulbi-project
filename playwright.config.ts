import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.ts',
    use: {
        // URL, по которому доступен Storybook
        baseURL: 'http://localhost:6006',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run storybook:build && npm run preview-storybook',
        port: 6006,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
