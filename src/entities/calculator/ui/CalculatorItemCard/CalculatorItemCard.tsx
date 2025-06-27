import './CalculatorItemCard.scss';

import { FC } from 'react';

import { formatPriceByCurrency } from '@/entities/calculator/lib/formatPriceByCurrency';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { Button, NumberInput } from '@/shared/ui';

import { Currency, Model, Product } from '../../model/types';

interface ICalculatorItemCardProps {
  currency: Currency;
  model: Model;
  setModelCount: (product: Product, count: number) => void;
  removeModel: (product: Product) => void;
}

export const CalculatorItemCard: FC<ICalculatorItemCardProps> = ({
  currency,
  model,
  setModelCount,
  removeModel,
}) => {
  return (
    <div className={'calculator-card'}>
      <div className={'calculator-card__title-wrap'}>
        <div className={'calculator-card__title'}>{model.product.title}</div>
        <Button
          theme={'white'}
          onClick={() => removeModel(model.product)}
          className={'calculator-card__button calculator-card__button-remove'}
        >
          <TrashIcon />
        </Button>
      </div>
      <div className={'calculator-card__extra'}>
        <NumberInput
          variant={'calculator'}
          min={1}
          disabled={true}
          defaultValue={model.count}
          onChange={(count) => setModelCount(model.product, count)}
        />
        <div className={'calculator-card__extra-title'}>Стоимость</div>
        <div className={'calculator-card__extra-value'}>
          {formatPriceByCurrency(model.product.price * model.count, currency)}
        </div>
      </div>
    </div>
  );
};
