'use client';

import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { Button, Input } from '@/shared/ui';

import styles from './NumberInput.module.scss';

interface INumberInputProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (count: number) => void;
  variant?: 'default' | 'small' | 'sm-full-width';
}

export const NumberInput: FC<INumberInputProps> = ({
  min,
  max,
  defaultValue = 0,
  onChange,
  variant = 'default',
}) => {
  const [count, setCount] = useState(defaultValue);

  useEffect(() => {
    onChange && onChange(count);
  }, [count]);

  const increment = () => {
    if (typeof max !== 'undefined') {
      return setCount((prev) => (prev >= max ? max : prev + 1));
    }
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (typeof min !== 'undefined') {
      return setCount((prev) => (prev <= min ? min : prev - 1));
    }
    setCount((prev) => prev - 1);
  };

  return (
    <div className={clsx(styles.numberInput, styles[variant])}>
      <Button
        size={'md'}
        className={clsx(styles.item, styles.button)}
        onClick={decrement}
        disabled={count <= min!}
      >
        <MinusIcon />
      </Button>
      <div className={styles.item}>
        <Input
          type={'number'}
          value={`${count}`}
          onChange={(e) => setCount(+e.target.value <= 0 ? 1 : +e.target.value)}
          style={{ textAlign: 'center' }}
          className={styles.input}
        />
      </div>
      <Button
        size={'md'}
        className={clsx(styles.item, styles.button)}
        onClick={increment}
        disabled={count >= max!}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
