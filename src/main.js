import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/app';
import Dashboard from './components/dashboard';
import Orders from './components/orders';

// window.Perf = require('react-addons-perf');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="orders" component={Orders} />
    </Route>
  </Router>,
  document.querySelector('#app')
);
