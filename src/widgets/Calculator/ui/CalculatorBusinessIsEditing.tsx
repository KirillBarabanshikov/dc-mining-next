import { useEffect } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { Dropdown, IconButton, Input } from '@/shared/ui';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';
import { IAsic } from '@/widgets/Calculator/types';

interface Props {
    className?: string;
    isEditBusinessDetails: boolean;
    matches: boolean;
    onAsicChange: (value: string[], index: number) => void;
    setAsicsCount: (count: number, index: number) => void;
    isEditingTouched: boolean;
    businessTotalPrice: number;
    businessInitialItems: IAsic[];
}


const CalculatorBusinessIsEditing: React.FC<Props> = ({ matches, onAsicChange, setAsicsCount, businessInitialItems }) => {
    const {
        removeBusinessPackageAsic,
        businessPackageAsics,
    } = useCalculatorStore();

    const getTotalPowerConsumptionPerMonth = (asic: IAsic) => {
        const hoursInMonth = 24 * 30;
        return ((asic.watt * asic.count * hoursInMonth) / 1000).toFixed(0);
    };

    useEffect(() => {
        console.log(businessPackageAsics)
        console.log(businessInitialItems);
    }, [])

    return (
        <>
            {businessPackageAsics.map((asic, index) => (
                <div
                    key={asic.additionalId}
                    className='calculatorFeature-row calculatorFeature-change-row'
                >
                    <div className='calculatorFeature-col'>
                        <Dropdown
                            defaultValue={[asic.value]}
                            items={businessInitialItems}
                            hasIcon={false}
                            onChange={(value) => onAsicChange(value, index)}
                        />
                    </div>

                    <div className='calculatorFeature-col'>
                        {matches && (
                            <span className='calculatorFeature-description'>
                                Количество
                            </span>
                        )}
                        <div className='calculatorFeature-counts'>
                            <IconButton
                                onClick={() => setAsicsCount(Math.max(1, asic.count - 1), index)}
                                icon={<MinusIcon />}
                                variant='outline'
                                rounded
                                disabled={asic.count === 1}
                            ></IconButton>
                            <Input
                                value={asic.count}
                                onChange={(e) =>
                                    setAsicsCount(Math.max(1, +e.target.value), index)
                                }
                                className='calculatorFeature-count'
                                sizes='md'
                                type='number'
                            />
                            <IconButton
                                onClick={() => setAsicsCount(asic.count + 1, index)}
                                icon={<PlusIcon />}
                                variant='outline'
                                rounded
                            ></IconButton>
                        </div>
                    </div>

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
                                    removeBusinessPackageAsic(asic.additionalId)
                                }
                                variant='outline'
                                rounded
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CalculatorBusinessIsEditing