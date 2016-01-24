import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import Iso from 'iso';
import alt from './alt';

// window.Perf = require('react-addons-perf');

Iso.bootstrap((state, container) => {
  alt.bootstrap(state);

  ReactDOM.render(
    <Router history={browserHistory}>
      {routes}
    </Router>,
    container
  );
});
