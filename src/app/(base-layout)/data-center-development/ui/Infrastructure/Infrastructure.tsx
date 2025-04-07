import './Infrastructure.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

import exampleSrc from '@/shared/assets/images/infrastructure/example.png';
import offerSrc from '@/shared/assets/images/infrastructure/image.png';
import { useOutsideClick } from '@/shared/lib';

interface IInfrastructureProps {
  title: string;
  subtitle: string;
  offers: string;
  className?: string;
}

export const Infrastructure: FC<IInfrastructureProps> = ({
  title,
  subtitle,
  offers,
  className,
}) => {
  return (
    <section className={clsx('infrastructure', className)}>
      <div className={'infrastructure__inner _container'}>
        <h3
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
          />
          <div
            className={'infrastructure__offers-body'}
            dangerouslySetInnerHTML={{ __html: offers }}
          />
        </div>
        <div className={'infrastructure__example'}>
          <h3 className={'infrastructure__example-title h3'}>
            <span className={'mark'}>Пример</span> инфраструктуры
          </h3>
          <div className={'infrastructure__example-points'}>
            <Image
              src={exampleSrc}
              alt={''}
              width={1216}
              height={684}
              className={'infrastructure__example-image'}
            />
            {Array.from({ length: 6 }).map((_, index) => (
              <Point
                key={index}
                className={clsx(
                  'infrastructure__point-wrap',
                  `infrastructure__point-wrap-${index}`,
                )}
                text={
                  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ratione!'
                }
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
              className={'infrastructure__point-text'}
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
