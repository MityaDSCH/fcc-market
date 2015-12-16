'use strict';

import React from 'react';
import { render } from 'react-dom';

import InitAction from './flux/actions/initActions.js';

import App from './components/app.jsx';

InitAction.initApp();

render((
  <App />
), document.getElementById('app'));
