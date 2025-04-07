import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { getContacts } from '@/entities/contacts';
import { getFaq } from '@/entities/faq';
import { getDataCenterDevelopmentInfo } from '@/entities/pageInfo';

import { DataCenterDevelopmentPage } from './DataCenterDevelopmentPage';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Строительство дата-центров',
  };
}

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['data-center-development'],
      queryFn: getDataCenterDevelopmentInfo,
    }),
    queryClient.prefetchQuery({
      queryKey: ['contacts'],
      queryFn: getContacts,
    }),
    queryClient.prefetchQuery({
      queryKey: ['faq'],
      queryFn: getFaq,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataCenterDevelopmentPage />;
    </HydrationBoundary>
  );
}
