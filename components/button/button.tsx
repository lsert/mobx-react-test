import React, { ButtonHTMLAttributes, useCallback, useState, MouseEvent } from 'react';
import classnames from 'classnames';

interface PropsIF extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function Button(props: PropsIF) {
  const { className, children, ...others } = props;
  const [showWave, setShowWave] = useState(false);
  const clsObj = classnames({
    'ls-btn': true,
    [`${className}`]: !!className,
    'ls-wave': showWave
  })
  const onMouseDown = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.pageX);
    console.log(e.pageY);
    setShowWave(true);
  }, []);
  return (
    <button className={clsObj} {...others} onMouseDown={onMouseDown}>
      {children}
      {showWave ? <div className="ls-wave-content"></div> : null}
    </button>
  )
}