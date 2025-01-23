import PencilIcon from '@/shared/assets/icons/pencil.svg';
import { Button } from '@/shared/ui';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';

interface Props {
  calculatorType: number;
  isPro: boolean;
  isProError: boolean;
  setIsProError: (bool: boolean) => void;
  handleChangeBusinessDetails: () => void;
}

const CalculatorChangeBusinessPackage: React.FC<Props> = ({
  isProError,
  isPro,
  setIsProError,
  handleChangeBusinessDetails,
  calculatorType,
}) => {
  const { isNewPackage } = useCalculatorStore();

  return (
    !isNewPackage && (
      <div className='calculatorFeature-change'>
        {!isNewPackage && (
          <Button
            className='calculatorFeature-change-btn'
            variant='solid'
            size='sm'
            theme='gray'
            onClick={() => {
              if (!isPro && calculatorType === 2) {
                setIsProError(true);
                return;
              }

              handleChangeBusinessDetails();
            }}
          >
            <PencilIcon />
            Создать новый пакет
          </Button>
        )}
        {isProError && (
          <div className='calculatorElectricity-error calculatorElectricity-error-change'>
            Доступно в <span style={{ textDecoration: 'underline' }}>PRO</span>{' '}
            версии
          </div>
        )}
      </div>
    )
  );
};

export default CalculatorChangeBusinessPackage;
