// import { IProduct } from '@/entities/product';
import { FC } from 'react';

import SearchIcon from '@/shared/assets/icons/search.svg';

import styles from './DropdownSearchItem.module.scss';

interface IDropdownSearchItem {
    // product: IProduct;
}

export const DropdownSearchItem: FC<IDropdownSearchItem> = () => {
    // const navigate = useNavigate();

    return (
        <div
            className={styles.item}
            // onClick={() => navigate(`/product/${product.id}/${product.slug}`)}
        >
            <SearchIcon className={styles.icon} />
            <div className={styles.name}>{'product.title'}</div>
        </div>
    );
};
