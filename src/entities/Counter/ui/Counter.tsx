import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { Button } from '../../../shared/ui/Button/Button';
import { counterStore } from '../model/CounterStore';

export const Counter = observer(() => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 data-testid="value-title">{counterStore.value}</h1>
            <Button
                onClick={() => counterStore.increment()}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={() => counterStore.decrement()}
            >
                {t('decrement')}
            </Button>
        </div>
    );
});
