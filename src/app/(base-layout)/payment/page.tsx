import { getSeo } from '@/entities/seo';

import PaymentPage from './PaymentPage';

export async function generateMetadata() {
    const data = await getSeo('Оплата');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default function Page() {
    return <PaymentPage />;
}
