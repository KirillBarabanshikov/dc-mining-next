import { getSeo } from '@/entities/seo';

import DeliveryPage from './DeliveryPage';

export async function generateMetadata() {
    const data = await getSeo('Доставка');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default function Page() {
    return <DeliveryPage />;
}
