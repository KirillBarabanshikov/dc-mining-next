'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getMassMedia } from '@/entities/pageInfo';
import { Breadcrumbs } from '@/shared/ui';
import { NewsList } from '@/widgets/NewsList';

const paths = [
    { name: 'Главная', path: '/' },
    { name: 'СМИ о нас', path: '/news' },
];

export const NewsPage = () => {
    const { data: news } = useSuspenseQuery({
        queryKey: ['news'],
        queryFn: getMassMedia,
    });

    return (
        <div>
            <div className={'container'}>
                <Breadcrumbs paths={paths} />
            </div>
            <section>
                <div className={'container'}>
                    <h1 className={'section-title-secondary'}>СМИ о нас</h1>
                    {news && <NewsList massMedia={news} />}
                </div>
            </section>
        </div>
    );
};
