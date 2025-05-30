'use client';

import './Calculator.scss';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';

import { getCalculatorData } from '../../api/calculatorApi';
import { Currency, Filter, Model, Product } from '../../model/types';
import { CalculatorList } from '../CalculatorList';
import { CalculatorTable } from '../CalculatorTable';

export const Calculator = () => {
  const [filters, setFilters] = useState({
    currency: 'rub' as Currency,
    search: '',
    filter: '' as Filter,
  });

  const [models, setModels] = useState<Model[]>([]);
  const [electricityCost, setElectricityCost] = useState(5.5);

  const [debouncedSearch] = useDebounce(filters.search, 300);
  const [debouncedElectricityCost] = useDebounce(electricityCost, 300);
  const match = useMediaQuery(MAX_WIDTH_MD);

  const { data, isFetching } = useQuery({
    queryKey: ['calculator', filters.currency, filters.filter, debouncedSearch],
    queryFn: () =>
      getCalculatorData({
        currency: filters.currency,
        filter: filters.filter,
        title: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) return;

    setModels((prevModels) =>
      prevModels.map((model) => {
        const updatedProduct = data.products.find(
          (p) => p.id === model.product.id,
        );
        if (!updatedProduct) return model;

        let paybackWithWatt =
          (updatedProduct.watt / 1000) * debouncedElectricityCost * 24;
        if (filters.currency === 'dollar') {
          paybackWithWatt /= data.dollar;
        }

        return {
          ...model,
          product: {
            ...updatedProduct,
            paybackWithWatt: updatedProduct.profitDayAll - paybackWithWatt,
          },
        };
      }),
    );
  }, [data, debouncedElectricityCost, filters.currency]);

  const setFilterField = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const addModel = (product: Product) => {
    setModels((prev) => [...prev, { product, count: 1 }]);
  };

  const removeModel = (product: Product) => {
    setModels((prev) =>
      prev.filter((model) => model.product.id !== product.id),
    );
  };

  const setModelCount = (product: Product, count: number) => {
    setModels((prev) =>
      prev.map((model) =>
        model.product.id === product.id ? { ...model, count } : model,
      ),
    );
  };

  if (!data) return <></>;

  return (
    <div className={'calculator'}>
      {!match ? (
        <CalculatorTable
          filters={filters}
          setFilterField={setFilterField}
          calculatorData={data}
          isFetching={isFetching}
          models={models}
          addModel={addModel}
          removeModel={removeModel}
          setModelCount={setModelCount}
          electricityCoast={electricityCost}
          setElectricityCoast={setElectricityCost}
          className={'calculator__table'}
        />
      ) : (
        <CalculatorList
          filters={filters}
          setFilterField={setFilterField}
          calculatorData={data}
          isFetching={isFetching}
          models={models}
          addModel={addModel}
          removeModel={removeModel}
          setModelCount={setModelCount}
          electricityCoast={electricityCost}
          setElectricityCoast={setElectricityCost}
          className={'calculator__list'}
        />
      )}
    </div>
  );
};
