'use client';
import './Calculator.scss';

import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import MinusIcon from '@/shared/assets/icons/minus.svg';
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { formatter } from '@/shared/lib';
import { Button, Dropdown, IconButton, Input } from '@/shared/ui';

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
  const [isEditBusinessDetails, setIsEditBusinessDetails] = useState(false)

  const changeElectricityCoast = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'lite') {
      e.preventDefault();
      setIsProError(true);
    }
  };

  const onAsicChange = (selected: string[], index: number) => {
    // если выбрали тот же асик, ничего не меняем
    if (selectedAsics[index].value === selected[0]) return;
    // находим асик
    const changedAsic = asics.find((item) => item.value === selected[0]);
    if (!changedAsic) return;
    // переназначаем additionalId для key и по индексу изменяем выбранный асик
    const updatedAsic = { ...changedAsic, additionalId: uuidv4() };
    const newSelectedAsics = selectedAsics.map((asic, i) =>
      i === index ? updatedAsic : asic,
    );

    setSelectedAsics(newSelectedAsics);
  };

  const setAsicsCount = (count: number, index: number) => {
    if (count <= 0) return;

    const changedAsic = selectedAsics[index];
    if (!changedAsic) return;
    const updatedAsic = { ...changedAsic, count };
    const newSelectedAsics = selectedAsics.map((asic, i) =>
      i === index ? updatedAsic : asic,
    );
    setSelectedAsics(newSelectedAsics);
  };

  const handleChangeBusinessDetails = () => {
    setIsEditBusinessDetails((prev) => !prev);
  }

  useEffect(() => {
    const apiType = calculatorType === 2 ? 'readyBusiness' : 'asicMiners';

    calculatorApi.getAsics(apiType).then((data) => {
      if (!data) return;

      const products = calculatorType === 2
          ? data.products.flatMap(product =>
              product.productAdd.map(add => {
                const productAsics = add.productAsics || {};
                return {
                  id: productAsics.id,
                  title: productAsics.title || '',
                  price: productAsics.price * add.count,
                  profitDayAll: productAsics.profitDayAll || 0,
                  watt: productAsics.watt || 0,
                  count: add.count || 0,
                  label: product.title,
                  value: productAsics.id.toString(),
                  additionalId: uuidv4(),
                };
              })
          )
          : data.products.map(product => ({
            id: product.id,
            title: product.title || '',
            price: product.price,
            profitDayAll: product.profitDayAll || 0,
            watt: product.watt || 0,
            count: product.count || 0,
            label: product.title,
            value: product.id.toString(),
            additionalId: uuidv4(),
          }));

      console.log(products);

      setAsics(products);
      setElectricityCoast(data.electricityCoast || 3);
      setSelectedAsics([products[0]]);
    });

    // обнуление при ченже
    return () => {
      setAsics([]);
      setSelectedAsics([]);
      setElectricityCoast(0);
    };
  }, [calculatorType]);

  useEffect(() => {
    if (!selectedAsics.length) return;
    setCalculatorAsics(
      () => new CalculatorAsics(selectedAsics, electricityCoast),
    );
  }, [selectedAsics, electricityCoast]);

  useEffect(() => {
    if (!calculatorAsics) return;
    setTotalConsumption(calculatorAsics.getTotalConsumption());
    setElectricityConsumption(calculatorAsics.getElectricityConsumption());
    setProfitWithoutElectricity(calculatorAsics.getProfitWithoutElectricity());
    setProfitWithElectricity(calculatorAsics.getProfitWithElectricity());
    setPaybackWithElectricity(calculatorAsics.getPaybackWithElectricity());
    setPaybackWithoutElectricity(
      calculatorAsics.getPaybackWithoutElectricity(),
    );
  }, [calculatorAsics]);

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

                {calculatorType === 4 && (
                    <div className="leasing-info">
                      <h2>Хотите получить оборудование в лизинг?</h2>
                      <p>Оставьте заявку, мы подберем лучшее предложение</p>
                      <Button variant='outline' size='md'>Оставить заявку</Button>
                    </div>
                )}

                <div className='calculatorFeature-list'>
                  {!matches && (
                      <div className='calculatorFeature-row'>
                        <span className='calculatorFeature-description'>
                          {calculatorType === 2 ? 'Пакет' : 'Модель'}
                        </span>
                        {calculatorType !== 2 && (
                            <span className="calculatorFeature-description">
                            Количество
                          </span>
                        )}
                        <span className="calculatorFeature-description">Цена</span>
                      </div>
                  )}

                  <div className='calculatorFeature-data'>
                    {selectedAsics.map((asic, index) => (
                        <>
                          <div
                              key={asic.additionalId}
                              className="calculatorFeature-row"
                          >
                            <div className="calculatorFeature-col">
                              {matches && (
                                  <span className="calculatorFeature-description">
                                  Модель
                                </span>
                              )}

                              <div className="calculatorFeature-models">
                                <Dropdown
                                    defaultValue={[asic.value]}
                                    items={asics}
                                    hasIcon={false}
                                    onChange={(value) => onAsicChange(value, index)}
                                />
                              </div>
                            </div>
                            {calculatorType !== 2 && (
                                <div className="calculatorFeature-col">
                                  {matches && (
                                      <span className="calculatorFeature-description">
                                      Количество
                                    </span>
                                  )}
                                  <div className="calculatorFeature-counts">
                                    <IconButton
                                        onClick={() => setAsicsCount(--asic.count, index)}
                                        icon={<MinusIcon />}
                                        variant="outline"
                                        rounded
                                        disabled={asic.count === 1}
                                    ></IconButton>
                                    <Input
                                        value={asic.count}
                                        onChange={(e) =>
                                            setAsicsCount(+e.target.value, index)
                                        }
                                        className="calculatorFeature-count"
                                        sizes="md"
                                        type="number"
                                    />
                                    <IconButton
                                        onClick={() => setAsicsCount(++asic.count, index)}
                                        icon={<PlusIcon />}
                                        variant="outline"
                                        rounded
                                    ></IconButton>
                                  </div>
                                </div>
                            )}
                            <div className="calculatorFeature-col">
                              {matches && (
                                  <span className="calculatorFeature-description">
                                  Цена
                                </span>
                              )}
                              <div className="calculatorFeature-price">
                                <Input
                                    defaultValue={formatter.format(asic.price)}
                                    className="calculatorFeature-price-input"
                                    sizes="md"
                                    disabled
                                />
                              </div>
                            </div>
                          </div>
                          {calculatorType === 2 && isEditBusinessDetails && (
                              <div>
                                {asic.title} - {asic.price}
                                <Button size='sm' theme='white'>
                                  <TrashIcon />
                                </Button>
                              </div>
                          )}
                          {calculatorType === 2 && (
                              <div className="calculatorFeature-change">
                                <Button
                                    className="calculatorFeature-change-btn"
                                    variant="solid"
                                    size="sm"
                                    theme="gray"
                                    onClick={handleChangeBusinessDetails}
                                >
                                  <PencilIcon />
                                  Изменить состав пакета
                                </Button>
                              </div>
                          )}
                        </>
                    ))}
                  </div>
                </div>
                <div className="calculatorElectricity">
                  <div className="calculatorElectricity-price">
                    <span>Стоимость э/э, ₽</span>
                    <Input
                        value={electricityCoast}
                        onChange={(e) => changeElectricityCoast(e)}
                        sizes="md"
                        error={isProError}
                    />
                    {isProError && (
                        <div className="calculatorElectricity-error">
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
            <div className="leasing-info calculator-card leasing">
              <div className="leasing-img">
                <div className="leasing-content">
                  <h2 className="leasing-content-header">Хотите получить <br /> оборудование <span>в лизинг?</span></h2>
                  <p className="leasing-content-description">Оставьте заявку, мы подберем лучшее предложение</p>
                  <Button variant="solid" size="lg">Оставить заявку</Button>
                </div>
              </div>
            </div>
        )}
        {calculatorAsics && (
            <CalculatorTotal
                totalConsumption={totalConsumption.toLocaleString('ru-RU')}
                electricityConsumption={electricityConsumption.toLocaleString(
                    'ru-RU',
                )}
                profitWithoutElectricity={profitWithoutElectricity.toLocaleString(
                    'ru-RU',
                )}
                profitWithElectricity={profitWithElectricity.toLocaleString(
                    'ru-RU',
                )}
                paybackWithElectricity={paybackWithElectricity.toLocaleString(
                    'ru-RU',
                )}
                paybackWithoutElectricity={paybackWithoutElectricity.toLocaleString(
                    'ru-RU',
                )}
            />
        )}
      </div>
    </div>
  );
};
