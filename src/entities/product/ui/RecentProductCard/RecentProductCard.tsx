'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IProduct } from '@/entities/product';
import { formatter } from '@/shared/lib';

import styles from './RecentProductCard.module.scss';

interface IRecentProductCardProps {
    product: IProduct;
}

export const RecentProductCard: FC<IRecentProductCardProps> = ({ product }) => {
    const router = useRouter();

    return (
        <article className={styles.card} onClick={() => router.push(`/product/${product.id}/${product.slug}`)}>
            <img src={product.images[0]?.image} alt={product.title} />
            <div>
                <p className={styles.name}>{product.title}</p>
                <p className={styles.price}>{product.price ? formatter.format(product.price) : 'Цена по запросу'}</p>
            </div>
        </article>
    );
};
