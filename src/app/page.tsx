import { getCategories } from '@/entities/category';
import { getSlider } from '@/entities/mainSlider';
import { getAboutInfo } from '@/entities/pageInfo';
import { getProducts } from '@/entities/product';
import { getSeo } from '@/entities/seo';

import { MainPage } from './MainPage';

export async function generateMetadata() {
    const data = await getSeo('Главная страница');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const [categories, products, slides, about] = await Promise.all([
        getCategories(),
        getProducts(),
        getSlider(),
        getAboutInfo(),
    ]);

    return <MainPage categories={categories} products={products} slides={slides} massMedia={about?.massMedia} />;
}
