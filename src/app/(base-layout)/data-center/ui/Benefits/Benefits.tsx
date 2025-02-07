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
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './Benefits.module.scss';

interface IBenefitsProps {
  countDevices?: number;
  page?: 'data-center' | 'product';
  withContainer?: boolean;
  className?: string;
}

export const Benefits: FC<IBenefitsProps> = ({
  countDevices = 2500,
  page = 'data-center',
  withContainer = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery(MAX_WIDTH_MD);

  if (page === 'product' && !matches) {
    return (
      <section className={clsx(styles.benefits, styles.product, className)}>
        <div className={clsx(styles.container, withContainer && 'container')}>
          <h2 className={'section-title-primary'}>Преимущества</h2>
          <div className={styles.benefitsWrap}>
            <div
              style={{
                overflow: 'hidden',
                position: 'relative',
              }}
              className={styles.reviews}
            >
              <iframe
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e6e6e6',
                  boxSizing: 'border-box',
                }}
                src='https://yandex.ru/maps-reviews-widget/6232622173?comments'
                title='Yandex Maps Reviews'
                className={styles.iframe}
              ></iframe>
              <a
                href='https://yandex.ru/maps/org/dc_mining/6232622173/'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  boxSizing: 'border-box',
                  textDecoration: 'none',
                  color: '#b3b3b3',
                  fontSize: '10px',
                  fontFamily: 'YS Text, sans-serif',
                  padding: '0 16px',
                  position: 'absolute',
                  bottom: 8,
                  width: '100%',
                  textAlign: 'center',
                  left: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  maxHeight: '14px',
                  whiteSpace: 'nowrap',
                }}
              >
                Dc Mining на карте Москвы — Яндекс Карты
              </a>
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
                      quality={100}
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
                        quality={100}
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
                        quality={100}
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
                <div className={styles.row}>
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitCardImage}>
                      <Image
                        src={benefit1}
                        alt={'benefit'}
                        width={78}
                        height={78}
                        quality={100}
                      />
                    </div>
                    <div className={styles.benefitCardBody}>
                      <div className={styles.benefitCardTitle}>
                        UPTIME до 99%
                      </div>
                      <div className={styles.benefitCardSubtitle}>
                        Держим марку
                      </div>
                    </div>
                  </div>
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitCardImage}>
                      <Image
                        src={benefit3}
                        alt={'benefit'}
                        width={78}
                        height={78}
                        quality={100}
                      />
                    </div>
                    <div className={styles.benefitCardBody}>
                      <div className={styles.benefitCardTitle}>
                        Онлайн камеры
                      </div>
                      <div className={styles.benefitCardSubtitle}>
                        Для вашего спокойствия
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(true)}
                  className={styles.button}
                >
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
  }

  return (
    <section className={clsx(styles.benefits, className)}>
      <div className={clsx(styles.container, withContainer && 'container')}>
        <h2 className={'section-title-primary'}>Преимущества</h2>
        {page === 'product' && (
          <div
            style={{
              overflow: 'hidden',
              position: 'relative',
            }}
            className={styles.reviews}
          >
            <iframe
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid #e6e6e6',
                boxSizing: 'border-box',
              }}
              src='https://yandex.ru/maps-reviews-widget/6232622173?comments'
              title='Yandex Maps Reviews'
              className={styles.iframe}
            ></iframe>
            <a
              href='https://yandex.ru/maps/org/dc_mining/6232622173/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                boxSizing: 'border-box',
                textDecoration: 'none',
                color: '#b3b3b3',
                fontSize: '10px',
                fontFamily: 'YS Text, sans-serif',
                padding: '0 16px',
                position: 'absolute',
                bottom: 8,
                width: '100%',
                textAlign: 'center',
                left: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                maxHeight: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              Dc Mining на карте Москвы — Яндекс Карты
            </a>
          </div>
        )}
        <div className={styles.benefitsWrap}>
          <div className={clsx(styles.benefitBlock, styles.main)}>
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
                quality={100}
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
                    quality={100}
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
                    quality={100}
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
                    quality={100}
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
                      quality={100}
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
                      quality={100}
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
