'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getAboutInfo } from '@/entities/pageInfo';
import { Breadcrumbs } from '@/shared/ui';
import { NewsList } from '@/widgets/NewsList';

const paths = [
    { name: 'Главная', path: '/' },
    { name: 'СМИ о нас', path: '/news' },
];

export const NewsPage = () => {
    const { data: info } = useSuspenseQuery({
        queryKey: ['about'],
        queryFn: getAboutInfo,
        staleTime: Infinity,
    });

    return (
        <div>
            <div className={'container'}>
                <Breadcrumbs paths={paths} />
            </div>
            <section>
                <div className={'container'}>
                    <h1 className={'section-title-secondary'}>СМИ о нас</h1>
                    <NewsList massMedia={info?.massMedia} />
                </div>
            </section>
        </div>
    );
};
