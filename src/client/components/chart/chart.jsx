'use strict';

import React from 'react';
import {Line as LineChart} from 'react-chartjs';
import randomColor from 'randomcolor';

var ChartContainer = React.createClass({

  propTypes: {
    stocks: React.PropTypes.array
  },

  getInitialState() {
    return {
      data: {}
    };
  },

  createChartData(nextProps) {
    var colorArr = randomColor({
      count: nextProps.stocks.length,
      luminosity: 'bright',
      hue: 'orange',
      format: 'rgb'
    }).map(rgbStr => {
      var rgbArr = rgbStr.split(' ').map(str => {
        return str.replace(/[^0-9]+/g, '');
      });
      return {
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
    if (nextProps.stocks.length > 0) {
      this.setState({
        data: this.createChartData(nextProps)
      })
    }
  },

  render() {

    var chartComponent;
    if (Object.keys(this.state.data).length > 0) {
      chartComponent = <LineChart id="stock-chart" data={this.state.data}
                                  options={{}} />;
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
