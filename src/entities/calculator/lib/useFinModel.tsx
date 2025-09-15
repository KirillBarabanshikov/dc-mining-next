'use client';

import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { generateFinModelPdf } from '../api/calculatorApi';
import { Coin, Currency, Model } from '../model/types';
import { formatPriceByCurrency } from './formatPriceByCurrency';

export const useFinModel = ({
  models,
  currency,
  electricityCoast,
  dollar,
}: {
  models: Model[];
  currency: Currency;
  electricityCoast: number;
  dollar: number;
}) => {
  const pathname = usePathname();

  const { mutateAsync: generate, isPending } = useMutation({
    mutationFn: generateFinModelPdf,
  });

  const coinRates = useMemo(
    () =>
      models.reduce((previousValue, currentValue) => {
        const newCoins = [...previousValue];
        currentValue.product.coinsArray.forEach((coin) => {
          const existing = newCoins.find((c) => c.title === coin.title);
          if (!existing) {
            let price = coin.price;

            if (currentValue.currency === 'rub' && currency === 'dollar') {
              price /= dollar;
            }

            if (currentValue.currency === 'dollar' && currency === 'rub') {
              price *= dollar;
            }

            newCoins.push({ ...coin, price });
          }
        });

        return newCoins;
      }, [] as Coin[]),
    [models, currency, dollar],
  );

  const finModel = useMemo(() => {
    return models.reduce(
      (previousValue, currentValue) => {
        const countModels = previousValue.countModels + currentValue.count;
        const kW =
          previousValue.kW +
          (currentValue.product.watt * currentValue.count) / 1000;
        const profitWithWatt =
          previousValue.profitWithWatt +
          currentValue.product.paybackWithWatt * currentValue.count;
        const profitWithoutWatt =
          previousValue.profitWithoutWatt +
          currentValue.product.profitDayAll * currentValue.count;

        const cost =
          previousValue.cost + currentValue.product.price * currentValue.count;

        const paybackWithWatt = cost / profitWithWatt;

        const paybackWithoutWatt = cost / profitWithoutWatt;

        const newCoins = [...previousValue.coins];
        currentValue.product.coinsArray.forEach((coin) => {
          const existing = newCoins.find((c) => c.title === coin.title);
          const multipliedCoin = {
            ...coin,
            value: coin.value * 30 * currentValue.count,
            profit: coin.profit * currentValue.count,
          };

          if (existing) {
            existing.value += multipliedCoin.value;
            existing.profit += multipliedCoin.profit;
          } else {
            newCoins.push(multipliedCoin);
          }
        });

        return {
          countModels,
          kW,
          profitWithWatt,
          profitWithoutWatt,
          paybackWithWatt,
          paybackWithoutWatt,
          cost,
          coins: newCoins,
        };
      },
      {
        countModels: 0,
        kW: 0,
        profitWithWatt: 0,
        profitWithoutWatt: 0,
        paybackWithWatt: 0,
        paybackWithoutWatt: 0,
        cost: 0,
        coins: [] as Coin[],
      },
    );
  }, [models]);

  const generatePdf = async () => {
    const managerId = Cookies.get('manager');

    return await generate({
      cu: Math.round(finModel.kW).toString(),
      ro: finModel.countModels.toString(),
      ta: electricityCoast.toString(),
      allwaro: formatPriceByCurrency(finModel.profitWithWatt, currency),
      allwa: formatPriceByCurrency(finModel.profitWithoutWatt, currency),
      wmio: Math.round(finModel.paybackWithoutWatt).toString(),
      rm: Math.round(finModel.paybackWithWatt).toString(),
      allprice: formatPriceByCurrency(finModel.cost, currency).toString(),
      curs: formatPriceByCurrency(dollar, 'rub').toString(),
      coins: coinRates.map((coin) => ({
        title: coin.title,
        currency: formatPriceByCurrency(coin.price, currency),
      })),
      asics: models.map((model) => {
        return {
          id: model.product.id,
          title: model.product.title,
          hash: model.product.hashrate.toString(),
          quantity: model.count,
          wawi: formatPriceByCurrency(
            model.product.profitDayAll * model.count,
            currency,
          ),
          waro: formatPriceByCurrency(
            model.product.paybackWithWatt * model.count,
            currency,
          ),
          algorithm: model.product.algorithm,
          watt: model.product.watt.toString(),
          prone: formatPriceByCurrency(model.product.price, currency),
          prall: formatPriceByCurrency(
            model.product.price * model.count,
            currency,
          ),
        };
      }),
      id: pathname === '/manager' && managerId ? +managerId : undefined,
      type: 'По моделям',
    });
  };

  const handleDownload = async () => {
    const result = await generatePdf();

    if (result) {
      const blob = new Blob([result.file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'фин_модель.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return {
    finModel,
    generatePdf,
    handleDownload,
    isPending,
    coinRates,
  };
};
