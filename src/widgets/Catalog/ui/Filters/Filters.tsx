'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { FC } from 'react';

import { getFilters, getOffers } from '@/entities/catalog/api';
import { useCatalogFilters } from '@/entities/catalog/lib';
import { getCategoryById } from '@/entities/category';
import { OrderCallHelpBanner } from '@/features/call';
import { useMediaQuery } from '@/shared/lib';
import { Button, Dropdown, Range, Switch } from '@/shared/ui';

import styles from './Filters.module.scss';

interface IFiltersProps {
    onClose?: () => void;
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ onClose, className }) => {
    const { id } = useParams<{ id: string }>();
    const matches = useMediaQuery('(max-width: 855px)');
    const { resetFilters, params, setSearchParams, setParams } = useCatalogFilters();

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
    const { data: category } = useSuspenseQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
    });

    const onSetFilters = () => {
        if (!category) return;
        params.delete('page');
        setSearchParams();
        onClose && onClose();
    };

    const onResetFilters = () => {
        if (!category) return;
        resetFilters();
        onClose && onClose();
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
                                items={filter.lists?.map((item) => ({ label: item, value: item })) ?? []}
                                onChange={(value) => setParams({ key: filter.characteristics.value, value })}
                                physical
                                multiply
                                open={!!params.get(filter.characteristics.value)}
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
                        />
                    </div>
                    <div className={styles.switch}>
                        <span>Самый мощный</span>
                        <Switch
                            isOn={params.has('powerful')}
                            onClick={(value) => setParams({ key: 'powerful', value: value ? ['true'] : [] })}
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
