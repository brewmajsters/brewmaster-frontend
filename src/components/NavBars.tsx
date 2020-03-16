import React = require('react');
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


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,

	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
}));

export default function NavBars(){
	// @ts-ignore
	const classes = useStyles();
	return (
		<div>
			<AppBar  position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h4" color={"inherit"} noWrap>
						<LocalDrinkIcon/> Smartbrew - Brewmasters
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.toolbar} />
				<List>
					<Link to="/"> 
					<ListItem button>
						<ListItemIcon>
							<DashboardIcon/> 
						</ListItemIcon>
						<ListItemText primary="Scada"/> 
					</ListItem>
				</Link>
					<Link to="/dashboard"> 
						<ListItem button key="Dashboard">  
							<ListItemIcon>
								<DashboardIcon/> 
							</ListItemIcon>
							<ListItemText primary="Dashboard"/> 
						</ListItem>
					</Link>
				</List>
				<Divider />
			</Drawer>
		</div>
	);

}
