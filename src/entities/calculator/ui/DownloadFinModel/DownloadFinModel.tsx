import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import { Button } from '@/shared/ui';

import { getCalculatorData } from '../../api/calculatorApi';
import { useFinModel } from '../../lib/useFinModel';
import { Model } from '../../model/types';

interface IDownloadFinModel {
  productName?: string;
  className?: string;
}

export const DownloadFinModel: FC<IDownloadFinModel> = ({
  productName,
  className,
}) => {
  const { data } = useQuery({
    queryKey: ['calculator', productName],
    queryFn: () =>
      getCalculatorData({
        title: productName,
      }),
    select: (data) => {
      const prod = data.products.find((p) => p.title === productName);

      if (!prod) return;

      return {
        dollar: data.dollar,
        models: [
          {
            product: prod,
            count: 1,
            currency: 'rub',
            currentPrice: prod.price,
            currentProfitDayAll: prod.profitDayAll,
          },
        ],
      } as { dollar: number; models: Model[] };
    },
  });

  const { handleDownload, isPending } = useFinModel({
    models: data ? data.models : [],
    currency: 'rub',
    dollar: data ? data.dollar : 80,
    electricityCoast: 5.5,
  });

  return (
    <Button
      disabled={isPending}
      variant={'outline'}
      size={'md'}
      onClick={handleDownload}
      className={className}
    >
      Скачать фин модель
      <DownloadIcon />
    </Button>
  );
};
