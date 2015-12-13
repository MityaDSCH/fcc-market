'use strict';

import React from 'react';

import Chart from './chart/chart.jsx';
import Header from './header/header.jsx';

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Chart />
      </div>
    );
  }
});

export default App;
