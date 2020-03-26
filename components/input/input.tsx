import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

interface PropsIF extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input(props: PropsIF) {
  const { className, ...others } = props;
  const clsObj = classnames({
    'ls-input': true,
    [className]: !!className,
  });
  return <input className={clsObj} {...others} />
}
