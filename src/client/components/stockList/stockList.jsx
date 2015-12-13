'use strict';

import React from 'react';

var StockList = React.createClass({
  render: function() {

    var createStockItem = function(stock) {
      return (
        <li className="list-group-item">
          {stock.name}
        </li>
      );
    };

    return (
      <div className="container">
        <ul className="list-group">
          {this.props.stocks.map(createStockItem)}
        </ul>
      </div>
    );
  }
});

export default StockList;
