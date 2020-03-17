import React = require('react');
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles, Typography} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {Component} from 'react';
import getClasses from '../styles/scada_style';


const classes = getClasses();

function ScadaImage(){

	return (
		<div style={classes.container} >
			<div style={classes.boilerBlack}> 
			</div>
			<div style={classes.transmission}>
			</div> 
			<div style={classes.motorBlack}> 
				<div style={classes.motorRPM}> 
					100 rpm
				</div>
			</div>
			<div > 
				<Paper>
 					<InputBase
		style={classes.input}
		placeholder="Set RPM per engine"
		inputProps={{ 'aria-label': 'set rpm for engine' }}
		/>
		<IconButton type="submit" style={classes.submitButton} aria-label="search">
		Submit! 
	</IconButton>
</Paper>
			</div> 
		</div>
	)
}


export class Scada extends Component {

	render() {
		return (

			<div>
				<Grid container spacing={10}>
					<Grid item>
						<Typography variant={"h2"}> SCADA</Typography>
					</Grid>
					<Grid item xs={10} >
						<ScadaImage />
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Scada;