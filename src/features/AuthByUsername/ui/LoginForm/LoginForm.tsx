import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useCallback } from 'react';
import { TextTheme, Text } from 'shared/ui/Text/Text';
import { loginStore } from 'features/AuthByUsername';
import { observer } from 'mobx-react-lite';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = observer(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const onChangeUsername = useCallback((value: string) => {
        loginStore.setUsername(value);
    }, []);

    const onChangePassword = useCallback((value: string) => {
        loginStore.setPassword(value);
    }, []);

    const onLoginClick = useCallback(() => {
        // 3. Метод сам заберет username и password из стора, зависимости [] пустые
        loginStore.loginByUsername();
    }, []);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />

            {/* 4. Читаем все данные напрямую из loginStore через точку */}
            {loginStore.error && <Text text={loginStore.error} theme={TextTheme.ERROR} />}

            <Input
                autoFocus
                type="text"
                className={cls.input}
                placeholder={t('Введите username')}
                onChange={onChangeUsername}
                value={loginStore.username}
            />
            <Input
                type="password" // Лучше сменить на password, чтобы скрывать символы
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={loginStore.password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={loginStore.isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
