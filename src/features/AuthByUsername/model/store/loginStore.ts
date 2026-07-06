import { create } from 'zustand';
import useUserStore from 'entities/User/model/store/userStore';
import axios from 'axios';

interface LoginStore {
    username: string;
    password: string;
    isLoading: boolean;
    error: string | undefined;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    loginByUsername: () => Promise<void>;
}

export const useLoginStore = create<LoginStore>((set, get) => ({
    username: '',
    password: '',
    isLoading: false,
    error: undefined,
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),

    loginByUsername: async () => {
        set({ error: undefined, isLoading: true });

        const { username, password } = get();

        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password,
            });

            set({ isLoading: false });

            useUserStore.getState().setAuthData(response.data);
        } catch (err: any) {
            set({
                isLoading: false,
                error: err.response?.data?.message || 'Произошла ошибка при входе',
            });
        }
    },
}));
export default useLoginStore;
