import { FC, useEffect, useState } from 'react';

import PencilIcon from '@/shared/assets/icons/pencil.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { NumberInput } from '@/shared/ui';

import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Currency, Model, Product } from '../../model/types';

interface ICalculatorModelRowProps {
  model: Model;
  currency: Currency;
  removeModel: (product: Product) => void;
  setModelCount: (product: Product, count: number) => void;
  onUpdateModel: (updatedModel: Model) => void;
  isBlock?: boolean;
}

export const CalculatorModelRow: FC<ICalculatorModelRowProps> = ({
  model,
  currency,
  removeModel,
  setModelCount,
  onUpdateModel,
  isBlock,
}) => {
  const [isEditing, setIsEditing] = useState<{
    watt?: boolean;
    hashrate?: boolean;
    price?: boolean;
  }>({});
  const [editedModel, setEditedModel] = useState(model);
  const [inputValue, setInputValue] = useState<string>('');

  const MAX_VALUE = 999_999_999;

  const startEditing = (key: keyof typeof isEditing) => {
    setIsEditing({ [key]: true });
    setInputValue(String(editedModel.product[key].toFixed(0)));
  };

  const handleChange = (val: string) => {
    if (/^[0-9]*$/.test(val)) {
      setInputValue(val);
    }
  };

  const finishEditing = (key: 'watt' | 'hashrate' | 'price') => {
    setIsEditing({});
    const trimmed = inputValue.trim();
    const number = Number(trimmed);

    if (trimmed === '' || Number.isNaN(number)) {
      setInputValue(String(editedModel.product[key]));
      return;
    }

    const validNumber = Math.min(number, MAX_VALUE);

    if (validNumber !== editedModel.product[key]) {
      const updated = {
        ...editedModel,
        product: { ...editedModel.product, [key]: validNumber },
      };
      setEditedModel(updated);
      onUpdateModel(updated);
    } else {
      setInputValue(String(validNumber));
    }
  };

  const renderEditableField = (
    key: 'watt' | 'hashrate' | 'price',
    displayValue: string | number,
  ) => {
    return isEditing[key] ? (
      <input
        type='text'
        autoFocus
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => finishEditing(key)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          } else if (e.key === 'Escape') {
            setIsEditing({});
          }
        }}
        className='calculator-table__model-row-input'
      />
    ) : (
      <>
        <span>{displayValue}</span>
        <button
          className='calculator-table__model-row-edit'
          onClick={() => startEditing(key)}
        >
          <PencilIcon />
        </button>
      </>
    );
  };

  useEffect(() => {
    setEditedModel(model);
  }, [model, currency]);

  return (
    <div className='calculator-table__model-row'>
      <div className='calculator-table__model-row-cell'>
        <div className='calculator-table__model-row-title'>
          {model.product.title}
        </div>

        <div className='calculator-table__model-row-info'>
          <div className='calculator-table__model-row-info-wrap'>
            <div className='calculator-table__model-row-key'>Алгоритм</div>
            <div className='calculator-table__model-row-value'>
              {model.product.algorithm}
            </div>
          </div>

          <div className='calculator-table__model-row-info-wrap'>
            <div className='calculator-table__model-row-key'>
              Потребление, Вт.
            </div>
            <div className='calculator-table__model-row-value'>
              {renderEditableField('watt', editedModel.product.watt)}
            </div>
          </div>
        </div>
      </div>

      <div className='calculator-table__model-row-value'>
        {renderEditableField('hashrate', editedModel.product.hashrate)}
      </div>

      <NumberInput
        variant='calculator'
        min={1}
        max={99999}
        defaultValue={model.count}
        onChange={(count) => setModelCount(model.product, count)}
      />

      <div className='calculator-table__model-row-values'>
        <div className='calculator-table__model-row-wrapper'>
          <div className='calculator-table__model-row-value'>
            {formatPriceByCurrency(
              model.product.profitDayAll * model.count,
              currency,
            )}
          </div>
          <div className='calculator-table__model-row-value'>
            {formatPriceByCurrency(
              model.product.paybackWithWatt * model.count,
              currency,
            )}
          </div>
        </div>

        <div className='calculator-table__model-row-value'>
          {renderEditableField(
            'price',
            formatPriceByCurrency(editedModel.product.price, currency),
          )}
        </div>

        <div className='calculator-table__model-row-value'>
          {formatPriceByCurrency(
            editedModel.product.price * model.count,
            currency,
          )}
        </div>
      </div>

      <div className='calculator-table__product-row-button-wrap'>
        <button
          onClick={() => removeModel(model.product)}
          className='calculator-table__model-row-button'
          disabled={isBlock}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
