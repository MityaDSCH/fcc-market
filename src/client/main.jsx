'use strict';

import React from 'react';
import { render } from 'react-dom';

import InitAction from './flux/actions/initActions.js';
import StockActions from './flux/actions/stockActions.js';
import App from './components/app.jsx';

InitAction.initApp();

var socket = io();

socket.on('add stock', function(stock) {
  StockActions.addLocalStock(stock);
});

socket.on('remove stock', function(stock) {
  StockActions.deleteLocalStock(stock);
});

render((
  <App />
), document.getElementById('app'));
