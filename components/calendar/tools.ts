export function isSameDay(date: Date, date2: Date) {
  const year = date.getFullYear();
  const year2 = date2.getFullYear();
  if (year !== year2) {
    return false;
  }
  const month = date.getMonth() + 1;
  const month2 = date2.getMonth() + 1;
  if (month !== month2) {
    return false;
  }
  const day = date.getDate();
  const day2 = date2.getDate();
  return day === day2;
}

export function getFullMonthDate(date: Date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let arr = [];
  for (let i = 1; i <= 31; i++) {
    const currentDate = new Date(`${year}-${month}-${i}`);
    const currentMonth = currentDate.getMonth() + 1;
    if (currentMonth !== month) {
      break;
    }
    arr.push(currentDate);
  }
  return arr;
}

export function fillMonthListWithWeek(dateList: Date[]) {
  const [startDate] = dateList;
  const startWeek = startDate.getDay();
  const newDateList = dateList.slice();
  for (let i = 0; i < startWeek; i++) {
    newDateList.unshift(new Date(''));
  }
  const endDate = dateList[dateList.length - 1];
  const endWeek = endDate.getDay();
  for (let i = 0; i < (6 - endWeek); i++) {
    newDateList.push(new Date(''));
  }
  return newDateList;
}

export function splitMonthList(dateList: Date[]) {
  let i = 0;
  let newArr = [];
  while (true) {
    if (i > dateList.length) {
      break;
    }
    newArr.push(dateList.slice(i, i + 7));
    i += 7;
  }
  return newArr;
}


export function formatDate(date: Date, format: string) {
  if (date.toString().toLowerCase() === 'invalid date') {
    throw new Error('Invalid Date');
  }
  const dateObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }
  let f = format;
  Object.keys(dateObj).forEach((key) => {
    const reg = new RegExp(`${key}+`, 'g');
    f = f.replace(reg, (par) => {
      const val = String(dateObj[key]);
      if (val.length < par.length) {
        return `${'0'.repeat(par.length - val.length)}${val}`;
      }
      return val;
    });
  });
  return f;
}

export function isValidDate(date: Date) {
  return date.toString().toLowerCase() !== 'invalid date';
}