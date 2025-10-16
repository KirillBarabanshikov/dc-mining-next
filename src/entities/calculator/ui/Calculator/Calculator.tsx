'use client';

import './Calculator.scss';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { FC, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useFinModel } from '@/entities/calculator/lib/useFinModel';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';

import { getCalculatorData } from '../../api/calculatorApi';
import { Currency, Filter, Model, Product } from '../../model/types';
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

  const { coinRates } = useFinModel({
    models,
    currency: filters.currency,
    electricityCoast: electricityCost,
    dollar: data ? data.dollar : 0,
  });

  useEffect(() => {
    recalculateModels();
  }, [data, debouncedElectricityCost, filters.currency, models.length]);

  useEffect(() => {
    if (!data || !productName) return;

    const prod = data.products.find((p) => p.title === productName);

    if (!prod) return;

    setModels((prevModels) => {
      if (prevModels.find((model) => model.product.title === productName))
        return prevModels;
      return [
        ...prevModels,
        {
          product: prod,
          count: 1,
          currency: filters.currency,
          currentPrice: prod.price,
          currentProfitDayAll: prod.profitDayAll,
          currentCoinsArray: prod.coinsArray,
        },
      ];
    });
  }, [data, productName, debouncedElectricityCost, filters.currency]);

  const setFilterField = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'currency' ? prev.page : key === 'page' ? value : '1',
    }));
  };

  const recalculateModels = () => {
    if (!data) return;

    setModels((prevModels) =>
      prevModels.map((model) => {
        const product = model.product;

        let price = model.currentPrice;
        let profitDayAll = model.currentProfitDayAll;
        let coinsArray = model.currentCoinsArray;

        if (model.currency === 'rub' && filters.currency === 'dollar') {
          price = price / data.dollar;
          profitDayAll = profitDayAll / data.dollar;
          coinsArray = coinsArray.map((coin) => ({
            ...coin,
            profit: coin.profit / data.dollar,
          }));
        }

        if (model.currency === 'dollar' && filters.currency === 'rub') {
          price = price * data.dollar;
          profitDayAll = profitDayAll * data.dollar;
          coinsArray = coinsArray.map((coin) => ({
            ...coin,
            profit: coin.profit * data.dollar,
          }));
        }

        let paybackWithWatt =
          ((product.watt * 24) / 1000) * debouncedElectricityCost * 30;
        if (filters.currency === 'dollar') {
          paybackWithWatt /= data.dollar;
        }

        return {
          ...model,
          product: {
            ...product,
            coinsArray,
            paybackWithWatt: profitDayAll - paybackWithWatt,
            price,
            profitDayAll,
          },
        };
      }),
    );
  };

  const addModel = (product: Product, model?: Model) => {
    if (model) {
      return setModels((prev) =>
        prev.map((prevModel) =>
          prevModel.product.id === model.product.id
            ? { ...prevModel, product }
            : prevModel,
        ),
      );
    } else {
      setModels((prev) => [
        ...prev,
        {
          product,
          count: 1,
          currency: filters.currency,
          currentPrice: product.price,
          currentProfitDayAll: product.profitDayAll,
          currentCoinsArray: product.coinsArray,
        },
      ]);
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

  const updateModel = (updatedModel: Model) => {
    setModels((prev) =>
      prev.map((model) =>
        model.product.id === updatedModel.product.id
          ? { ...updatedModel, currentPrice: updatedModel.product.price }
          : model,
      ),
    );

    recalculateModels();
  };

  useEffect(() => {
    const savedModels = localStorage.getItem('calculator_models');
    if (savedModels) {
      try {
        const parsed = JSON.parse(savedModels);
        if (Array.isArray(parsed)) {
          setModels(parsed);
        }
      } catch (e) {
        console.error('Ошибка при восстановлении моделей из localStorage', e);
      }
    }

    return () => {
      if (productName) {
        localStorage.removeItem('calculator_models');
      }
    };
  }, []);

  useEffect(() => {
    if (models.length > 0) {
      localStorage.setItem('calculator_models', JSON.stringify(models));
    } else {
      localStorage.removeItem('calculator_models');
    }
  }, [models]);

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
          onUpdateModel={updateModel}
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
