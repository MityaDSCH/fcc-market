'use strict';

import React from 'react';

var HelpBlock = React.createClass({

  propTypes: {
    results: React.PropTypes.array.isRequired
  },

  render: function() {

    var createStockSuggestion = function(stock) {
      return (
        <li key={stock.Symbol} className="list-group-item">
              <span className="badge badge-info">{stock.Symbol}</span>
              {stock.Name}
        </li>
      );
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

});

export default HelpBlock;
