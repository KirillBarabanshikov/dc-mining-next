'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

const PricelistPage = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['pdfs'],
    queryFn: async () => {
      const response = await instance.get<{ id: number; media: string }>(
        '/pdfs',
      );
      return response.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await instance.post('/statistics', {
        count: 0,
        dateTime: 'string',
      });
    },
  });

  useEffect(() => {
    const sendStatistic = async () => {
      await mutateAsync();

      if (data?.media) {
        router.replace(BASE_URL + data.media);
      }
    };

    sendStatistic();
  }, [data, router]);

  return <p>Перенаправление</p>;
};

export default PricelistPage;
