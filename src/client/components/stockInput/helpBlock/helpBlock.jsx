'use strict';

import React from 'react';

var HelpBlock = React.createClass({

  render: function() {

    if (this.props.results === 'Exceeded requests') {

      return (
        <div>
          <span id="help-block" className="help-block text-warning">
            <p className="text-center">Too many request/sec, try again in a bit.</p>
          </span>
        </div>
      );

    } else if (this.props.results === 'Invalid stock') {

      return (
        <div>
          <span id="help-block" className="help-block text-warning">
            <p className="text-center">Sorry, the api isn't returning data on this stock.</p>
          </span>
        </div>
      );

    } else {

      var createStockSuggestion = function(stock) {
        if (stock.Symbol && stock.Exchange && stock.Name) {
          return (
            <li key={stock.Symbol + stock.Exchange} className="list-group-item">
                  <span className="badge badge-info">{stock.Symbol}</span>
                  {stock.Name}
            </li>
          );
        } else {
          return null;
        }
      };

      return (
        <div>
          <span id="help-block" className="help-block text-warning">
            <p className="text-center">That's not a valid stock symbol, did you want one of these?</p>
            <ul className="list-group">
              {this.props.results.map(createStockSuggestion)}
            </ul>
          </span>
        </div>
      );

    }

  }

});

export default HelpBlock;
