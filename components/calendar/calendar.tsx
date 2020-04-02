import React, { HTMLAttributes, MouseEvent, useCallback, useState } from 'react';
import classnames from 'classnames';
import { isSameDay, splitMonthList, getFullMonthDate, fillMonthListWithWeek, formatDate, isValidDate } from './tools';
import { TimePanel } from './timePanel';

interface PropsIF extends HTMLAttributes<HTMLDivElement> {
  value?: string,
}

interface MonthPanelPropsIF extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onDateChange?: (e: MouseEvent<HTMLDivElement>, date: Date, dateStr: string) => void;
}

const weekList = [
  ['Sunday', 'Sun'],
  ['Monday', 'Mon'],
  ['Tuesday', 'Tue'],
  ['Wednesday', 'Wed'],
  ['Thursday', 'Thu'],
  ['Friday', 'Fri'],
  ['Saturday', 'Sat'],
];



function MonthPanel(props: MonthPanelPropsIF) {
  const { className, value, onDateChange } = props;
  const dateObj = value ? new Date(value) : new Date();
  const cls = classnames({
    'ls-month-panel': true,
    [`${className}`]: !!className,
  });

  const [currentMonthDate, setCurrentMonthDate] = useState(dateObj);
  const monthList = getFullMonthDate(currentMonthDate);
  const filledMonthList = fillMonthListWithWeek(monthList);
  const splitedFillMonthList = splitMonthList(filledMonthList);

  const onPanelClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    let { index, index2 } = e.currentTarget.dataset;
    if (onDateChange) {
      const value = splitedFillMonthList[Number(index)][Number(index2)];
      if (isValidDate(value)) {
        onDateChange(
          e,
          value,
          formatDate(value, 'yyyy-MM-dd'),
        );
      }
    }
  }, [splitedFillMonthList, onDateChange]);

  const prevMonth = useCallback(() => {
    let month = currentMonthDate.getMonth() + 1;
    let year = currentMonthDate.getFullYear();
    month -= 1;
    if (month === 0) {
      year -= 1;
      month = 12;
    }
    setCurrentMonthDate(new Date(`${year}-${month}-1`));
  }, [currentMonthDate]);

  const nextMonth = useCallback(() => {
    let month = currentMonthDate.getMonth() + 1;
    let year = currentMonthDate.getFullYear();
    month += 1;
    if (month === 12) {
      year += 1;
      month = 1;
    }
    setCurrentMonthDate(new Date(`${year}-${month}-1`));
  }, [currentMonthDate]);

  const toToday = useCallback((e: MouseEvent<HTMLDivElement>) => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    setCurrentMonthDate(new Date(`${year}-${month}-${day}`));
    if (onDateChange) {
      onDateChange(
        e,
        date,
        `${year}-${month}-${day}`
      );
    }
  }, []);

  return (
    <div className={cls}>
      <div className="current-date-box">{currentMonthDate.getMonth() + 1}月 {currentMonthDate.getFullYear()}</div>
      {
        weekList.map(([item, shortItem]) => {
          return <div className="ls-panel-item">{shortItem}</div>
        })
      }
      <div className="panel-box">
        {
          splitedFillMonthList.map((itemList, index) => {
            return (
              <div>
                {
                  itemList.map((item, index2) => {
                    const currentDate = item.getDate();
                    const actived = isSameDay(dateObj, item);
                    const panelItemCls = classnames({
                      'ls-panel-item': true,
                      'invalid-item': !currentDate,
                      'actived': actived,
                    });
                    return (
                      <div
                        data-index={index}
                        data-index2={index2}
                        className={panelItemCls}
                        onClick={onPanelClick}>
                        {currentDate || ''}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div className="opt-btn-box">
        <div className="flip-btn" onClick={prevMonth}>上月</div>
        <div className="current-date-box">{formatDate(dateObj, 'yyyy-MM-dd')}</div>
        <div className="today-btn flip-btn" onClick={toToday}>○</div>
        <div className="flip-btn" onClick={nextMonth}>下月</div>
      </div>
    </div >
  )
}

export function Calendar(props: PropsIF) {
  const { className, value } = props;
  const cls = classnames({
    'ls-calendar': true,
    [`${className}`]: !!className,
  });
  const [time, setTime] = useState('');
  return (
    <div className={cls}>
      {/* <MonthPanel
        className={cls}
        value={time}
        onDateChange={(_e, _date, dateStr) => {
          console.log(dateStr)
          setTime(dateStr);
        }}
      /> */}

      <TimePanel />
    </div>
  )
}