import React, { memo, useEffect } from 'react';
import { useLocalStore, useObserver, Observer, observer } from 'mobx-react';

function Input(props) {
  const { index, item, onChange, remove } = props;
  return (
    <>
      <input data-index={index} value={item} onChange={onChange} />
      <button data-index={index} onClick={remove}>删除</button>
    </>
  )
}

const InputCps = observer(Input);

export function Home() {
  const data = useLocalStore(() => {
    return {
      list: ['这里是数据'],
      add: () => {
        data.list.push('哈哈哈');
      },
      remove: (e) => {
        const { index } = e.currentTarget.dataset;
        data.list.splice(index, 1);
      },
      inputChange: (e) => {
        const { index } = e.currentTarget.dataset;
        data.list[index] = e.currentTarget.value;
      },
    }
  });

  useEffect(() => {
    setTimeout(() => {
      data.list = ['去你大爷的'];
    }, 3000);
  }, [])

  return useObserver(() => (
    <div>
      这里是home
      <ul>
        {
          data.list.map((item, index) => {
            return (
              <li>
                <InputCps item={item} index={index} onChange={data.inputChange} remove={data.remove} />
              </li>
            )
          })
        }
      </ul>
      <button onClick={data.add}>点击我</button>
    </div>
  ));
}

