import { ChangeEvent } from 'react';

import { Input } from '@/shared/ui';

interface Props {
    electricityCoast: string | number;
    changeElectricityCoast: (e: ChangeEvent<HTMLInputElement>) => void;
    isProError: boolean;
}


const CalculatorElectricity: React.FC<Props> = ({electricityCoast, changeElectricityCoast, isProError}) => {

    return (
        <div className='calculatorElectricity'>
            <div className='calculatorElectricity-price'>
                <span>Стоимость э/э, ₽</span>
                <Input
                    type='number'
                    value={electricityCoast}
                    onChange={(e) => changeElectricityCoast(e)}
                    sizes='md'
                    error={isProError || electricityCoast === ''}
                />
                {isProError && (
                    <div className='calculatorElectricity-error'>
                        Доступно в Pro версии
                    </div>
                )}
            </div>
            {/* <Button
                  className='calculatorElectricity-btn'
                  variant='outline'
                  size='md'
                >
                  Скачать фин модель
                  <DownloadIcon />
                </Button> */}
        </div>
    )
}

export default CalculatorElectricity