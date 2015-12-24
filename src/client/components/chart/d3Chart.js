'use strict';

var chart = {};

chart.create = function(el, props) {

  console.log(props);

  var svg = d3.select(el).append('svg').attr({
    width: '100%',
    height: '100%'
  });

  var h = svg.style('height');
  h = h.substr(0, h.length - 2);
  var w = svg.style('width');
  w = w.substr(0, w.length - 2);

  var lineFun = d3.svg.line()
             .x(d => d.position*w)
             .y(d => h - d.value)
             .interpolate('linear');

  var viz = svg.append('path')
               .attr({
                 d: lineFun(props[0].series),
                 stroke: 'black',
                 'stroke-width': '2',
                 fill: 'none'
               });
};

export default chart;
