import StarIcon from '@/shared/assets/icons/star.svg';
import { Button } from '@/shared/ui';
interface Props {}

export const CalculatorTotal: React.FC<Props> = ({}) => {
  return (
    <div className='calculator-card calculatorTotal'>
      <div className='calculatorTotal-subtitle'>Характеристики</div>
      <div className='calculatorTotal-list'>
        <div className='calculatorTotal-item'>
          <span>Общее потребление, кВт в месяц</span>
          <span>2 337,84</span>
        </div>
        <div className='calculatorTotal-item'>
          <span>Расход на э/э в месяц, ₽</span>
          <span>12 858,12</span>
        </div>
        <div className='calculatorTotal-item'>
          <span>Прибыль без учета э/э, мес</span>
          <span>57 778 457,22</span>
        </div>
        <div className='calculatorTotal-item'>
          <span>Прибыль с учетом э/э, мес</span>
          <span>57 778 457,22</span>
        </div>
      </div>
      <div className='calculatorTotal-subtitle'>Окупаемость</div>
      <div className='calculatorTotal-list'>
        <div className='calculatorTotal-item'>
          <span>Без учета э/э, мес</span>
          <span>0,01</span>
        </div>
        <div className='calculatorTotal-item'>
          <span>С учетом э/э, мес</span>
          <span>0,01</span>
        </div>
      </div>
      <div className='calculatorTotal-btns'>
        <Button variant='outline' isWide>
          Добавить в закладки
          <StarIcon />
        </Button>
        <Button theme='pink' isWide>
          Оставить заявку
        </Button>
      </div>
    </div>
  );
};
