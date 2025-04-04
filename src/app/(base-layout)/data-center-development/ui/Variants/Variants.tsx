import './Variants.scss';

import clsx from 'clsx';
import { FC } from 'react';

import Bg from '@/shared/assets/backgrounds/variant-card-bg.svg';
import { Button } from '@/shared/ui';

interface IVariantsProps {
  className?: string;
}

export const Variants: FC<IVariantsProps> = ({ className }) => {
  return (
    <section className={clsx('variants', className)}>
      <div className={'variants__inner _container'}>
        <h3 className={'variants__title h3'}>Варианты пакетных решений</h3>
        <div className={'variants__list'}>
          <VariantCard />
          <VariantCard />
          <VariantCard />
          <VariantCard />
        </div>
      </div>
    </section>
  );
};

const VariantCard = () => {
  return (
    <div className={'variant-card'}>
      <Bg className={'variant-card__bg'} />
      <div className={'variant-card__header'}>
        <div className={'variant-card__type'}>Хостинг</div>
        <Button theme={'white'} size={'sm'}>
          Заказать
        </Button>
      </div>
      <div className={'variant-card__body'}>
        <div className={'variant-card__title'}>Mini</div>
        <div className={'variant-card__price'}>от 15 млн. руб.</div>
      </div>
      <div className={'variant-card__info'}>
        <div className={'variant-card__item'}>
          <div className={'variant-card__item-body'}>
            <div className={'variant-card__item-title'}>
              Контейнер для майнинга
            </div>
            <div className={'variant-card__item-value'}>Мощность 200 кВт</div>
          </div>
          <div className={'variant-card__item-count'}>1 шт.</div>
        </div>
        <div className={'variant-card__item'}>
          <div className={'variant-card__item-body'}>
            <div className={'variant-card__item-title'}>
              Контейнер для майнинга
            </div>
            <div className={'variant-card__item-value'}>Мощность 200 кВт</div>
          </div>
          <div className={'variant-card__item-count'}>1 шт.</div>
        </div>
        <div className={'variant-card__item'}>
          <div className={'variant-card__item-body'}>
            <div className={'variant-card__item-title'}>
              Контейнер для майнинга
            </div>
            <div className={'variant-card__item-value'}>Мощность 200 кВт</div>
          </div>
          <div className={'variant-card__item-count'}>1 шт.</div>
        </div>
      </div>
    </div>
  );
};
