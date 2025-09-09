'use client';

import './CalculatorPage.scss';

import { useQuery } from '@tanstack/react-query';

import { Calculator } from '@/entities/calculator';
import { getCalculatorInfo } from '@/entities/calculator/api/calculatorApi';
import { getFaq } from '@/entities/faq';
import { OrderCallBanner } from '@/features/call';
import { Accordion, Breadcrumbs } from '@/shared/ui';

const paths = [
  { name: 'Главная', path: '/' },
  { name: 'Калькулятор доходности', path: '/calculator' },
];

const CalculatorPage = () => {
  const { data: faq } = useQuery({
    queryKey: ['faq'],
    queryFn: () => getFaq({ type: 'Калькулятор' }),
  });

  const { data: info } = useQuery({
    queryKey: ['calculator-info'],
    queryFn: getCalculatorInfo,
  });

  return (
    <div className='calculator-page'>
      <div className='sections container'>
        <div>
          <Breadcrumbs paths={paths} />

          {info && (
            <div
              className={'calculator-page__info'}
              dangerouslySetInnerHTML={{ __html: info.title }}
            />
          )}

          <h2 className={'h1 calculator-page__title'}>
            Рассчитайте <span>выгоду</span>
          </h2>
          <Calculator />

          {info && (
            <div
              className={'calculator-page__info'}
              dangerouslySetInnerHTML={{ __html: info.description }}
            />
          )}
        </div>

        {!!faq?.length && (
          <section className={'questions'}>
            <div className={'questions__inner'}>
              <h2 className={'questions__title h2'}>Вопросы и ответы</h2>
              <div className={'questions__list'}>
                {faq?.map((item, index) => (
                  <Accordion
                    number={index + 1}
                    key={item.id}
                    title={item.title}
                    body={item.description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <OrderCallBanner />
      </div>
    </div>
  );
};

export default CalculatorPage;
