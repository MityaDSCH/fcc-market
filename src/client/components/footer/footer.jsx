'use strict';

import React from 'react';

var Footer = React.createClass({

  animateFooter() {
    $('#pull-tab').toggleClass('active');
    $('footer').toggleClass('shift-up');
    $('#non-footer').toggleClass('shift-up');
  },

  render() {
    return (
      <div id="footer-container">
        <div id="pull-tab" onClick={this.animateFooter}>
          <span id='icon' className="glyphicon glyphicon-console" />
        </div>
        <footer>

            <p>
                This <br/> Website By :
            </p>
            <br/>
            <a href="http://mylesgearon.com" alt="mylesgearon.com">

                <img src="images/mw-logo.svg" />

            </a>

        </footer>
      </div>
    )
  }

});

export default Footer;
