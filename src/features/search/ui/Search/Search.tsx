'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react';

import { getProducts, IProduct } from '@/entities/product';
import { DropdownSearchItem } from '@/features/search/ui/DropdownSearchItem';
import CloseIcon from '@/shared/assets/icons/close.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useDebounce } from '@/shared/lib';
import { Input, Portal } from '@/shared/ui';

import styles from './Search.module.scss';

interface ISearchProps {
    autoFocus?: boolean;
    onClose?: () => void;
    className?: string;
}

export const Search: FC<ISearchProps> = ({ autoFocus = false, onClose, className }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchProducts, setSearchProducts] = useState<IProduct[]>();
    const [inFocus, setInFocus] = useState(false);
    const { refetch: search } = useQuery({
        queryKey: ['search', searchValue],
        queryFn: () => getProducts({ title: searchValue }),
        enabled: false,
        staleTime: 0,
    });

    const { debouncedFunction: getDebouncedProducts } = useDebounce(
        () => search().then((data) => setSearchProducts(data.data)),
        250,
    );

    const handleClose = () => {
        setInFocus(false);
        setSearchProducts(undefined);
        onClose && onClose();
    };

    const handleFocus = () => {
        setInFocus(true);
        searchValue.trim() && getDebouncedProducts();
    };

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        if (!e.target.value.trim()) return setSearchProducts(undefined);
        getDebouncedProducts();
    };

    return (
        <div className={clsx(styles.searchWrap, className)}>
            <Input
                placeholder={'Поиск'}
                onFocus={handleFocus}
                onBlur={handleClose}
                onChange={onChangeSearch}
                value={searchValue}
                autoFocus={autoFocus}
                icon={
                    searchValue ? (
                        <CloseIcon onClick={() => setSearchValue('')} className={styles.icon} />
                    ) : (
                        <SearchIcon className={styles.icon} />
                    )
                }
                className={clsx(styles.input)}
            />
            <AnimatePresence>
                {searchValue && inFocus && searchProducts?.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.dropdown}
                    >
                        {searchProducts &&
                            searchProducts.slice(0, 5).map((product) => {
                                return <DropdownSearchItem key={product.id} product={product} />;
                            })}
                    </motion.div>
                )}
            </AnimatePresence>
            <Portal elementId={'overlay'}>
                <AnimatePresence>
                    {inFocus && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.overlay}
                        />
                    )}
                </AnimatePresence>
            </Portal>
        </div>
    );
};
