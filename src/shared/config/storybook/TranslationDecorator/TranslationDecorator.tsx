import { Story } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import React, { Suspense } from 'react';
import i18nForTests from 'shared/config/i18n/i18nForTests'; // Важно использовать конфиг для тестов!

export const TranslationDecorator = (StoryComponent: Story) => (
    // eslint-disable-next-line i18next/no-literal-string
    <Suspense fallback={<div>Loading translations...</div>}>
        <I18nextProvider i18n={i18nForTests}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
);
