
interface Props {
    calculatorType: number;
    isEditBusinessDetails: boolean;
}
const CalculatorTitleFeatureRow: React.FC<Props> = ({calculatorType, isEditBusinessDetails}) => {
    return (
        <div className='calculatorFeature-row'>
                    <span className='calculatorFeature-description'>
                      {calculatorType === 2 ? 'Пакет' : 'Модель'}
                    </span>
            {calculatorType !== 2 && (
                <span className='calculatorFeature-description'>
                        Количество
                      </span>
            )}
            {!isEditBusinessDetails && calculatorType !== 3 && (
                <span className='calculatorFeature-description'>
                        Цена
                      </span>
            )}
            {isEditBusinessDetails && (
                <>
                        <span className='calculatorFeature-description'>
                          Цена
                        </span>
                </>
            )}
            {calculatorType === 3 && (
                <span className='calculatorFeature-description'>
                        Расход кВт/мес.
                      </span>
            )}
        </div>
    )
}

export default CalculatorTitleFeatureRow