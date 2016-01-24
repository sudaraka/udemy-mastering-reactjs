import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

// window.Perf = require('react-addons-perf');
window.XRouter = Router;

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.querySelector('#app')
);
