'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getLinkById } from '@/entities/link';
import { Accordion, Breadcrumbs } from '@/shared/ui';

import styles from './LinkDetailsPage.module.scss';

const paths = [
    { name: 'Главная', path: '/' },
    { name: 'Полезные ссылки', path: '/links' },
];

const LinksDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: link } = useSuspenseQuery({
        queryKey: ['links', id],
        queryFn: () => getLinkById(id),
        staleTime: Infinity,
    });

    return (
        <div className={styles.link}>
            <div className={'container'}>
                <Breadcrumbs
                    paths={[...paths, { name: link?.title ?? '', path: `/links/${link?.id}/${link?.slug}` }]}
                />
            </div>
            <section>
                <div className={'container'}>
                    <h1 className={'section-title-secondary'}>{link?.title}</h1>
                    <div className={styles.list}>
                        {link?.information.map((info) => {
                            return <Accordion key={info.id} title={info.title} body={info.description} />;
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LinksDetailsPage;
