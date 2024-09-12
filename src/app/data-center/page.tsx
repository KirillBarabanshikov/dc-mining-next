import { Metadata } from 'next';

import { DataCenterPage } from '@/app/data-center/DataCenterPage';
import { getCategories } from '@/entities/category';
import { getDataCenterInfo } from '@/entities/pageInfo';
import { getSeo } from '@/entities/seo';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeo('Размещение в дата центре');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const [info, categories] = await Promise.all([getDataCenterInfo(), getCategories()]);

    return <DataCenterPage info={info} categories={categories} />;
}
