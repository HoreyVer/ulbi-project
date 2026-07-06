import { useCounterStore } from '../model/store/counterStore';

describe('Counter Store', () => {
    beforeEach(() => {
        useCounterStore.setState({ value: 0 });
    });

    test('должен иметь начальное значение 0', () => {
        const count = useCounterStore.getState().value;
        expect(count).toBe(0);
    });

    test('должен увеличивать значение при вызове increment', () => {
        useCounterStore.getState().increment();
        expect(useCounterStore.getState().value).toBe(1);
    });
});
