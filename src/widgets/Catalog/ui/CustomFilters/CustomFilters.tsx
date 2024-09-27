'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { FC } from 'react';

import { getCustomFilters } from '@/entities/catalog';
import { useCatalogFilters } from '@/entities/catalog/lib';
import { getCategoryById } from '@/entities/category';

import styles from './CustomFilters.module.scss';

interface ICustomFiltersProps {
    className?: string;
}

export const CustomFilters: FC<ICustomFiltersProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>();
    const { setParams, params, setSearchParams } = useCatalogFilters();

    const { data: customFilters } = useQuery({
        queryKey: ['custom-filters'],
        queryFn: getCustomFilters,
        staleTime: Infinity,
    });

    const { data: category } = useSuspenseQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
    });

    const handleSelect = async (value: string) => {
        if (!category) return;

        if (params.get('filter') === value) {
            setParams({ key: 'filter', value: [] });
        } else {
            setParams({ key: 'filter', value: [value] });
        }
        params.delete('page');
        setSearchParams();
    };

    return (
        <div className={clsx(styles.receipts, 'scrollbar-hide', className)}>
            {customFilters &&
                customFilters
                    .filter((filter) => filter.productCategoryTitle === category?.title)
                    .map((filter) => (
                        <div
                            key={filter.id}
                            onClick={() => handleSelect(filter.title)}
                            className={clsx(styles.receipt, params.get('filter') === filter.title && styles.active)}
                        >
                            {filter.title}
                        </div>
                    ))}
        </div>
    );
};
