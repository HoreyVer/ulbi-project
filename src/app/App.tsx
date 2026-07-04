import React, { Suspense, useEffect } from 'react';
import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { userStore } from 'entities/User';
// 1. Импортируем observer
import { observer } from 'mobx-react-lite';

// 2. Оборачиваем весь компонент App
const App = observer(() => {
    const { theme } = useTheme();

    useEffect(() => {
        // Отработает один раз при старте
        userStore.initAuthData();
    }, []); // Оставляем пустым!

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
});

export default App;
