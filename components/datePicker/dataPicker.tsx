import React, { Component } from 'react';


interface PropsIF {
  value: string | Date | number;                   // 支持字符串 日期对象和 时间戳
}

class DatePicker extends Component<PropsIF> {
  static toDateObj = (value: PropsIF['value']) => {
    if (typeof value === 'string') {
      return
    }
  }

  constructor(props: DatePicker['props']) {
    super(props);
    this.state = {
      value: DatePicker.toDateObj(props.value),
      today: ''
    }
  }

  createDateRange() {

  }

  render() {
    return (
      <div>
        <div className="zw-date-panel-header">
          <div className="toggle-year-btn left-btn"></div>
          <div className="toggle-year-btn right-btn"></div>
        </div>
        <div className="zw-date-panel-body">

        </div>
      </div>
    )
  }
}