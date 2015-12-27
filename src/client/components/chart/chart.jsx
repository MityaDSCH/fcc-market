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
      labels: nextProps.stocks[0].interactiveChart.Dates.map( (dateIso, i) => {
        if (i%4 === 0) {
          var date = new Date(dateIso);
          return date.getMonth() + '/' + date.getDate();
        } else {
          return '';
        }
      }),
      datasets: nextProps.stocks.map(stock => {
        return ({
          label: stock.name,
          fillColor: stock.rgba,
          strokeColor: stock.rgb,
          pointColor: stock.rgb,
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
        pointHitDetectionRadius: 2,
        showXLabels: 10
      }
    });
  },

  shouldComponentUpdate(nextState) {
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
