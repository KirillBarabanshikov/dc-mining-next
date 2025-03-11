'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button, Pagination } from '@/shared/ui';

import styles from './CatalogPagination.module.scss';

interface ICatalogPaginationProps {
  countProducts: number;
  className?: string;
}

export const CatalogPagination: FC<ICatalogPaginationProps> = ({
  countProducts,
  className,
}) => {
  const searchParams = useSearchParams();
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const router = useRouter();

  const currentPage = +(searchParams.get('page') ?? 1);
  const countPages = Math.ceil(countProducts / 12);

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    const page = currentPage + 1;
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={clsx(styles.paginationWrap, className)}>
      {currentPage < countPages && (
        <Button
          variant={'outline'}
          isWide
          size={matches ? 'md' : 'lg'}
          onClick={handleLoadMore}
        >
          Показать ещё
        </Button>
      )}
      <Pagination
        currentPage={currentPage}
        length={countPages}
        onChange={(page) => handleChangePage(page)}
        className={styles.pagination}
      />
    </div>
  );
};
