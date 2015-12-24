'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3Chart.js';

var Chart = React.createClass({

  propTypes: {
    stocks: React.PropTypes.array
  },

  createChart(el, props) {
    d3Chart.create(el, props.stocks.map( (stock, i) => ({ //for each stock
      name: stock.interactiveChart.Elements[0].Symbol, //return an object w/ the name
      series: stock.interactiveChart.Positions.map( (pos, i) => ({ // and a series arr of objects that's as long as the position arr
        position: pos, // each object has corresponding pos
        value: stock.interactiveChart.Elements[0].DataSeries.close.values[i], // value
        date: stock.interactiveChart.Dates[i] // and date
      }))
    })));
  },

  componentWillReceiveProps(props) {
    var el = ReactDOM.findDOMNode(this);
    if (props.stocks.length > 0) {
      this.createChart(el, props);
    }
  },

  render() {
    return (
      <div id="chart-container">

      </div>
    );
  }
});

export default Chart;
