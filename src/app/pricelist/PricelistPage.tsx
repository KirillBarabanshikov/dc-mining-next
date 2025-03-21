'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { instance } from '@/shared/api';

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
        <object
          data={
            'https://admindc.ru/media/pdf/prais-21-03-2025-67dd458c6b3f2086910501.pdf'
          }
          type='application/pdf'
          width='100%'
          height='100%'
        >
          <a
            href={
              'https://admindc.ru/media/pdf/prais-21-03-2025-67dd458c6b3f2086910501.pdf'
            }
            target='_blank'
          >
            ПРАЙС-ЛИСТ
          </a>
        </object>
      )}
    </>
  );
};

export default PricelistPage;
