import clsx from 'clsx';
import React, { FC } from 'react';

import { IProduct, useFavoritesStore } from '@/entities/product';
import HeartIcon from '@/shared/assets/icons/heart2.svg';
import { useStore } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

import styles from './AddToFavoritesButton.module.scss';

interface IAddToFavoritesButton {
    product: IProduct;
    className?: string;
}

export const AddToFavoritesButton: FC<IAddToFavoritesButton> = ({ product, className }) => {
    const store = useStore(useFavoritesStore, (state) => state);
    const isFavorite = !!store?.isFavorite(product.id);

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorite) {
            store?.removeFromFavorites(product.id);
        } else {
            store?.addToFavorite(product);
        }
    };

    return (
        <IconButton
            icon={<HeartIcon />}
            onClick={onClick}
            aria-label={'Add To Favorites'}
            className={clsx(isFavorite && styles.isFavorite, className)}
        />
    );
};
