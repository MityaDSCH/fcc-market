'use strict';

import React from 'react';

var StockInput = React.createClass({
  render: function() {

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..."></input>
            <span className="input-group-btn">
              <button className="btn btn-success" type="button">Add Stock</button>
            </span>
          </div>
        </div>
      </div>
    );

  }
});

export default StockInput;
