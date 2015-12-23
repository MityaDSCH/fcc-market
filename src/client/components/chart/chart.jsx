'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3Chart.js';

var Chart = React.createClass({

  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '400px'
    });
  },

  render: function() {
    return (
      <div>

      </div>
    );
  }
});

export default Chart;
