import React = require('react');
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import orange from "@material-ui/core/colors/orange";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

const classes = {
	container: {
		width: '100%',
	},
	motorBlack: {
		position: 'relative' as 'relative',
		top: '-145px',
		left: '229px',
		color: 'white',
		minWidth: '326px',
		minHeight: '142px',
		maxWidth: '326px',
		maxHeight: '142px',
		backgroundImage: 'url("/public/motor_black.png")'
	},
	motorRPM: {
		color: 'white', 
		position: 'relative' as 'relative', 
		top: '71px',
		left: '200px',
		fontFamily: 'Roboto',
	}, 
	boilerBlack: {
		position: 'relative' as 'relative',
		left: '34px',
		minWidth: '171px',
		minHeight: '210px',
		maxWidth: '171px',
		maxHeight: '210px',
		backgroundImage: 'url("/public/boiler_black.png")'
	},
	boilerRPM: { 
// todo:
	} ,
	transmission: {
		position: 'relative' as 'relative' ,
		left: '0rem',
		minWidth: '228px',
		minHeight: '172px',
		maxWidth: '228px',
		maxHeight: '172px',
		backgroundImage: 'url("/public/Transmission.png")'
	},
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
	},
	input: {
		flex: 1,
	},
	submitButton: {
		padding: 10,
	},

};

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


export default function Scada(){

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
