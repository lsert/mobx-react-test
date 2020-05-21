import React from 'react';
import { useLocalStore, Observer } from 'mobx-react';

function A() {
  return <div></div>
}

function Homes() {
  const state = useLocalStore(() => {
    return {
      msg: 1,
      code: 2,
    }
  });
  console.log('我不应该运行');
  return (
    <div style={{ margin: 50 }}>
      <Observer>
        {() => {

        }}
      </Observer>
      <A />
    </div>
  )
}

export const Home = Homes;

