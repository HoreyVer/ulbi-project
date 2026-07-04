import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        // ОТКЛЮЧАЕМ SUSPENSE ДЛЯ ТЕСТОВОЙ СРЕДЫ (STORYBOOK):
        react: {
            useSuspense: false,
        },
        // Пустой объект ресурсов, чтобы i18n работал мгновенно без загрузки файлов
        resources: { ru: { translations: {} } },
    });

export default i18n;
