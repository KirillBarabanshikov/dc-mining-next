import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { formatter } from '@/shared/lib';
import { Dropdown, IconButton, Input } from '@/shared/ui';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';
import { IAsic } from '@/widgets/Calculator/types';

interface Props {
    className?: string;
    isEditBusinessDetails: boolean;
    matches: boolean;
    asics: IAsic[];
    onAsicChange: (value: string[], index: number) => void;
    setAsicsCount: (count: number, index: number) => void;
    isEditingTouched: boolean;
    businessTotalPrice: number;
}


const CalculatorAsicsData: React.FC<Props> = ({ isEditBusinessDetails, matches, onAsicChange, setAsicsCount, businessTotalPrice, isEditingTouched }) => {
    const {
        calculatorType,
        asics,
        selectedAsics,
        removeSelectedAsics,
        businessPackageAsics,
    } = useCalculatorStore();

    const getTotalPowerConsumptionPerMonth = (asic: IAsic) => {
        const hoursInMonth = 24 * 30;
        return ((asic.watt * asic.count * hoursInMonth) / 1000).toFixed(0);
    };

    const ReadyBusinessTotalPrice = (asics: IAsic[]) => {
        return asics.reduce((total, asic) => total + asic.price * asic.count, 0);
    }

    return (
        selectedAsics.map((asic, index) => (
            <div key={asic.additionalId}>
                {!isEditBusinessDetails && (
                    <div
                        key={asic.additionalId}
                        className='calculatorFeature-row'
                    >
                        <div className='calculatorFeature-col'>
                            {matches && (
                                <span className='calculatorFeature-description'>
                                  Модель
                                </span>
                            )}

                            <div className='calculatorFeature-models'>
                                <Dropdown
                                    defaultValue={[asic.value]}
                                    items={asics}
                                    hasIcon={false}
                                    onChange={(value) =>
                                        onAsicChange(value, index)
                                    }
                                />
                            </div>
                        </div>
                        {calculatorType !== 2 && (
                            <div className='calculatorFeature-col'>
                                {matches && (
                                    <span className='calculatorFeature-description'>
                                    Количество
                                  </span>
                                )}
                                <div className='calculatorFeature-counts'>
                                    <IconButton
                                        onClick={() =>
                                            setAsicsCount(--asic.count, index)
                                        }
                                        icon={<MinusIcon />}
                                        variant='outline'
                                        rounded
                                        disabled={asic.count === 1}
                                    ></IconButton>
                                    <Input
                                        value={asic.count}
                                        onChange={(e) =>
                                            setAsicsCount(+e.target.value, index)
                                        }
                                        className='calculatorFeature-count'
                                        sizes='md'
                                        type='number'
                                    />
                                    <IconButton
                                        onClick={() =>
                                            setAsicsCount(++asic.count, index)
                                        }
                                        icon={<PlusIcon />}
                                        variant='outline'
                                        rounded
                                    ></IconButton>
                                </div>
                            </div>
                        )}
                        {calculatorType === 3 && (
                            <div className='calculatorFeature-col'>
                                {matches && (
                                    <span className='calculatorFeature-description'>
                                    Расход кВт/мес.
                                  </span>
                                )}
                                <div className='calculatorFeature-trash'>
                                  <span>
                                    {getTotalPowerConsumptionPerMonth(asic)}
                                  </span>
                                    <IconButton
                                        icon={<TrashIcon />}
                                        onClick={() =>
                                            removeSelectedAsics(asic.additionalId)
                                        }
                                        variant='outline'
                                        rounded
                                    />
                                </div>
                            </div>
                        )}
                        <div className='calculatorFeature-col'>
                            {matches && (
                                <>
                                    {calculatorType !== 3 && (
                                        <span className='calculatorFeature-description'>
                                      Цена
                                    </span>
                                    )}
                                </>
                            )}
                            {calculatorType !== 3 && (
                                <div className='calculatorFeature-price'>
                                    {/*shit*/}
                                    <Input
                                        value={formatter.format(
                                            calculatorType === 2
                                                ? isEditBusinessDetails
                                                    ? businessPackageAsics[index].price *
                                                    businessPackageAsics[index].count
                                                    : isEditingTouched
                                                        ? businessTotalPrice
                                                        : ReadyBusinessTotalPrice(businessPackageAsics)
                                                : asic.price * asic.count,
                                        )}
                                        className='calculatorFeature-price-input'
                                        sizes='md'
                                        disabled
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        ))
    )
}

export default CalculatorAsicsData