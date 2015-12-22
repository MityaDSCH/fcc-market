'use strict';

import React from 'react';

import Chart from './chart/chart.jsx';
import Header from './header/header.jsx';
import StockList from './stockList/stockList.jsx';
import StockInput from './stockInput/stockInput.jsx';

import StockActions from '../flux/actions/stockActions.js';
import StockStore from '../flux/stores/stockStore.js';

var App = React.createClass({

  getInitialState: function() {
    return {
      stocks: StockStore.getAllStocks(),
      searchResults: [],
      addStockInput: ''
    };
  },

  componentWillMount: function() {
    StockStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      stocks: StockStore.getAllStocks(),
      searchResults: StockStore.getSearchResults()
    });
  },

  deleteStock: function(name) {
    StockActions.deleteStock(name);
  },

  setInputState: function(event) {
    return this.setState({
      addStockInput: event.target.value,
      searchResults: []
    });
  },

  addStock: function() {
    StockActions.addStock(this.state.addStockInput);
  },

  render: function() {
    return (
      <div id="page-container">
        <Header />
        <Chart />
        <div>
          <StockInput addStockInput={this.state.addStockInput}
                      onChange={this.setInputState}
                      addStockButton={this.addStock}
                      searchResults={this.state.searchResults} />
          <br />
          <StockList deleteStock={this.deleteStock}
                     stocks={this.state.stocks} />
        </div>
      </div>
    );
  }

});

export default App;
