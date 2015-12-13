'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/app.jsx';

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('app'));
