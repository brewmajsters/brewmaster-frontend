import React = require('react');

export default function getClasses(){
	return (
		{
			container: {
				width: '100%',
			},
			motorBlack: {
				position: 'relative' as 'relative',
				//maxHeight: '142px',
				justifyContent: "center" as "center",
				//backgroundImage: 'url("/public/motor_black.png")'
			},
			motorRPM: {
            	position: 'absolute' as 'absolute',
				top: '20',
				textAlign: "center" as "center",
				zIndex: 2
			},
			boilerBlack: {
				position: 'relative' as 'relative',
				//maxHeight: '210px',
				justifyContent: "center",
          		alignItems: "center"
			},
			boilerRPM: {
				// todo:
			},
			transmission: {
				position: 'relative' as 'relative',
				maxHeight: '172px',
				justifyContent: "center",
          		alignItems: "center"

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