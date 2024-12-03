import { Button } from '@/shared/ui';
import PencilIcon from '@/shared/assets/icons/pencil.svg';

interface Props {
    calculatorType: number;
    isPro: boolean;
    isProError: boolean;
    setIsProError: (bool: boolean) => void;
    handleChangeBusinessDetails: () => void;
}


const CalculatorChangeBusinessPackage: React.FC<Props> = ({isProError, isPro, setIsProError, handleChangeBusinessDetails, calculatorType}) => {
    return (
        <div className='calculatorFeature-change'>
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
                Изменить состав пакета
            </Button>
            {isProError && (
                <div className='calculatorElectricity-error calculatorElectricity-error-change'>
                    Доступно в{' '}
                    <span style={{ textDecoration: 'underline' }}>
                            Pro
                          </span>{' '}
                    версии
                </div>
            )}
        </div>
    )
}

export default CalculatorChangeBusinessPackage