import { IAsic } from '@/widgets/Calculator/types';

export const generatePDF = (
  basket: { productId: number; count: number }[],
  products: any[],
  electricityCoast: number,
  course: number,
) => {
  const HOURS_IN_DAY = 24;
  const DAYS_IN_MONTH = 30;
  const WATT = 1000;

  const selectedProducts = basket.map(({ productId, count }) => {
    const product = products.find((p) => p.id === productId);
    return { ...product, count };
  });

  const totalConsumption = selectedProducts.reduce(
    (total: number, product: IAsic) =>
      total +
      (product.watt * product.count * HOURS_IN_DAY * DAYS_IN_MONTH) / WATT,
    0,
  );

  const profitWithoutElectricity = selectedProducts.reduce(
    (total: number, product: IAsic) =>
      total + product.profitDayAll * product.count * DAYS_IN_MONTH,
    0,
  );

  const totalPrice = selectedProducts.reduce(
    (total: number, product: IAsic) => total + product.price * product.count,
    0,
  );

  // console.log(selectedProducts);

  return {
    sumRuble: totalPrice.toLocaleString('ru-RU'),
    sumDollar: (totalPrice / course).toFixed(0),
    curs: course.toLocaleString('ru-RU'),
    sumIn: totalPrice.toLocaleString('ru-RU'),
    everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
    profitWithoutWatt: profitWithoutElectricity.toFixed(0),
    profitWithMonth: (totalPrice / profitWithoutElectricity).toFixed(0),
    type: 'Дата центр',
    asics: selectedProducts.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      hashrate: `${item.hashrate} ${item.dimension}`,
      quantity: item.count.toLocaleString('ru-RU'),
      priceOnePiece: (item.price / course).toFixed(0),
      price: ((item.price * item.count) / course).toFixed(0),
    })),
  };
};
