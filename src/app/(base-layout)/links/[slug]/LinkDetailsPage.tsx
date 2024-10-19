'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getLinkBySlug } from '@/entities/link';
import { Accordion, Breadcrumbs } from '@/shared/ui';

import styles from './LinkDetailsPage.module.scss';

const paths = [
    { name: 'Главная', path: '/' },
    { name: 'Полезные ссылки', path: '/links' },
];

const LinksDetailsPage = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data: link } = useQuery({
        queryKey: ['links', slug],
        queryFn: () => getLinkBySlug(slug),
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
