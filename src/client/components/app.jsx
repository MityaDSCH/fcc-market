'use strict';

import React from 'react';

import Chart from './chart/chart.jsx';
import Header from './header/header.jsx';
import StockList from './stockList/stockList.jsx';
import StockInput from './stockInput/stockInput.jsx';

var App = React.createClass({

  getInitialState: function() {
    return {
      'stocks': [
        {'name': 'ex1'},
        {'name': 'ex2'},
        {'name': 'ex3'},
        {'name': 'ex4'}
      ]
    };
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
