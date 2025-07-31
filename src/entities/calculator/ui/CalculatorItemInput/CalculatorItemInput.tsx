import './CalculatorItemInput.scss';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { getCalculatorData } from '@/entities/calculator/api/calculatorApi';
import { Model, Product } from '@/entities/calculator/model/types';
import CloseIcon from '@/shared/assets/icons/close.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { Button, Input } from '@/shared/ui';

interface ICalculatorItemInputProps {
  addModel: (product: Product, model?: Model) => void;
  model?: Model;
  removeModel?: (product: Product) => void;
  onAdd?: () => void;
  onClose?: () => void;
  showClose?: boolean;
  models: Model[];
}

export const CalculatorItemInput: FC<ICalculatorItemInputProps> = ({
  model,
  removeModel,
  addModel,
  onAdd,
  onClose,
  showClose,
  models,
}) => {
  const [search, setSearch] = useState(model?.product.title || '');
  const [debouncedSearch] = useDebounce(search, 300);
  const [isOpen, setIsOpen] = useState(false);

  const { data: products = [] } = useQuery({
    queryKey: ['calculator-item-products', debouncedSearch],
    queryFn: () =>
      getCalculatorData({
        currency: 'rub',
        title: debouncedSearch,
      }),
    select: (data) => data.products,
    placeholderData: keepPreviousData,
    enabled: !!debouncedSearch,
  });

  const handleSelectProduct = (product: Product) => {
    setSearch(product.title);
    addModel(product, model);
    setIsOpen(false);
    onAdd?.();
  };

  const handleRemove = () => {
    if (model) {
      removeModel?.(model.product);
      setSearch('');
    }
  };

  const handleFocus = () => {
    if (!model) setIsOpen(true);
  };

  const selectedProductIds = new Set(models.map((m) => m.product.id));
  const filteredProducts = products.filter(
    (p) => !selectedProductIds.has(p.id),
  );

  return (
    <div className='calculator-item'>
      <div className='calculator-item__input-wrap'>
        <Input
          placeholder='Выберите модель'
          icon={<SearchIcon />}
          className='calculator-item__input'
          value={search}
          onFocus={handleFocus}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
        />
        {model && (
          <Button
            theme='white'
            onClick={handleRemove}
            className='calculator-card__button calculator-card__button-remove'
          >
            <TrashIcon />
          </Button>
        )}
        {showClose && (
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        )}
      </div>
      {isOpen && filteredProducts.length > 0 && (
        <div className='calculator-item__list'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='calculator-item__item'
              onClick={() => handleSelectProduct(product)}
            >
              {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
