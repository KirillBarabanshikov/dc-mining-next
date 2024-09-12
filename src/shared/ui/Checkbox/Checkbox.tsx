import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import CheckIcon from '@/shared/assets/icons/check.svg';

import styles from './Checkbox.module.scss';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode;
    error?: boolean;
    theme?: 'blue' | 'white';
    sizing?: 'lg' | 'sm';
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
    ({ label, error, theme = 'blue', className, sizing = 'lg', ...props }, ref) => {
        return (
            <label className={clsx(styles.wrap, error && styles.error, styles[theme], styles[sizing], className)}>
                <input type='checkbox' ref={ref} {...props} />
                <span className={styles.checkbox}>
                    <CheckIcon />
                </span>
                <span className={styles.label}>{label}</span>
            </label>
        );
    },
);

Checkbox.displayName = 'Checkbox';
