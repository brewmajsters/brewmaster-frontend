import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import  App  from "./components/App";
import ThemeProvider from '@material-ui/styles/ThemeProvider' ;


const BrewTheme = createMuiTheme({
	palette: {
		primary: amber,
	},
	breakpoints: {
    	values: {
    	  xs: 0,
    	  sm: 700,
    	  md: 870,
    	  lg: 1280,
    	  xl: 1920,
    	},
  	},
	overrides: {
		MuiCard: {
			root: {
				borderRadius: 0,
				boxShadow: '0px 0px 0px 2px rgba(158, 158, 158,1)',
			},
		},
	}
});

ReactDOM.render(

		<ThemeProvider theme={BrewTheme}>
            <App/>
        </ThemeProvider>,
    document.getElementById("root")
);