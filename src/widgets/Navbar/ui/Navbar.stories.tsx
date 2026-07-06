import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import useUserStore from 'entities/User/model/store/userStore'; // 👈 1. Импортируем ваш Zustand стор
import { Navbar } from './Navbar';

export default {
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

// 2. Переписываем Light как функцию, чтобы внутри управлять стором
export const Light: ComponentStory<typeof Navbar> = (args) => {
    // Принудительно очищаем пользователя (появится кнопка "Войти")
    useUserStore.setState({ authData: undefined });
    return <Navbar {...args} />;
};
Light.args = {};
// 👈 3. ОБЯЗАТЕЛЬНО добавляем декоратор светлой темы, чтобы фон стал темным/синим, как в приложении!
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

// 4. Переписываем Dark
export const Dark: ComponentStory<typeof Navbar> = (args) => {
    useUserStore.setState({ authData: undefined });
    return <Navbar {...args} />;
};
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

// 5. Добавим историю для проверки авторизованного состояния (кнопка "Выйти")
export const Authorized: ComponentStory<typeof Navbar> = (args) => {
    // Закидываем фейковые данные пользователя в Zustand
    useUserStore.setState({
        authData: { id: '1', username: 'admin' },
    });
    return <Navbar {...args} />;
};
Authorized.args = {};
Authorized.decorators = [ThemeDecorator(Theme.LIGHT)];
