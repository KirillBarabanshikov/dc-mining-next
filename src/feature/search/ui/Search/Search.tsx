import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
// import { DropdownSearchItem } from '../DropdownSearchItem';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Input, Portal } from '@/shared/ui';

// import { IProduct, useLazyGetProductsQuery } from '@/entities/product';
// import { useDebounce } from '@/shared/lib';
import styles from './Search.module.scss';

interface ISearchProps {
    autoFocus?: boolean;
    onClose?: () => void;
    className?: string;
}

export const Search: FC<ISearchProps> = ({ autoFocus = false, onClose, className }) => {
    const [searchValue, setSearchValue] = useState('');
    // const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);
    const [inFocus, setInFocus] = useState(false);
    // const [getProducts, { data: products }] = useLazyGetProductsQuery();

    // const { debouncedFunction: getDebouncedProducts } = useDebounce(
    //     (title: string) =>
    //         getProducts({ title })
    //             .unwrap()
    //             .then((data) => setSearchProducts(data)),
    //     250,
    // );

    const handleClose = () => {
        setInFocus(false);
        onClose && onClose();
    };

    const handleFocus = () => {
        setInFocus(true);
    };

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        // if (!e.target.value.trim()) return setSearchProducts([]);
        //
        // getDebouncedProducts(e.target.value.trim());
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
            {/*<AnimatePresence>*/}
            {/*    {searchValue && inFocus && searchProducts.length && (*/}
            {/*        <motion.div*/}
            {/*            initial={{ opacity: 0 }}*/}
            {/*            animate={{ opacity: 1 }}*/}
            {/*            exit={{ opacity: 0 }}*/}
            {/*            className={styles.dropdown}*/}
            {/*        >*/}
            {/*            {products &&*/}
            {/*                products.slice(0, 5).map((product) => {*/}
            {/*                    return <DropdownSearchItem key={product.id} product={product} />;*/}
            {/*                })}*/}
            {/*        </motion.div>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}
            <Portal>
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
