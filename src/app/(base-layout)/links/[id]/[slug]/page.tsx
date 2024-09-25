import { QueryClient } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import { getLinkById, ILink } from '@/entities/link';

import LinkDetailsPage from './LinkDetailsPage';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const link = await getLinkById(params.id);

    return {
        title: link?.title,
    };
}

export default async function Page({ params }: { params: { id: string; slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['links', params.id],
        queryFn: () => getLinkById(params.id),
        staleTime: Infinity,
    });

    const link = queryClient.getQueryData<ILink>(['links', params.id]);

    if (!link) {
        return notFound();
    }

    if (params.slug !== link.slug) {
        return redirect(`/links/${link.id}/${link.slug}`);
    }

    return <LinkDetailsPage />;
}
