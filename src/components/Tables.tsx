import React = require("react");
import { Component } from "react";
import getClasses from "../styles/tables_style";
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {JsonToTable} from "react-json-to-table";

const classes = getClasses();

export class Tables extends Component {
getTable(link: string) {
    return (                   
        fetch(link)
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                return (
                    <div className="App">
                      <JsonToTable json={jsonData} />
                    </div>
                  );
            })
            .catch((error) => {
            // handle your errors here
            console.log("Unable to get data")
        })  
    );
}

ButtonNavigate = function (props: {name: string}) {
    return (
        <BottomNavigation
        //value={value}
         onChange={(event, newValue) => {
             this.state = this.getTable(newValue);
         }}
         showLabels
        

     //className={classes.test}
     >
 <BottomNavigationAction label="Datapoints" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/datapoints' icon={<FolderIcon />} />
 <BottomNavigationAction label="Protocol" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/protocols' icon={<FolderIcon />} />
 <BottomNavigationAction label="Device" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devices' icon={<FolderIcon />} />
 <BottomNavigationAction label="Modules" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/modules' icon={<FolderIcon />} />
 <BottomNavigationAction label="Device Type" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devicetypes' icon={<FolderIcon />} />

     </BottomNavigation>
    );

}
// todo: tuto mozes robit svoje tabulky, state moze mat iba
    render() {
        return (
            <div>
            <this.ButtonNavigate name={"Buttons"} />
             {this.state} </div>
        );
       
    }
};

export default Tables;