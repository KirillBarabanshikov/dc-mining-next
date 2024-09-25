import { getSeo } from '@/entities/seo';

import ServicePage from './ServicePage';

export async function generateMetadata() {
    const data = await getSeo('Ремонт и сервис');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default function Page() {
    return <ServicePage />;
}
