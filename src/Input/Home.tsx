import React, { memo, useEffect } from 'react';
import { useLocalStore, useObserver, Observer, observer } from 'mobx-react';
import { Input } from 'components/input';

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

  return (
    <div>
      <Input className="test-input" />
    </div>
  );
}

