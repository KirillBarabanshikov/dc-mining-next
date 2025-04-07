'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

import { IContacts } from '@/entities/contacts';
import { OrderCallModal } from '@/features/call';
import minerImage from '@/shared/assets/images/data-center/miner.png';
import {
  formatPhoneNumber,
  intFormatPhoneNumber,
  useIsSafari,
  useMangoStore,
} from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './CallMeBanner.module.scss';

interface ICallMeBannerProps {
  contacts?: IContacts | null;
  variant?: 'order' | 'contacts';
  title?: string;
  subtitle?: string;
  className?: string;
}

export const CallMeBanner: FC<ICallMeBannerProps> = ({
  contacts,
  variant = 'order',
  title = 'Проблемы с выбором оборудования?',
  subtitle = 'Свяжитесь с нами, мы поможем подобрать оптимальное решение',
  className,
}) => {
  const { isSafari } = useIsSafari();
  const [isOpen, setIsOpen] = useState(false);
  const { number } = useMangoStore();

  return (
    <section className={clsx(styles.banner, className)}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        {variant === 'order' && (
          <Button onClick={() => setIsOpen(true)}>Оставить запрос</Button>
        )}
        {variant === 'contacts' && contacts && (
          <div className={styles.links}>
            <a
              href={`tel:${intFormatPhoneNumber(number ? number : contacts.phone)}`}
              className='mgo-number'
            >
              {formatPhoneNumber(number ? number : contacts.phone)}
            </a>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </div>
        )}
      </div>
      {isSafari ? (
        <Image
          src={minerImage}
          alt={'Изображение майнера'}
          width={500}
          height={500}
          className={styles.image}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          width={500}
          height={500}
          className={styles.video}
        >
          <source src={'/animations/bitmain-antminer.webm'} />
        </video>
      )}
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </section>
  );
};
