import styles from './Catalog.module.scss';
import { Filters } from './ui';

export const Catalog = () => {
    return (
        <div className={styles.catalog}>
            <Filters className={styles.filters} />
        </div>
    );
};
