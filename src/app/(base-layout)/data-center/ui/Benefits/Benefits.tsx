'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

import { OrderCallModal } from '@/features/call';
import benefit from '@/shared/assets/images/benefits/benefit.png';
import benefit1 from '@/shared/assets/images/benefits/benefit1.png';
import benefit2 from '@/shared/assets/images/benefits/benefit2.png';
import benefit3 from '@/shared/assets/images/benefits/benefit3.png';
import benefit4 from '@/shared/assets/images/benefits/benefit4.png';
import benefit5 from '@/shared/assets/images/benefits/benefit5.png';
import { Button } from '@/shared/ui';

import styles from './Benefits.module.scss';

interface IBenefitsProps {
  countDevices: number;
  className?: string;
}

export const Benefits: FC<IBenefitsProps> = ({ countDevices, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={clsx(styles.benefits, className)}>
      <div className={clsx(styles.container, 'container')}>
        <h2 className={'section-title-primary'}>Приемущества</h2>
        <div className={styles.benefitsWrap}>
          <div className={styles.benefitBlock}>
            <div className={styles.benefitMainCard}>
              <div className={styles.benefitMainText}>
                Оформление в соответствии с <span>ФЗ-221</span>
              </div>
              <Image
                src={benefit}
                alt={'benefit'}
                className={styles.benefitMainImage}
                width={420}
                height={420}
              />
            </div>
            <div className={styles.wrap}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitCardImage}>
                  <Image
                    src={benefit1}
                    alt={'benefit'}
                    width={78}
                    height={78}
                  />
                </div>
                <div className={styles.benefitCardBody}>
                  <div className={styles.benefitCardTitle}>UPTIME до 99%</div>
                  <div className={styles.benefitCardSubtitle}>Держим марку</div>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitCardImage}>
                  <Image
                    src={benefit3}
                    alt={'benefit'}
                    width={78}
                    height={78}
                  />
                </div>
                <div className={styles.benefitCardBody}>
                  <div className={styles.benefitCardTitle}>Онлайн камеры</div>
                  <div className={styles.benefitCardSubtitle}>
                    Для вашего спокойствия
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.benefitBlock}>
            <div className={clsx(styles.wrap, styles.column)}>
              <div
                className={clsx(styles.benefitCard, styles.benefitCardLarge)}
              >
                <div className={styles.benefitCardImage}>
                  <Image
                    src={benefit2}
                    alt={'benefit'}
                    width={220}
                    height={220}
                  />
                </div>
                <div className={styles.benefitCardBody}>
                  <div className={styles.benefitCardTitle}>Нам доверяют</div>
                  <div className={styles.benefitCardSubtitle}>
                    {countDevices} устройств в обслуживании
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitCardImage}>
                    <Image
                      src={benefit4}
                      alt={'benefit'}
                      width={78}
                      height={78}
                    />
                  </div>
                  <div className={styles.benefitCardBody}>
                    <div className={styles.benefitCardTitle}>
                      Вооруженная охрана
                    </div>
                    <div className={styles.benefitCardSubtitle}>
                      Охраняет наши объекты 24/7
                    </div>
                  </div>
                </div>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitCardImage}>
                    <Image
                      src={benefit5}
                      alt={'benefit'}
                      width={78}
                      height={78}
                    />
                  </div>
                  <div className={styles.benefitCardBody}>
                    <div className={styles.benefitCardTitle}>
                      Юридическая чистота
                    </div>
                    <div className={styles.benefitCardSubtitle}>
                      Только официальные платежи
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setIsOpen(true)} className={styles.button}>
                Оставить заявку
              </Button>
            </div>
          </div>
        </div>
      </div>
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </section>
  );
};
