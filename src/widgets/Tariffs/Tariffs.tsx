'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

import { ITariff } from '@/entities/pageInfo';
import { OrderCallModal } from '@/features/call';
import { BASE_URL, MAX_WIDTH_LG } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './Tariffs.module.scss';

interface ITariffsProps {
  tariffs: ITariff[];
  className?: string;
}

export const Tariffs: FC<ITariffsProps> = ({ tariffs, className }) => {
  return (
    <section
      className={clsx(styles.tariffsWrap, className)}
      id={'tariffs'}
      style={{ scrollMarginTop: '200px' }}
    >
      <div className={clsx(styles.tariffsContainer, 'container')}>
        <h2 className={'section-title-primary'}>Тарифные планы</h2>
        <div className={clsx(styles.tariffs, 'scrollbar-hide')}>
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
  const matches = useMediaQuery(MAX_WIDTH_LG);

  return (
    <>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={styles.tariffCard}
      >
        <div className={styles.imageWrap}>
          <Image
            src={BASE_URL + tariff.image}
            alt={tariff.title}
            width={280}
            height={280}
            className={styles.tariffImage}
          />
          <Image
            src={BASE_URL + tariff.imageHover}
            alt={tariff.title}
            width={280}
            height={280}
            className={clsx(styles.tariffImage, styles.tariffImageHover)}
          />
        </div>
        <div className={styles.body}>
          <motion.div
            animate={{ fontSize: isHovered || matches ? '32px' : '24px' }}
            className={styles.tariffTitle}
          >
            {tariff.title}
          </motion.div>
          <motion.div
            className={styles.tariffDescOverlay}
            animate={
              isHovered || matches ? { opacity: 1 } : { height: 0, opacity: 0 }
            }
          >
            <div
              className={styles.tariffDesc}
              dangerouslySetInnerHTML={{ __html: tariff.description }}
            />
          </motion.div>
          <motion.div className={styles.tariffPrice}>{tariff.price}</motion.div>
          <motion.div
            className={styles.buttonOverlay}
            animate={
              isHovered || matches ? { opacity: 1 } : { height: 0, opacity: 0 }
            }
          >
            <Button onClick={() => setIsOpen(true)} className={styles.button}>
              Оставить заявку
            </Button>
          </motion.div>
        </div>
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
