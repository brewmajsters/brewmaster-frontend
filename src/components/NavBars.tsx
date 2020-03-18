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

const LeftBarItem = (props: { path: string, name: string, icon: any }) => {

	return (
		<Link
			to={props.path}
		>
			<ListItem
				button
			>
				<ListItemIcon>
					<DashboardIcon/>
				</ListItemIcon>
				<ListItemText
					primary={props.name}
				/>
			</ListItem>
		</Link>
	);
}

export class LeftBar extends Component {

	render() {
		return (
			<div>
				<List>
					<LeftBarItem
						path="/"
						name="Scada"
						icon="dashboard"
					/>
					<LeftBarItem
						path="/dashboard"
						name="Dashboard"
						icon="dashboard"
					/>
					<LeftBarItem
						path="/tables/"
						name="Configuration"
						icon="dashboard"
					/>
				</List>
				<Divider />
			</div>
		);
	}
}
export default LeftBar;
