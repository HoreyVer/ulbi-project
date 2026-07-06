import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback } from 'react';
import { TextTheme, Text } from 'shared/ui/Text/Text';

import useLoginStore from 'features/AuthByUsername/model/store/loginStore';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    // ✅ 1. РЕАКТИВНО достаем все нужные переменные через хук Zustand
    const username = useLoginStore((state) => state.username);
    const password = useLoginStore((state) => state.password);
    const isLoading = useLoginStore((state) => state.isLoading);
    const error = useLoginStore((state) => state.error);

    // ✅ 2. Достаем функции-экшены тоже через хук стора
    const setUsername = useLoginStore((state) => state.setUsername);
    const setPassword = useLoginStore((state) => state.setPassword);
    const loginByUsername = useLoginStore((state) => state.loginByUsername);

    // ✅ 3. Привязываем экшены в колбэки (не забываем указать их в зависимостях)
    const onChangeUsername = useCallback((value: string) => {
        setUsername(value);
    }, [setUsername]);

    const onChangePassword = useCallback((value: string) => {
        setPassword(value);
    }, [setPassword]);

    const onLoginClick = useCallback(() => {
        loginByUsername();
    }, [loginByUsername]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
            <Input
                autoFocus
                type="text"
                className={cls.input}
                placeholder={t('Введите username')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="password" /* 💡 Изменили на password, чтобы скрывать точки при вводе */
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
