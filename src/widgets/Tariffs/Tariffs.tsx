'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
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
    <section className={clsx(styles.tariffsWrap, className)}>
      <div className={clsx(styles.tariffsContainer, 'container')}>
        <h2 className={'section-title-primary'}>Тарифные планы</h2>
        <div className={clsx(styles.tariffs)}>
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
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={styles.tariffCard}
        animate={{ height: isHovered ? '560px' : '435px' }}
      >
        <Image
          src={BASE_URL + tariff.image}
          alt={tariff.title}
          width={435}
          height={435}
          className={styles.tariffImage}
        />
        <Image
          src={BASE_URL + tariff.imageHover}
          alt={tariff.title}
          width={435}
          height={435}
          className={clsx(styles.tariffImage, styles.tariffImageHover)}
        />
        <div className={styles.tariffTitle}>{tariff.title}</div>
        <AnimatePresence initial={false}>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={styles.tariffDescOverlay}
            >
              <div
                className={styles.tariffDesc}
                dangerouslySetInnerHTML={{ __html: tariff.description }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={styles.tariffPrice}
          animate={{ fontSize: isHovered ? '32px' : '40px' }}
        >
          {tariff.price}
        </motion.div>
        <AnimatePresence initial={false}>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={styles.buttonOverlay}
            >
              <Button onClick={() => setIsOpen(true)} className={styles.button}>
                Оставить заявку
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </>
  );
};
