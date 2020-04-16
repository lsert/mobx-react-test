import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

interface PropsIF extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onDateChange?: () => void;
}

function degree2Radian(deg: number) {
  return Math.PI / 180 * deg;
}

function radian2Degree(rad: number) {
  return 180 / Math.PI * rad;
}

function sin(deg: number) {
  return Math.sin(degree2Radian(deg));
}

function asin(r: number) {
  return radian2Degree(Math.asin(r));
}

function getPosition(x: number, y: number, originX: number = 0, originY: number = 0) {
  let k = y / x;
  let a = Math.sqrt(10000 / (k ** 2 + 1));
  let b = k * a;
  return [a, b];
}
function getClientPosition(elem: HTMLElement) {
  let par = elem;
  let left = 0;
  let top = 0;
  while (par && par !== document.body) {
    left += par.offsetLeft;
    top += par.offsetTop;
    par = par.offsetParent;
  }
  return {
    left,
    top,
  }
}

const timeClock = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
export function TimePanel(props: PropsIF) {
  const { className, value, onDateChange } = props;
  const dateObj = value ? new Date(value) : new Date();
  const [position, setPosition] = useState([0, 0]);
  const cls = classnames({
    'ls-time-panel': true,
    [`${className}`]: !!className,
  });

  const data = useRef({
    mouseDown: true,
  });

  const boxRef = useRef<null | HTMLDivElement>(null);
  const btnRef = useRef<null | HTMLDivElement>(null);
  const rowRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousemove', function (e) {
      const { target } = e;
      if (boxRef.current && btnRef.current) {
        const { clientX, clientY } = e;
        const boxHeight = boxRef.current.offsetHeight;
        const boxWidth = boxRef.current.offsetWidth;
        const btnHeight = btnRef.current.offsetHeight;
        const btnWidth = btnRef.current.offsetHeight;
        const { left, top } = getClientPosition(boxRef.current);
        let x = clientX - left;
        let y = clientY - top;
        let [a, b] = getPosition(Math.abs(x), Math.abs(y));
        let row = radian2Degree(Math.asin(y / Math.sqrt(x ** 2 + y ** 2)));
        if (x < 0) {
          a = -a;
          row = 180 - row;
        }
        if (y < 0) {
          b = -b;
        }
        btnRef.current.style.setProperty('transform', `translate(${a}px, ${b}px)`);
        rowRef.current.style.setProperty('transform', `rotate(${row}deg)`);
      }
    });
  }, []);

  return (
    <div className={cls}>
      <div className="circle-box" ref={boxRef}>
        <div className="circle-box-inner">
          {
            timeClock.map((item) => {
              return <span className="time-icon-box">{item}</span>
            })
          }
        </div>
        <div className="move-btn" ref={btnRef}>
        </div>
        <div className="rotate-line" ref={rowRef}></div>
      </div>
    </div>
  )
}