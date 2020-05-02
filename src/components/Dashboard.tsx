import React = require('react');
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReactApexChart from "react-apexcharts";
// @ts-ignore
import ApexCharts from 'apexcharts';
import WebSocket from './websocket';
import getClasses from '../styles/dashboard_style';
import { render } from 'react-dom';

ou  
const classes = getClasses();


function time(lowEnd,highEnd){
     var list = [];
    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
     return list;   
}

export class Chart extends React.Component < {name: string, data: any},{}> { 

        time = time(-60,0);
        options = {
                animation: {
                    duration: 1, // general animation time
                },
                hover: {
                    animationDuration: 1, // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 1, // animation duration after a resize
            }

        data = {
            labels: this.time,
            datasets: [{
                label: 'My First dataset',
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
                data: this.props.data
            }]
        }
//    line = Line(data={this.data}, key={Math.random()})
    
  //  update(){
  //      this.line.update(0)
  //  }   

    render(){
    
        return (
        <Card>
            <CardContent>
                <Typography
                    variant={"h5"}
                >
                    {this.props.name}
                </Typography>
            </CardContent>
            <Line 
                data={this.data}
                key={Math.random()}
                options={this.options}
            />
        </Card>
        );
    }
}

export default class Dashboard extends React.Component{

    state = {
        data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }

    chart = <Chart name={"Teplota"} data={this.state.data1}/>

    onData = (value) => {
        var data = this.state.data1;
        data.shift();
        data.push(value);
        console.log(data)
        this.setState({
            data1: data
        });

   //     this.chart.update();
    }

    render(){
        return (
            <Grid 
                container
                spacing={3}
            >
                <Grid 
                    item
                    xs={6}
                >
                    <Chart name={"teplota"} data={this.state.data1}/>
                </Grid>
                <Grid 
                    item
                    xs={6}
                >
                    <Chart name={"Hustota"} data={this.state.data1}/>
                </Grid>
                <Grid 
                    item
                    xs={6}
                >
                    <Card
                        style={classes.alert}
                    >
                        <CardContent>
                            <Typography
                                variant={"h5"}
                            >
                                Tlak
                            </Typography>
                        </CardContent>
                    </Card>
                    <WebSocket onData={this.onData}/>
                </Grid>
            </Grid>
        );
    }

};

