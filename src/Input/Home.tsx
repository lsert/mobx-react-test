import React, { memo, useEffect, useState, ChangeEvent } from 'react';
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
        <br />
      产品
        <br />
        <Button>点击我</Button>
      </div>
    )
  });
}

