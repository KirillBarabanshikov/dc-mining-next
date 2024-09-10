import clsx from 'clsx';
import { Metadata } from 'next';

import { getCategories } from '@/entities/category';
import { getSeo } from '@/entities/seo';
import { Offers } from '@/widgets';

import styles from './page.module.scss';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeo('Главная страница');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function MainPage() {
    const categories = await getCategories();

    return (
        <div className={clsx(styles.sections, 'sections')}>
            <Offers categories={categories} />
        </div>
    );
}
