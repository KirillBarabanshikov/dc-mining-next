import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './IconButton.module.scss';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
  variant?: 'outline';
  rounded?: boolean;
}

export const IconButton: FC<IIconButtonProps> = ({
  icon,
  className,
  variant = '',
  rounded = '',
  onClick,
  ...props
}) => {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={clsx(styles.iconButton, className, styles[variant], rounded && styles.rounded)}
      {...props}
    >
      {icon}
    </button>
  );
};
