import { create } from 'zustand';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User } from '../types/user';

interface UserStore {
    authData?: User;
    setAuthData: (user: User) => void;
    initAuthData: () => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    authData: undefined,

    setAuthData: (user) => set({ authData: user }),

    initAuthData: () => {
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            set({ authData: JSON.parse(user) });
        }
    },

    logout: () => {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        set({ authData: undefined });
    },
}));
export default useUserStore;
