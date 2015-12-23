'use strict';

var chart = {};

chart.create = function(el, props) {

  console.log(props);

  var lineFun = d3.svg.line()
             .x(d => d.position*100)
             .y(d => d.value)
             .interpolate('linear');

  var svg = d3.select(el).append('svg').attr({
    width: '100%',
    height: '100%'
  });

  var viz = svg.append('path')
               .attr({
                 d: lineFun(props[0].series),
                 stroke: 'black',
                 'stroke-width': '2',
                 fill: 'none'
               });
};

export default chart;
