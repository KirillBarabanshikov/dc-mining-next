import './CalculatorItemCard.scss';

import React, { FC } from 'react';

import { formatPriceByCurrency } from '@/entities/calculator/lib/formatPriceByCurrency';
import { CalculatorItemInput } from '@/entities/calculator/ui/CalculatorItemInput/CalculatorItemInput';
import { NumberInput } from '@/shared/ui';

import { Currency, Model, Product } from '../../model/types';

interface ICalculatorItemCardProps {
  currency: Currency;
  model: Model;
  setModelCount: (product: Product, count: number) => void;
  removeModel: (product: Product) => void;
  addModel: (product: Product) => void;
  models: Model[];
}

export const CalculatorItemCard: FC<ICalculatorItemCardProps> = ({
  currency,
  model,
  setModelCount,
  removeModel,
  addModel,
  models,
}) => {
  return (
    <div className={'calculator-card'}>
      <div className={'calculator-card__title-wrap'}>
        <CalculatorItemInput
          addModel={addModel}
          model={model}
          removeModel={removeModel}
          models={models}
        />
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
