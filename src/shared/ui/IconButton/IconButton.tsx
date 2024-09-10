import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './IconButton.module.scss';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    className?: string;
}

export const IconButton: FC<IIconButtonProps> = ({ icon, className, onClick }) => {
    return (
        <button type={'button'} onClick={onClick} className={clsx(styles.iconButton, className)}>
            {icon}
        </button>
    );
};
