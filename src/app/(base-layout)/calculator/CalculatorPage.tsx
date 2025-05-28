import { Calculator } from '@/entities/calculator';
import { Breadcrumbs } from '@/shared/ui';

const paths = [
  { name: 'Главная', path: '/' },
  { name: 'Калькулятор доходности', path: '/calculator' },
];

const CalculatorPage = () => {
  return (
    <div className='sections'>
      <div className='container'>
        <Breadcrumbs paths={paths} />
        <Calculator />
      </div>
    </div>
  );
};

export default CalculatorPage;
