import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export default class HorizontalBarChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          chartData:props.chartData
        }
    }
    render() {
        return (
            <div>
                <HorizontalBar
                    data={this.props.data}
                    options={{
                        title: {
                            display: false,
                            text: this.props.title,
                            align: 'left',
                            fontSize: 25,
                            fontColor: '#FFFFFF',
                            fontFamily: "Gilroy",
                            position: 'top',
                            fontStyle: 'normal',
                            offset: true
                        },
                        legend: {
                            display: false,
                            position: 'right',
                            labels: {
                                fontColor: '#FFFFFF',
                                fontFamily: "Gilroy",
                                fontSize: 20,
                                boxWidth: 15,
                                padding: 15
                            }
                        },
                        layout: {
                            padding: {
                                left: 100,
                                right: 20,
                                top: 10,
                                bottom: 30
                            }
                        },
                        responsive:true,
                        maintainAspectRatio:true,
                        scales:{
                            yAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    fontColor: '#AEC4F4',
                                    fontFamily: "Gilroy",
                                    fontSize: 20,
                                    stepSize: 1,
                                    beginAtZero: true,
                                    max: this.props.max,
                                    padding:0
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    display:false,
                                    fontColor: '#FFFFFF',
                                    fontFamily: "Gilroy",
                                    fontSize: 15,
                                    stepSize: 5,
                                    beginAtZero: true,
                                    max: this.props.max,
                                    padding: 10
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}