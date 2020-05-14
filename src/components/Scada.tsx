import React = require('react');
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {makeStyles, Typography} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {Component} from 'react';
import getClasses from '../styles/scada_style';
import WebSocket from './websocket';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import LinearProgress from '@material-ui/core/LinearProgress';

const classes = getClasses();
const BLOCK_HEIGHT = 133;
const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;

const MOTOR_UUID = process.env.MOTOR_UUID
const MOTOR_ID = process.env.MOTOR_ID
const MOTOR_DATAPOINT = process.env.MOTOR_DATAPOINT
const MOTOR_MODULE_ID = process.env.MOTOR_MODULE_ID


const SERVO_UUID = process.env.SERVO_UUID
const SERVO_ID = process.env.SERVO_ID
const SERVO_DATAPOINT = process.env.SERVO_DATAPOINT
const SERVO_MODULE_ID = process.env.SERVO_MODULE_ID

type HMIParams = {
	rpm?: number,
	id?: string,
	uuid?: string,
	onUpdate?(value: string): void,
	moduleId?: string,
	datapoint?: string,
	angle?:number,
	height: number,
	width: any,
}

type HMIState = {
	rpm?: number;
	angle?: number;
	percentage?: number;
	open?: boolean;
	input?: string;
}


type ScadaState = {
	values: {}
}


export  interface HMIComponent<T,U>{  
	onUpdate?(value: string): void,
	height: number,
	width: any,
}


export class MotorHMI extends Component <HMIParams,HMIState>implements HMIComponent <HMIParams,HMIState>{
	state={
		rpm: 0,
		open: false,
		input: ""
	}
	
	height: number;
	width: any;
	anchorEl: any;

	constructor(props){
		super(props);
		//this.state.rpm = props.rpm;
		this.height = props.height*BLOCK_HEIGHT;
		this.width = props.width;
	}

	onSubmitDesiredValue = () => {
        var data = {};
        data["device_id"] = this.props.id;
        data["datapoint"] = this.props.datapoint;
        data["value"] = this.state.input;
        fetch("http://" + HOST +"/modules/"+ String(this.props.moduleId + "/set_value") , {
            method: 'POST', 
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => {
			this.anchorEl=null;
			this.setState({
				open: false
			})
		}).catch(err=>{console.log(err)});
		this.anchorEl=null;
		
    }


    handleChangeDesiredValue = (event) => {
        this.setState({
            input: event.target.value
        })
	}

	onData = (value) => {
		this.setState({
			rpm: value
		})
	}


	handleClick = (event) => {
		 	this.anchorEl = event.currentTarget;
			this.setState({
				open:true 
			})
	  };

	  handleClose = () => {
		this.anchorEl=null;
		this.setState({
				open: false
			})
  	};
	  
	render(){
		return (
			<Grid
				item
				container
				justify="center"
				xs={this.width}
			>
				<div style={classes.motorBlack}>
					<ButtonBase
						aria-describedby={this.props.id}
						onClick={this.handleClick}
					>
						<img src="/public/motor_black.png" alt="motor" height={this.height} ></img>
						<WebSocket onData={this.onData} moduleId={this.props.moduleId} deviceId={this.props.uuid} datapointCode={this.props.datapoint} />
						<div style={classes.motorRPM}>
							<Typography
								variant="body1"
							>
								{this.state.rpm} rpm
									<Popover id={this.props.id} anchorEl={this.anchorEl} onClose={this.handleClose} open={this.state.open}>
									<form>
										<TextField id={this.props.id} label="Desired Value" onChange={this.handleChangeDesiredValue} />
										<br />
										<Button onClick={this.onSubmitDesiredValue}> Submit! </Button>
									</form>
								</Popover>
							</Typography>
						</div>
					</ButtonBase>
				</div>
			</Grid>
		)
	}
}

export class TransmisionHMI extends Component <HMIParams,HMIState> implements HMIComponent <HMIParams,HMIState> {
	
	height: number;
	width: any;

	constructor(props){
		super(props);
		this.height = props.height*BLOCK_HEIGHT;
		this.width = props.width;
	}

	render(){
		
		return (
			<Grid
				item
				container
				justify="center"
				xs={this.width}
			>
				<div style={classes.transmission}>
				<img src="/public/Transmission.png" alt="motor" height={this.height}></img>
				</div>
			</Grid>
		)
	}
} 

export class TankHMI extends Component <HMIParams,HMIState> implements HMIComponent <HMIParams,HMIState>{
 	state = {
		rpm: 0
	 }

	 height: number;
	 width: any;

	 constructor(props){
		super(props);
		this.state.rpm = props.rpm;
		
		this.height = props.height*BLOCK_HEIGHT;
		this.width = props.width;
	 }

	 render(){
		 return (
			 <Grid
				 item
				 container
				 justify="center"
				 xs={this.width}
			 >
				<div style={classes.boilerBlack}> 
					<img src="/public/boiler_black.png" alt="boiler" height={this.height}></img>

				</div>
			</Grid>
		 )
	 }

}

export class ServoHMI extends Component <HMIParams,HMIState> implements HMIComponent <HMIParams,HMIState>{

	state ={
		angle: 0,
		setable: true,
		input: "",
		percentage: 0,
		open: false
	}

	height: number;
	width: any;
	anchorEl: any;

	constructor(props){
		super(props);
		this.height = props.height*BLOCK_HEIGHT;
		this.width = props.width;
	}


	onData = (value) => {
		var angle = Number(value)
		var percentage = angle/360*100;

		this.setState({
			angle: angle,
			percentage: percentage
		})
	}

	onSubmitDesiredValue = () => {
        var data = {};
        data["device_id"] = this.props.id;
        data["datapoint"] = this.props.datapoint;
        data["value"] = this.state.input;
        fetch("http://" + HOST +"/modules/"+ String(this.props.moduleId + "/set_value") , {
            method: 'POST', 
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => {
			this.anchorEl=null;
			this.setState({
				open: false
			})
		}).catch(err=>{console.log(err)});
		this.anchorEl=null;
		
    }


    handleChangeDesiredValue = (event) => {
        this.setState({
            input: event.target.value
        })
	}

	handleClick = (event) => {
		 	this.anchorEl = event.currentTarget;
			this.setState({
				open:true 
			})
	  };

	  handleClose = () => {
		this.anchorEl=null;
		this.setState({
				open: false
			})
  	};

	render(){
		return (
			<Grid
				item
				container
				justify="center"
				xs={this.width}
			>
				<div style={classes.boilerBlack}>
					<WebSocket onData={this.onData} moduleId={this.props.moduleId} deviceId={this.props.uuid} datapointCode={this.props.datapoint} />
					<ButtonBase
						aria-describedby={this.props.id}
						onClick={this.handleClick}
					>
						<img src="/public/servo_black.png" alt="boiler" height={this.height} ></img>
					</ButtonBase>
					<LinearProgress variant="determinate" value={this.state.percentage} />
					<Typography
						variant="body1"
					>
						Angle: {this.state.angle} °
					</Typography>
					<Popover id={this.props.id} anchorEl={this.anchorEl} onClose={this.handleClose} open={this.state.open}>
						<form>
							<TextField id={this.props.id} label="Desired Value" onChange={this.handleChangeDesiredValue} />
							<br />
							<Button onClick={this.onSubmitDesiredValue}> Submit! </Button>
						</form>
					</Popover>
				</div>
			</Grid>
		)

	}
}

export class ContainerHMI extends Component<{},{}>{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<div style={classes.container} >
				<Grid
					container 
				>
					{this.props.children}
				</Grid>
			</div>
		)
	}
}

export class GridFiller extends Component <HMIParams,HMIState>implements HMIComponent <HMIParams,{}>{

	height: number;
	width: any;
	constructor(props){
		super(props)
		this.width = props.width;
		this.height = props.height*BLOCK_HEIGHT;
	}

	render(){
		return(
			<Grid
				item
				xs={this.width}
			>
				<div 
				/>
			</Grid>
		)
	}

}


export class Scada extends Component <{},ScadaState>{
	state ={
		values: {
			'motor_1': 0
		}
	}
	
	onUpdate = (id, value) => {
		var values = this.state.values;
		values[id] = Number(value);
		this.setState({
			values: values
		})
	}

	render() {
		return (

			<div>
				<Grid container spacing={2}>
					<Grid item>
						<Typography variant={"h2"}> SCADA</Typography>
					</Grid>
					<Grid item xs={12} >
						<ContainerHMI>
							<TankHMI
								rpm={0}
								height={2}
								width={2}
							/>
							<GridFiller 
								height={0}
								width={11}
							/>
							<TransmisionHMI
								height={1}
								width={2}
							/>
							<MotorHMI
								id={MOTOR_ID}
								uuid={MOTOR_UUID}
								moduleId={MOTOR_MODULE_ID}
								datapoint={MOTOR_DATAPOINT}
								height={1}
								width={4}
							/>
							<ServoHMI
								id={SERVO_ID}
								uuid={SERVO_UUID}
								moduleId={SERVO_MODULE_ID}
								datapoint={SERVO_DATAPOINT}
								height={1}
								width={2}
							/>
						</ContainerHMI>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Scada;