import clsx from 'clsx';
import React, { FC } from 'react';

import { useBasketStore } from '@/entities/product';
import BasketIcon from '@/shared/assets/icons/basket.svg';
import { useStore } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

import styles from './AddToBasketButton.module.scss';

interface IAddToBasketButton {
  productId: number;
  className?: string;
}

export const AddToBasketButton: FC<IAddToBasketButton> = ({
  productId,
  className,
}) => {
  const store = useStore(useBasketStore, (state) => state);
  const isBasket = !!store?.isBasket(productId);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isBasket) {
      store?.removeFromBasket(productId);
    } else {
      store?.addToBasket(productId);
    }
  };

  return (
    <IconButton
      icon={<BasketIcon />}
      onClick={onClick}
      aria-label={'Add To Compare'}
      className={clsx(isBasket && styles.isBasket, className)}
    />
  );
};
