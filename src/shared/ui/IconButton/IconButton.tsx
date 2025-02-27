import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './IconButton.module.scss';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
  variant?: 'outline';
  rounded?: boolean;
  additionalIcon?: ReactNode;
  isBasket?: boolean;
}

export const IconButton: FC<IIconButtonProps> = ({
  icon,
  additionalIcon,
  className,
  variant = '',
  rounded = '',
  onClick,
  isBasket,
  ...props
}) => {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={clsx(styles.iconButton, className, styles[variant], rounded && styles.rounded, isBasket && styles.isBasket, additionalIcon && styles.iconButtonBasket)}
      {...props}
    >
      {icon}
      {additionalIcon && (<div className={styles.additionalIcon}>{additionalIcon}</div>)}
    </button>
  );
};
