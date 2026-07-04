import { counterStore } from '../model/CounterStore';

describe('CounterStore', () => {
    // Перед каждым тестом возвращаем счетчик в исходное состояние
    beforeEach(() => {
        counterStore.value = 0;
    });

    test('должен иметь начальное значение 0', () => {
        expect(counterStore.value).toBe(0);
    });

    test('метод increment должен увеличивать значение на 1', () => {
        counterStore.increment();
        expect(counterStore.value).toBe(1);
    });

    test('метод decrement должен уменьшать значение на 1', () => {
        counterStore.decrement();
        expect(counterStore.value).toBe(-1);
    });

    test('геттер doubleValue должен возвращать удвоенное значение', () => {
        counterStore.value = 5;
        expect(counterStore.doubleValue).toBe(10);
    });
});
