'use client';
import './Calculator.scss';

import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';
import { IAsic, IProduct } from '@/widgets/Calculator/types';
import CalculatorAsicsData from '@/widgets/Calculator/ui/CalculatorAsicsData';
import CalculatorBodyLeasing from '@/widgets/Calculator/ui/CalculatorBodyLeasing';
import CalculatorBusinessIsEditing from '@/widgets/Calculator/ui/CalculatorBusinessIsEditing';

import { calculatorApi } from './api';
import CalculatorAsics from './lib/calculator';
import { useCalculatorStore } from './model/store';
import { CalculatorHead } from './ui/CalculatorHead';
import { CalculatorTotal } from './ui/CalculatorTotal';

interface Props {
  className?: string;
  type?: 'lite' | 'pro';
}

export const Calculator: React.FC<Props> = ({ className, type = 'lite' }) => {
  const {
    calculatorType,
    calculatorTypes,
    electricityCoast,
    asics,
    selectedAsics,
    setAsics,
    setSelectedAsics,
    setElectricityCoast,
    addSelectedAsics,
    readyBusinessAsics,
    setReadyBusinessAsics,
    businessPackageAsics,
    setBusinessPackageAsics,
    addBusinessPackageAsic,
  } = useCalculatorStore();

  const matches = useMediaQuery(MAX_WIDTH_MD);

  const [isProError, setIsProError] = useState(false);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [electricityConsumption, setElectricityConsumption] = useState(0);
  const [profitWithoutElectricity, setProfitWithoutElectricity] = useState(0);
  const [profitWithElectricity, setProfitWithElectricity] = useState(0);
  const [paybackWithElectricity, setPaybackWithElectricity] = useState(0);
  const [paybackWithoutElectricity, setPaybackWithoutElectricity] = useState(0);
  const [calculatorAsics, setCalculatorAsics] = useState<CalculatorAsics>();
  const [isEditBusinessDetails, setIsEditBusinessDetails] = useState(false);
  const [businessInitialItems, setBusinessInitialItems] = useState<IProduct[]>(
    [],
  );
  const [businessCalculationAsics, setBusinessCalculationAsics] = useState<
    IAsic[]
  >([]);
  const [isEditingTouched, setIsEditingTouched] = useState(false);
  const [businessTotalPrice, setBusinessTotalPrice] = useState(0);

  const [businessCalculationData, setBusinessCalculationData] = useState({
    totalConsumption: 0,
    electricityConsumption: 0,
    profitWithoutElectricity: 0,
    profitWithElectricity: 0,
    paybackWithElectricity: 0,
    paybackWithoutElectricity: 0,
  });

  const changeElectricityCoast = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'lite') {
      e.preventDefault();
      setIsProError(true);
    }
  };

  const onAsicChange = (selected: string[], index: number) => {
    if (isEditBusinessDetails) {
      const changedAsic = readyBusinessAsics.find(
        (item) => item.value === selected[0],
      );
      if (!changedAsic) return;

      const updatedBusinessPackageAsics = businessPackageAsics.map((asic, i) =>
        i === index
          ? {
              ...changedAsic,
              additionalId: businessPackageAsics[index].additionalId,
              count: businessPackageAsics[index].count,
            }
          : asic,
      );
      setBusinessPackageAsics(updatedBusinessPackageAsics);
    } else {
      if (selectedAsics[index].value === selected[0]) return;
      const changedAsic = asics.find((item) => item.value === selected[0]);
      if (!changedAsic) return;
      const updatedAsic = { ...changedAsic, additionalId: uuidv4() };
      const newSelectedAsics = selectedAsics.map((asic, i) =>
        i === index ? updatedAsic : asic,
      );

      setSelectedAsics(newSelectedAsics);
    }
  };

  const setAsicsCount = (count: number, index: number) => {
    if (count <= 0) return;

    // businessPackageAsics
    if (isEditBusinessDetails) {
      const updatedBusinessPackageAsics = businessPackageAsics.map((asic, i) =>
        i === index ? { ...asic, count } : asic,
      );
      setBusinessPackageAsics(updatedBusinessPackageAsics);
      console.log(businessPackageAsics);
    }
    // selectedAsics
    else {
      const changedAsic = selectedAsics[index];
      if (!changedAsic) return;
      const updatedAsic = { ...changedAsic, count };
      const newSelectedAsics = selectedAsics.map((asic, i) =>
        i === index ? updatedAsic : asic,
      );
      setSelectedAsics(newSelectedAsics);
    }
  };

  const getTotalPrice = () => {
    return (
      isEditBusinessDetails ? businessPackageAsics : selectedAsics
    ).reduce((total, asic) => total + asic.price * asic.count, 0);
  };

  const handleChangeBusinessDetails = () => {
    setIsEditingTouched(true);
    if (!isEditBusinessDetails) {
      if (businessPackageAsics.length === 0) {
        setBusinessPackageAsics(
          selectedAsics.map((asic) => ({
            ...asic,
            additionalId: uuidv4(),
          })),
        );
      }
    }
    setIsEditBusinessDetails((prev) => !prev);
    setBusinessTotalPrice(getTotalPrice());
  };

  const addAsic = (asicId: number) => {
    const newAsic = asics.find((asic) => asic.id === asicId);

    if (!newAsic) return;

    addSelectedAsics(newAsic);
  };

  useEffect(() => {
    if (calculatorType === 2) {
      setBusinessCalculationAsics(businessPackageAsics);
    }
  }, [calculatorType, businessPackageAsics]);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (calculatorType !== 2) {
        data = await calculatorApi.getAsics();
      } else if (calculatorType === 2) {
        data = await calculatorApi.getBusiness();
        // console.log(data);

        const asicMinersData = await calculatorApi.getAsics();
        console.log(asicMinersData);
        if (asicMinersData) {
          setReadyBusinessAsics(asicMinersData.products);
          setBusinessInitialItems(asicMinersData.products);
          console.log(asics);
        }
      }

      if (!data) return;

      setBusinessPackageAsics(data.products);

      const products = data.products;

      setAsics(products);
      setElectricityCoast(data.electricityCoast || 3);
      setSelectedAsics([products[0]]);
    };

    fetchData();
    setIsEditBusinessDetails(false);
  }, [calculatorType]);

  useEffect(() => {
    const currentAsicsForCalculation = isEditBusinessDetails
      ? businessPackageAsics
      : calculatorType === 2
        ? businessCalculationAsics
        : selectedAsics;

    if (!currentAsicsForCalculation.length) return;

    setCalculatorAsics(
      () => new CalculatorAsics(currentAsicsForCalculation, electricityCoast),
    );
  }, [
    selectedAsics,
    businessPackageAsics,
    businessCalculationAsics,
    isEditBusinessDetails,
    calculatorType,
    electricityCoast,
  ]);

  useEffect(() => {
    if (!selectedAsics.length) return;
    setCalculatorAsics(
      () => new CalculatorAsics(selectedAsics, electricityCoast),
    );
  }, [selectedAsics, electricityCoast]);

  useEffect(() => {
    if (!calculatorAsics) return;

    const newCalculationData = {
      totalConsumption: calculatorAsics.getTotalConsumption(),
      electricityConsumption: calculatorAsics.getElectricityConsumption(),
      profitWithoutElectricity: calculatorAsics.getProfitWithoutElectricity(),
      profitWithElectricity: calculatorAsics.getProfitWithElectricity(),
      paybackWithElectricity: calculatorAsics.getPaybackWithElectricity(),
      paybackWithoutElectricity: calculatorAsics.getPaybackWithoutElectricity(),
    };

    if (calculatorType === 2 && isEditBusinessDetails) {
      setBusinessCalculationData(newCalculationData);
    }

    setTotalConsumption(newCalculationData.totalConsumption);
    setElectricityConsumption(newCalculationData.electricityConsumption);
    setProfitWithoutElectricity(newCalculationData.profitWithoutElectricity);
    setProfitWithElectricity(newCalculationData.profitWithElectricity);
    setPaybackWithElectricity(newCalculationData.paybackWithElectricity);
    setPaybackWithoutElectricity(newCalculationData.paybackWithoutElectricity);
  }, [calculatorAsics, calculatorType, isEditBusinessDetails]);

  useEffect(() => {
    const currentAsicsForCalculation = isEditBusinessDetails
      ? businessPackageAsics
      : selectedAsics;

    if (!currentAsicsForCalculation.length) return;

    setCalculatorAsics(
      () => new CalculatorAsics(currentAsicsForCalculation, electricityCoast),
    );

    console.log(businessPackageAsics);
  }, [
    selectedAsics,
    businessPackageAsics,
    isEditBusinessDetails,
    electricityCoast,
  ]);

  return (
    <div className={clsx('calculator', className)}>
      <CalculatorHead
        calculatorTypes={calculatorTypes}
        calculatorType={calculatorType}
        isProError={isProError}
      />
      <div className='calculator-row'>
        {calculatorType !== 4 && (
          <div className='calculator-card calculatorFeature'>
            <div className='calculatorFeature-content'>
              {!matches && (
                <div className='calculatorFeature-head'>
                  <div className='calculatorFeature-subtitle'>
                    Калькулятор доходности
                  </div>
                  <div
                    className={clsx('calculatorFeature-switch', {
                      active: isProError,
                    })}
                  >
                    <span className='active'>Lite</span>
                    <span>Pro</span>
                  </div>
                </div>
              )}

              <div className='calculatorFeature-list'>
                {!matches && (
                  <div className='calculatorFeature-row'>
                    <span className='calculatorFeature-description'>
                      {calculatorType === 2 ? 'Пакет' : 'Модель'}
                    </span>
                    {calculatorType !== 2 && (
                      <span className='calculatorFeature-description'>
                        Количество
                      </span>
                    )}
                    {!isEditBusinessDetails && calculatorType !== 3 && (
                      <span className='calculatorFeature-description'>
                        Цена
                      </span>
                    )}
                    {isEditBusinessDetails && (
                      <>
                        <span className='calculatorFeature-description'>
                          Количество
                        </span>
                        <span className='calculatorFeature-description'>
                          Расход кВт/мес.
                        </span>
                      </>
                    )}
                    {calculatorType === 3 && (
                      <span className='calculatorFeature-description'>
                        Расход кВт/мес.
                      </span>
                    )}
                  </div>
                )}

                <div className='calculatorFeature-data'>
                  {!isEditBusinessDetails &&
                      (
                          <CalculatorAsicsData
                            asics={asics}
                            businessTotalPrice={businessTotalPrice}
                            isEditBusinessDetails={isEditBusinessDetails}
                            isEditingTouched={isEditingTouched}
                            matches={matches}
                            onAsicChange={onAsicChange}
                            setAsicsCount={setAsicsCount}
                          />
                      )
                  }
                </div>

                <div className='calculatorFeature-data'>
                  {isEditBusinessDetails &&
                      (
                          <CalculatorBusinessIsEditing isEditBusinessDetails={isEditBusinessDetails} matches={matches} onAsicChange={onAsicChange} setAsicsCount={setAsicsCount} isEditingTouched={isEditingTouched} businessTotalPrice={businessTotalPrice} businessInitialItems={businessInitialItems} />
                      )
                  }
                </div>

                {calculatorType === 2 && (
                  <div className='calculatorFeature-change'>
                    <Button
                      className='calculatorFeature-change-btn'
                      variant='solid'
                      size='sm'
                      theme='gray'
                      onClick={handleChangeBusinessDetails}
                    >
                      <PencilIcon />
                      Изменить состав пакета
                    </Button>
                  </div>
                )}

                {calculatorType === 2 && isEditBusinessDetails && (
                  <div className='calculatorFeature-row calculatorFeature-change-row'>
                    <Button
                      className='calculatorFeature-add-btn'
                      variant='solid'
                      size='sm'
                      theme='gray'
                      onClick={() => {
                        if (readyBusinessAsics.length > 0) {
                          addBusinessPackageAsic();
                        }
                      }}
                    >
                      Добавить оборудование
                    </Button>
                  </div>
                )}

                {calculatorType === 3 && (
                  <div className='calculatorFeature-change'>
                    <Button
                      className='calculatorFeature-change-btn'
                      variant='solid'
                      size='sm'
                      theme='gray'
                      onClick={() => addAsic(29)}
                    >
                      Добавить оборудование
                      <span>+</span>
                    </Button>
                  </div>
                )}
              </div>

              <div className='calculatorElectricity'>
                <div className='calculatorElectricity-price'>
                  <span>Стоимость э/э, ₽</span>
                  <Input
                    value={electricityCoast}
                    onChange={(e) => changeElectricityCoast(e)}
                    sizes='md'
                    error={isProError}
                  />
                  {isProError && (
                    <div className='calculatorElectricity-error'>
                      Доступно в Pro версии
                    </div>
                  )}
                </div>
                <Button
                  className='calculatorElectricity-btn'
                  variant='outline'
                  size='md'
                >
                  Скачать фин модель
                  <DownloadIcon />
                </Button>
              </div>
              <div className='calculator-description'>
                Не является публичной офертой
              </div>
            </div>
          </div>
        )}
        {calculatorType === 4 && (
          <CalculatorBodyLeasing />
        )}
        {calculatorAsics && (
          <CalculatorTotal
            totalConsumptonGuests={(
              totalConsumption +
              totalConsumption * 0.1
            ).toLocaleString('ru-RU')}
            totalConsumption={
              calculatorType === 2 &&
              !isEditBusinessDetails &&
              businessCalculationData.totalConsumption
                ? businessCalculationData.totalConsumption.toLocaleString(
                    'ru-RU',
                  )
                : totalConsumption.toLocaleString('ru-RU')
            }
            electricityConsumption={
              calculatorType === 2 &&
              !isEditBusinessDetails &&
              businessCalculationData.electricityConsumption
                ? businessCalculationData.electricityConsumption.toLocaleString(
                    'ru-RU',
                  )
                : electricityConsumption.toLocaleString('ru-RU')
            }
            totalPriceGuests={(electricityConsumption + electricityConsumption * 0.1).toLocaleString('ru-RU')}
            profitWithoutElectricity={
              calculatorType === 2 &&
              !isEditBusinessDetails &&
              businessCalculationData.profitWithoutElectricity
                ? businessCalculationData.profitWithoutElectricity.toLocaleString(
                    'ru-RU',
                  )
                : profitWithoutElectricity.toLocaleString('ru-RU')
            }
            profitWithElectricity={
              calculatorType === 2 &&
              !isEditBusinessDetails &&
              businessCalculationData.profitWithElectricity
                ? businessCalculationData.profitWithElectricity.toLocaleString(
                    'ru-RU',
                  )
                : profitWithElectricity.toLocaleString('ru-RU')
            }
            paybackWithElectricity={
              calculatorType === 2 &&
              !isEditBusinessDetails &&
              businessCalculationData.paybackWithElectricity
                ? businessCalculationData.paybackWithElectricity.toLocaleString(
                    'ru-RU',
                  )
                : paybackWithElectricity.toLocaleString('ru-RU')
            }
            paybackWithoutElectricity={
              calculatorType === 2 &&
              !isEditBusinessDetails &&
              businessCalculationData.paybackWithoutElectricity
                ? businessCalculationData.paybackWithoutElectricity.toLocaleString(
                    'ru-RU',
                  )
                : paybackWithoutElectricity.toLocaleString('ru-RU')
            }
          />
        )}
      </div>
    </div>
  );
};
