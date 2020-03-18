import React = require("react");
import { Component } from "react"; 
import getClasses from "../styles/tables_style";

const classes = getClasses();

export class Tables extends Component { 
// todo: tuto mozes robit svoje tabulky, state moze mat iba

    render() {
        return (
            <h1 style={classes.itWorks}> It Wokrs! </h1>
        );
    }
}

export default Tables;
