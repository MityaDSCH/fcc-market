'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import {EventEmitter} from 'events';
import assign from 'object-assign';
var CHANGE_EVENT = 'change';

var _stocks = [];

var StockStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllStocks: function() {
    return _stocks;
  }

});

Dispatcher.register(function(action) {

  switch(action.actionType) {

    case ActionTypes.INIT:
      _stocks = action.initData.stocks;
      StockStore.emitChange();
      break;

    default:

  }

});

export default StockStore;
