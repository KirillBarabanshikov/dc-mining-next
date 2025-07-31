'use client';

import './CalculatorPage.scss';

import { useQuery } from '@tanstack/react-query';

import { Calculator } from '@/entities/calculator';
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
    queryFn: getFaq,
  });

  return (
    <div className='calculator-page'>
      <div className='sections container'>
        <div>
          <Breadcrumbs paths={paths} />

          <div className={'calculator-page__info'}>
            <div className={'calculator-page__info-title h3'}>
              Почему выгодно работать с DC Mining
            </div>
            <div className={'calculator-page__info-text'}>
              Мы предоставляем возможность заказать топовые асики из Китая, по
              предоплате всего 30%. Основными этапами оформления заказа на
              покупку майнеров являются: заключение договора комиссии и перевод
              средств для закупки товара (может осуществляться в рублях, валюте
              и криптовалюте), закупка и проверка оборудования, передача
              майнеров на дальнейшую доставку. Каждый этап сопровождается
              видеоотчетами о проделанной работе с нашей стороны.
              <br />
              <br />
              Кроме того, мы – одна из немногих компаний, которые занимаются
              гарантийным обслуживанием проданного оборудования. Если ваш асик
              выйдет из строя, мы отремонтируем его за несколько дней (касается
              только гарантийных случаев).
              <br />
              <br />
              Чтобы оформить заказ или узнать подробную информацию – обратитесь
              на нашу горячую линию или заполните форму обратной связи. А для
              расчета доходности и окупаемости устройств – воспользуйтесь
              калькулятором майнинга.
            </div>
          </div>

          <h1 className={'h1 calculator-page__title'}>
            Рассчитайте <span>выгоду</span>
          </h1>
          <Calculator />
        </div>
        <div className={'calculator-page__info'}>
          <div className={'calculator-page__info-title h3'}>
            Почему выгодно работать с DC Mining
          </div>
          <div className={'calculator-page__info-text'}>
            Мы предоставляем возможность заказать топовые асики из Китая, по
            предоплате всего 30%. Основными этапами оформления заказа на покупку
            майнеров являются: заключение договора комиссии и перевод средств
            для закупки товара (может осуществляться в рублях, валюте и
            криптовалюте), закупка и проверка оборудования, передача майнеров на
            дальнейшую доставку. Каждый этап сопровождается видеоотчетами о
            проделанной работе с нашей стороны.
            <br />
            <br />
            Кроме того, мы – одна из немногих компаний, которые занимаются
            гарантийным обслуживанием проданного оборудования. Если ваш асик
            выйдет из строя, мы отремонтируем его за несколько дней (касается
            только гарантийных случаев).
            <br />
            <br />
            Чтобы оформить заказ или узнать подробную информацию – обратитесь на
            нашу горячую линию или заполните форму обратной связи. А для расчета
            доходности и окупаемости устройств – воспользуйтесь калькулятором
            майнинга.
          </div>
        </div>
        <section className={'questions'}>
          <div className={'questions__inner'}>
            <h2 className={'questions__title h2'}>Вопросы и ответы</h2>
            <div className={'questions__list'}>
              {faq?.map((item) => {
                return (
                  <Accordion
                    key={item.id}
                    title={item.title}
                    body={item.description}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <OrderCallBanner />
      </div>
    </div>
  );
};

export default CalculatorPage;
