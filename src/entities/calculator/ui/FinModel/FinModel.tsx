import './FinModel.scss';

import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';

import { CurrencySwitch } from '@/entities/calculator/ui/CurrencySwitch';
import { OrderCallModal } from '@/features/call';
import ArrowDown from '@/shared/assets/icons/arrow-down2.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery, useOutsideClick } from '@/shared/lib';
import { Button, Input, Switch } from '@/shared/ui';

import { generateFinModelPdf } from '../../api/calculatorApi';
import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Coin, Currency, Model } from '../../model/types';

interface IFinModelProps {
  models: Model[];
  currency: Currency;
  dollar: number;
  electricityCoast: number;
  onChangeElectricityCoast: (value: number) => void;
  onChangeCurrency?: (currency: Currency) => void;
  coinRates?: Coin[];
}

export const FinModel: FC<IFinModelProps> = ({
  models,
  currency,
  dollar,
  electricityCoast,
  onChangeElectricityCoast,
  onChangeCurrency,
  coinRates,
}) => {
  const match = useMediaQuery(MAX_WIDTH_MD);
  const [showCoins, setShowCoins] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [considerCost, setConsiderCost] = useState(true);

  const {
    countModels,
    kW,
    profitWithWatt,
    profitWithoutWatt,
    paybackWithWatt,
    paybackWithoutWatt,
    cost,
    coins,
  } = useMemo(() => {
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

  const { mutateAsync: generatePdf, isPending } = useMutation({
    mutationFn: generateFinModelPdf,
  });

  const handleDownload = async () => {
    const result = await generatePdf({
      curs: dollar.toFixed(1),
      everyMonthWatt: kW.toString(),
      profitWithMonth: profitWithoutWatt.toString(),
      profitWithoutWatt: profitWithoutWatt.toString(),
      sumDollar:
        currency === 'dollar' ? cost.toString() : (cost * dollar).toString(),
      sumIn: currency === 'rub' ? cost.toString() : (cost / dollar).toString(),
      sumRuble:
        currency === 'rub' ? cost.toString() : (cost / dollar).toString(),
      type: 'По моделям',
      asics: models.map((model) => ({
        id: model.product.id,
        title: model.product.title,
        hashrate: model.product.hashrate.toString(),
        quantity: model.count,
        priceOnePiece: model.product.price.toString(),
        price: (model.product.price * model.count).toString(),
      })),
    });

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

  return match ? (
    <div className={'fin-model'}>
      <>
        <div className={'fin-model__header'}>
          <div className={'fin-model__title'}>Финансовые результаты</div>
          {onChangeCurrency && (
            <CurrencySwitch value={currency} onChange={onChangeCurrency} />
          )}
        </div>
        <div className={'fin-model__handle'}>
          <div className={'fin-model__handle-title'}>
            Учитывать расходы на э/э
          </div>
          <Switch
            isOn={considerCost}
            onClick={(value) => setConsiderCost(value)}
          />
        </div>
        <div className={'fin-model__option fin-model__option--white'}>
          <div className={'fin-model__option-title'}>Ежемесячный доход</div>
          <div className={'fin-model__option-value'}>
            {considerCost
              ? profitWithWatt
                ? formatPriceByCurrency(profitWithWatt, currency)
                : '-'
              : profitWithoutWatt
                ? formatPriceByCurrency(profitWithoutWatt, currency)
                : '-'}
          </div>
        </div>

        {models.map((model) => {
          return (
            <div
              key={model.product.id}
              className={'fin-model__option fin-model__option--blue'}
            >
              <div className={'fin-model__option-title-wrap'}>
                <div className={'fin-model__option-title'}>
                  {model.product.title}
                </div>
                <div className={'fin-model__option-count'}>
                  {model.count} шт.
                </div>
              </div>
              <div
                className={
                  'fin-model__option-value fin-model__option-value-wrap'
                }
              >
                {considerCost
                  ? formatPriceByCurrency(
                      model.product.paybackWithWatt * model.count,
                      currency,
                    )
                  : formatPriceByCurrency(
                      model.product.profitDayAll * model.count,
                      currency,
                    )}
              </div>
            </div>
          );
        })}

        <div className={'fin-model__coins-wrap'}>
          <div className={'fin-model__coins-list'}>
            <div className={'fin-model__coins-head'}>
              <div>Криптовалюта в монете</div>
              <div>
                {currency === 'rub' ? 'в рублях' : 'в $'} (без учета э/э)
              </div>
            </div>

            {!coins.length && (
              <div className={'fin-model__coins-item'}>
                <div className={'fin-model__coins-wrap'}>
                  <div className={'fin-model__coins-title'}>-</div>
                </div>
              </div>
            )}

            {coins.map((coin, index) => (
              <div key={index} className={'fin-model__coins-item'}>
                <div className={'fin-model__coins-wrap'}>
                  {coin.image ? (
                    <Image
                      src={`${BASE_URL}${coin.image}`}
                      alt={coin.title}
                      width={20}
                      height={20}
                      className={'fin-model__coins-image'}
                    />
                  ) : (
                    <div className={'fin-model__coins-image'} />
                  )}
                  <div className={'fin-model__coins-title'}>{coin.title}:</div>
                </div>
                <div className={'fin-model__coins-value'}>
                  {coin.value.toFixed(8)}
                </div>
                <div
                  className={'fin-model__coins-value fin-model__coins-profit'}
                >
                  {formatPriceByCurrency(coin.profit, currency)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={'fin-model__option fin-model__option--white'}>
          <div className={'fin-model__option-title'}>Окупаемость, мес.</div>
          <div className={'fin-model__option-value'}>
            {considerCost
              ? paybackWithWatt
                ? Math.round(paybackWithWatt)
                : '-'
              : paybackWithoutWatt
                ? Math.round(paybackWithoutWatt)
                : '-'}
          </div>
        </div>

        <div className={'fin-model__option fin-model__option--white'}>
          <div className={'fin-model__option-title'}>
            Общее потребление, кВт.
          </div>
          <div className={'fin-model__option-value'}>
            {kW ? Math.round(kW) : '-'}
          </div>
        </div>

        <div className={'fin-model__option fin-model__option--white'}>
          <div className={'fin-model__option-title'}>Общая сумма вложений:</div>
          <div className={'fin-model__option-value'}>
            {cost ? formatPriceByCurrency(cost, currency) : '-'}
          </div>
        </div>

        <div className={'fin-model__foot'}>
          <div className={'fin-model__cost'}>
            <div className={'fin-model__cost-label'}>Стоимость э/э, ₽</div>
            <Input
              value={electricityCoast}
              onChange={(e) => {
                if (+e.target.value >= 0 && +e.target.value < 1000000) {
                  onChangeElectricityCoast(e.target.value as any);
                }
              }}
              onBlur={(e) => {
                if (!e.target.value || +e.target.value < 0) {
                  onChangeElectricityCoast(0);
                }
              }}
              min={0}
              max={1000000}
              type={'number'}
              sizes={'md'}
              disabled={!models.length}
              className={'fin-model__cost-input'}
            />
          </div>
          <Button
            onClick={handleDownload}
            disabled={isPending || !models.length}
            className={'fin-model__download'}
          >
            Скачать фин модель <DownloadIcon />
          </Button>
        </div>
      </>
    </div>
  ) : (
    <div className={'fin-model'}>
      <div className={'fin-model__items'}>
        <div className={'fin-model__item'}>
          <div className={'fin-model__item-title'}>Общие характеристики</div>
          <div className={'fin-model__item-cards'}>
            <div className={'fin-model__card'}>
              <div className={'fin-model__card-title'}>Потребление, кВт.</div>
              <div className={'fin-model__card-value'}>{Math.round(kW)}</div>
            </div>
            <div className={'fin-model__card'}>
              <div className={'fin-model__card-title'}>Кол-во, шт.</div>
              <div className={'fin-model__card-value'}>{countModels}</div>
            </div>
            <div className={'fin-model__card'}>
              <div className={'fin-model__card-title'}>Тариф, ₽</div>
              <div className={'fin-model__card-value'}>
                <Input
                  value={electricityCoast}
                  onChange={(e) => {
                    if (+e.target.value >= 0 && +e.target.value < 1000000) {
                      onChangeElectricityCoast(e.target.value as any);
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value || +e.target.value < 0) {
                      onChangeElectricityCoast(0);
                    }
                  }}
                  min={0}
                  max={1000000}
                  type={'number'}
                  sizes={'md'}
                  className={'fin-model__card-input'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'fin-model__item'}>
          <div className={'fin-model__item-title'}>
            Доходность, {currency === 'rub' ? 'руб' : '$'} в мес.
          </div>
          <div className={'fin-model__item-cards'}>
            <div className={'fin-model__card'}>
              <div className={'fin-model__card-inner'}>
                <div>
                  <div className={'fin-model__card-title'}>С учетом э/э</div>
                  <div className={'fin-model__card-value-box'}>
                    {formatPriceByCurrency(profitWithWatt, currency)}
                  </div>
                </div>
                <div>
                  <div className={'fin-model__card-title'}>Без учета э/э</div>
                  <div className={'fin-model__card-value-box'}>
                    {formatPriceByCurrency(profitWithoutWatt, currency)}
                    <button
                      onClick={() => setShowCoins(true)}
                      className={'fin-model__card-trigger'}
                    >
                      <motion.div animate={{ rotate: showCoins ? 180 : 0 }}>
                        <ArrowDown />
                      </motion.div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Coins
              coins={coins}
              show={showCoins}
              onClose={() => setShowCoins(false)}
              currency={currency}
            />
          </div>
        </div>
        <div className={'fin-model__item'}>
          <div className={'fin-model__item-title'}>Окупаемость, мес.</div>
          <div className={'fin-model__item-wrap'}>
            <div className={'fin-model__container'}>
              <div className={'fin-model__container-title'}>Без учета э/э</div>
              <div className={'fin-model__container-value'}>
                {Math.round(paybackWithoutWatt)}
              </div>
            </div>
            <div className={'fin-model__container'}>
              <div className={'fin-model__container-title'}>С учетом э/э</div>
              <div className={'fin-model__container-value'}>
                {Math.round(paybackWithWatt)}
              </div>
            </div>
            <div className={'fin-model__price fin-model__price--desktop'}>
              <div className={'fin-model__price-title'}>
                Общая стоимость, {currency === 'rub' ? 'руб.' : '$'}
              </div>
              <div className={'fin-model__price-value'}>
                {formatPriceByCurrency(cost, currency)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'fin-model__price fin-model__price--mobile'}>
        <div className={'fin-model__price-title'}>
          Общая стоимость, {currency === 'rub' ? 'руб.' : '$'}
        </div>
        <div className={'fin-model__price-value'}>
          {formatPriceByCurrency(cost, currency)}
        </div>
      </div>
      <div className={'fin-model__footer'}>
        <div className={'calculator-table__extra'}>
          <div>Не является публичной офертой</div>
          <div className={'calculator-table__extra-wrap'}>
            {coinRates?.map((coin) => (
              <div key={coin.title}>
                {coin.title}={formatPriceByCurrency(coin.price, currency)},
              </div>
            ))}
            <span>Курс доллара = {dollar} ₽</span>
          </div>
        </div>
        <div className={'fin-model__buttons'}>
          <Button
            size={'md'}
            theme={'white'}
            onClick={handleDownload}
            disabled={isPending}
          >
            Скачать фин модель <DownloadIcon />
          </Button>
          <Button size={'md'} onClick={() => setShowModal(true)}>
            Оставить запрос
          </Button>
        </div>
      </div>
      <OrderCallModal
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

const Coins: FC<{
  coins: Coin[];
  show: boolean;
  onClose: () => void;
  currency: Currency;
}> = ({ coins, show, onClose, currency }) => {
  const containerRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={containerRef}
          className={'fin-model__coins'}
        >
          <div className={'fin-model__coins-list'}>
            {coins.map((coin, index) => (
              <div key={index} className={'fin-model__coins-item'}>
                <div className={'fin-model__coins-wrap'}>
                  {coin.image ? (
                    <Image
                      src={`${BASE_URL}${coin.image}`}
                      alt={coin.title}
                      width={20}
                      height={20}
                      className={'fin-model__coins-image'}
                    />
                  ) : (
                    <div className={'fin-model__coins-image'} />
                  )}
                  <div className={'fin-model__coins-title'}>{coin.title}</div>
                </div>
                <div className={'fin-model__coins-value'}>
                  {coin.value.toFixed(8)}
                </div>
                <div
                  className={'fin-model__coins-value fin-model__coins-profit'}
                >
                  {formatPriceByCurrency(coin.profit, currency)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
