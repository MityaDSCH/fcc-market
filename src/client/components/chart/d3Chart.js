'use strict';

var chart = {};

chart.create = function(el, props) {

  var svg = d3.select(el)
              .append('svg')
                .attr('width', '100%')
              .append('rect')
                .attr('width', props.width)
                .attr('height', props.height);

}

export default chart;
