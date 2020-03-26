import React, { createElement } from 'react';
import { render } from 'react-dom';
import { Home } from './Home';
console.log(Home);

const div = document.getElementById('app');
render(createElement(Home, null), div);