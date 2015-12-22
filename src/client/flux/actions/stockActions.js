'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes';

var apiUrl = window.location.origin + '/api';

var stockActions = {

  getStocks: function() {
    $.get(apiUrl, function(stocks) {
      Dispatcher.dispatch({
        actionType: ActionTypes.INIT,
        stockData: stocks
      });
    });
  },

  deleteStock: function(name) {
    $.get(apiUrl + '/delete/name=' + name, function(result) {
      Dispatcher.dispatch({
        actionType: ActionTypes.DELETE_STOCK,
        stockData: result
      });
    });
  },

  addStock: function(name) {
    $.get(apiUrl + '/add/name=' + name, function(result) {
      if (Array.isArray(result)) {
        Dispatcher.dispatch({
          actionType: ActionTypes.STOCK_NOT_FOUND,
          searchData: result
        });
      } else {
        Dispatcher.dispatch({
          actionType: ActionTypes.ADD_STOCK,
          newStock: result
        });
      }
    });
  }

};

export default stockActions;
