import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { MainPage } from '@/app/MainPage';
import { getCategories } from '@/entities/category';
import { getSlider } from '@/entities/mainSlider';
import { getProducts } from '@/entities/product';
import { getSeo } from '@/entities/seo';

export async function generateMetadata() {
    const data = await getSeo('Главная страница');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['products'],
            queryFn: () => getProducts({ display: true }),
        }),
        queryClient.prefetchQuery({
            queryKey: ['categories'],
            queryFn: getCategories,
        }),
        queryClient.prefetchQuery({
            queryKey: ['slider'],
            queryFn: getSlider,
            staleTime: Infinity,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MainPage />
        </HydrationBoundary>
    );
}
