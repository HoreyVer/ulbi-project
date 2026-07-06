import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoginForm } from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import useLoginStore from 'features/AuthByUsername/model/store/loginStore';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

export const Primary: ComponentStory<typeof LoginForm> = (args) => {
    useLoginStore.setState({
        username: '',
        password: '',
        isLoading: false,
        error: undefined,
    });
    return <LoginForm {...args} />;
};
Primary.args = {};

export const WithError: ComponentStory<typeof LoginForm> = (args) => {
    useLoginStore.setState({
        username: 'admin',
        password: '123',
        isLoading: false,
        error: 'Вы ввели неверный логин или пароль',
    });
    return <LoginForm {...args} />;
};
WithError.args = {};

export const Loading: ComponentStory<typeof LoginForm> = (args) => {
    useLoginStore.setState({
        username: 'admin',
        password: '123',
        isLoading: true,
        error: undefined,
    });
    return <LoginForm {...args} />;
};
Loading.args = {};
