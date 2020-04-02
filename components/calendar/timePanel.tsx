import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

interface PropsIF extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onDateChange?: () => void;
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
        let x = Math.round(clientX - left);
        let y = Math.round(clientY - top);
        x = Math.max(0, x);
        y = Math.max(0, y);
        x = Math.min(x, 200);
        y = Math.min(y, 200);
        let maxX = Math.sqrt(10000 - Math.pow((y - 100), 2)) + 100;
        if (x > maxX) {
          x = maxX;
        }
        let maxY = Math.sqrt(10000 - Math.pow((x - 100), 2)) + 100;
        if (y > maxY) {
          y = maxY;
        }

        btnRef.current.style.setProperty('transform', `translate(${x}px, ${y}px)`);
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
          <div className="move-btn" ref={btnRef}>
          </div>
        </div>
      </div>
    </div>
  )
}