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

const drawerWidth = 240;
const classes= { 
			body: {
			},
			main:{
				marginTop: 0
			}
		};




export default class App extends Component{
	 

	render () {
		return (
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
												<Tables/>
											</Route>
										</div>
									</Switch>
								</div>
			</BrowserRouter>
		);
	}

}

 