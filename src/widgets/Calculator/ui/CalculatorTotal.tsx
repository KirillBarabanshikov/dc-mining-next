import StarIcon from '@/shared/assets/icons/star.svg';
import { Button } from '@/shared/ui';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';
interface Props {
  totalConsumption: string;
  electricityConsumption: string;
  profitWithoutElectricity: string;
  profitWithElectricity: string;
  paybackWithElectricity: string;
  paybackWithoutElectricity: string;
}

export const CalculatorTotal: React.FC<Props> = ({
  totalConsumption,
  electricityConsumption,
  profitWithoutElectricity,
  profitWithElectricity,
  paybackWithElectricity,
  paybackWithoutElectricity,
}) => {
  const {
    calculatorType,
  } = useCalculatorStore();
  return (
    <div className='calculator-card calculatorTotal'>
      {calculatorType !== 4 && (
          <>
            <div className='calculatorTotal-subtitle'>Характеристики</div>
            <div className='calculatorTotal-list'>
              <div className='calculatorTotal-item'>
                <span>Общее потребление, кВт в месяц</span>
                <span>{totalConsumption}</span>
              </div>
              <div className='calculatorTotal-item'>
                <span>Расход на э/э в месяц, ₽</span>
                <span>{electricityConsumption}</span>
              </div>
              <div className='calculatorTotal-item'>
                <span>Прибыль без учета э/э, мес</span>
                <span>{profitWithoutElectricity}</span>
              </div>
              <div className='calculatorTotal-item'>
                <span>Прибыль с учетом э/э, мес</span>
                <span>{profitWithElectricity}</span>
              </div>
            </div>
            <div className='calculatorTotal-subtitle'>Окупаемость</div>
            <div className='calculatorTotal-list'>
              <div className='calculatorTotal-item'>
                <span>Без учета э/э, мес</span>
                <span>{paybackWithoutElectricity}</span>
              </div>
              <div className='calculatorTotal-item'>
                <span>С учетом э/э, мес</span>
                <span>{paybackWithElectricity}</span>
              </div>
            </div>
            <div className='calculatorTotal-btns'>
              <Button variant='outline' isWide>
                Добавить в&nbsp;закладки
                <StarIcon />
              </Button>
              <Button theme='pink' isWide>
                Оставить заявку
              </Button>
            </div>
          </>
      )}
      {calculatorType === 4 && (
          <>
            <div className='calculatorTotal-list'>
              <div className='calculatorTotal-item calculatorTotal-item-leasing'>
                <span>Срок</span>
                <span>От 1 до 2 лет</span>
              </div>
              <div className='calculatorTotal-item calculatorTotal-item-leasing'>
                <span>Сумма</span>
                <span>от 600 000 ₽</span>
              </div>
              <div className='calculatorTotal-item calculatorTotal-item-leasing'>
                <span>Первоначальный взнос</span>
                <span>от 20%</span>
              </div>
              <div className='calculatorTotal-item calculatorTotal-item-leasing'>
                <span>Для кого</span>
                <span>Юридичские лица</span>
              </div>
            </div>
          </>
      )}
    </div>
  );
};
