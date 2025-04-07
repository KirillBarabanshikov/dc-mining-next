import './Infrastructure.scss';

import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import exampleSrc from '@/shared/assets/images/infrastructure/example.png';
import offerSrc from '@/shared/assets/images/infrastructure/image.png';

interface IInfrastructureProps {
  title: string;
  subtitle: string;
  offers: string;
  className?: string;
}

export const Infrastructure: FC<IInfrastructureProps> = ({
  title,
  subtitle,
  offers,
  className,
}) => {
  return (
    <section className={clsx('infrastructure', className)}>
      <div className={'infrastructure__inner _container'}>
        <h3
          className={'infrastructure__title h3'}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className={'infrastructure__subtitle'}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        <div className={'infrastructure__offers'}>
          <Image
            src={offerSrc}
            alt={''}
            width={592}
            height={296}
            className={'infrastructure__offers-image'}
          />
          <div
            className={'infrastructure__offers-body'}
            dangerouslySetInnerHTML={{ __html: offers }}
          ></div>
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
