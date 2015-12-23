'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes';

var InitAction = {
  initApp() {
    var apiUrl = window.location.origin + '/api';
    $.get(apiUrl, function(stocks) {
      Dispatcher.dispatch({
        actionType: ActionTypes.INIT,
        stockData: stocks
      });
    });
  }
};

export default InitAction;
