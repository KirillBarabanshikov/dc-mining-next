'use client';

import { FC, useState } from 'react';
import ReactSlider from 'react-slider';

import styles from './Range.module.scss';

interface IRangeProps {
    min: number;
    max: number;
    onChange: (values: number[]) => void;
}

export const Range: FC<IRangeProps> = ({ min, max, onChange }) => {
    const [values, setValues] = useState([min, max]);

    const handleOnChange = (newValues: number[]) => {
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.values}>
                <p>От: {values[0]}</p>
                <p>До: {values[1]}</p>
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
                minDistance={5}
            />
        </div>
    );
};
