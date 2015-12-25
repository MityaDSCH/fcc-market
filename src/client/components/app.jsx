'use strict';

import React from 'react';

import ChartContainer from './chart/chart.jsx';
import Header from './header/header.jsx';
import StockList from './stockList/stockList.jsx';
import StockInput from './stockInput/stockInput.jsx';

import StockActions from '../flux/actions/stockActions.js';
import StockStore from '../flux/stores/stockStore.js';

var App = React.createClass({

  getInitialState() {
    return {
      stocks: StockStore.getAllStocks(),
      searchResults: [],
      addStockInput: ''
    };
  },

  componentWillMount() {
    StockStore.addChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      stocks: StockStore.getAllStocks(),
      searchResults: StockStore.getSearchResults()
    });
  },

  deleteStock(name) {
    StockActions.submitDeleteStock(name);
  },

  setInputState(event) {
    return this.setState({
      addStockInput: event.target.value,
      searchResults: []
    });
  },

  addStock() {
    StockActions.submitAddStock(this.state.addStockInput);
  },

  render() {
    return (
      <div id="page-container">
        <Header />
        <ChartContainer stocks={this.state.stocks}/>
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
