'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

import { getCustomFilters } from '@/entities/catalog';
import { ICategory } from '@/entities/category';

import styles from './CustomFilters.module.scss';

interface ICustomFiltersProps {
    category: ICategory;
    className?: string;
}

export const CustomFilters: FC<ICustomFiltersProps> = ({ category, className }) => {
    const { slug } = useParams<{ slug: string[] }>();
    const router = useRouter();

    const { data: customFilters } = useQuery({
        queryKey: ['custom-filters', category.id],
        queryFn: () => getCustomFilters(category.id),
        staleTime: Infinity,
    });

    const handleSelect = async (filterSlug: string) => {
        router.push(`/catalog/${slug[0]}/${filterSlug}`);
    };

    return (
        <div className={clsx(styles.receipts, 'scrollbar-hide', className)}>
            {customFilters &&
                customFilters.map((filter) => (
                    <div
                        key={filter.id}
                        onClick={() => handleSelect(filter.slug)}
                        className={clsx(styles.receipt, slug.includes(filter.slug) && styles.active)}
                    >
                        {filter.title}
                    </div>
                ))}
        </div>
    );
};
