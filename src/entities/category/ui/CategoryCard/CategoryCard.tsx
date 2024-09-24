import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ICategory } from '@/entities/category';

import styles from './CategoryCard.module.scss';

interface ICategoryCardProps {
    category: ICategory;
}

export const CategoryCard: FC<ICategoryCardProps> = ({ category }) => {
    return (
        <Link href={category.link ?? `/catalog/${category.id}/${category.slug}`} className={styles.categoryCard}>
            <Image src={category.image} alt={category.title} width={237} height={237} loading={'lazy'} />
            <p>{category.name}</p>
        </Link>
    );
};
