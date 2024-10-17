'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';

import { getCatalogData, getFilters, getOffers } from '@/entities/catalog/api';
import { useCatalogFilters } from '@/entities/catalog/lib';
import { ICategory } from '@/entities/category';
import { OrderCallHelpBanner } from '@/features/call';
import { useMediaQuery } from '@/shared/lib';
import { Button, Dropdown, Range, Switch } from '@/shared/ui';

import styles from './Filters.module.scss';

interface IFiltersProps {
    category: ICategory;
    onClose?: () => void;
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ category, onClose, className }) => {
    const [reset, setReset] = useState(false);
    const matches = useMediaQuery('(max-width: 855px)');
    const { resetFilters, params, setSearchParams, setParams, getFilterBody } = useCatalogFilters();
    const queryClient = useQueryClient();
    const { slug } = useParams<{ slug: string[] }>();

    const { data: filters } = useQuery({
        queryKey: ['filters'],
        queryFn: getFilters,
        staleTime: Infinity,
    });
    const { data: offers } = useQuery({
        queryKey: ['offers'],
        queryFn: getOffers,
        staleTime: Infinity,
    });

    const onSetFilters = () => {
        params.delete('page');
        setSearchParams();
        getCatalogData({
            ...getFilterBody(category.title, undefined, slug.length > 1 ? slug[slug.length - 1] : undefined),
        }).then((data) => queryClient.setQueryData(['catalog', category.title, slug], () => data));
        onClose && onClose();
    };

    const onResetFilters = () => {
        resetFilters();
        setSearchParams();
        onClose && onClose();
        setReset((prev) => !prev);
        getCatalogData({
            ...getFilterBody(category.title, undefined, slug.length > 1 ? slug[slug.length - 1] : undefined),
        }).then((data) => queryClient.setQueryData(['catalog', category.title, slug], () => data));
    };

    return (
        <div className={clsx(styles.filters, className)}>
            {offers &&
                offers
                    .filter((offer) => offer.category === category?.name)
                    .map((tag) => {
                        return (
                            <Dropdown
                                key={tag.id}
                                label={'Предложения'}
                                defaultValue={params.get('offers') ? params.get('offers')!.split(',') : []}
                                items={tag.productTags.map((item) => ({ label: item.title, value: item.title }))}
                                onChange={(value) => setParams({ key: 'offers', value })}
                                physical
                                multiply
                                open={!!params.get('offers')}
                                reset={reset}
                            />
                        );
                    })}
            {filters &&
                filters
                    .filter((item) => item.category.value === category?.title)
                    .map((filter) => {
                        return (
                            <Dropdown
                                key={filter.id}
                                label={filter.characteristics.name}
                                defaultValue={
                                    params.get(filter.characteristics.value)
                                        ? params.get(filter.characteristics.value)!.split(',')
                                        : []
                                }
                                items={
                                    filter.lists
                                        ?.sort((a, b) => a.localeCompare(b))
                                        .map((item) => ({ label: item, value: item })) ?? []
                                }
                                onChange={(value) => setParams({ key: filter.characteristics.value, value })}
                                physical
                                multiply
                                open={!!params.get(filter.characteristics.value)}
                                reset={reset}
                            >
                                {filter.start != undefined && filter.end != undefined && (
                                    <Range
                                        min={filter.start}
                                        max={filter.end}
                                        onChange={(values) =>
                                            setParams({
                                                key: filter.characteristics.value,
                                                value: [`${values[0]}`, `${values[1]}`],
                                            })
                                        }
                                    />
                                )}
                            </Dropdown>
                        );
                    })}
            {category?.title === 'asicMiners' && (
                <div className={styles.switchWrap}>
                    <div className={styles.switch}>
                        <span>Самый прибыльный</span>
                        <Switch
                            isOn={params.has('profitable')}
                            onClick={(value) => setParams({ key: 'profitable', value: value ? ['true'] : [] })}
                            reset={reset}
                        />
                    </div>
                    <div className={styles.switch}>
                        <span>Самый мощный</span>
                        <Switch
                            isOn={params.has('powerful')}
                            onClick={(value) => setParams({ key: 'powerful', value: value ? ['true'] : [] })}
                            reset={reset}
                        />
                    </div>
                </div>
            )}
            <div className={styles.buttons}>
                <Button size={'md'} onClick={onSetFilters}>
                    Применить
                </Button>
                <Button size={'md'} variant={'outline'} onClick={onResetFilters}>
                    Сбросить
                </Button>
            </div>
            {!matches && <OrderCallHelpBanner />}
        </div>
    );
};
