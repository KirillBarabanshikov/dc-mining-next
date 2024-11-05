import clsx from 'clsx';

interface Props {
  className?: string;
  calculatorType: number;
  calculatorTypes: {
    id: number;
    title: string;
    onClick: () => void;
  }[];
}

export const CalculatorHead: React.FC<Props> = ({ calculatorTypes, calculatorType, className }) => {
  return (
    <>
      <div className={clsx('calculator-head', className)}>
        <h2 className={clsx('calculator-title', 'section-title-primary')}>
          Рассчитайте <span>выгоду</span>
        </h2>
        <div className='calculator-types'>
          {calculatorTypes.map((item) => (
            <div
              onClick={() => item.onClick()}
              className={clsx('calculator-type', { active: item.id === calculatorType })}
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
