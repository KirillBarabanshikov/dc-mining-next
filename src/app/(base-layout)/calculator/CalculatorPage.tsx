'use client';
import './CalculatorPage.scss';

import clsx from 'clsx';
import { useState } from 'react';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import HeartIcon from '@/shared/assets/icons/heart2.svg';
import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { Breadcrumbs, Button, Dropdown, IconButton, Input } from '@/shared/ui';

const paths = [
  { name: 'Главная', path: '/' },
  { name: 'Калькулятор доходности', path: '/calculator' },
];

const CalculatorPage = () => {
  const [calculatorType, setCalculatorType] = useState(1);

  const calculatorTypes = [
    {
      id: 1,
      title: 'По моделям',
      onClick: function () {
        setCalculatorType(this.id);
        console.log(this.title);
      },
    },
    {
      id: 2,
      title: 'Готовый бизнес',
      onClick: function () {
        setCalculatorType(this.id);
        console.log(this.title);
      },
    },
    {
      id: 3,
      title: 'Дата центр',
      onClick: function () {
        setCalculatorType(this.id);
        console.log(this.title);
      },
    },
    {
      id: 4,
      title: 'Лизинг',
      onClick: function () {
        setCalculatorType(this.id);
        console.log(this.title);
      },
    },
  ];

  return (
    <div className='sections'>
      <div className='container'>
        <Breadcrumbs paths={paths} />
        <div className='calculator'>
          <div className='calculator-head'>
            <h2 className={clsx('calculator-title', 'section-title-primary')}>
              Рассчитайте <span>выгоду</span>
            </h2>
            <div className='calculator-types'>
              {calculatorTypes.map((item) => (
                <div
                  onClick={() => item.onClick()}
                  className={clsx('calculator-type', { active: item.id === calculatorType })}
                  key={item.id}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
          <div className='calculator-row'>
            <div className='calculator-card calculatorFeature'>
              <div className='calculatorFeature-content'>
                <div className='calculatorFeature-head'>
                  <div className='calculatorFeature-subtitle'>Калькулятор доходности</div>
                  <div className='calculatorFeature-switch'>
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
                    <Input sizes='md' />
                  </div>
                  <Button className='calculatorElectricity-btn' variant='outline' size='md'>
                    Скачать фин модель
                    <DownloadIcon />
                  </Button>
                </div>
                <div className='calculator-description'>Не является публичной офертой</div>
              </div>
            </div>
            <div className='calculator-card calculatorTotal'>
              <div className='calculatorTotal-subtitle'>Характеристики</div>
              <div className='calculatorTotal-list'>
                <div className='calculatorTotal-item'>
                  <span>Общее потребление, кВт в месяц</span>
                  <span>2 337,84</span>
                </div>
                <div className='calculatorTotal-item'>
                  <span>Расход на э/э в месяц, ₽</span>
                  <span>12 858,12</span>
                </div>
                <div className='calculatorTotal-item'>
                  <span>Прибыль без учета э/э, мес</span>
                  <span>57 778 457,22</span>
                </div>
                <div className='calculatorTotal-item'>
                  <span>Прибыль с учетом э/э, мес</span>
                  <span>57 778 457,22</span>
                </div>
              </div>
              <div className='calculatorTotal-subtitle'>Окупаемость</div>
              <div className='calculatorTotal-list'>
                <div className='calculatorTotal-item'>
                  <span>Без учета э/э, мес</span>
                  <span>0,01</span>
                </div>
                <div className='calculatorTotal-item'>
                  <span>С учетом э/э, мес</span>
                  <span>0,01</span>
                </div>
              </div>
              <div className='calculatorTotal-btns'>
                <Button variant='outline' isWide>
                  Добавить в избранное
                  <HeartIcon />
                </Button>
                <Button theme='pink' isWide>
                  Оставить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
