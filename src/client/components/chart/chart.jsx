'use strict';

import React from 'react';
import Chart from 'chart.js';
import {Line as LineChart} from 'react-chartjs';
import randomColor from 'randomcolor';

var ChartContainer = React.createClass({

  propTypes: {
    stocks: React.PropTypes.array
  },

  getInitialState() {
    return {
      data: {
        datasets: []
      }
    };
  },

  componentDidMount() {

    Chart.defaults.global.responsive = true;

  },

  createChartData(nextProps) {
    var colorArr = randomColor({
      count: nextProps.stocks.length,
      luminosity: 'bright',
      hue: 'orange',
      format: 'rgb'
    }).map(rgbStr => { // take each color
      var rgbArr = rgbStr.split(' ').map(str => { //make an arr of [r, g, b]
        return str.replace(/[^0-9]+/g, '');
      });
      return { // and replace it with an object that has an rgba prop
        rgb: rgbStr,
        rgba: 'rgba(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ', .2)'
      }
    });
    return ({
      labels: nextProps.stocks[0].interactiveChart.Dates.map(dateIso => {
        var date = new Date(dateIso);
        return date.getMonth() + '/' + date.getDate();
      }),
      datasets: nextProps.stocks.map( (stock, i) => {
        return ({
          label: stock.name,
          fillColor: colorArr[i].rgba,
          strokeColor: colorArr[i].rgb,
          pointColor: colorArr[i].rgb,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: stock.interactiveChart.Elements[0].DataSeries.close.values
        });
      })
    });
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.createChartData(nextProps),
      options: {
        pointDotRadius: 3,
        pointHitDetectionRadius: 2
      }
    });
  },

  shouldComponentUpdate(nextState, nextProps) {
    return this.state.data.datasets.length != nextState.stocks.length;
  },

  render() {

    var chartComponent;
    if (Object.keys(this.state.data).length > 0) {
      chartComponent = <LineChart id="stock-chart" data={this.state.data}
                                  options={this.state.options} redraw/>;
    } else {
      chartComponent = null;
    }

    return (
      <div id="chart-container">
        {chartComponent}
      </div>
    );

  }
});

export default ChartContainer;
