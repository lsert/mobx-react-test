import React, { memo, useEffect, useState, ChangeEvent, MouseEvent, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStore, useObserver, Observer, observer } from 'mobx-react';
import { Input } from 'components/input';
import { Button } from 'components/button';

import { Calendar } from 'components/calendar';

function List(props) {
  const { index, item, onChange, remove } = props;
  return (
    <>
      <input data-index={index} value={item} onChange={onChange} />
      <button data-index={index} onClick={remove}>删除</button>
    </>
  )
}

const InputCps = observer(List);

function A(props) {
  return <div style={{ marginTop: 10 }}>
    <Input value={props.planFullName} />
    <Button style={{ marginLeft: 10 }} data-index={props.index} onClick={props.deletePlan}>删除</Button>
  </div>
}

export function Home() {
  const pageData = useLocalStore(() => {
    return {
      data: undefined,
      onValueChange: (e: ChangeEvent<HTMLInputElement>) => {
        const { data } = pageData;
        if (data) {
          data.projectContext = e.currentTarget.value;
        }
      },
      addPlanList: (e: MouseEvent<HTMLButtonElement>) => {
        const { data } = pageData;
        if (data) {
          data.planList.push({});
        }
      },
      deletePlan: (e: MouseEvent<HTMLButtonElement>) => {
        const { index } = e.currentTarget.dataset;
        const { data } = pageData;
        if (data) {
          data.planList.splice(index, 1);
        }
      }
    }
  });

  return useObserver(() => {
    return (
      <div style={{ margin: 50 }}>
        <Calendar minValue="2020-04-01" maxValue="2020-05-20" />
      </div>
    )
  });
}

const ob = {};

export function Test(props: any) {
  const ff = useFn(() => {

  });
  return <div>你好吗</div>
}