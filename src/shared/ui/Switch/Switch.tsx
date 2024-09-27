'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';

import styles from './Switch.module.scss';

interface ISwitchProps {
    isOn: boolean;
    onClick: (value: boolean) => void;
}

export const Switch: FC<ISwitchProps> = ({ isOn, onClick }) => {
    const [value, setValue] = useState(isOn);

    useEffect(() => {
        setValue(isOn);
    }, [isOn]);

    const handleOnClick = () => {
        const currentValue = !value;
        setValue(currentValue);
        onClick(currentValue);
    };

    return (
        <motion.div className={clsx(styles.switch, value && styles.isOn)} onClick={handleOnClick} layout layoutRoot>
            <motion.div className={styles.handle} layout transition={{ type: 'easeOut' }} />
        </motion.div>
    );
};
