'use strict';

import Dispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';
import randomColor from 'randomcolor';
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
    var colors = this.makeStockColors(_stocks.length);
    for (var i = 0; i < _stocks.length; i++) {
      _stocks[i].rgb = colors[i].rgb;
      _stocks[i].rgba = colors[i].rgba;
    }
    return _stocks;
  },

  getSearchResults() {
    return _searchResults;
  },

  makeStockColors(numStocks) {
    var numColors1 = numStocks % 2 === 0 ? numStocks/2 : (numStocks + 1)/2;
    var numColors2 = numStocks - numColors1;
    var colors1 = randomColor({
      count: numColors1,
      luminosity: 'dark',
      hue: 'blue',
      format: 'rgb'
    });
    var colors2 = randomColor({
      count: numColors2,
      luminosity: 'dark',
      hue: 'red',
      format: 'rgb'
    });
    var colorArr = [];
    for (var i = 0; i < numStocks; i++) {
      if (i % 2 === 0) {
        colorArr.push(colors1.shift());
      } else {
        colorArr.push(colors2.shift());
      }
    }
    return colorArr.map(rgbStr => { // take each color
      var rgbArr = rgbStr.split(' ').map(str => { //make an arr of [r, g, b]
        return str.replace(/[^0-9]+/g, '');
      });
      return { // and replace it with an object that has an rgba prop
        rgb: rgbStr,
        rgba: 'rgba(' + rgbArr[0] + ', ' + rgbArr[1] + ', ' + rgbArr[2] + ', .2)'
      }
    });
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
