import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests'; // Импортируем конфигурацию i18n для тестов
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('успешно отрисовывается на странице', () => {
        render(
            <MemoryRouter>
                <I18nextProvider i18n={i18nForTests}>
                    <Sidebar />
                </I18nextProvider>
            </MemoryRouter>,
        );
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('переключается (сворачивается) при клике на кнопку', async () => {
        render(
            <MemoryRouter>
                <I18nextProvider i18n={i18nForTests}>
                    <Sidebar />
                </I18nextProvider>
            </MemoryRouter>,
        );

        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');

        await userEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
