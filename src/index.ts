import React, { createElement } from 'react';
import { render } from 'react-dom';
import { Home } from './Input';

const div = document.getElementById('app');
render(createElement(Home, null), div);