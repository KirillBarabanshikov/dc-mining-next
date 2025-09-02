import clsx from 'clsx';
import React, { FC } from 'react';

import { useBasketStore } from '@/entities/product';
import BasketIcon from '@/shared/assets/icons/basket.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { useStore } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

import styles from './AddToBasketButton.module.scss';

interface IAddToBasketButton {
  productId: number;
  productName: string;
  className?: string;
}

export const AddToBasketButton: FC<IAddToBasketButton> = ({
  productId,
  productName,
  className,
}) => {
  const store = useStore(useBasketStore, (state) => state);
  const isBasket = !!store?.isBasket(productId);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isBasket) {
      store?.removeFromBasket(productId);
    } else {
      store?.addToBasket(productId, productName);
    }
  };

  return (
    <IconButton
      icon={<BasketIcon />}
      additionalIcon={<PlusIcon />}
      onClick={onClick}
      aria-label={'Add To basket'}
      className={clsx(isBasket && styles.isBasket, className)}
      isBasket={isBasket}
    />
  );
};
