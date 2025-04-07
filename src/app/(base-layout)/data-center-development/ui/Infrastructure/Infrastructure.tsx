import './Infrastructure.scss';

import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import exampleSrc from '@/shared/assets/images/infrastructure/example.png';
import offerSrc from '@/shared/assets/images/infrastructure/image.png';

interface IInfrastructureProps {
  className?: string;
}

export const Infrastructure: FC<IInfrastructureProps> = ({ className }) => {
  return (
    <section className={clsx('infrastructure', className)}>
      <div className={'infrastructure__inner _container'}>
        <h3 className={'infrastructure__title h3'}>
          <span className={'mark'}>Профессиональное строительство</span>{' '}
          майнинг-ферм
        </h3>
        <div className={'infrastructure__subtitle'}>
          Строительство майнинг-центров – это сложный технологический процесс,
          который включает в себя разработку инженерной инфраструктуры,
          обеспечение бесперебойного энергоснабжения и создание эффективной
          системы охлаждения. <br /> Наши майнинг-фермы соответствуют мировым
          стандартам и работают на основе передовых технологий.
        </div>
        <div className={'infrastructure__offers'}>
          <Image
            src={offerSrc}
            alt={''}
            width={592}
            height={296}
            className={'infrastructure__offers-image'}
          />
          <div className={'infrastructure__offers-body'}>
            <div className={'infrastructure__offers-title h3'}>
              Мы предлагаем:
            </div>
            <ul className={'infrastructure__offers-list'}>
              <li className={'infrastructure__offers-item'}>
                Полный цикл строительства – от проекта до ввода в эксплуатацию;
              </li>
              <li className={'infrastructure__offers-item'}>
                Энергоэффективные решения для снижения затрат;
              </li>
              <li className={'infrastructure__offers-item'}>
                Интеграцию с возобновляемыми источниками энергии;
              </li>
              <li className={'infrastructure__offers-item'}>
                Надежную защиту оборудования от перегрева и сбоев.
              </li>
            </ul>
          </div>
        </div>
        <div className={'infrastructure__example'}>
          <h3 className={'infrastructure__example-title h3'}>
            <span className={'mark'}>Пример</span> инфраструктуры
          </h3>
          <Image
            src={exampleSrc}
            alt={''}
            width={1216}
            height={684}
            className={'infrastructure__example-image'}
          />
        </div>
      </div>
    </section>
  );
};
