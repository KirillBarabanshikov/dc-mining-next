import { Breadcrumbs } from '@/shared/ui';
import { Calculator } from '@/widgets/Calculator';

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
