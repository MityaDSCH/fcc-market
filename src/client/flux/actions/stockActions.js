'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes';

var apiUrl = window.location.origin + '/api';

var stockActions = {

  getStocks: function() {
    $.get(apiUrl, function(stocks) {
      Dispatcher.dispatch({
        actionType: ActionTypes.INIT,
        initData: stocks
      });
    });
  },

  deleteStock: function(name) {

  },

  addStock: function(data) {
    
  }

};

export default InitAction;
