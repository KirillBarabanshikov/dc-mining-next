import Image from 'next/image';

import basketPlaceholder from '@/shared/assets/images/basket/basket-placeholder.png';
import { Button } from '@/shared/ui';

import styles from './BasketPage.module.scss';

export const Placeholder = () => {
  return (
    <div className={styles.placeholder}>
      <Image
        src={basketPlaceholder}
        alt={'Корзина пуста'}
        width={280}
        height={280}
      />
      <div className={styles.placeholderBody}>
        <h4>Корзина пуста</h4>
        <p>Воспользуйтесь каталогом и выберите товары</p>
      </div>
      <Button size={'md'} className={styles.button}>
        К покупкам
      </Button>
    </div>
  );
};
