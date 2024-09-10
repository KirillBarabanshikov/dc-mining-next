import clsx from 'clsx';
import { FC } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow-left.svg';
import DoubleArrowIcon from '@/shared/assets/icons/double-arrow-left.svg';

import styles from './Pagination.module.scss';

interface IPaginationProps {
    currentPage: number;
    length: number;
    onChange: (page: number) => void;
    className?: string;
}

export const Pagination: FC<IPaginationProps> = ({ currentPage, length, onChange, className }) => {
    const handleNext = () => {
        onChange(currentPage >= length ? currentPage : currentPage + 1);
    };

    const handlePrev = () => {
        onChange(currentPage <= 1 ? currentPage : currentPage - 1);
    };

    const handleSelectPage = (page: number) => {
        onChange(page);
    };

    const handleStart = () => {
        onChange(1);
    };

    const handleEnd = () => {
        onChange(length);
    };

    return (
        <div className={clsx(styles.pagination, className)}>
            <div onClick={handleStart} className={clsx(styles.item, currentPage === 1 && styles.disabled)}>
                <DoubleArrowIcon />
            </div>
            <div onClick={handlePrev} className={clsx(styles.item, currentPage === 1 && styles.disabled)}>
                <ArrowIcon />
            </div>
            {Array.from({ length })
                .slice(0, 8)
                .map((_, index) => {
                    const pageNumber =
                        currentPage <= 4
                            ? index + 1
                            : currentPage >= length - 3
                              ? length <= 8
                                  ? index + 1
                                  : length - 7 + index
                              : currentPage - 4 + index;
                    return (
                        <div
                            key={pageNumber}
                            onClick={() => handleSelectPage(pageNumber)}
                            className={clsx(styles.item, pageNumber === currentPage && styles.current)}
                        >
                            {pageNumber}
                        </div>
                    );
                })}
            <div
                onClick={handleNext}
                className={clsx(styles.item, styles.right, currentPage === length && styles.disabled)}
            >
                <ArrowIcon />
            </div>
            <div
                onClick={handleEnd}
                className={clsx(styles.item, styles.right, currentPage === length && styles.disabled)}
            >
                <DoubleArrowIcon />
            </div>
        </div>
    );
};
