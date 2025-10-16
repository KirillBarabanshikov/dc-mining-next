import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';

import { IProduct } from '@/entities/product';
import { AddToBasketButton } from '@/features/product';
import { formatter } from '@/shared/lib';
import { Badge, Button } from '@/shared/ui';

import cardStyles from '../../ProductCard.module.scss';
import styles from './ProductBodyTile.module.scss';

interface IProductBodyTileProps {
  product: IProduct;
  onClick: (e: React.MouseEvent) => void;
  isHovered: boolean;
  withInfo?: boolean;
}

export const ProductBodyTile: FC<IProductBodyTileProps> = ({
  product,
  onClick,
  isHovered,
  withInfo = true,
}) => {
  return (
    <div className={styles.body}>
      <div className={clsx(cardStyles.tags, styles.tags)}>
        {product.tags.map((tag) => {
          return <Badge key={tag.id} text={tag.title} color={tag.color} />;
        })}
      </div>
      <p className={clsx(cardStyles.price, styles.price)}>
        {product.price ? formatter.format(product.price) : 'Цена по запросу'}
      </p>
      <p className={clsx(cardStyles.name, styles.name)}>{product.title}</p>
      <AnimatePresence initial={!withInfo}>
        {(isHovered || withInfo) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={clsx(
              cardStyles.specifications,
              withInfo && styles.specifications,
            )}
          >
            <div
              className={clsx(
                cardStyles.specificationsList,
                styles.specificationsList,
              )}
            >
              {product.watt && (
                <div>Потребление — {product.watt} ± 10% Вт/ч</div>
              )}
              {product.hashrate && <div>Хешрейт — {product.hashrate}</div>}
              {product.algorithm && <div>Алгоритм — {product.algorithm}</div>}
              {product.coins && (
                <div className={styles.specificationCoins}>
                  Монета — {product.coins}
                </div>
              )}
              {product.value
                .filter((value) => value.display)
                .map((value) => {
                  return (
                    <div key={value.id}>
                      {value.valueInKey} — {value.title} {value.unit}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={clsx(cardStyles.buttons, styles.buttons)}>
        <Button
          size={'sm'}
          className={clsx(cardStyles.button, styles.button)}
          onClick={onClick}
          isWide
        >
          Заказать
        </Button>
        {/*<AddToFavoritesButton*/}
        {/*  product={product}*/}
        {/*  className={clsx(cardStyles.iconButton, styles.iconButton)}*/}
        {/*/>*/}
        {/*<AddToCompareButton*/}
        {/*  productId={product.id}*/}
        {/*  className={clsx(cardStyles.iconButton, styles.iconButton)}*/}
        {/*/>*/}
        <AddToBasketButton
          productId={product.id}
          productName={product.title}
          className={clsx(cardStyles.iconButton, styles.iconButton)}
        />
      </div>
    </div>
  );
};
