'use strict';

import React from 'react';

var StockInput = React.createClass({

  propTypes: {
    addStockInput: React.PropTypes.string,
    addStockButton: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render: function() {

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="input-group">
            <input type="text"
                   className="form-control"
                   placeholder="Search for..."
                   value={this.props.addStockInput}
                   onChange={this.props.onChange}>
            </input>
            <span className="input-group-btn">
              <button className="btn btn-success"
                      type="button"
                      onClick={this.props.addStockButton}>Add Stock
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }

});

export default StockInput;
