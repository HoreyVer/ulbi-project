import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

// ✅ 1. Мокаем i18next, чтобы thunk возвращал предсказуемое значение
jest.mock('i18next', () => ({
    t: (key: string) => key, // Возвращает сам ключ перевода
}));

// ✅ 2. Валидный редьюсер-заглушка (убирает warning Redux)
const dummyReducer = (state = {}) => state;

describe('loginByUsername.test', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: { dummy: dummyReducer },
        });
    });

    test('success login', async () => {
        const userValue = { username: 'test', id: '1' };
        // ✅ 3. mockResolvedValueOnce изолирует тест и не требует двойного Promise
        mockedAxios.post.mockResolvedValueOnce({ data: userValue });

        const action = loginByUsername({ username: 'test', password: '123' });
        const result = await store.dispatch(action);

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Auth error'));

        const action = loginByUsername({ username: 'test', password: 'wrong' });
        const result = await store.dispatch(action);

        expect(result.meta.requestStatus).toBe('rejected');
        // ✅ 4. Ожидаем то, что реально возвращает thunk через rejectWithValue
        expect(result.payload).toBe('Вы ввели неверный логин или пароль');
    });
});
