import { create } from 'zustand';

interface CounterState {
    value: number;
    increment: () => void;
    decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
    value: 0,
    increment: () => set((state) => ({ value: state.value + 1 })),
    decrement: () => set((state) => ({ value: state.value - 1 })),
}));

export default useCounterStore;
