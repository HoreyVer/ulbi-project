import { makeAutoObservable, runInAction } from 'mobx';
import { userStore } from 'entities/User';
// Импортируем стандартный axios
import axios from 'axios';
import { LoginSchema } from 'features/AuthByUsername';

export class LoginStore implements LoginSchema {
    username = '';

    password = '';

    isLoading = false;

    error: string | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    async loginByUsername() {
        this.error = undefined;
        this.isLoading = true;

        try {
            // 🎯 Указываем полный путь до json-server (порт 8000)
            const response = await axios.post('http://localhost:8000/login', {
                username: this.username,
                password: this.password,
            });

            runInAction(() => {
                this.isLoading = false;
                // Сохраняем пользователя в глобальный стор
                userStore.setAuthData(response.data);
            });
        } catch (err: any) {
            runInAction(() => {
                this.isLoading = false;
                this.error = err.response?.data?.message || 'Произошла ошибка при входе';
            });
        }
    }
}

export const loginStore = new LoginStore();
