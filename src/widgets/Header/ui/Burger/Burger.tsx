import clsx from 'clsx';
import { FC } from 'react';

import styles from './Burger.module.scss';

interface IBurgerProps {}

export const Burger: FC<IBurgerProps> = () => {
    return (
        <div className={styles.burger}>
            <div className={styles.burgerBars}>
                <span className={clsx(styles.burgerBar, styles.burgerBar1)} />
                <span className={clsx(styles.burgerBar, styles.burgerBar2)} />
                <span className={clsx(styles.burgerBar, styles.burgerBar3)} />
            </div>
        </div>
    );
};
