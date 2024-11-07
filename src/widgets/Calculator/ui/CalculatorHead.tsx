import clsx from 'clsx';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';

interface Props {
  className?: string;
  calculatorType: number;
  calculatorTypes: {
    id: number;
    title: string;
    onClick: () => void;
  }[];
  isProError: boolean;
}

export const CalculatorHead: React.FC<Props> = ({
  calculatorTypes,
  calculatorType,
  isProError,
  className,
}) => {
  const matches = useMediaQuery(MAX_WIDTH_MD);
  return (
    <>
      <div className={clsx('calculator-head', className)}>
        <h2 className={clsx('calculator-title', 'section-title-primary')}>
          Рассчитайте <span>выгоду</span>
        </h2>
        {matches && (
          <div className='calculatorFeature-head'>
            <div className='calculatorFeature-subtitle'>
              Калькулятор доходности
            </div>
            <div
              className={clsx('calculatorFeature-switch', {
                active: isProError,
              })}
            >
              <span className='active'>Lite</span>
              <span>Pro</span>
            </div>
          </div>
        )}
        <div className='calculator-types'>
          {calculatorTypes.map((item) => (
            <div
              onClick={() => item.onClick()}
              className={clsx('calculator-type', {
                active: item.id === calculatorType,
              })}
              key={item.id}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
