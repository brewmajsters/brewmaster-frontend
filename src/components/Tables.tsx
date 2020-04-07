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
import { keys } from "@material-ui/core/styles/createBreakpoints";

const classes = getClasses();

const headersDatapoints = ["name", "units","datapoint code", "legend","writable","id"]

const headers = {'datapoints' : ["name", "units", "datapoint code", "legend", "writable"],
                 'protocols' : ["name","protocol"]}

const headersProtocols = ["name","protocol"]

 export function tableHeaders(headerLabels: string[]){
    return (
            <TableRow key="1">
            {headerLabels.map((label) =>
                <TableCell>
                    {label}
                </TableCell>
            )}
            </TableRow>
    );
}


interface DatapointsData {
    "name": string,
    "units": string,
    "datapoint_code":string,
    "legend": string,
    "writable": boolean,
    "id": string
}

export function tableDatapoints(data: any){
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {row.units}
                    </TableCell>
                    <TableCell>
                        {row.datapoint_code}
                    </TableCell>
                    <TableCell>
                        {row.legend}
                    </TableCell>
                    <TableCell>
                        {row.writable}
                    </TableCell>
                    <TableCell>
                        {row.id}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};

export class Tables extends Component<{},{datapointsData: any, datapointsIsLoaded: boolean}> {
    buttonType = "default button";

    constructor(props){
        super(props);
        this.state = {
            datapointsData: [],
            datapointsIsLoaded: false
        }
    }

    generateTable = (link: string) => {
        return (
            fetch(link)
                .then((response) => response.json())
                .then((jsonData) => {
                   this.setState({
                        datapointsData: jsonData,
                        datapointsIsLoaded: true
                   }) 
                   console.log(this.state)
                }) 
                .catch((error) => {
                    console.log("Unable to get data")
                    console.log(error)
                })
        );
    }

    ButtonNavigate = (props: { name: string }) =>  {
        return (
            <div>
                <BottomNavigation
                    //value={value}
                    onChange={(event, newValue) => {
                        this.buttonType = "test"//newValue.split('/')[5];
                        this.setState({
                            datapointsIsLoaded: false
                        })
                        this.generateTable(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction key="1" label="Datapoints" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/datapoints' icon={<FolderIcon />} />
                    <BottomNavigationAction key="2" label="Protocol" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/protocols' icon={<FolderIcon />} />
                    <BottomNavigationAction key="3" label="Device" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devices' icon={<FolderIcon />} />
                    <BottomNavigationAction key="4" label="Modules" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/modules' icon={<FolderIcon />} />
                    <BottomNavigationAction key="5" label="Device Type" value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devicetypes' icon={<FolderIcon />} />

                    </BottomNavigation>
            </div>
        );

    }
    // todo: tuto mozes robit svoje tabulky, state moze mat iba
    render() {
        return (
            <div>
                <this.ButtonNavigate name={"Buttons"} />
                
                        {this.state.datapointsIsLoaded &&
                    <Table>
                    <TableHead> 
                        {tableHeaders(headersDatapoints)}    
                    </TableHead>
                    {tableDatapoints(this.state.datapointsData)}
                </Table>
                            }
            </div>
        );

    }
};

/*
                <Table>
                    {tableHeaders(headersProtocols)}
                </Table>
*/
export default Tables;