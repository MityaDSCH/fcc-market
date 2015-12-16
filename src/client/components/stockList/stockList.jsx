'use strict';

import React from 'react';

var StockList = React.createClass({
  render: function() {

    var createStockItem = function(stock) {
      return (
        <li key={stock.name} className="list-group-item">
          {stock.name}
          <span className="pull-right">
            <button className="btn btn-xs btn-danger">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </span>
        </li>
      );
    };

    return (
      <div>
        <ul className="list-group">
          {this.props.stocks.map(createStockItem)}
        </ul>
      </div>
    );
  }
});

export default StockList;
