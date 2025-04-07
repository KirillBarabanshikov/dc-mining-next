import './Variants.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { IDataCenterDevelopmentVariable } from '@/entities/pageInfo';
import Bg from '@/shared/assets/backgrounds/variant-card-bg.svg';
import { Button } from '@/shared/ui';

interface IVariantsProps {
  variants: IDataCenterDevelopmentVariable[];
  className?: string;
}

export const Variants: FC<IVariantsProps> = ({ variants, className }) => {
  return (
    <section className={clsx('variants', className)}>
      <div className={'variants__inner _container'}>
        <h3 className={'variants__title h3'}>Варианты пакетных решений</h3>
        <div className={'variants__list'}>
          {variants.map((variant) => {
            return <VariantCard key={variant.id} variant={variant} />;
          })}
        </div>
      </div>
    </section>
  );
};

const VariantCard: FC<{ variant: IDataCenterDevelopmentVariable }> = ({
  variant,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className={'variant-card'}
    >
      <Bg className={'variant-card__bg'} />
      <div className={'variant-card__header'}>
        <div className={'variant-card__type'}>{variant.type}</div>
        <Button theme={isHover ? 'blue' : 'white'} size={'sm'}>
          Заказать
        </Button>
      </div>
      <div className={'variant-card__body'}>
        <div className={'variant-card__title'}>{variant.title}</div>
        <div className={'variant-card__price'}>{variant.price}</div>
      </div>
      <AnimatePresence mode={'wait'}>
        {isHover ? (
          <motion.div
            key={'a'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={'variant-card__alternatives'}
          >
            {variant.alternatives.map((item) => {
              return (
                <div key={item.id} className={'variant-card__alternative'}>
                  <div className={'variant-card__alternative-key'}>
                    {item.title}
                  </div>
                  <div
                    className={'variant-card__alternative-value'}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={'b'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={'variant-card__info'}
          >
            {variant.contains.map((item) => {
              return (
                <div key={item.id} className={'variant-card__item'}>
                  <div className={'variant-card__item-body'}>
                    <div className={'variant-card__item-title'}>
                      {item.title}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className={'variant-card__item-value'}
                    />
                  </div>
                  <div className={'variant-card__item-count'}>
                    {item.count} шт.
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
