'use client';

import './Calculator.scss';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';

import { getCalculatorData } from '../../api/calculatorApi';
import { Coin, Currency, Filter, Model, Product } from '../../model/types';
import { CalculatorList } from '../CalculatorList';
import { CalculatorTable } from '../CalculatorTable';

interface ICalculatorProps {
  productName?: string;
}

export const Calculator: FC<ICalculatorProps> = ({ productName = '' }) => {
  const [filters, setFilters] = useState({
    currency: 'rub' as Currency,
    search: productName,
    filter: '' as Filter,
    page: '1',
  });

  const [models, setModels] = useState<Model[]>([]);
  const [electricityCost, setElectricityCost] = useState(5.5);

  const [debouncedSearch] = useDebounce(filters.search, 300);
  const [debouncedElectricityCost] = useDebounce(electricityCost, 300);
  const match = useMediaQuery(MAX_WIDTH_MD);

  const { data, isFetching } = useQuery({
    queryKey: [
      'calculator',
      filters.currency,
      filters.filter,
      filters.page,
      debouncedSearch,
    ],
    queryFn: () =>
      getCalculatorData({
        currency: filters.currency,
        filter: filters.filter,
        title: debouncedSearch,
        page: filters.page,
      }),
    placeholderData: keepPreviousData,
  });

  const coinRates = useMemo(
    () =>
      models.reduce((previousValue, currentValue) => {
        const newCoins = [...previousValue];
        currentValue.product.coinsArray.forEach((coin) => {
          const existing = newCoins.find((c) => c.title === coin.title);
          if (!existing) {
            newCoins.push(coin);
          }
        });

        return newCoins;
      }, [] as Coin[]),
    [models],
  );

  useEffect(() => {
    if (!data) return;

    setModels((prevModels) =>
      prevModels.map((model) => {
        const updatedProduct = data.products.find(
          (p) => p.id === model.product.id,
        );
        if (!updatedProduct) return model;

        let paybackWithWatt =
          ((updatedProduct.watt * 24) / 1000) * debouncedElectricityCost * 30;
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

  useEffect(() => {
    if (!data || !productName) return;

    const prod = data.products.find((p) => p.title === productName);

    if (!prod) return;

    setModels((prevModels) => {
      if (prevModels.find((model) => model.product.title === productName))
        return prevModels;
      return [...prevModels, { product: prod, count: 1 }];
    });
  }, [data, productName, debouncedElectricityCost, filters.currency]);

  const setFilterField = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : '1',
    }));
  };

  const addModel = (product: Product, model?: Model) => {
    if (model) {
      return setModels((prev) =>
        prev.map((prevModel) => {
          if (prevModel.product.id === model.product.id) {
            return { ...prevModel, product };
          }
          return prevModel;
        }),
      );
    } else {
      setModels((prev) => [...prev, { product, count: 1 }]);
    }
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
          coinRates={coinRates}
          productName={productName}
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
