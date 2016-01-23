import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

// window.Perf = require('react-addons-perf');

ReactDOM.render(<App />, document.querySelector('#app'));
