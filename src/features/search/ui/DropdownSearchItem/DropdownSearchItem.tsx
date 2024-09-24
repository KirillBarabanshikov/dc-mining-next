'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IProduct } from '@/entities/product';
import SearchIcon from '@/shared/assets/icons/search.svg';

import styles from './DropdownSearchItem.module.scss';

interface IDropdownSearchItem {
    product: IProduct;
}

export const DropdownSearchItem: FC<IDropdownSearchItem> = ({ product }) => {
    const router = useRouter();

    return (
        <div className={styles.item} onClick={() => router.push(`/product/${product.id}/${product.slug}`)}>
            <SearchIcon className={styles.icon} />
            <div className={styles.name}>{product.title}</div>
        </div>
    );
};
