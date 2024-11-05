'use client';
import './Calculator.scss';

import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { Button, Dropdown, IconButton, Input } from '@/shared/ui';

import { useCalculatorStore } from './model/store';
import { CalculatorHead } from './ui/CalculatorHead';
import { CalculatorTotal } from './ui/CalculatorTotal';

interface Props {
  className?: string;
  type?: 'lite' | 'pro';
}

export const Calculator: React.FC<Props> = ({ className, type = 'lite' }) => {
  const { calculatorType, calculatorTypes, electricityValue } = useCalculatorStore();

  const [isProError, setIsProError] = useState(false);

  const changeElectricityValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'lite') {
      e.preventDefault();
      setIsProError(true);
    }
  };

  return (
    <div className={clsx('calculator', className)}>
      <CalculatorHead calculatorTypes={calculatorTypes} calculatorType={calculatorType} />
      <div className='calculator-row'>
        <div className='calculator-card calculatorFeature'>
          <div className='calculatorFeature-content'>
            <div className='calculatorFeature-head'>
              <div className='calculatorFeature-subtitle'>Калькулятор доходности</div>
              <div className={clsx('calculatorFeature-switch', { active: isProError })}>
                <span className='active'>Lite</span>
                <span>Pro</span>
              </div>
            </div>
            <div className='calculatorFeature-list'>
              <div className='calculatorFeature-row'>
                <span>Модель</span>
                <span>Количество</span>
                <span>Цена</span>
              </div>
              <div className='calculatorFeature-data'>
                <div className='calculatorFeature-row'>
                  <div className='calculatorFeature-models'>
                    <Dropdown
                      variant='dropdown'
                      items={[
                        { label: 'Сначала популярные', value: '1' },
                        { label: 'По скидке (%)', value: '2' },
                        { label: 'Сначала недорогие', value: '3' },
                        { label: 'Сначала дорогие', value: '4' },
                      ]}
                      hasIcon={false}
                    />
                  </div>
                  <div className='calculatorFeature-counts'>
                    <IconButton icon={<MinusIcon />} variant='outline' rounded></IconButton>
                    <Input className='calculatorFeature-count' sizes='md' type='number' />
                    <IconButton icon={<PlusIcon />} variant='outline' rounded></IconButton>
                  </div>
                  <div className='calculatorFeature-price'>
                    <Input className='calculatorFeature-price-input' sizes='md' disabled />
                  </div>
                </div>
              </div>
            </div>
            <div className='calculatorElectricity'>
              <div className='calculatorElectricity-price'>
                <span>Стоимость э/э, ₽</span>
                <Input
                  value={electricityValue}
                  onChange={(e) => changeElectricityValue(e)}
                  sizes='md'
                  error={isProError}
                />
                {isProError && <div className='calculatorElectricity-error'>Доступно в Pro версии</div>}
              </div>
              <Button className='calculatorElectricity-btn' variant='outline' size='md'>
                Скачать фин модель
                <DownloadIcon />
              </Button>
            </div>
            <div className='calculator-description'>Не является публичной офертой</div>
          </div>
        </div>
        <CalculatorTotal />
      </div>
    </div>
  );
};
