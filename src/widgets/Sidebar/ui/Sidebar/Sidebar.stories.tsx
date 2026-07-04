import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { userStore } from 'entities/User';
// 1. Импортируем провайдер и тестовую конфигурацию переводов
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { Sidebar } from './Sidebar';

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // 2. Добавляем декоратор переводов, чтобы useTranslation внутри сайдбара не ломал код
    decorators: [
        (Story) => (
            <I18nextProvider i18n={i18nForTests}>
                <Story />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof Sidebar>;

export const Light = () => {
    userStore.authData = undefined;
    return <Sidebar />;
};

export const Dark = () => {
    userStore.authData = undefined;
    return <Sidebar />;
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
