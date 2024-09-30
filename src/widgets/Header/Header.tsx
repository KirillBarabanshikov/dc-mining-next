import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCategories } from '@/entities/category';
import { getContacts } from '@/entities/contacts';
import { HeaderContent } from '@/widgets/Header/ui';

export const Header = async () => {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['contacts'],
            queryFn: getContacts,
        }),
        queryClient.prefetchQuery({
            queryKey: ['categories'],
            queryFn: getCategories,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeaderContent />
        </HydrationBoundary>
    );
};
