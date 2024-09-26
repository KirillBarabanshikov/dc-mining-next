'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { compareProducts, IProduct, ProductCompareCard, useCompareStore } from '@/entities/product';
import { Switch } from '@/shared/ui';

import styles from './CompareList.module.scss';

export const CompareList = () => {
    const [isOn, setIsOn] = useState(false);
    const [compareList, setCompareList] = useState<IProduct[]>([]);
    const { compare } = useCompareStore();
    const { mutateAsync: compareMutate } = useMutation({ mutationFn: compareProducts });

    useEffect(() => {
        setProducts();
    }, [compare]);

    const setProducts = async () => {
        if (compare.length) {
            await compareMutate(compare).then((data) => setCompareList(data ? data : []));
        } else {
            setCompareList([]);
        }
    };

    return (
        <>
            <div className={styles.wrap}>
                <span>Только отличия</span>
                <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} />
            </div>
            <ScrollContainer className={styles.list} nativeMobileScroll>
                {compareList.map((product) => {
                    return <ProductCompareCard key={product.id} product={product} onlyDifference={isOn} />;
                })}
            </ScrollContainer>
        </>
    );
};
