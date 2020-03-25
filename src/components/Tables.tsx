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
//import TableContainer from '@material-ui/core/TableContainer';
//import {JsonToTable} from "react-json-to-table";

const classes = getClasses();

const headersDatapoints = ["name", "units","datapoint code", "legend","writable"]

const headersProtocols = ["name","protocol"]

 export function tableHeaders(headerLabels: string[]){
    return (
        <TableHead>
            <TableRow>
            {headerLabels.map((label) =>
                <TableCell>
                    {label}
                </TableCell>
            )}
            </TableRow>
        </TableHead>
    );
}

interface DatapointsData {
    "name": string,
    "units": string,
}

export function tableDatapoints(data: any){
    return(
        <TableBody>
            {data.map( row =>
                <TableRow>
                    {row.map(value =>
                    <TableCell>
                        {value}                        
                    </TableCell>
                    )}
                </TableRow>
            )}
        </TableBody>
    );
}

export class Tables extends Component<{},{datapointsData: any, datapointsIsLoaded: boolean}> {

//    state = {
//        active: 1
//    }

    constructor(props){
        super(props);
        this.setState({
            datapointsIsLoaded: false
        })
    }

    getTable = (link: string) => {
        return (
            fetch(link)
                .then(response => response.json())
                .then((jsonData) => {
                    // jsonData is parsed json object received from url
                    this.setState({
                        datapointsData: jsonData,
                        datapointsIsLoaded: true
                    });
                    console.log(this.state)
                })
                .catch((error) => {
                    // handle your errors here
                    console.log("Unable to get data")
                })
        );
    }

    ButtonNavigate = (props: { name: string }) =>  {
        return (
            <div>
            <BottomNavigation
                //value={value}
                onChange={(event, newValue) => {
                    this.getTable(newValue)
                }}
                showLabels
            >
                <BottomNavigationAction label="Datapoints" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/datapoints' icon={<FolderIcon />} />
                <BottomNavigationAction label="Protocol" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/protocols' icon={<FolderIcon />} />
                <BottomNavigationAction label="Device" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devices' icon={<FolderIcon />} />
                <BottomNavigationAction label="Modules" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/modules' icon={<FolderIcon />} />
                <BottomNavigationAction label="Device Type" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devicetypes' icon={<FolderIcon />} />

                </BottomNavigation>
                                </div>
        );

    }
    // todo: tuto mozes robit svoje tabulky, state moze mat iba
    render() {
        return (
            <div>
                <this.ButtonNavigate name={"Buttons"} />
                {this.state}
                    <Table>
                        {tableHeaders(headersDatapoints)}
                    </Table>
                     <Table>
                        {tableHeaders(headersProtocols)}
                    </Table>

                 </div>
        );

    }
};

export default Tables;