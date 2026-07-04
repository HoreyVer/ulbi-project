import { makeAutoObservable } from 'mobx';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User } from './types/user';

class UserStore {
    authData: User | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get isAuthorized(): boolean {
        return Boolean(this.authData);
    }

    setAuthData(user: User) {
        this.authData = user;
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
    }

    initAuthData() {
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            this.authData = JSON.parse(user);
        }
    }

    logout() {
        this.authData = undefined;
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    }
}

export const userStore = new UserStore();
