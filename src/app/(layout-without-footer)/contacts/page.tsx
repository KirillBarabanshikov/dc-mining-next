import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

import { getContacts } from '@/entities/contacts';
import { getSeo } from '@/entities/seo';

import { ContactsPage } from './ContactsPage';

export async function generateMetadata() {
  const data = await getSeo('Контакты');

  return {
    title: data?.title,
    description: data?.description,
  };
}

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
