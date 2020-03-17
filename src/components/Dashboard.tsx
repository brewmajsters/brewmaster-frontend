import React = require('react');
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import orange from "@material-ui/core/colors/orange";
import ReactApexChart from "react-apexcharts";
// @ts-ignore
import ApexCharts from 'apexcharts';
import {w3cwebsocket as WebSocket } from "websocket";

const wsClient = new WebSocket('ws://localhost:5000/test_web_socket');

wsClient.onopetn = () => {
    console.log("ws connected");
}


wsClient.onmessage = (message) => {
    console.log(message);
}



let lastDate = 0;
let data1 = [];
let TICKINTERVAL = 86400000;
let XAXISRANGE = 777600000;
function getDayWiseTimeSeries(baseval, count, yrange) {

    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        data1.push({
            x, y
        });
        lastDate = baseval
        baseval += TICKINTERVAL;
        i++;
    }
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
    min: 10,
    max: 90
})

function getNewSeries(baseval, yrange) {
    let newDate = baseval + TICKINTERVAL;
    lastDate = newDate

    for(let i = 0; i< data1.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data1[i].x = newDate - XAXISRANGE - TICKINTERVAL
        data1[i].y = 0
    }

    data1.push({
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })

}

function resetData(){
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
    data1 = data1.slice(data1.length - 10, data1.length);
}

class LineChart extends React.Component {
    state = {
         options: {},
         series: [],
    };

    constructor(props) {
        super(props);


    }
    componentDidMount() {
            this.setState({

                    options: {
                        chart: {
                            id: 'chart',
                            animations: {
                                enabled: true,
                                easing: 'linear',
                                dynamicAnimation: {
                                    speed: 1000
                                }
                            },
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth'
                        },

                        title: {
                            text: 'Dynamic Updating Chart',
                            align: 'left'
                        },
                        markers: {
                            size: 0
                        },
                        xaxis: {
                            type: 'datetime',
                            range: XAXISRANGE,
                        },
                        yaxis: {
                            max: 100
                        },
                        legend: {
                            show: false
                        }
                    },
                    series: [{
                        data: data1.slice()
                    }],
                }
            );
        this.intervals();
    }

    intervals () {
        window.setInterval(() => {
            getNewSeries(lastDate, {
                min: 10,
                max: 90
            })

            ApexCharts.exec('chart', 'updateSeries', [{
                data: data1,
            }])
        }, 1000)
    }

    render() {

        return (


            <div id="chart">
                <ReactApexChart options={{
                    chart: {
                    id: 'chart',
                    animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                    speed: 1000
                }
                },
                    toolbar: {
                    show: false
                },
                    zoom: {
                    enabled: false
                }
                }}} series={this.state.series} type="line" height="350" />
            </div>

        );
    }

};


const data = {
    labels: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00'],
    datasets: [
        {
            label: 'Teplota - Vrchný senzor',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Teplota - Spodný senzor',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(192,75,75,0.4)',
            borderColor: 'rgba(192,75,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,75,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,75,75,1)',
            pointHoverBorderColor: 'rgba(192,75,75,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [63, 59, 83, 75, 57, 54, 40]
        },
        {
            label: 'Želaná teplota',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(255, 196, 0,0.4)',
            borderColor: 'rgba(255, 196, 0,1)',
            borderCapStyle: 'butt',
            borderDash: ["."],
            borderDashOffset: 3,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 196, 0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 196, 0,1)',
            pointHoverBorderColor: 'rgba(255, 196, 0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [63, 59, 83, 75, 57, 54, 40]
        }

    ]
};

const useStyles = makeStyles(theme => ({
alert: {
    boxShadow: '0px 0px 0px 4px rgba(255, 193, 7,1)',
}
}));


const Chart = function (props: {name: string, data: any}) { 
    return (
        <Card>
            <CardContent>
                <Typography
                    variant={"h5"}
                >
                    {props.name}
                </Typography>
            </CardContent>
            <Line
                data={props.data}
            />
        </Card>
    );

}

export default function Dashboard(){
// @ts-ignore
const classes = useStyles();
    return (
                <Grid 
                    container
                    spacing={3}
                >
                    <Grid 
                        item
                        xs={6}
                    >
                        <Chart name={"Teplota"} data={data}/>
                    </Grid>
                    <Grid 
                        item
                        xs={6}
                    >
                        
                    </Grid>
                    <Grid 
                        item
                        xs={6}
                    >
                        <Card
                            className={classes.alert}
                        >
                            <CardContent>
                                <Typography
                                    variant={"h5"}
                                >
                                    Tlak
                                </Typography>
                            </CardContent>
                            <LineChart/>
                        </Card>
                    </Grid>

                </Grid>
        );

};

