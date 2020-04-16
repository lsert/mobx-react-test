import React, { HTMLAttributes, MouseEvent, useCallback, useState } from 'react';
import classnames from 'classnames';
import { isSameDay, splitMonthList, getFullMonthDate, fillMonthListWithWeek, formatDate, isValidDate, isSameMonth, DateCaculate } from './tools';
import { TimePanel } from './timePanel';

interface PropsIF extends HTMLAttributes<HTMLDivElement> {
  value?: string,
  minValue?: string;
  maxValue?: string;
}

interface MonthPanelPropsIF extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  minValue?: string;
  maxValue?: string;
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
  const { className, value, onDateChange, minValue } = props;
  const today = new DateCaculate();
  const dateObj = new DateCaculate(value);
  const dataValid = isValidDate(dateObj);
  const cls = classnames({
    'ls-month-panel': true,
    [`${className}`]: !!className,
  });

  // 当前月
  const [currentMonthDate, setCurrentMonthDate] = useState(dataValid ? dateObj : today);
  const monthList = getFullMonthDate(currentMonthDate);
  const filledMonthList = fillMonthListWithWeek(monthList);
  const splitedFillMonthList = splitMonthList(filledMonthList);

  const minValueDate = new Date(minValue);
  const minValueDisableRange = filledMonthList.filter((item) => {
    return item.getTime() < minValueDate.getTime();
  });
  console.log(minValueDisableRange, minValueDate);
  const onItemClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    let { index, index2 } = e.currentTarget.dataset;
    if (onDateChange) {
      const value = splitedFillMonthList[Number(index)][Number(index2)];
      if (minValueDisableRange.includes(value)) {
        return;
      }
      if (isValidDate(value)) {
        setCurrentMonthDate(value);
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
      <div className="current-date-box">
        <div className="flip-btn">&lt;&lt;</div>
        <div className="flip-btn" onClick={prevMonth}>&lt;</div>
        {currentMonthDate.getFullYear()}年 {currentMonthDate.getMonth() + 1}月
        <div className="flip-btn" onClick={nextMonth}>&gt;</div>
        <div className="flip-btn" onClick={nextMonth}>&gt;&gt;</div>
        <div></div>
      </div>
      {
        weekList.map(([item, shortItem]) => {
          return <div className="zw-panel-item">{shortItem}</div>
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
                    const disabled = minValueDisableRange.includes(item);
                    const panelItemCls = classnames({
                      'zw-panel-item': true,
                      'disabled': minValueDisableRange.includes(item),
                      'not-disabled': !disabled,
                      'actived': actived,
                      'not-current-month': !isSameMonth(currentMonthDate, item),
                      'today': isSameDay(new Date(), item),
                    });
                    return (
                      <div className={panelItemCls}>
                        <div
                          className="zw-panel-content"
                          data-index={index}
                          data-index2={index2}
                          onClick={onItemClick}>
                          {currentDate || ''}
                        </div>
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
        <div className="today-btn flip-btn" onClick={toToday}>今天</div>
      </div>
    </div >
  )
}

export function Calendar(props: PropsIF) {
  const { className, value, minValue } = props;
  const cls = classnames('zw-calendar', className);
  const [time, setTime] = useState('');
  return (
    <div className={cls}>
      <MonthPanel
        value={time}
        minValue={minValue}
        onDateChange={(_e, _date, dateStr) => {
          setTime(dateStr);
        }}
      />
    </div>
  )
}