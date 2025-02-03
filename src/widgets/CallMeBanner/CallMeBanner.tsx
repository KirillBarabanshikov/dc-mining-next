import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { getContacts } from '@/entities/contacts';
import minerImage from '@/shared/assets/images/data-center/miner.png';
import {
  formatPhoneNumber,
  intFormatPhoneNumber,
  useIsSafari,
  useMangoStore,
} from '@/shared/lib';

import styles from './CallMeBanner.module.scss';

interface ICallMeBannerProps {
  className?: string;
}

export const CallMeBanner: FC<ICallMeBannerProps> = ({ className }) => {
  const { number } = useMangoStore();
  const { isSafari } = useIsSafari();
  const { data: contacts } = useSuspenseQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  return (
    <section className={clsx(styles.banner, className)}>
      <div className={styles.content}>
        <h3>Проблемы с выбором оборудования?</h3>
        <p>Свяжитесь с нами, мы поможем подобрать оптимальное решение</p>
        {contacts && (
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
    </section>
  );
};
