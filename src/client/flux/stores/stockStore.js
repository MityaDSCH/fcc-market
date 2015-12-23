'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';
var CHANGE_EVENT = 'change';

var _stocks = [];
var _searchResults = [];

var StockStore = assign({}, EventEmitter.prototype, {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  getAllStocks() {
    return _stocks;
  },

  getSearchResults() {
    return _searchResults;
  }

});

Dispatcher.register((action) => {

  switch(action.actionType) {

    case ActionTypes.INIT:
      _stocks = action.stockData;
      StockStore.emitChange();
      break;

    case ActionTypes.DELETE_STOCK:
      var curStock = _.find(_stocks, {name: action.stockData.name});
      var index = _.indexOf(_stocks, curStock);
      _stocks.splice(index, 1);
      StockStore.emitChange();
      break;

    case ActionTypes.STOCK_NOT_FOUND:
      _searchResults = action.searchData;
      StockStore.emitChange();
      break;

    case ActionTypes.ADD_STOCK:
      _stocks.push(action.newStock);
      _searchResults = [];
      StockStore.emitChange();
      break;

    default:

  }

});

export default StockStore;
