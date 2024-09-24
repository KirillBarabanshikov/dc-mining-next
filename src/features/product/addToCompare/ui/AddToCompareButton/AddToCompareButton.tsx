import clsx from 'clsx';
import React, { FC } from 'react';

import { IProduct } from '@/entities/product';
import StatisticIcon from '@/shared/assets/icons/statistic2.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { IconButton } from '@/shared/ui';

import styles from './AddToCompareButton.module.scss';

interface IAddToCompareButton {
    product: IProduct;
    className?: string;
    variant?: 'default' | 'trash';
}

export const AddToCompareButton: FC<IAddToCompareButton> = ({ product, variant = 'default', className }) => {
    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(product);
    };

    const isCompare = false;

    if (variant === 'trash') {
        return (
            <div className={clsx(styles.trashIcon, className)} onClick={onClick}>
                <TrashIcon />
            </div>
        );
    }

    return (
        <IconButton
            icon={<StatisticIcon />}
            onClick={onClick}
            aria-label={'Add To Compare'}
            className={clsx(isCompare && styles.isCompare, className)}
        />
    );
};
