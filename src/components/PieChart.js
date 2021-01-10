import React from 'react';
import { Pie } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/core/styles'


export default class PieChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          chartData:props.chartData
        }
    }
    render() {
        return (
            <div>
                <Pie
                    data={this.props.data}
                    options={{
                        title: {
                            display: false,
                            justify: 'left',
                            fontSize: 25,
                            fontColor: '#FFFFFF',
                            fontFamily: "Gilroy",
                            position: 'top',
                            fontStyle: 'normal'
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontColor: '#FFFFFF',
                                fontFamily: "Gilroy",
                                fontSize: 15,
                                boxWidth: 15,
                                padding: 15
                            }
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 70,
                                top: 10,
                                bottom: 30
                            }
                        },
                        responsive:true,
                        maintainAspectRatio:true,
                        arc: {
                            borderWidth:0
                        }
                    }}
                />
            </div>
        );
    }
}