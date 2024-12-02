import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

import { getContacts } from '@/entities/contacts';

import { ContactsPage } from './ContactsPage';

export default async function Page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['contacts'],
        queryFn: getContacts,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ContactsPage />
        </HydrationBoundary>
    );
}
