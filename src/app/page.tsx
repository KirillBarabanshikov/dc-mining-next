import clsx from 'clsx';
import { Metadata } from 'next';

import { getCategories } from '@/entities/category';
import { getProducts } from '@/entities/product';
import { getSeo } from '@/entities/seo';
import { Offers } from '@/widgets';
import { Bestsellers } from '@/widgets/Bestsellers';

import styles from './page.module.scss';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeo('Главная страница');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function MainPage() {
    const [categories, products] = await Promise.all([getCategories(), getProducts()]);

    return (
        <div className={clsx(styles.sections, 'sections')}>
            <Offers categories={categories} />
            <Bestsellers products={products} />
        </div>
    );
}
