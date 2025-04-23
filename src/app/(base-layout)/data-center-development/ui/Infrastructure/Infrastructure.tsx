import './Infrastructure.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

import offerSrc from '@/shared/assets/images/infrastructure/image.png';
import { useOutsideClick } from '@/shared/lib';

interface IInfrastructureProps {
  title: string;
  subtitle: string;
  offers: string;
  className?: string;
}

const hints = [
  'Газопоршневая установка (ГПУ) – генерирует электроэнергию из газа. Мощность варьируется от 100 кВт до 5 мВт',
  'Контейнер для майнинг оборудования – вместимость от 36 шт. до 264 шт. при максимальной нагрузке до 1,5 мВт',
  'Трансформаторная подстанция (опционно)',
  'Административно бытовое здание – для размещения персонала и склада',
  'Газорегуряторный пункт (ГРП) – для понижения входного давления газа до заданного уровня и поддержания его на выходе',
  'Электрические кабельные линии (опционно) – для подачи сетевой электроэнергии',
  'Оградительная конструкция с системой видеонаблюдения',
];

export const Infrastructure: FC<IInfrastructureProps> = ({
  title,
  subtitle,
  offers,
  className,
}) => {
  return (
    <section className={clsx('infrastructure', className)}>
      <div className={'infrastructure__inner _container'}>
        <h2
          className={'infrastructure__title h3'}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className={'infrastructure__subtitle'}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        <div className={'infrastructure__offers'}>
          <Image
            src={offerSrc}
            alt={''}
            width={592}
            height={296}
            className={'infrastructure__offers-image'}
            quality={100}
          />
          <div
            className={'infrastructure__offers-body'}
            dangerouslySetInnerHTML={{ __html: offers }}
          />
        </div>
        <div className={'infrastructure__example'}>
          <h2 className={'infrastructure__example-title h3'}>
            <span className={'mark'}>Пример</span> инфраструктуры
          </h2>
          <div className={'infrastructure__example-points'}>
            <video
              autoPlay
              loop
              muted
              playsInline
              width={1216}
              height={684}
              className={'infrastructure__example-image'}
            >
              <source src={'/animations/data_center_development.webm'} />
              Ваш браузер не поддерживает тег video.
            </video>
            {Array.from({ length: 7 }).map((_, index) => (
              <Point
                key={index}
                className={clsx(
                  'infrastructure__point-wrap',
                  `infrastructure__point-wrap-${index}`,
                )}
                text={hints[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Point: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [isHover, setIsHover] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsHover(false));

  return (
    <div className={className}>
      <div ref={ref} className={'infrastructure__point'}>
        <motion.div
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          onClick={() => setIsHover((prev) => !prev)}
          animate={{ scale: isHover ? 1 : [1, 1.1, 1] }}
          transition={{
            duration: isHover ? 0.2 : 1.5,
            ease: 'easeInOut',
            repeat: isHover ? 0 : Infinity,
          }}
          className={'infrastructure__point-dot'}
        >
          <motion.div
            animate={{ scale: isHover ? 1.7 : 1 }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
            className={'infrastructure__point-ellipse'}
          />
        </motion.div>
        <AnimatePresence>
          {isHover && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className={'infrastructure__point-text-wrap'}
            >
              <div className={'infrastructure__point-text'}>{text}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
