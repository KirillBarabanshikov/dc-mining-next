import './CalculatorItemCard.scss';

import React, { FC, useEffect, useState } from 'react';

import { formatPriceByCurrency } from '@/entities/calculator/lib/formatPriceByCurrency';
import { CalculatorItemInput } from '@/entities/calculator/ui/CalculatorItemInput/CalculatorItemInput';
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import { NumberInput } from '@/shared/ui';

import { Currency, Model, Product } from '../../model/types';

interface ICalculatorItemCardProps {
  currency: Currency;
  model: Model;
  setModelCount: (product: Product, count: number) => void;
  removeModel: (product: Product) => void;
  addModel: (product: Product) => void;
  onUpdateModel: (updatedModel: Model) => void;
  models: Model[];
}

export const CalculatorItemCard: FC<ICalculatorItemCardProps> = ({
  currency,
  model,
  setModelCount,
  removeModel,
  addModel,
  onUpdateModel,
  models,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(model.product.price);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPrice(value ? Math.min(Number(value), 999_999_999) : 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateModelPrice();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  const updateModelPrice = () => {
    if (price === model.product.price) return;
    const updatedModel: Model = {
      ...model,
      product: {
        ...model.product,
        price,
      },
    };
    onUpdateModel(updatedModel);
  };

  useEffect(() => {
    setPrice(model.product.price);
  }, [currency, model.product.price]);

  return (
    <div className={'calculator-card'}>
      <div className={'calculator-card__title-wrap'}>
        <CalculatorItemInput
          currency={currency}
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
          max={99999}
          defaultValue={model.count}
          onChange={(count) => setModelCount(model.product, count)}
        />
        <div className={'calculator-card__extra-title'}>Стоимость</div>

        <div className={'calculator-card__extra-edit-wrap'}>
          {!isEditing ? (
            <>
              <button
                className='calculator-card__extra-edit'
                onClick={handleEditClick}
              >
                <PencilIcon />
              </button>
              <div className='calculator-card__extra-value'>
                {formatPriceByCurrency(price * model.count, currency)}
              </div>
            </>
          ) : (
            <input
              type='number'
              className='calculator-card__extra-input'
              value={price.toFixed(0) || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          )}
        </div>
      </div>
    </div>
  );
};
