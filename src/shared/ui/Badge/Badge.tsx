import clsx from 'clsx';
import { FC } from 'react';

import styles from './Badge.module.scss';

interface IBadgeProps {
    text: string;
    color: string;
}

export const Badge: FC<IBadgeProps> = ({ text, color }) => {
    return (
        <span className={clsx(styles.badge)}>
            <span aria-hidden={true} className={clsx(styles.text, styles.textHide)}>
                {text}
            </span>
            <span className={styles.background} style={{ backgroundColor: color }} />
            <span className={clsx(styles.text, styles.textAbsolute)} style={{ color }}>
                {text}
            </span>
        </span>
    );
};
