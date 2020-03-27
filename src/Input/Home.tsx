import React, { memo, useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useLocalStore, useObserver, Observer, observer } from 'mobx-react';
import { Input } from 'components/input';
import { Button } from 'components/button';
console.log(Button);

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

export function Home() {
  const [value, setValue] = useState('');
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
  useEffect(() => {
    fetch('/api/pc/api/stepPage/query?currentStepCode=baseInfo&mainId=1')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return result.result;
      })
      .then((result) => {
        pageData.data = result;
      })
  }, []);
  return useObserver(() => {
    const { data } = pageData;
    if (!data) {
      return null;
    }
    return (
      <div>
        <br />
        <Input
          value={data.projectContext}
          className="test-input"
          onChange={pageData.onValueChange}
        />
        <br />
        {
          data.planList.map((item, index) => {
            return <div>
              <Input value={item.planFullName} />
              <Button data-index={index} onClick={pageData.deletePlan}>删除</Button>
            </div>
          })
        }
        <br />
        产品
        <br />
        <Button onClick={pageData.addPlanList}>点击我</Button>
      </div>
    )
  });
}

