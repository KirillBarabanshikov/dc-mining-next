import { FC } from 'react';

import PlusIcon from '@/shared/assets/icons/trash.svg';
import { NumberInput } from '@/shared/ui';

import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Currency, Model, Product } from '../../model/types';

interface ICalculatorModelRowProps {
  model: Model;
  currency: Currency;
  removeModel: (product: Product) => void;
  setModelCount: (product: Product, count: number) => void;
}

export const CalculatorModelRow: FC<ICalculatorModelRowProps> = ({
  model,
  currency,
  removeModel,
  setModelCount,
}) => {
  return (
    <div className={'calculator-table__model-row'}>
      <div className={'calculator-table__model-row-cell'}>
        <div className={'calculator-table__model-row-title'}>
          {model.product.title}
        </div>
        <div className={'calculator-table__model-row-info'}>
          <div className={'calculator-table__model-row-info-wrap'}>
            <div className={'calculator-table__model-row-key'}>Алгоритм</div>
            <div className={'calculator-table__model-row-value'}>
              {model.product.algorithm}
            </div>
          </div>
          <div className={'calculator-table__model-row-info-wrap'}>
            <div className={'calculator-table__model-row-key'}>
              Потребление, Вт.
            </div>
            <div className={'calculator-table__model-row-value'}>
              {model.product.watt}
            </div>
          </div>
        </div>
      </div>
      <div className={'calculator-table__model-row-value'}>
        {model.product.hashrate}
      </div>
      <NumberInput
        variant={'calculator'}
        min={1}
        disabled={true}
        defaultValue={model.count}
        onChange={(count) => setModelCount(model.product, count)}
      />
      <div className={'calculator-table__model-row-values'}>
        <div className={'calculator-table__model-row-wrapper'}>
          <div className={'calculator-table__model-row-value'}>
            {formatPriceByCurrency(
              model.product.profitDayAll * model.count,
              currency,
            )}
          </div>
          <div className={'calculator-table__model-row-value'}>
            {formatPriceByCurrency(
              model.product.paybackWithWatt * model.count,
              currency,
            )}
          </div>
        </div>
        <div className={'calculator-table__model-row-value'}>
          {formatPriceByCurrency(model.product.price, currency)}
        </div>
        <div className={'calculator-table__model-row-value'}>
          {formatPriceByCurrency(model.product.price * model.count, currency)}
        </div>
      </div>
      <button
        onClick={() => removeModel(model.product)}
        className={'calculator-table__model-row-button'}
      >
        <PlusIcon />
      </button>
    </div>
  );
};
