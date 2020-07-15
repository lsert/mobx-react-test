import React, { ReactElement } from 'react';
import { useLocalStore, Observer } from 'mobx-react';
import DatePicker from '../../components/datePicker';

declare module 'mobx-react' {
  function Observer({ children }: { children: ReactElement | (() => ReactElement<any>) }): JSX.Element;
}

function A(props: any) {
  return <React.Fragment>{props.msg}</React.Fragment>
}

function Homes() {
  const state = useLocalStore(() => {
    return {
      msg: 1,
      code: 2,
    }
  });
  return (
    <div style={{ margin: 50 }}>
      <Observer>
        <DatePicker range />
      </Observer>
    </div>
  )
}

export const Home = Homes;