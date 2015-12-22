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
  },

  getSearchResults: function() {
    return _searchResults;
  }

});

Dispatcher.register(function(action) {

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

    default:

  }

});

export default StockStore;
