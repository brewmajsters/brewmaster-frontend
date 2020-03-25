import React = require('react');

export default function getClasses(){
	return (
		{
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
			},
			transmission: {
				position: 'relative' as 'relative',
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

		});
}