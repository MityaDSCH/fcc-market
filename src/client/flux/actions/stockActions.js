'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes';

var apiUrl = window.location.origin + '/api';

var stockActions = {

  getStocks() {
    $.get(apiUrl, function(stocks) {
      Dispatcher.dispatch({
        actionType: ActionTypes.INIT,
        stockData: stocks
      });
    });
  },

  submitDeleteStock(name) {
    $.get(apiUrl + '/delete/name=' + name);
  },

  deleteLocalStock(stock) {
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_STOCK,
      stockData: stock
    })
  },

  submitAddStock(name) {
    $.get(apiUrl + '/add/name=' + name, function(result) {
      if (Array.isArray(result) || result === 'Exceeded requests' || result === 'Invalid stock') {
        Dispatcher.dispatch({
          actionType: ActionTypes.STOCK_NOT_FOUND,
          searchData: result
        });
      }
    });
  },

  addLocalStock(stock) {
    Dispatcher.dispatch({
      actionType: ActionTypes.ADD_STOCK,
      newStock: stock
    });
  }

};

export default stockActions;
