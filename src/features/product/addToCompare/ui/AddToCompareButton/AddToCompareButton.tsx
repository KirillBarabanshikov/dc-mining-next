import clsx from 'clsx';
import React, { FC } from 'react';

import { useCompareStore } from '@/entities/product';
import StatisticIcon from '@/shared/assets/icons/statistic2.svg';
import { useStore } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

import styles from './AddToCompareButton.module.scss';

interface IAddToCompareButton {
    productId: number;
    className?: string;
}

export const AddToCompareButton: FC<IAddToCompareButton> = ({ productId, className }) => {
    const store = useStore(useCompareStore, (state) => state);
    const isCompare = !!store?.isCompare(productId);

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isCompare) {
            store?.removeFromCompare(productId);
        } else {
            store?.addToCompare(productId);
        }
    };

    return (
        <IconButton
            icon={<StatisticIcon />}
            onClick={onClick}
            aria-label={'Add To Compare'}
            className={clsx(isCompare && styles.isCompare, className)}
        />
    );
};
