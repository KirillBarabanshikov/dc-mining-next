import clsx from 'clsx';
import { useState } from 'react';

import { OrderCallModal } from '@/features/call';
import { Button } from '@/shared/ui';

import styles from './Hero.module.scss';

export const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.hero}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.heroBackground}
        >
          <source src={'/animations/data_center-animation.webm'} />
          Ваш браузер не поддерживает тег video.
        </video>
        <section className={styles.heroSection}>
          <div className={clsx(styles.heroSectionInner, 'container')}>
            <div className={styles.heroBody}>
              <p className={styles.heroExtra}>Инвестиции в майнинг</p>
              <h1 className={styles.heroTitle}>
                Строительство дата-центров для майнинга <span>под ключ</span>
              </h1>
              <p className={styles.heroSubtitle}>
                DC Mining — ведущая компания в области строительства и
                эксплуатации майнинг центров. Мы разрабатываем энергоэффективные
                решения для размещения оборудования и обеспечиваем бесперебойную
                работу дата-центров
              </p>
            </div>
            <div className={styles.heroList}>
              <div className={styles.heroItem}>
                <div className={styles.heroItemKey}>окупаемость проекта</div>
                <div className={styles.heroItemValue}>от 20 месяцев</div>
              </div>
              <div className={styles.heroItem}>
                <div className={styles.heroItemKey}>размер инвестиций</div>
                <div className={styles.heroItemValue}>от 15 млн ₽</div>
              </div>
              <Button onClick={() => setIsOpen(true)}>Оставить заявку</Button>
            </div>
            <div className={styles.heroResource}>
              <img
                src={
                  'https://s3-alpha-sig.figma.com/img/0330/5abc/ab868053e4021072cc0d8b23323064d0?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Fw6zuh5zr3LbjrgtKZ8XzvIePbQIEr1Iy~NiCVnhmMcj~VAMHW4KeBdtGIwz5jbv5qGiMY9zdGzP27fTf~dlsQ3LCwIf4qED9NnBFf-v005ISmOmItIJu7ti2PUbSmbuHKvI5KpO8MbfxWCui1PgBoWSAbMggxWWzuaUMtFxXUbJA5xOo5GT5kq~4XIsLnS8KJq4TdgL2b7gkU-5t5ZGbwWVvXzwqRHE38IRtlpVKlO5TV60Zaj~hXbFGK5e6AKnLwlbd~8t6NFqlOZyJrSsQnSJt5pv9MqlOtMBiHf81xEXHBqgBaANcVnbYSUbb9s7McngxhFevmGCXN1JKHBg__'
                }
                alt={'Resource'}
                width={72}
                height={72}
                className={styles.heroResourceImage}
              />
              <div className={styles.heroResourceBody}>
                <div className={styles.heroResourceTitle}>
                  ООО «Диси Телеком»
                </div>
                <div className={styles.heroResourceSubtitle}>
                  Оператор майнинговой инфраструктуры
                </div>
              </div>
              <Button theme={'white'} size={'md'}>
                Rusprofile
              </Button>
            </div>
          </div>
        </section>
      </div>
      <OrderCallModal
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
