import './CalculatorItemCard.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { formatPriceByCurrency } from '@/entities/calculator/lib/formatPriceByCurrency';
import { CoinsList } from '@/entities/calculator/ui/CoinsList';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { Button, NumberInput } from '@/shared/ui';

import { Currency, Model, Product } from '../../model/types';

interface ICalculatorItemCardProps {
  variant: 'product' | 'model';
  currency: Currency;
  product?: Product;
  model?: Model;
  addModel?: (product: Product) => void;
  models: Model[];
  setModelCount: (product: Product, count: number) => void;
  removeModel?: (product: Product) => void;
}

export const CalculatorItemCard: FC<ICalculatorItemCardProps> = ({
  variant,
  currency,
  product,
  addModel,
  models,
  model,
  setModelCount,
  removeModel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx('calculator-card', `calculator-card--${variant}`)}>
      {variant === 'product' && product && (
        <>
          <div className={'calculator-card__title'}>{product.title}</div>
          <div className={'calculator-card__info'}>
            <div className={'calculator-card__info-row'}>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Алгоритм</div>
                <div className={'calculator-card__info-value'}>
                  {product.algorithm}
                </div>
              </div>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>
                  Потребление, Вт.
                </div>
                <div className={'calculator-card__info-value'}>
                  {product.watt}
                </div>
              </div>
            </div>
            <div className={'calculator-card__info-row'}>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Хэшрейт</div>
                <div className={'calculator-card__info-value'}>
                  {product.hashrate}
                </div>
              </div>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Цена</div>
                <div className={'calculator-card__info-value'}>
                  {formatPriceByCurrency(product.price, currency)}
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={'calculator-card__expanded-wrap'}
              >
                <div className={'calculator-card__extra'}>
                  <div className={'calculator-card__extra-card'}>
                    <div className={'calculator-card__extra-title'}>
                      {currency === 'rub' ? 'Доход, руб.' : 'Доход, $'}
                    </div>
                    <div
                      className={
                        'calculator-card__extra-row calculator-card__extra-row-coins'
                      }
                    >
                      <div className={'calculator-card__extra-item'}>
                        В монете в месяц
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        {currency === 'rub' ? 'В руб. в месяц' : 'В $ в месяц'}
                      </div>
                    </div>
                    <CoinsList coins={product.coinsArray} currency={currency} />
                  </div>

                  <div className={'calculator-card__extra-card'}>
                    <div className={'calculator-card__extra-title'}>
                      {currency === 'rub'
                        ? 'Доход, руб. в мес.'
                        : 'Доход, в мес. $'}
                    </div>
                    <div className={'calculator-card__extra-row'}>
                      <div className={'calculator-card__extra-item'}>
                        без учета э/э
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        с учетом э/э
                      </div>
                    </div>
                    <div className={'calculator-card__extra-row'}>
                      <div className={'calculator-card__extra-item'}>
                        {formatPriceByCurrency(product.profitDayAll, currency)}
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        {formatPriceByCurrency(
                          product.paybackWithWatt,
                          currency,
                        )}
                      </div>
                    </div>
                    <div className={'calculator-card__extra-title'}>
                      Окупаемость, мес.
                    </div>
                    <div className={'calculator-card__extra-row'}>
                      <div className={'calculator-card__extra-item'}>
                        без учета э/э
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        с учетом э/э
                      </div>
                    </div>
                    <div className={'calculator-card__extra-row'}>
                      <div className={'calculator-card__extra-item'}>
                        {product.paybackPerMonth}
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        {product.profitWithWatt}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={'calculator-card__buttons'}>
            <Button
              theme={'gray'}
              onClick={() => setIsExpanded((prev) => !prev)}
              className={'calculator-card__button calculator-card__button-more'}
            >
              {isExpanded ? 'Свернуть' : 'Подробнее'}
            </Button>
            <Button
              disabled={
                !!models.find((model) => model.product.id === product.id)
              }
              onClick={() => addModel?.(product)}
              className={
                'calculator-card__button calculator-card__button-action'
              }
            >
              <PlusIcon />
            </Button>
          </div>
        </>
      )}

      {variant === 'model' && model && (
        <>
          <div className={'calculator-card__title'}>{model.product.title}</div>
          <div className={'calculator-card__info'}>
            <div className={'calculator-card__info-row'}>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Алгоритм</div>
                <div className={'calculator-card__info-value'}>
                  {model.product.algorithm}
                </div>
              </div>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>
                  Потребление, Вт.
                </div>
                <div className={'calculator-card__info-value'}>
                  {model.product.watt}
                </div>
              </div>
            </div>
            <div className={'calculator-card__info-row'}>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Хэшрейт</div>
                <div className={'calculator-card__info-value'}>
                  {model.product.hashrate}
                </div>
              </div>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Цена за шт.</div>
                <div className={'calculator-card__info-value'}>
                  {formatPriceByCurrency(model.product.price, currency)}
                </div>
              </div>
            </div>
            <div
              className={
                'calculator-card__info-row calculator-card__info-row-extra'
              }
            >
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>Количество</div>
                <div className={'calculator-card__info-value'}>
                  <NumberInput
                    variant={'calculator'}
                    min={1}
                    disabled={true}
                    defaultValue={model.count}
                    onChange={(count) => setModelCount(model.product, count)}
                  />
                </div>
              </div>
              <div className={'calculator-card__info-item'}>
                <div className={'calculator-card__info-key'}>
                  Общая стоимость
                </div>
                <div
                  className={
                    'calculator-card__info-value calculator-card__info-value-price'
                  }
                >
                  {formatPriceByCurrency(
                    model.product.price * model.count,
                    currency,
                  )}
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={'calculator-card__expanded-wrap'}
              >
                <div className={'calculator-card__extra'}>
                  <div className={'calculator-card__extra-card'}>
                    <div className={'calculator-card__extra-title'}>
                      {currency === 'rub'
                        ? 'Доход, руб. в мес.'
                        : 'Доход, в мес. $'}
                    </div>
                    <div className={'calculator-card__extra-row'}>
                      <div className={'calculator-card__extra-item'}>
                        без учета э/э
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        с учетом э/э
                      </div>
                    </div>
                    <div className={'calculator-card__extra-row'}>
                      <div className={'calculator-card__extra-item'}>
                        {formatPriceByCurrency(
                          model.product.profitDayAll * model.count,
                          currency,
                        )}
                      </div>
                      <div className={'calculator-card__extra-item'}>
                        {formatPriceByCurrency(
                          model.product.paybackWithWatt * model.count,
                          currency,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={'calculator-card__buttons'}>
            <Button
              theme={'gray'}
              onClick={() => setIsExpanded((prev) => !prev)}
              className={'calculator-card__button calculator-card__button-more'}
            >
              {isExpanded ? 'Свернуть' : 'Подробнее'}
            </Button>
            <Button
              theme={'white'}
              onClick={() => removeModel?.(model.product)}
              className={
                'calculator-card__button calculator-card__button-remove'
              }
            >
              <TrashIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
