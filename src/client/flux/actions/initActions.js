'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes';

import tempInitApi from '../tempApi.js';

var InitAction = {
  initApp: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.INIT,
      initData: tempInitApi
    });
  }
};

export default InitAction;
