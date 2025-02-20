import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

import { IProduct, useBasketStore } from '@/entities/product';
import RemoveIcon from '@/shared/assets/icons/close.svg';
import { formatter } from '@/shared/lib';
import { NumberInput } from '@/shared/ui';

import styles from './ProductBasketCard.module.scss';

interface IProductBasketCardProps {
  product: IProduct;
  count: number;
}

export const ProductBasketCard: FC<IProductBasketCardProps> = ({
  product,
  count,
}) => {
  const { removeFromBasket, setProductCount } = useBasketStore(
    (state) => state,
  );

  return (
    <div className={styles.card}>
      <Image
        src={product.images[0] ? product.images[0].image || '' : ''}
        alt={'Изображение товара'}
        width={124}
        height={124}
        className={styles.image}
      />
      <div className={styles.cardInner}>
        <div className={styles.cardBody}>
          <Link href={`/product/${product.slug}`} className={styles.title}>
            {product.title}
          </Link>
          <div className={styles.characteristics}>
            {product.watt && <div>Потребление — {product.watt} ± 10% Вт/ч</div>}
            {product.hashrate && <div>Хешрейт — {product.hashrate}</div>}
            {product.algorithm && <div>Алгоритм — {product.algorithm}</div>}
            {product.coins && <div>Монета — {product.coins}</div>}
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
        </div>
        <div className={styles.cardPriceWrap}>
          <div className={styles.cardPrice}>
            {product.price
              ? formatter.format(product.price)
              : 'Цена по запросу'}
          </div>
          <div>
            <div className={styles.countLabel}>Количество</div>
            <NumberInput
              variant={'small'}
              min={1}
              defaultValue={count}
              onChange={(count) =>
                setProductCount({ productId: product.id, count })
              }
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => removeFromBasket(product.id)}
        className={styles.removeButton}
      >
        <RemoveIcon />
      </button>
    </div>
  );
};
