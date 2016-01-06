'use strict';

import React from 'react';
import Chart from 'chart.js';
import {Line as LineChart} from 'react-chartjs';

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

    var chartDefaults = Chart.defaults.global;
    chartDefaults.responsive = true;
    chartDefaults.multiTooltipTemplate = "<%= datasetLabel %> - <%= value %>";

  },

  createChartData(nextProps) {
    return ({
      labels: nextProps.stocks[0].interactiveChart.Dates.map( (dateIso, i) => {
        if (i%4 === 0) {
          var date = new Date(dateIso);
          return date.getMonth() + 1 + '/' + date.getDate();
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
		var chartWidth = document.getElementById('non-footer').offsetWidth;
		var numPoints = nextProps.stocks[0].interactiveChart.Dates.length;
		var detectionRadius = Math.pow(chartWidth/(numPoints*8), 2.5);
    this.setState({
      data: this.createChartData(nextProps),
      options: {
        pointDotRadius: 3,
        pointHitDetectionRadius: detectionRadius,
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
