import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

import { OrderCallModal } from '@/features/call';
import minerImage from '@/shared/assets/images/data-center/miner.png';
import { useIsSafari } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './CallMeBanner.module.scss';

interface ICallMeBannerProps {
  className?: string;
}

export const CallMeBanner: FC<ICallMeBannerProps> = ({ className }) => {
  const { isSafari } = useIsSafari();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={clsx(styles.banner, className)}>
      <div className={styles.content}>
        <h3>Проблемы с выбором оборудования?</h3>
        <p>Свяжитесь с нами, мы поможем подобрать оптимальное решение</p>
        <Button onClick={() => setIsOpen(true)}>Оставить запрос</Button>
        {/*{contacts && (*/}
        {/*  <div className={styles.links}>*/}
        {/*    <a*/}
        {/*      href={`tel:${intFormatPhoneNumber(number ? number : contacts.phone)}`}*/}
        {/*      className='mgo-number'*/}
        {/*    >*/}
        {/*      {formatPhoneNumber(number ? number : contacts.phone)}*/}
        {/*    </a>*/}
        {/*    <a href={`mailto:${contacts.email}`}>{contacts.email}</a>*/}
        {/*  </div>*/}
        {/*)}*/}
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
