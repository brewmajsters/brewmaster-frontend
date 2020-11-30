import React = require('react');
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles, Typography } from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import ForwardIcon from '@material-ui/icons/Forward';
import { Component } from 'react';
import getClasses from '../styles/scada_style';
import WebSocket from './websocket';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import LinearProgress from '@material-ui/core/LinearProgress';
import Green from '@material-ui/core/colors/green'

import { exec } from 'shelljs';

const classes = getClasses();
const BLOCK_HEIGHT = 133;
const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;

const ENGINE_ID = process.env.ENGINE_ID
const ENGINE_MODULE_ID = process.env.ENGINE_MODULE_ID
const ENGINE_MOTION_SET_DATAPOINT = process.env.ENGINE_MOTION_SET_DATAPOINT

const MOTOR_UUID = process.env.MOTOR_UUID
const MOTOR_ID = process.env.MOTOR_ID
const MOTOR_DATAPOINT = process.env.MOTOR_DATAPOINT
const MOTOR_MODULE_ID = process.env.MOTOR_MODULE_ID
const MOTOR_SET_DATAPOINT = process.env.MOTOR_DATAPOINT_SET

const SERVO_UUID = process.env.SERVO_UUID
const SERVO_ID = process.env.SERVO_ID
const SERVO_DATAPOINT = process.env.SERVO_DATAPOINT
const SERVO_MODULE_ID = process.env.SERVO_MODULE_ID

const ENGINE_MOTION_STATES = ['FWD', 'REV', 'FWD_JOG', 'REV_JOG', 'STOP', 'BREAK']

type HMIParams = {
	rpm?: number,
	id?: string,
	setDatapoint?: string,
	uuid?: string,
	variant?: string,
	onUpdate?(value: string): void,
	moduleId?: string,
	datapoint?: string,
	angle?: number,
	isSetable?: boolean,
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
	values: {},
	datapoints: any,
	datapointsIsLoaded: boolean
}


export interface HMIComponent<T, U> {
	onUpdate?(value: string): void,
	height: number,
	width: any,
}


export class MotorHMI extends Component<HMIParams, HMIState> implements HMIComponent<HMIParams, HMIState>{
	state = {
		rpm: 0,
		open: false,
		input: ""
	}

	height: number;
	width: any;
	anchorEl: any;

	constructor(props) {
		super(props);
		//this.state.rpm = props.rpm;
		this.height = props.height * BLOCK_HEIGHT;
		this.width = props.width;
	}

	onSubmitDesiredValue = () => {
		var data = {};
		data["device_id"] = this.props.id;
		data["datapoint"] = this.props.setDatapoint;
		data["value"] = this.state.input;
		fetch("http://" + HOST + "/modules/" + String(this.props.moduleId + "/set_value"), {
			method: '',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(res => {
			this.anchorEl = null;
			this.setState({
				open: false
			})
		}).catch(err => { console.log(err) });
		this.anchorEl = null;

	}


	handleChangeDesiredValue = (event) => {
		this.setState({
			input: String(event.target.value * 100)
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
			open: true
		})
	};

	handleClose = () => {
		this.anchorEl = null;
		this.setState({
			open: false
		})
	};

	render() {
		return (
			<Grid
				item
				container
				justify="center"
				xs={this.width}
			>
				<div style={classes.motorBlack}>
					<div style={classes.motorRPM}>
						<Typography
							variant="body1"
						>
							{this.state.rpm} rpm
						</Typography>
					</div>

					{this.props.isSetable &&
						<ButtonBase
							aria-describedby={this.props.id}
							onClick={this.handleClick}
						>
							<img src="/public/motor_black2.png" alt="motor" height={this.height} ></img>
							<WebSocket onData={this.onData} moduleId={this.props.moduleId} deviceId={this.props.uuid} datapointCode={this.props.datapoint} />
							<Popover id={this.props.id} anchorEl={this.anchorEl} onClose={this.handleClose} open={this.state.open}>
								<form>
									<TextField id={this.props.id} label="Desired Value" onChange={this.handleChangeDesiredValue} />
									<br />
									<Button onClick={this.onSubmitDesiredValue}> Submit! </Button>
								</form>
							</Popover>
						</ButtonBase>
					}
					{	this.props.isSetable == false &&
						<div>
							<WebSocket onData={this.onData} moduleId={ENGINE_MODULE_ID} deviceId={ENGINE_ID} datapointCode={"SPEED"} />
							<img src="/public/motor_black2.png" alt="motor" height={this.height} ></img>
						</div>
					}
				</div>
			</Grid>
		)
	}
}

export class TransmisionHMI extends Component<HMIParams, HMIState> implements HMIComponent<HMIParams, HMIState> {

	height: number;
	width: any;

	constructor(props) {
		super(props);
		this.height = props.height * BLOCK_HEIGHT;
		this.width = props.width;
	}

	render() {

		return (
			<Grid
				item
				container
				justify="center"
				xs={this.width}
			>
				<div style={classes.transmission}>
					<img src="/public/gearbox_w_arrows.png" alt="motor" height={this.height - 20}></img>
				</div>
			</Grid>
		)
	}
}

export class TankHMI extends Component<HMIParams, HMIState> implements HMIComponent<HMIParams, HMIState>{
	state = {
		rpm: 0
	}

	height: number;
	width: any;

	constructor(props) {
		super(props);
		this.state.rpm = props.rpm;

		this.height = props.height * BLOCK_HEIGHT;
		this.width = props.width;
	}

	render() {
		return (
			<Grid
				item
				container
				justify="center"
				xs={this.width}
			>
				<div style={classes.boilerBlack}>
					<img src="/public/tank.png" alt="boiler" height={this.height}></img>

				</div>
			</Grid>
		)
	}

}

export class ServoHMI extends Component<HMIParams, HMIState> implements HMIComponent<HMIParams, HMIState>{

	state = {
		angle: 0,
		setable: true,
		input: "",
		percentage: 0,
		open: false
	}

	height: number;
	width: any;
	anchorEl: any;

	constructor(props) {
		super(props);
		this.height = props.height * BLOCK_HEIGHT;
		this.width = props.width;
	}


	onData = (value) => {
		var angle = Number(value)
		var percentage = angle / 360 * 100;

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
		fetch("http://" + HOST + "/modules/" + String(this.props.moduleId + "/set_value"), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(res => {
			this.anchorEl = null;
			this.setState({
				open: false
			})
		}).catch(err => { console.log(err) });
		this.anchorEl = null;

	}


	handleChangeDesiredValue = (event) => {
		this.setState({
			input: event.target.value
		})
	}

	handleClick = (event) => {
		this.anchorEl = event.currentTarget;
		this.setState({
			open: true
		})
	};

	handleClose = () => {
		this.anchorEl = null;
		this.setState({
			open: false
		})
	};

	render() {
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

export class ContainerHMI extends Component<{}, {}>{
	constructor(props) {
		super(props);
	}

	render() {
		return (
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

export class GridFiller extends Component<HMIParams, HMIState> implements HMIComponent<HMIParams, {}>{

	height: number;
	width: any;
	constructor(props) {
		super(props)
		this.width = props.width;
		this.height = props.height * BLOCK_HEIGHT;
	}

	render() {
		return (
			<Grid
				item
				xs={this.width}
			>
				<div style={{ minHeight: this.height }}
				/>
			</Grid>
		)
	}

}
export class PipeHMI extends Component<HMIParams, HMIState> implements HMIComponent<HMIParams, {}>{

	height: number;
	width: any;
	constructor(props) {
		super(props)
		this.width = props.width;
		this.height = props.height * BLOCK_HEIGHT;
	}

	renderSwithcParams(params) {
		switch (params) {
			case "normal":
				return <img src="/public/horizontalPipe.png" alt="boiler" height={this.height} ></img>;
			case "Lend":
				return <img src="/public/pipeLeftEnd.png" alt="boiler" height={this.height} ></img>;
		}
	}

	render() {
		return (
			<Grid
				item
				xs={this.width}
			>
				{
					this.renderSwithcParams(this.props.variant)
				}
			</Grid>
		)
	}

}

class LineDatapointSetter extends Component<{ label: string, id: string, moduleId: string, deviceId: string, datapointCode: string }, {}>{
	path: string;
	data: string;
	state = {
		value: 0,
		recievedValue: 0
	}


	onValueChange = (event) => {
		this.setState({
			value: event.target.value
		})
	}

	onSubmit = () => {
		var data = {};
		data['value'] = this.state.value;
		fetch("http://" + HOST + "/device_datapoints/" + this.props.id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(res => {
		}).catch(err => { console.log(err) });
	}

	onData = (value) => {
		this.setState({
			recievedValue: value
		})
	}

	keybordUp = (event) => {
		exec('matchbox-keyboard');
	}

	render() {
		return (
			<div>
				<WebSocket onData={this.onData} moduleId={this.props.moduleId} deviceId={this.props.deviceId} datapointCode={this.props.datapointCode} />
				<label>
					<Typography
						variant="body1"
					>
						{this.props.label}:
					</Typography>
				</label>
				<InputBase
					fullWidth
					style={classes.LineInput}
					placeholder={String(this.state.recievedValue)}
					inputProps={{ 'aria-label': this.props.label }}
					onChange={this.onValueChange}
					onClick={this.keybordUp}
					endAdornment={
						<Button
							variant="contained"
							onClick={this.onSubmit}
						>
							Submit
						</Button>
					}
				/>
				<Divider />
			</div>
		)
	}

}

class EngineButton extends Component<{ label: string, color?: string }, {}>{


	render() {
		return (
			<Button
				color="primary"
			>
				{this.props.label}
			</Button>
		)
	}
}

class EmergencyEngineButton extends Component<{ label: string, color?: string }, {}>{


	render() {
		return (
			<Button
				color="secondary"
			>
				{this.props.label}
			</Button>
		)
	}
}

class EngineTabButtons extends Component<{ width: any }, {}> {
	height: number;
	width: any;
	constructor(props) {
		super(props)
		this.width = props.width;
		this.height = props.height * BLOCK_HEIGHT;
	}
	state = {
		value: 0,
		engine_state: "FWD"
	}

	onData = (value) => {
		this.setState({ value: Math.floor(value) });
	}


	handleChange = (ev, newValue) => {
		this.setState({
			value: newValue
		});
		var data = {};
		data['value'] = ENGINE_MOTION_STATES[newValue];
		fetch("http://" + HOST + "/device_datapoints/" + ENGINE_MOTION_SET_DATAPOINT, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(res => {
		}).catch(err => { console.log(err) });
	}


	render() {
		return (
			<Card
				style={classes.engine}
			>
				<WebSocket onData={this.onData} moduleId={ENGINE_MODULE_ID} deviceId={ENGINE_ID} datapointCode="SET_MOTION" />
				<Typography
					component="h2"
					variant="h5"
					align="center"
					color="primary"
				>
					Engine Motion Settings:
				</Typography>
				<CardContent>
					<Tabs
						value={this.state.value}
						orientation="vertical"
						variant="fullWidth"
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
					>
						{ENGINE_MOTION_STATES.map((motion, i) => {
							return (
								< Tab key={i} label={motion} />
							)
						}
						)}
					</Tabs>
				</CardContent>
			</Card>
		)
	}
}

class EngineInfoLine extends Component<{ label: any, moduleId: string, deviceId: string, datapointCode: string }, {}>{
	state = {
		recievedValue: 0
	}

	onData = (value) => {
		this.setState({
			recievedValue: value
		})
	}

	render() {
		return (
			<div>
				<WebSocket onData={this.onData} moduleId={this.props.moduleId} deviceId={this.props.deviceId} datapointCode={this.props.datapointCode} />
				<Typography
					variant="h5"
				>
					{this.props.label}: {this.state.recievedValue}
				</Typography>
				<br />
				<Divider />
				<br />
			</div>
		)
	}
}


class EngineInfo extends Component<{ datapoints: any, width: any }, {}>{
	state = {
		frequency: 0,
		max_rpm: 0,
		actual_rpm: 0,
		acceleration_time: 0,
		status: "OK"
	}

	height: number;
	width: any;

	constructor(props) {
		super(props)
		this.width = props.width;
		this.height = props.height * BLOCK_HEIGHT;
	}

	render() {
		return (
			<Card
				style={classes.engine}
			>
				<Typography
					component="h2"
					variant="h5"
					align="center"
					color="secondary"
				>
					Engine Info:
				</Typography>
				<CardContent>
					<table>
						{this.props.datapoints.map((datapoint, i) => {
							if (!datapoint.writable) {
								return (
									<tr
										key={i}
									>
										<EngineInfoLine
											label={datapoint.name}
											moduleId={ENGINE_MODULE_ID}
											deviceId={ENGINE_ID}
											datapointCode={datapoint.code}
										/>
									</tr>
								)
							}
						}
						)}
					</table>
				</CardContent>
			</Card>
		)
	}
}

class EngineControl extends Component<{ datapoints: any, width: any }, { datapoints: any, datapointsIsLoaded: boolean }>{
	state = {
		datapointsIsLoaded: false,
		datapoints: []
	}

	height: number;
	width: any;

	constructor(props) {
		super(props)
		this.width = props.width;
		this.height = props.height * BLOCK_HEIGHT;
	}

	render() {
		return (
			<Card
				style={classes.engine}
			>
				<Typography
					component="h2"
					variant="h5"
					align="center"
					color="secondary"
				>
					Engine Control:
				</Typography>
				<CardContent>
					{this.props.datapoints.map((datapoint, i) => {
						if (datapoint.writable && datapoint.code != "SET_MOTION") {
							return (
								<LineDatapointSetter
									label={datapoint.name}
									id={datapoint.id}
									moduleId={ENGINE_MODULE_ID}
									deviceId={ENGINE_ID}
									datapointCode={datapoint.code}
									key={i}
								/>
							)
						}
					}
					)}
				</CardContent>
			</Card>
		)
	}
}

class EngineHMI extends Component<{}, {}>{

	render() {
		return (
			<Card>
				<Typography
					component="h2"
					variant="h5"
					align="center"
					color="primary"
				>
					Engine HMI:
				</Typography>
				<CardContent>
					<ContainerHMI>
						<TransmisionHMI
							height={2}
							width={2}
						/>
						<MotorHMI
							height={2}
							width={2}
							isSetable={false}
						/>
					</ContainerHMI>
				</CardContent>
			</Card>
		)
	}

}

export class Scada extends Component<{}, ScadaState>{
	state = {
		values: {
			'motor_1': 0
		},
		datapoints: null,
		datapointsIsLoaded: false
	}
	constructor(props) {
		super(props)
		this.fetchDatapoint()
	}

	onUpdate = (id, value) => {
		var values = this.state.values;
		values[id] = Number(value);
		this.setState({
			values: values
		})
	}

	fetchDatapoint = () => {
		fetch("http://" + HOST + "/devices/" + ENGINE_ID, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}).then(res => (
			res.json().then(
				data => {
					this.setState({
						datapoints: data.device_datapoints,
						datapointsIsLoaded: true
					})
					console.log(this.state)
				}
			))).catch(err => { console.log(err) });
	}

	render() {
		return (

			<div>
				<Grid container
					spacing={1}
					alignItems="center"
				>

					{this.state.datapointsIsLoaded &&
						<Grid
							item
							xs={12}
							sm={4}
							md={4}
						>
							<EngineControl
								datapoints={this.state.datapoints}
								width="5"
							/>
						</Grid>
					}
					{this.state.datapointsIsLoaded &&
						<Grid
							item
							xs={12}
							sm={5}
							md={4}
						>
							<EngineInfo
								width="5"
								datapoints={this.state.datapoints}
							/>
						</Grid>
					}
					<Grid
						item
						xs={12}
						sm={3}
						md={4}
					>

						<EngineTabButtons
							width={5}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<EngineHMI />
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Scada;