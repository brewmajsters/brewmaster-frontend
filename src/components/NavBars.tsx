import React = require('react');
import {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import { useTheme } from '@material-ui/core/styles';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";


const drawerWidth = 240;


const classes = {
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: 1,
	},
	drawer: {
		flexShrink: 0,
		position: 'relative' as 'relative',
		zIndex: 0,  
		marginTop: '50px', 
		width: '300px',
		padding: 10,
	},
	drawerPaper: {
		marginTop: 50, 
		width: 300,
		padding: 10,
		zIndex: 1,
	},
	content: {
		flexGrow: '1',
	}
	//toolbar: theme.mixins.toolbar,
}; 

export function TopBar(){
	return (
			<AppBar  position="fixed" style={classes.appBar}>
				<Toolbar>
					<Typography variant="h4" color={"inherit"} noWrap>
						<LocalDrinkIcon/> Smartbrew - Brewmasters
					</Typography>
				</Toolbar>
			</AppBar>
			
	);
}

export class LeftBar extends Component{
	
	
	render(){
		return(
			<div>
				<List>
					<Link 
						to="/"
					> 
						<ListItem 
							button
						>
							<ListItemIcon>
								<DashboardIcon/> 
							</ListItemIcon>
							<ListItemText
								primary="Scada"
							/> 
						</ListItem>
					</Link>

					<Link 
						to="/dashboard"
					> 
						<ListItem 
							button 
							key="Dashboard"
						>  
							<ListItemIcon>
								<DashboardIcon/> 
							</ListItemIcon>
							<ListItemText
								primary="Dashboard"
							/> 
						</ListItem>
					</Link>
				</List>
				<Divider/>
			</div>
		);
	}
}
export default LeftBar;
