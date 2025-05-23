import './CalculatorTable.scss';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import { Button, Input } from '@/shared/ui';

export const CalculatorFinModel = () => {
  return (
    <div className={'calculator-table__fin-model fin-model'}>
      <div className={'fin-model__card fin-model__card--base'}>
        <div>Общее потребление, кВт.</div>
        <p>45</p>
      </div>
      <div className={'fin-model__card fin-model__card--base'}>
        <div>
          Кол-во
          <br />
          устройств, шт.
        </div>
        <p>16</p>
      </div>
      <div className={'fin-model__column-wrap fin-model__max'}>
        <div className={'fin-model__card'}>
          <div className={'fin-model__card-label'}>Доход, руб.</div>
          <div className={'fin-model__row-wrap'}>
            <div className={'fin-model__item fin-model__item--column'}>
              <div className={'fin-model__item-title'}>с учетом э/э</div>
              <div
                className={'fin-model__item-value fin-model__item-value--dark'}
              >
                11 361,45 ₽
              </div>
            </div>
            <div className={'fin-model__item fin-model__item--column'}>
              <div className={'fin-model__item-title'}>без учета э/э</div>
              <div
                className={'fin-model__item-value fin-model__item-value--light'}
              >
                25 300,65 ₽
              </div>
            </div>
          </div>
        </div>
        <button>v</button>
      </div>
      <div className={'fin-model__column-wrap'}>
        <div className={'fin-model__card fin-model__row-wrap'}>
          <div className={'fin-model__flex'}>
            <div className={'fin-model__card-label'}>Окупаемость, мес.</div>
            <div className={'fin-model__row-wrap'}>
              <div className={'fin-model__item fin-model__item--row'}>
                <div className={'fin-model__item-title'}>без учета э/э</div>
                <div
                  className={
                    'fin-model__item-value fin-model__item-value--light'
                  }
                >
                  17
                </div>
              </div>
              <div className={'fin-model__item fin-model__item--row'}>
                <div className={'fin-model__item-title'}>без учета э/э</div>
                <div
                  className={
                    'fin-model__item-value fin-model__item-value--light'
                  }
                >
                  17
                </div>
              </div>
            </div>
          </div>
          <div className={'fin-model__price-wrap'}>
            <div>Общая стоимость, руб.</div>
            <p>8 000 000 ₽</p>
          </div>
        </div>
        <div className={'fin-model__row-wrap'}>
          <div className={'fin-model__card fin-model__cost'}>
            <div className={'fin-model__cost-label'}>Стоимость э/э, ₽</div>
            <Input
              value={'5,5 ₽'}
              readOnly
              disabled
              sizes={'md'}
              className={'fin-model__cost-input'}
            />
          </div>
          <Button className={'fin-model__download'}>
            Скачать фин модель <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
