const path = require('path');

module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    features: {
        buildStoriesJson: true,
    },
    // Указываем Storybook, где лежит папка с переводами public/locales
    // Путь пишется относительно текущего файла main.js
    staticDirs: ['../../public'],
    webpackFinal: async (config) => {
        // Позволяет Storybook понимать абсолютные импорты FSD (shared, ui и т.д.)
        config.resolve.modules.push(path.resolve(__dirname, '..', '..', 'src'));

        return config;
    },
};
