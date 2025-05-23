import PlusIcon from '@/shared/assets/icons/trash.svg';
import { NumberInput } from '@/shared/ui';

export const CalculatorModelRow = () => {
  return (
    <div className={'calculator-table__model-row'}>
      <div className={'calculator-table__model-row-cell'}>
        <div className={'calculator-table__model-row-title'}>
          Bitmain Antminer S21 Pro 234 Th/s
        </div>
        <div className={'calculator-table__model-row-info'}>
          <div>
            <div className={'calculator-table__model-row-key'}>Алгоритм</div>
            <div className={'calculator-table__model-row-value'}>SHA-256</div>
          </div>
          <div>
            <div className={'calculator-table__model-row-key'}>
              Потребление, Вт.
            </div>
            <div className={'calculator-table__model-row-value'}>3520</div>
          </div>
        </div>
      </div>
      <div className={'calculator-table__model-row-value'}>234</div>
      <NumberInput variant={'calculator'} min={1} defaultValue={1} />
      <div className={'calculator-table__model-row-values'}>
        <div className={'calculator-table__model-row-wrapper'}>
          <div className={'calculator-table__model-row-value'}>25 300,65 ₽</div>
          <div className={'calculator-table__model-row-value'}>11 361,45 ₽</div>
        </div>
        <div className={'calculator-table__model-row-value'}>439 805, 00 ₽</div>
        <div className={'calculator-table__model-row-value'}>880 805, 00 ₽</div>
      </div>
      <button className={'calculator-table__model-row-button'}>
        <PlusIcon />
      </button>
    </div>
  );
};
