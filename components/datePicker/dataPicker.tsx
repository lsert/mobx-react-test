import React, { Component, MouseEventHandler } from 'react';
import { isValidDate } from 'components/calendar/tools';
import classnames from 'classnames';
import { CaDate, isSameDay } from './tools';

interface PropsIF {
  value: string | Date | number;                   // 支持字符串 日期对象和 时间戳
  endValue?: CaDate;
  range?: boolean;
}

interface StateIF {
  value: CaDate;
  today: CaDate;
  currentMonthDate: CaDate;
  itemList: CaDate[];
  startDay?: CaDate;
  endDay?: CaDate;
  endValue?: CaDate;
}

class DatePicker extends Component<PropsIF, StateIF> {

  static defaultProps = {
    isEndDate: true,
  }

  static toDateObj = (value: PropsIF['value']) => {
    if (typeof value === 'string') {
      const dateObj = new CaDate(value);
      return isValidDate(dateObj) ? dateObj : new CaDate();
    }
    return new CaDate();
  }

  rangeSeletedOnce = false;

  constructor(props: DatePicker['props']) {
    super(props);
    const value = DatePicker.toDateObj(props.value);
    this.state = {
      value,
      today: new CaDate(),
      currentMonthDate: value,
      itemList: this.createDateRange(value),
      startDay: value,
      endDay: value,
    }
  }

  createDateRange(value: Date) {
    const month = value.getMonth() + 1;
    const year = value.getFullYear();
    const day = value.getDate();
    let arr = [];
    for (let i = 1; i < 31; i++) {
      const c = new CaDate(year, month - 1, i);
      if ((c.getMonth() + 1) !== month) {
        break;
      }
      arr.push(c);
    }
    let first = new CaDate(year, month - 1, 1);
    let week = first.getDay();
    for (let i = week - 1; i > 0; i--) {
      first = new CaDate(first.getTime() - 86400000);
      arr.unshift(first);
    }

    const length = arr.length;
    let last = arr[arr.length - 1];
    for (let i = length; i < 42; i++) {
      last = new CaDate(last.getTime() + 86400000);
      arr.push(last);
    }
    return arr;
  }

  onDayClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const { range, isEndDate } = this.props;
    const { currentTarget: { dataset } } = e;
    const { itemList, value } = this.state;
    const { index } = dataset;
    const i = Number(index);
    const item = itemList[i];
    const { currentMonthDate } = this.state;
    if (item.getMonth() !== currentMonthDate.getMonth()) {
      return this.setState({
        value: item,
        itemList: this.createDateRange(item),
        currentMonthDate: item,
      });
    }
    if (range) {
      if (this.rangeSeletedOnce) {
        this.setState({
          endValue: item,
        });
      } else {
        this.setState({
          value: item,
          endValue: undefined,
        });
      }
      this.rangeSeletedOnce = !this.rangeSeletedOnce;
    } else {
      this.setState({
        value: item,
      });
    }
  }

  onMouseEnter: MouseEventHandler<HTMLLIElement> = (e) => {
    const { range } = this.props;
    if (range) {
      const { currentTarget: { dataset } } = e;
      const { itemList } = this.state;
      const { index } = dataset;
      const i = Number(index);
      const item = itemList[i];
      // this.forceUpdate();
    }
  }
  onMouseLeave: MouseEventHandler<HTMLLIElement> = (e) => {
    const { range } = this.props;
    if (range) {
      const { currentTarget: { dataset } } = e;
      const { itemList } = this.state;
      const { index } = dataset;
      const i = Number(index);
      const item = itemList[i];
      // this.forceUpdate();
    }
  }

  onPrevMonthClick: MouseEventHandler<HTMLDivElement> = (e) => {
    this.setState((state) => {
      const prevDate = state.currentMonthDate.addMonth(-1);
      return {
        currentMonthDate: prevDate,
        itemList: this.createDateRange(prevDate),
      }
    });
  }

  onNextMonthClick: MouseEventHandler<HTMLDivElement> = () => {
    this.setState((state) => {
      const prevDate = state.currentMonthDate.addMonth(1);
      return {
        currentMonthDate: prevDate,
        itemList: this.createDateRange(prevDate),
      }
    });
  }

  onPrevYearClick: MouseEventHandler<HTMLDivElement> = () => {
    this.setState((state) => {
      const prevDate = state.currentMonthDate.addYear(-1);
      return {
        currentMonthDate: prevDate,
        itemList: this.createDateRange(prevDate),
      }
    });
  }

  onNextYearClick: MouseEventHandler<HTMLDivElement> = () => {
    this.setState((state) => {
      const prevDate = state.currentMonthDate.addYear(1);
      return {
        currentMonthDate: prevDate,
        itemList: this.createDateRange(prevDate),
      }
    });
  }


  hasEndDay = false;

  render() {
    const { range } = this.props;
    const { value, itemList, currentMonthDate, endDay, startDay, endValue } = this.state;
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth() + 1;
    return (
      <div className="zw-date-picker" >
        <div className="zw-date-panel-header">
          <div className="toggle-btn left-btn" onClick={this.onPrevYearClick}>&lt;&lt;</div>
          <div className="toggle-btn left-btn" onClick={this.onPrevMonthClick}>&lt;</div>
          <div className="current-value-box">
            <div className="show-selector year">{year}</div>
            <div className="show-selector month">{month}</div>
          </div>
          <div className="toggle-btn right-btn" onClick={this.onNextMonthClick}>&gt;</div>
          <div className="toggle-btn right-btn" onClick={this.onNextYearClick}>&gt;&gt;</div>
        </div>
        <div className="zw-date-panel-body">
          <ul className="zw-date-picker-days-box">
            {
              itemList.map((item, index) => {
                const itemMonth = item.getMonth();
                const currentMonth = currentMonthDate.getMonth();
                const isToday = isSameDay(new Date(), item);
                let isSelected = isSameDay(value, item) || isSameDay(endValue, item);
                let min;
                let max;
                if (range) {
                  if (value && endValue) {
                    let tsv = value.getTime();
                    let tsev = endValue.getTime();
                    if (tsev < tsv) {
                      min = tsev;
                      max = tsv;
                    } else {
                      min = tsv;
                      max = tsev;
                    }
                  }
                }
                const cls = classnames('zw-date-picker-list', {
                  'not-current-month': currentMonth !== itemMonth,
                  'today': isToday,
                  'selected': isSelected,
                  'start-date': isSameDay(item, min),
                  'end-date': isSameDay(item, max),
                  'range-selected-start': isSelected && !!this.hasEndDay,
                  'range-middle': (min && max && !this.rangeSeletedOnce) ? item.getTime() >= min && item.getTime() <= max : false
                });
                return (
                  <li
                    key={index}
                    data-index={index}
                    className={cls}
                    onClick={this.onDayClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                  >
                    <div className="zw-data-picker-range">
                      <div className="zw-date-picker-item">
                        {item.getDate()}
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}


export default DatePicker;