'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';

import {
  getCatalogData,
  getCustomFilterBySlug,
  ICatalogData,
  useCatalogFilters,
} from '@/entities/catalog';
import { getSubCategoryBySlug, ICategory } from '@/entities/category';
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
  category: ICategory;
  viewMode: 'tile' | 'simple';
  setViewMode: (viewMode: 'tile' | 'simple') => void;
  catalogData: ICatalogData;
  className?: string;
}

export const Sorting: FC<ISortingProps> = ({
  category,
  viewMode,
  setViewMode,
  catalogData,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const { setSearchParams, params, getFilterBody } = useCatalogFilters();
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string[] }>();

  // const { data: filters } = useQuery({
  //     queryKey: ['filters'],
  //     queryFn: getFilters,
  //     staleTime: Infinity,
  // });
  // const { data: offers } = useQuery({
  //     queryKey: ['offers'],
  //     queryFn: getOffers,
  //     staleTime: Infinity,
  // });
  const { data: subCategory } = useQuery({
    queryKey: ['subCategory', slug[1]],
    queryFn: () => getSubCategoryBySlug(slug[1]),
    enabled: !!slug[1],
  });

  const { data: customFilter } = useQuery({
    queryKey: ['customFilter', slug[1]],
    queryFn: () => getCustomFilterBySlug(slug[1]),
    enabled: !!slug[1],
  });

  const onChangeSort = (value: string[]) => {
    params.delete('page');
    params.set('order', value[0]);
    setSearchParams();
    getCatalogData({
      ...getFilterBody({
        type: category?.title ?? '',
        subCategory: subCategory ? slug[1] : undefined,
        customFilter: customFilter ? slug[1] : undefined,
      }),
    }).then((data) =>
      queryClient.setQueryData(
        ['catalog', category?.title, subCategory, slug[1], customFilter],
        () => data,
      ),
    );
  };

  return (
    <div className={clsx(styles.sorting, className)}>
      <div className={styles.sortDropdown}>
        <span className={styles.sortLabel}>Сортировка:</span>
        <Dropdown
          defaultValue={[params.get('order') ?? '5']}
          items={[
            { label: 'По дате добавления', value: '5' },
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
            className={clsx(
              styles.iconButton,
              viewMode === 'simple' && styles.selected,
            )}
          />
          <IconButton
            icon={<TileIcon />}
            onClick={() => setViewMode('tile')}
            className={clsx(
              styles.iconButton,
              viewMode === 'tile' && styles.selected,
            )}
          />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className={clsx(styles.modal, 'scrollbar-hide')}
      >
        <Filters
          onClose={() => setIsOpen(false)}
          category={category}
          catalogData={catalogData}
        />
      </Modal>
    </div>
  );
};
