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

const drawerWidth = 240;

const classes= { 
			body: {
				display: 'flex',
			},
			main:{
				marginTop: 100,
				width: `calc(100% - ${drawerWidth}px)`,
			}
		};




export default class App extends Component{
	 

	render () {
		return (
			<BrowserRouter>
					<div style={classes.body}>
						<Grid 
							container 
							spacing={7}
						>
							<Grid 
								item
								xs={12}
								spacing={0}
							>
								<TopBar/>
							</Grid>
							<Grid 
								item 
								xs={2}
							>
								<LeftBar/>
							</Grid> 
							<Grid 
								item
								xs={10}
							>
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
							</Grid>
						</Grid>
					</div>
			</BrowserRouter>
		);
	}

}

 