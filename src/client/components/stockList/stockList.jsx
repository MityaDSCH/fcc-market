'use strict';

import React from 'react';

var StockList = React.createClass({

  removeStock: function(name) {
    console.log(name);
  },

  render: function() {

    var createStockItem = function(stock) {
      return (
        <li key={stock.name} className="list-group-item">
          {stock.name}
          <span className="pull-right">
            <button onClick={this.removeStock.bind(this, stock.name)} className="btn btn-xs btn-danger">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </span>
        </li>
      );
    };

    return (
      <div>
        <ul className="list-group">
          {/*bind each StockItem to StockList for access to removeStock*/}
          {this.props.stocks.map(createStockItem.bind(this))}
        </ul>
      </div>
    );

  }
});

export default StockList;
