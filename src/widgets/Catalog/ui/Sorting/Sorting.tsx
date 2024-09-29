'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';

import { getCatalogData, useCatalogFilters } from '@/entities/catalog';
import { ICategory } from '@/entities/category';
import FilterIcon from '@/shared/assets/icons/filter.svg';
import SimpleIcon from '@/shared/assets/icons/view-mode-simple.svg';
import SimpleIcon2 from '@/shared/assets/icons/view-mode-simple2.svg';
import TileIcon from '@/shared/assets/icons/view-mode-tile.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Dropdown, IconButton, Modal } from '@/shared/ui';
import { Filters } from '@/widgets/Catalog/ui';

import styles from './Sorting.module.scss';
import { useQueryClient } from '@tanstack/react-query';

interface ISortingProps {
    category: ICategory;
    viewMode: 'tile' | 'simple';
    setViewMode: (viewMode: 'tile' | 'simple') => void;
    className?: string;
}

export const Sorting: FC<ISortingProps> = ({ category, viewMode, setViewMode, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const { setSearchParams, params, getFilterBody } = useCatalogFilters();
    const queryClient = useQueryClient();

    const onChangeSort = (value: string[]) => {
        params.delete('page');
        params.set('order', value[0]);
        setSearchParams();
        getCatalogData({ ...getFilterBody(category.title) }).then((data) =>
            queryClient.setQueryData(['catalog', category.title], () => data),
        );
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
