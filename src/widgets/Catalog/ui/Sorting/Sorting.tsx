'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';

import { useCatalogFilters, useCatalogStore } from '@/entities/catalog';
import { getCategoryById } from '@/entities/category';
import FilterIcon from '@/shared/assets/icons/filter.svg';
import SimpleIcon from '@/shared/assets/icons/view-mode-simple.svg';
import SimpleIcon2 from '@/shared/assets/icons/view-mode-simple2.svg';
import TileIcon from '@/shared/assets/icons/view-mode-tile.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Dropdown, IconButton, Modal } from '@/shared/ui';
import { Filters } from '@/widgets/Catalog/ui';

import styles from './Sorting.module.scss';

interface ISortingProps {
    className?: string;
}

export const Sorting: FC<ISortingProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const { viewMode, setViewMode } = useCatalogStore();
    const { id } = useParams<{ id: string }>();
    const { data: category } = useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
    });
    const { setSearchParams, params } = useCatalogFilters();

    const onChangeSort = (value: string[]) => {
        if (!category) return;
        params.delete('page');
        params.set('order', value[0]);
        setSearchParams();
    };

    return (
        <div className={clsx(styles.sorting, className)}>
            <div className={styles.sortDropdown}>
                <span className={styles.sortLabel}>Сортировка:</span>
                <Dropdown
                    defaultValue={[params.get('order') ?? '1']}
                    items={[
                        { label: 'Сначала популярные', value: '1' },
                        { label: 'По скидке (%)', value: '2' },
                        { label: 'Сначала недорогие', value: '3' },
                        { label: 'Сначала дорогие', value: '4' },
                    ]}
                    variant={matches ? 'modal' : 'dropdown'}
                    className={styles.dropdown}
                    onChange={onChangeSort}
                />
            </div>
            <div className={styles.buttonsWrap}>
                <button className={styles.filterButton} onClick={() => setIsOpen(true)}>
                    <FilterIcon />
                    Фильтры
                </button>
                <div className={styles.viewModeWrap}>
                    <IconButton
                        icon={matches ? <SimpleIcon2 /> : <SimpleIcon />}
                        onClick={() => setViewMode('simple')}
                        className={clsx(styles.iconButton, viewMode === 'simple' && styles.selected)}
                    />
                    <IconButton
                        icon={<TileIcon />}
                        onClick={() => setViewMode('tile')}
                        className={clsx(styles.iconButton, viewMode === 'tile' && styles.selected)}
                    />
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className={clsx(styles.modal, 'scrollbar-hide')}>
                <Filters onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};
