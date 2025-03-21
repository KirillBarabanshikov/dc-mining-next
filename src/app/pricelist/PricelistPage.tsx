'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

const PricelistPage = () => {
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
    mutateAsync();
  }, []);

  return (
    <>
      {data && (
        <embed
          src={BASE_URL + data.media}
          width='100%'
          height='100%'
          type='application/pdf'
        />
      )}
    </>
  );
};

export default PricelistPage;
