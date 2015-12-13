'use strict';

import React from 'react';

import Chart from './chart/chart.jsx';
import Header from './header/header.jsx';
import StockList from './stockList/stockList.jsx';

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
      <div>
        <Header />
        <Chart />
        <br />
        <StockList stocks={this.state.stocks} />
      </div>
    );
  }
});

export default App;
