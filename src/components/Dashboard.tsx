import React = require('react');
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import {Typography, InputLabel, Divider} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from "@material-ui/core/CardContent";
import ReactApexChart from "react-apexcharts";
// @ts-ignore
import ApexCharts from 'apexcharts';
import WebSocket from './websocket';
import getClasses from '../styles/dashboard_style';
import { render } from 'react-dom';
import TextField from '@material-ui/core/TextField';;
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
const classes = getClasses();
const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;
const DATA_INIT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function time(lowEnd,highEnd){
     var list = [];
    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
     return list;   
}

function desiredValueArray(value){
    var arr = [];
    for (var i=0; i < 60; i++){
        arr.push(value)
    }
    return arr; 
}

export class Chart extends React.Component < {datapoint: any, deviceId: any,  deviceUuid: any, moduleId: any},{}> { 

        state = {
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            desiredValueArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            isControled: false,
            desiredValue: 0,
            textInput: 0
        }

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
                label: 'Values in ' + this.props.datapoint.units,
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
                data: this.state.data
            },{
                label: 'Desired Value',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(252, 186, 3,0.4)',
                borderColor: 'rgba(252, 186, 3,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba252, 186, 3,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba252, 186, 3,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.desiredValueArray
            }]
        }

    onData = (value) => {
        var data = this.state.data;
        data.shift();
        data.push(value);

       var desiredArray = this.state.desiredValueArray;
       desiredArray.shift();
       desiredArray.push(this.state.desiredValue);
        console.log(value);
        this.setState({
            data: data,
            desiredValueArray: desiredArray
        });
        }


    onSubmit = () => {
        var data = {};
        data["device_id"] = this.props.deviceId;
        data["datapoint"] = this.props.datapoint.code;
        data["value"] = this.state.textInput;
        fetch("http://" + HOST +"/modules/"+ String(this.props.moduleId + "/set_value") , {
            method: 'POST', 
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => {
            this.setState({
                desiredValue: this.state.textInput
            })
        }).catch(err=>{console.log(err)});
    }

     
    handleChange = (event) => {
        this.setState({
            textInput: event.target.value
        })
    }

    //handleOpen = () => {
    //    setOpen(true);
    //};

    //handleClose = () => {
    //    setOpen(false);
    //};


    render(){
    
        return (
            <Card>

                    <WebSocket onData={this.onData} moduleId={this.props.moduleId} deviceId={this.props.deviceId} datapointCode={this.props.datapoint.code} />
                    <CardContent>
                        <Typography
                            variant={"h5"}
                        >
                            {this.props.datapoint.name}
                        </Typography>
<Typography
                            variant={"h6"}
                        >
                            {this.props.deviceUuid}
                        </Typography>
                    </CardContent>
                    <Line
                        data={this.data}
                        key={Math.random()}
                        options={this.options}
                    />
                    <form>
                        <TextField id={this.props.deviceId} label="Desired Value" onChange={this.handleChange}/>    
                        <Button onClick={this.onSubmit}> Submit! </Button>
                    </form>
                                </Card>
        );
    }
}

export default class Dashboard extends React.Component{

    state = {
        devices: [],
        modules: [],
        datapoints: [],
        filter: "Disabled",
        isLoaded: false,
        data: {}
    }
    data: any;

    constructor(props){
        super(props);
        this.data = {};
    }


    selectHandle = (event) => {
        this.setState({
            filter: event.target.value});
    }

    componentDidMount(){
        fetch("http://"+HOST+"/devices")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            
            var datapoints = []
            var device_data = {}
            data.forEach(device => {
                device_data[device.id]={}
            
                 device.datapoints.forEach(datapoint => {
                    var current_datapoint ={
                        code: datapoint.code,
                        name: datapoint.name,
                        units: datapoint.units
                    }

                    if (datapoints.some(e => e.code === current_datapoint.code)) {
                        }
                    else 
                        datapoints.push(current_datapoint);
                 })

                 
             });
            this.setState({
              devices: data,
              isLoaded: true,
              datapoints: datapoints,
             });
             console.log(this.state)
        })
    }

    renderFilter(datapoints: any[]){
        return(
            <Card>
                <CardContent>
                    <Typography 
                        variant="h5"
                    >
                        Device filter:
                    </Typography>
                    <Divider/>
                    <br/>
                    <InputLabel>Data Point:</InputLabel>
                    <Select
                        native
                        value={this.state.filter}
                        onChange = {this.selectHandle}
                        
                    >

                        <option value="Disabled"> Disable filter </option>
                        {datapoints.map((datapoint, i )=>{
                            return (
                                <option value={datapoint.code}> {datapoint.name} ({datapoint.code}) [{datapoint.units}] </option>
                            )
                        } )}
                    </Select>
                </CardContent>
            </Card>
        );
    }

//    chart = <Chart name={"Teplota"} data={this.state.data1}/>

    renderCharts(devices: any){
        return(
                 devices.map((device,i )=> {
                         return (
                                device.datapoints.map((datapoint, i) => {
                                    return(
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Chart key={i} 
                                            datapoint={datapoint} 
                                            deviceUuid={device.uuid} 
                                            deviceId={device.id} 
                                            moduleId={device.module_id}/>
                                    </Grid>
                                )})
                         )}
                    )

        )
    }   
    
    getData = () => {
        return this.data;
    }

    render(){
        return (
            <div>
                {this.state.isLoaded == true && 
               <Grid 
                container
                spacing={4}
            >
                
                        <Grid
                            item
                            xs={12}
                        >
                            {this.renderFilter(this.state.datapoints)}
                        </Grid>
                       
                   {this.renderCharts(this.state.devices)} 
                </Grid>
                }
                </div>
        );
    }

};

