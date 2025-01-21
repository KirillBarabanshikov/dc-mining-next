import clsx from 'clsx';
import { FC, useState } from 'react';

import { OrderCallModal } from '@/features/call';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './DataCenterInfo.module.scss';

interface IDataCenterInfoProps {
  title: string;
  description: string;
  className?: string;
}

export const DataCenterInfo: FC<IDataCenterInfoProps> = ({
  title,
  description,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const match = useMediaQuery(MAX_WIDTH_MD);

  return (
    <div className={clsx(styles.dataCenterInfo, className)}>
      <video autoPlay loop muted playsInline className={styles.background}>
        <source src={'/animations/data_center-animation.webm'} />
        Ваш браузер не поддерживает тег video.
      </video>
      <section className={styles.dataCenterInfo}>
        <div className={'container'}>
          <div className={styles.dataCenterBody}>
            <h1
              dangerouslySetInnerHTML={{ __html: title }}
              className={clsx(styles.title, 'section-title-primary')}
            />
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className={styles.desc}
            />
            <Button
              onClick={() => setIsOpen(true)}
              size={match ? 'md' : 'lg'}
              isWide={match}
              className={styles.button}
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </div>
  );
};
