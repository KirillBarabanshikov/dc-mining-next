import { Metadata } from 'next';

import { getSeo } from '@/entities/seo';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeo('Размещение в дата центре');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function DataCenterPage() {
    return <div>data center</div>;
}
