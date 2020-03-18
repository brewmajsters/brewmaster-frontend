import React = require('react');
import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import getClasses from '../styles/navbars_style';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const classes = getClasses();

const drawerWidth = 240;

const dashboard = DashboardIcon;


export function TopBar() {
	return (
		<AppBar position="fixed" style={classes.appBar}>
			<Toolbar>
				<Typography variant="h4" color={"inherit"} noWrap>
					<LocalDrinkIcon /> Smartbrew - Brewmasters
					</Typography>
			</Toolbar>
		</AppBar>

	);
}


const LeftBarItem = (props: { path: string, name: string, image: string }) => {

	return (
		<Link
			to={props.path}
		>
			<Grid
				item	
			>
				<img 
					src={props.image} 
					style={classes.leftBarTile}
				/>
				<Typography
					variant="h5"
					>
						{props.name}
				</Typography>
				<Divider/>
			</Grid>
		</Link>
	);
}


export class LeftBar extends Component {


	render() {
		return (
			<div>
				<Grid
					container
					spacing={5}
					style={classes.gridList}	
				>
					<LeftBarItem
						path="/"
						name="Scada"
						image="/public/scadaIcon.png"
					/>
					<LeftBarItem
						path="/dashboard"
						name="Dashboard"
						image="/public/dashboardIcon.png"
					/>
				</Grid>
			</div>
		);
	}
}
export default LeftBar;
