'use client';

import clsx from 'clsx';
import { FC, Fragment, useState } from 'react';

import { IProduct, useCompareStore } from '@/entities/product';
import { AddToFavoritesButton, OrderProductModal } from '@/features/product';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import placeholderImg from '@/shared/assets/images/product/placeholder.png';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './ProductCompareCard.module.scss';

interface IProductCompareCardProps {
    product: IProduct;
    onlyDifference?: boolean;
}

export const ProductCompareCard: FC<IProductCompareCardProps> = ({ product, onlyDifference }) => {
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const { removeFromCompare } = useCompareStore();

    return (
        <div className={clsx(styles.card)}>
            <div className={styles.header}>
                <div className={styles.trash} onClick={() => removeFromCompare(product.id)}>
                    <TrashIcon />
                </div>
                <img src={product.images[0] ? product.images[0].image : placeholderImg.src} alt={product.title} />
                <p className={styles.name}>{product.title}</p>
                <p className={styles.price}>{product.price ? formatter.format(product.price) : 'Цена по запросу'}</p>
                <div className={styles.buttons}>
                    <AddToFavoritesButton product={product} className={styles.iconButton} />
                    <Button
                        variant={matches ? 'solid' : 'outline'}
                        size={matches ? 'sm' : 'md'}
                        isWide
                        onClick={() => setIsOpen(true)}
                    >
                        Заказать
                    </Button>
                </div>
            </div>
            <div className={styles.specifications}>
                {product.value.map((value) => {
                    if (onlyDifference && !value.difference) {
                        return <Fragment key={value.id} />;
                    }

                    return (
                        <div
                            key={value.id}
                            className={clsx(styles.specification, value.difference && styles.difference)}
                        >
                            <div className={styles.title}>{value.valueInKey}</div>
                            <div className={styles.value}>{value.title}</div>
                        </div>
                    );
                })}
            </div>
            <OrderProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={product} />
        </div>
    );
};
