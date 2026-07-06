import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCounterStore } from 'entities/Counter';

export const Counter = () => {
    const counterValue = useCounterStore((state) => state.value);
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);
    const { t } = useTranslation();

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={increment}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={decrement}
            >
                {t('decrement')}
            </Button>
        </div>
    );
};
