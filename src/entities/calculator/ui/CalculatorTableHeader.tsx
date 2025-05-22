import './CalculatorTable.scss';

import clsx from 'clsx';
import { FC } from 'react';

interface ICell {
  title: string;
  subtitles?: string[];
}

interface ICalculatorTableHeaderProps {
  cells: ICell[];
}

export const CalculatorTableHeader: FC<ICalculatorTableHeaderProps> = ({
  cells,
}) => {
  return (
    <div className={'calculator-table__header'}>
      {cells.map((cell, index) => (
        <div
          key={index}
          className={clsx('calculator-table__header-cell', {
            'calculator-table__header-cell--subtitles': !!cell.subtitles,
          })}
        >
          <div className={'calculator-table__header-title'}>{cell.title}</div>
          <div className={'calculator-table__header-subtitle'}>
            {cell.subtitles?.map((subtitle, index) => (
              <span key={index}>{subtitle}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
