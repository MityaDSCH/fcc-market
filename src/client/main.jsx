'use strict';

import React from 'react';
import { render } from 'react-dom';

import InitAction from './flux/actions/initActions.js';
import StockActions from './flux/actions/stockActions.js';
import App from './components/app.jsx';

InitAction.initApp();

var socket = io();

socket.on('add stock', function(stock) {
  console.log('add ' + stock.name);
  StockActions.addLocalStock(stock);
});

socket.on('remove stock', function(stock) {
  console.log('remove ' + stock.name);
  StockActions.deleteLocalStock(stock);
});

render((
  <App />
), document.getElementById('app'));
