import React from "react";
import { Pie } from "react-chartjs-2";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }
  render() {
    return (
      <div>
        <Pie
          data={this.props.data}
          // position='relative'
          options={{
            // legend: {
            //     position: 'absolute'
            // },
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  // eslint-disable-next-line
                  dataArr.map((data) => {
                    sum += data;
                  });
                  let number = (value * 100) / sum;
                  if (number < 4) {
                    return null;
                  } else {
                    let percentage = number.toFixed(0) + "%";
                    return percentage;
                  }
                },
                color: "#FFFFFF",
                font: {
                  size: 14,
                  family: "Gilroy",
                  weight: "bold",
                },
              },
            },
            title: {
              display: false,
              justify: "left",
              fontSize: 25,
              fontColor: "#FFFFFF",
              fontFamily: "Gilroy",
              position: "top",
              fontStyle: "normal",
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                fontColor: "#FFFFFF",
                fontFamily: "Gilroy",
                fontSize: 15,
                boxWidth: 15,
                padding: 15,
              },
            },
            layout: {
              padding: {
                left: 20,
                right: 70,
                top: 10,
                bottom: 30,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            arc: {
              borderWidth: 0,
            },
          }}
        />
      </div>
    );
  }
}
