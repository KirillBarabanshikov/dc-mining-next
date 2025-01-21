'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

import { ITariff } from '@/entities/pageInfo';
import { OrderCallModal } from '@/features/call';
import { BASE_URL } from '@/shared/consts';
import { Button } from '@/shared/ui';

import styles from './Tariffs.module.scss';

interface ITariffsProps {
  tariffs: ITariff[];
  className?: string;
}

export const Tariffs: FC<ITariffsProps> = ({ tariffs, className }) => {
  return (
    <section id={'tariffs'} className={clsx(styles.tariffs, className)}>
      <div className={clsx(styles.tariffsContainer, 'container')}>
        <h2 className={'section-title-primary'}>Тарифные планы</h2>
        <div className={clsx(styles.tariffsList)}>
          {tariffs.map((tariff) => {
            return <TariffCard key={tariff.id} tariff={tariff} />;
          })}
        </div>
      </div>
    </section>
  );
};

interface ITariffCardProps {
  tariff: ITariff;
}

export const TariffCard: FC<ITariffCardProps> = ({ tariff }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className={styles.tariffCard}
    >
      <div className={styles.imageWrap}>
        <Image
          src={BASE_URL + tariff.image}
          alt={`Тариф: ${tariff.title}`}
          width={200}
          height={200}
          className={styles.image}
        />
        <Image
          src={BASE_URL + tariff.imageHover}
          alt={`Тариф: ${tariff.title}`}
          width={200}
          height={200}
          className={clsx(styles.image, styles.imageHover)}
        />
      </div>
      <div className={styles.overlay}>
        <motion.div
          className={styles.title}
          animate={isHover ? { fontSize: '32px' } : {}}
        >
          {tariff.title}
        </motion.div>
        <motion.div
          animate={isHover ? {} : { height: 0, opacity: 0 }}
          className={styles.descOverlay}
        >
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: tariff.description }}
          />
        </motion.div>
        <div className={styles.price}>{tariff.price}</div>
        <motion.div
          animate={isHover ? {} : { height: 0, opacity: 0 }}
          className={styles.buttonOverlay}
        >
          <Button onClick={() => setIsOpen(true)} className={styles.button}>
            Оставить заявку
          </Button>
        </motion.div>
      </div>
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </motion.div>
  );
};
