'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow-down2.svg';
import { useOutsideClick } from '@/shared/lib';
import { Checkbox, Modal, Radio } from '@/shared/ui';

import styles from './Dropdown.module.scss';

interface IDropdownItem {
  value: string;
  label: string;
}

interface IDropdownProps extends PropsWithChildren {
  items: IDropdownItem[];
  defaultValue?: string[];
  multiply?: boolean;
  label?: string;
  open?: boolean;
  physical?: boolean;
  variant?: 'dropdown' | 'modal';
  onChange?: (value: string[]) => void;
  reset?: boolean;
  className?: string;
  hasIcon?: boolean;
  searchable?: boolean;
}

export const Dropdown: FC<IDropdownProps> = ({
  items,
  defaultValue = [],
  multiply = false,
  label = '',
  open = false,
  physical = false,
  variant = 'dropdown',
  onChange,
  children,
  reset,
  className,
  hasIcon = true,
  searchable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(open);
  const ref = useOutsideClick<HTMLDivElement>(() =>
    physical ? {} : setIsOpen(false),
  );
  const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (typeof reset !== 'undefined') setSelectedValue(defaultValue);
  }, [reset, defaultValue]);

  const handleSelect = (value: string) => {
    let selected = selectedValue;

    if (multiply) {
      if (selected.includes(value)) {
        selected = selected.filter((val) => val !== value);
        setSelectedValue(selected);
      } else {
        selected = [...selected, value];
        setSelectedValue(selected);
      }
    } else {
      selected = [value];
      setSelectedValue(selected);
      setIsOpen(false);
    }
    onChange && onChange(selected);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        styles.dropdown,
        isOpen && styles.isOpen,
        physical && styles.physical,
        className,
      )}
    >
      <div className={styles.head} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>
          {label
            ? label
            : items.find((item) => item.value === selectedValue[0])?.label}
        </span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen && variant === 'dropdown' ? 180 : 0 }}
          transition={{ damping: 0 }}
          className={styles.icon}
        >
          <ArrowIcon />
        </motion.div>
      </div>
      {variant === 'dropdown' && (
        <AnimatePresence initial={false}>
          {isOpen && (
              <>

                <ItemsList
                    items={searchable ? filteredItems : items}
                    handleSelect={handleSelect}
                    multiply={multiply}
                    selectedValue={selectedValue}
                    hasIcon={hasIcon}
                >
                  {searchable && (
                      <div className={styles.search}>
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                      </div>
                  )}
                  {children}
                </ItemsList>
              </>
          )}
        </AnimatePresence>
      )}
      {variant === 'modal' && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className={styles.modal}
        >
          <ItemsList
            items={items}
            handleSelect={handleSelect}
            multiply={multiply}
            selectedValue={selectedValue}
            withAnimation={false}
            hasIcon={hasIcon}
          />
        </Modal>
      )}
    </div>
  );
};

interface IItemsListProps extends PropsWithChildren {
  items: IDropdownItem[];
  handleSelect: (value: string) => void;
  multiply: boolean;
  selectedValue: string[];
  withAnimation?: boolean;
  hasIcon?: boolean;
}

const ItemsList: FC<IItemsListProps> = ({
  items,
  handleSelect,
  multiply,
  selectedValue,
  withAnimation = true,
  hasIcon = true,
  children,
}) => {
  const isSelectedValueArray = Array.isArray(selectedValue);

  return (
    <motion.div
      className={styles.list}
      initial={withAnimation ? { height: 0, opacity: 0 } : {}}
      animate={{ height: 'auto', opacity: 1 }}
      exit={withAnimation ? { height: 0, opacity: 0 } : {}}
    >
      <div className={styles.itemsWrap}>
        <div className={clsx(styles.items)}>
          {children}
          {items
            .filter((item) => item.value !== '')
            .map((item) => {
              const isSelected =
                isSelectedValueArray && selectedValue.includes(item.value);
              return (
                <div
                  key={item.value}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(item.value);
                  }}
                >
                  {multiply ? (
                    <Checkbox
                      label={item.label}
                      className={clsx(
                        styles.item,
                        isSelected && styles.selected,
                      )}
                      checked={isSelected}
                      onChange={() => {}}
                      sizing={'sm'}
                      hasIcon={hasIcon}
                    />
                  ) : (
                    <Radio
                      label={item.label}
                      className={clsx(
                        styles.item,
                        isSelected && styles.selected,
                      )}
                      checked={isSelected}
                      onChange={() => {}}
                      sizing={'sm'}
                      hasIcon={hasIcon}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};
