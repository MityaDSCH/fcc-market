'use strict';

import React from 'react';

var Chart = React.createClass({
  render: function() {
    return (
      <div>
        <svg id="chart" height="300" width="300">
        </svg>
      </div>
    );
  }
});

export default Chart;
