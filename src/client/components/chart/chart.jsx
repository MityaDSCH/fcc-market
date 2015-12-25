'use strict';

import React from 'react';
import {Line as LineChart} from 'react-chartjs';

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
    return ({
      labels: nextProps.stocks[0].interactiveChart.Dates.map(dateIso => {
        var date = new Date(dateIso);
        return date.getMonth() + '/' + date.getDate();
      }),
      datasets: nextProps.stocks.map(stock => {
        return ({
          label: stock.name,
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: stock.interactiveChart.Elements[0].DataSeries.close.values
        });
      })
    });
//     return {
//     "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "November", "December"],
//     "datasets": [{
//         label: "Sodium intake",
//         fillColor: "rgba(220,220,220,0.2)",
//         strokeColor: "rgba(220,220,220,1)",
//         pointColor: "rgba(220,220,220,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(220,220,220,1)",
//         data: [165, 159, 180, 181, 156, 155, 140]
//     }, {
//         label: "Sugar intake",
//         fillColor: "rgba(151,187,205,0.2)",
//         strokeColor: "rgba(151,187,205,1)",
//         pointColor: "rgba(151,187,205,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(151,187,205,1)",
//         data: [128, 148, 140, 119, 186, 127, 190]
//     }]
// }
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
