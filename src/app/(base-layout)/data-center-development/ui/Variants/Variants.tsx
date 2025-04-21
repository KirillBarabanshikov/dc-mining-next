import './Variants.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { IDataCenterDevelopmentVariable } from '@/entities/pageInfo';
import { OrderCallModal } from '@/features/call';
import Bg from '@/shared/assets/backgrounds/variant-card-bg.svg';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface IVariantsProps {
  variants: IDataCenterDevelopmentVariable[];
  className?: string;
}

export const Variants: FC<IVariantsProps> = ({ variants, className }) => {
  return (
    <section className={clsx('variants', className)}>
      <div className={'variants__inner _container'}>
        <h2 className={'variants__title h3'}>Варианты пакетных решений</h2>
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
  const matches = useMediaQuery('(max-width: 1023.98px)');
  const [isHover, setIsHover] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        onHoverStart={() => (matches ? {} : setIsHover(true))}
        onHoverEnd={() => (matches ? {} : setIsHover(false))}
        className={'variant-card'}
      >
        <Bg className={'variant-card__bg'} />
        <div className={'variant-card__header'}>
          <div className={'variant-card__type'}>{variant.type}</div>
          <Button
            theme={isHover || matches ? 'blue' : 'white'}
            size={'sm'}
            onClick={() => setIsOpen(true)}
          >
            Заказать
          </Button>
        </div>
        <div className={'variant-card__body'}>
          <div className={'variant-card__title'}>{variant.title}</div>
          <div className={'variant-card__price'}>{variant.price}</div>
        </div>
        {matches ? (
          <>
            <motion.div className={'variant-card__info'}>
              <div className={'variant-card__alternative'}>
                <div className={'variant-card__alternative-key'}>Вложения</div>
                <div className={'variant-card__alternative-value'}>
                  {variant.price}
                </div>
              </div>

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
              <button
                onClick={() => setShowMore((prevState) => !prevState)}
                className={'variant-card__button'}
              >
                {showMore ? 'Скрыть' : 'Подробнее'}
              </button>

              <AnimatePresence>
                <motion.div
                  animate={{ height: showMore ? 'auto' : 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={'variant-card__info'}>
                    {variant.contains.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={
                            'variant-card__item variant-card__item--count'
                          }
                        >
                          <div className={'variant-card__item-body'}>
                            <div className={'variant-card__item-title'}>
                              {item.title}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                              className={'variant-card__item-value'}
                            />
                          </div>
                          <div className={'variant-card__item-count'}>
                            {item.count} шт.
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <AnimatePresence mode={'wait'}>
            {isHover ? (
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
            ) : (
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
            )}
          </AnimatePresence>
        )}
      </motion.div>
      <OrderCallModal
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
