import React = require('react');
import {Component} from 'react';
import  NavBars  from './NavBars';
import {makeStyles} from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import ThemeProvider from '@material-ui/styles/ThemeProvider' ;
import Dashboard from "./Dashboard";
import red from "@material-ui/core/colors/red";

const drawerWidth = 240;

const BrewTheme = createMuiTheme({
    palette: {
        primary: amber,
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

const useStyles = makeStyles(theme => ({
    body: {
        display: 'flex',
    },
    main:{
        marginTop: 100,

        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    }

}));



export default function App (){
    // @ts-ignore
    const classes = useStyles();

        return (
            <ThemeProvider theme={BrewTheme}>
                 <div className={classes.body}>
                        {NavBars()}
                        <div className={classes.main}>
                            {Dashboard()}
                        </div>
                 </div>
            </ThemeProvider>
        );

}