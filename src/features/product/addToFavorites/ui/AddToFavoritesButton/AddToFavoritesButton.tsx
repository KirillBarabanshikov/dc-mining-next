import clsx from 'clsx';
import React, { FC } from 'react';

import { IProduct } from '@/entities/product';
import HeartIcon from '@/shared/assets/icons/heart2.svg';
import { IconButton } from '@/shared/ui';

import styles from './AddToFavoritesButton.module.scss';

interface IAddToFavoritesButton {
    product: IProduct;
    className?: string;
}

export const AddToFavoritesButton: FC<IAddToFavoritesButton> = ({ product, className }) => {
    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(product);
    };

    const isFavorite = false;

    return (
        <IconButton
            icon={<HeartIcon />}
            onClick={onClick}
            className={clsx(!!isFavorite && styles.isFavorite, className)}
        />
    );
};
