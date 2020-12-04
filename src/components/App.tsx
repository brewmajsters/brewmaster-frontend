import React = require('react');
import {Component} from 'react';
import  { TopBar , LeftBar}  from './NavBars';
import Dashboard from "./Dashboard";
import Grid from '@material-ui/core/Grid';
import {
	BrowserRouter ,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Scada from "./Scada";
import Tables from "./Tables";
import Divider from "@material-ui/core/Divider";
import WebSocket from './websocket';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;

const drawerWidth = 240;

const classes= { 
			body: {
			},
			main:{
				marginTop: 0
			}, 
			sButton:{
				position: 'fixed' as 'fixed',
				bottom: '20px',
				right: '20px'
			}

		};


class ShutdownButton extends Component {
	state = {
		setOpen: false
	}
	
	handleClickOpen = () => {
			this.setState({
				setOpen: true
			})
	  };

	 handleClickClose= () => {
			this.setState({
				setOpen: false 
			})
	  }; 

	  handleShutdown = () => {
		fetch("http://" + HOST + "/shutdown/", {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}).then(res => (
			res.json().then(
				data => {
					console.log("shutdown")
				}
			))).catch(err => { console.log(err) });
	}

	
	  render() {
		return (
			<div>
				<Button
					variant="outlined"
					color="secondary"
					style={classes.sButton}
					onClick={this.handleClickOpen}
				>
					Shutdown
			</Button>
				<Dialog
					open={this.state.setOpen}
					onClose={this.handleClickClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Are you realy want to turn of PillcrusherPi?"}</DialogTitle>
					<DialogContent>
											</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClickClose} color="primary">
							Cancel
          </Button>
						<Button onClick={this.handleShutdown} color="secondary">
							Shutdown
          </Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}

}


export default class App extends Component{
	 

	render () {
		return (
			<div>
				<BrowserRouter>
					<div
						style={classes.main}
					>
						<Switch>
							<div>
								<Route
									exact path="/"
								>
									<Scada />
								</Route>
								<Route
									path="/dashboard/"
								>
									<Dashboard />
								</Route>
								<Route
									path="/tables/"
								>
									<Tables />
								</Route>
							</div>
						</Switch>
					</div>
				</BrowserRouter>
				<ShutdownButton/>
			</div>

		);
	}

}

 