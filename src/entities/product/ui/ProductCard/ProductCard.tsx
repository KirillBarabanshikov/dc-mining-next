'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import { IProduct } from '@/entities/product';
import { OrderProductModal } from '@/features/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';

import styles from './ProductCard.module.scss';
import { ProductBodySimple, ProductBodyTile, ProductImage } from './ui';

interface IProductCardProps {
    product: IProduct;
    viewMode?: 'tile' | 'simple';
    withInfo?: boolean;
}

export const ProductCard: FC<IProductCardProps> = ({ product, viewMode = 'tile', withInfo = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(MAX_WIDTH_MD);

    const handleOnHover = (isHovered: boolean) => {
        if (matches || withInfo) return;
        setIsHovered(isHovered);
    };

    const handleOrderButton = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(true);
    };

    return (
        <>
            <Link
                href={`/product/${product.id}/${product.slug}`}
                onMouseEnter={() => handleOnHover(true)}
                onMouseLeave={() => handleOnHover(false)}
            >
                <article className={clsx(styles.productCard, styles[viewMode])}>
                    <ProductImage className={styles.image} images={product.images} />
                    {viewMode === 'tile' ? (
                        <ProductBodyTile
                            product={product}
                            onClick={handleOrderButton}
                            isHovered={isHovered}
                            withInfo={withInfo}
                        />
                    ) : (
                        <ProductBodySimple product={product} onClick={handleOrderButton} />
                    )}
                </article>
            </Link>
            <OrderProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={product} />
        </>
    );
};