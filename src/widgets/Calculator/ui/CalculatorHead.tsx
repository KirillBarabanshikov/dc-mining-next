import clsx from 'clsx';

interface Props {
  className?: string;
  isPro: boolean;
  toggleProMode: () => void;
}

export const CalculatorHead: React.FC<Props> = ({
  isPro,
    toggleProMode,
}) => {
  return (
      <div className='calculatorFeature-head'>
        <div className='calculatorFeature-subtitle'>
          Калькулятор доходности
        </div>
        <div
            className={clsx(
                !isPro
                    ? 'calculatorFeature-switch'
                    : 'calculatorFeature-switch calculatorFeature-switch-pro',
                {
                  active: isPro,
                },
            )}
            onClick={toggleProMode}
        >
              <span
                  className={!isPro ? 'active' : ''}
                  style={{ opacity: isPro ? '50%' : '100%' }}
              >
                Lite
              </span>
          <span className={isPro ? 'active-pro' : ''}>Pro</span>
        </div>
      </div>
  );
};