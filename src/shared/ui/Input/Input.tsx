import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  sizes?: 'lg' | 'md' | 'sm';
  theme?: 'white' | 'dark';
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ type = 'text', icon, theme = 'white', sizes = 'lg', disabled, error, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          styles.inputWrap,
          styles[theme],
          styles[sizes],
          disabled && styles.disabled,
          error && styles.error,
          icon && styles.withIcon,
          className,
        )}
      >
        <input type={type} disabled={disabled} ref={ref} {...props} />
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';
