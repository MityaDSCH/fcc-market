'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3Chart.js';

var Chart = React.createClass({

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '400px'
    });
  },

  render() {
    return (
      <div id="chart-container">

      </div>
    );
  }
});

export default Chart;
