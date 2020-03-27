import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

interface PropsIF extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function Button(props: PropsIF) {
  const { className, children, ...others } = props;
  const clsObj = classnames({
    'ls-btn': true,
    [`${className}`]: !!className,
  })
  return <button className={clsObj} {...others}>{children}</button>
}