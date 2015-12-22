'use strict';

import React from 'react';
import HelpBlock from './helpBlock/helpBlock.jsx';

var StockInput = React.createClass({

  propTypes: {
    addStockInput: React.PropTypes.string,
    addStockButton: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  inputKeyPress: function(e) {
    if (e.which === 13 && this.props.addStockInput.length > 0) {
      this.props.addStockButton();
    }
  },

  render: function() {

    var helpBlock = null;
    var submitBtnClasses = "btn btn-success";
    if (this.props.searchResults.length > 0) {
      helpBlock = <HelpBlock results={this.props.searchResults} />;
      submitBtnClasses = "btn btn-success disabled"
    }

    return (
      <div className="row">
        <div className="col-lg-12" id="stock-input">
          <div className="input-group">
            <input type="text"
                   className="form-control"
                   placeholder="Search for..."
                   aria-describedby="help-block"
                   value={this.props.addStockInput}
                   onChange={this.props.onChange}
                   onKeyDown={this.inputKeyPress}>
            </input>
            <span className="input-group-btn">
              <button className={submitBtnClasses}
                      type="button"
                      onClick={this.props.addStockButton}>Add Stock
              </button>
            </span>
          </div>
          {helpBlock}
        </div>
      </div>
    );
  }

});

export default StockInput;
