'use client';

import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

import styles from './Range.module.scss';

interface IRangeProps {
    min: number;
    max: number;
    onChange: (values: number[]) => void;
    reset?: boolean;
    value: number[];
}

export const Range: FC<IRangeProps> = ({ min, max, reset, value, onChange }) => {
    const [values, setValues] = useState(value);

    useEffect(() => {
        if (typeof reset !== 'undefined') setValues([min, max]);
    }, [reset]);

    const handleOnChange = useCallback(
        (newValues: number[]) => {
            setValues(newValues);
            onChange(newValues);
        },
        [onChange],
    );

    const handleInputChange = useCallback((index: 0 | 1, e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.target.value;
        setValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        });
    }, []);

    const handleOnBlur = () => {
        const [minValue, maxValue] = values;

        const correctedValues = [
            Math.max(min, Math.min(minValue, maxValue)),
            Math.min(max, Math.max(maxValue, minValue)),
        ];
        setValues(correctedValues);
        onChange(correctedValues);
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.values}>
                <input
                    type={'number'}
                    value={values[0]}
                    onChange={(e) => handleInputChange(0, e)}
                    onBlur={handleOnBlur}
                    className={styles.min}
                />
                <input
                    type={'number'}
                    value={values[1]}
                    onChange={(e) => handleInputChange(1, e)}
                    onBlur={handleOnBlur}
                    className={styles.max}
                />
            </div>

            <ReactSlider
                className={styles.horizontalSlider}
                thumbClassName={styles.thumb}
                trackClassName={styles.track}
                defaultValue={[min, max]}
                min={min}
                max={max}
                value={values}
                onChange={handleOnChange}
                pearling
                minDistance={1}
            />
        </div>
    );
};
