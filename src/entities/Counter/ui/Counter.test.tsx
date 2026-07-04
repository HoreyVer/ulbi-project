import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';
import { counterStore } from '../model/CounterStore';

describe('Counter', () => {
    // Перед каждым тестом сбрасываем значение счетчика в 0
    beforeEach(() => {
        counterStore.value = 0;
    });

    test('отрисовывается с начальным значением 0', () => {
        render(<Counter />);
        expect(screen.getByTestId('value-title')).toHaveTextContent('0');
    });

    test('increment увеличивает значение на 1', async () => {
        render(<Counter />);
        const incrementBtn = screen.getByTestId('increment-btn');
        await userEvent.click(incrementBtn);
        expect(screen.getByTestId('value-title')).toHaveTextContent('1');
    });
});
