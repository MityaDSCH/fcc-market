'use strict';

import React from 'react';

import Chart from './chart/chart.jsx';
import Header from './header/header.jsx';
import StockList from './stockList/stockList.jsx';
import StockInput from './stockInput/stockInput.jsx';

import StockStore from '../flux/stores/stockStore.js';

var App = React.createClass({

  getInitialState: function() {
    return {
      stocks: StockStore.getAllStocks()
    };
  },

  componentWillMount: function() {
    StockStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      stocks: StockStore.getAllStocks()
    })
  },

  render: function() {
    return (
      <div id="page-container">
        <Header />
        <Chart />
        <div>
          <StockInput />
          <br />
          <StockList stocks={this.state.stocks} />
        </div>
      </div>
    );
  }

});

export default App;
