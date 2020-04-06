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

const classes = getClasses();

const headersDatapoints = ["name", "units","datapoint code", "legend","writable","id"]

const headers = {'datapoints' : ["name", "units", "datapoint code", "legend", "writable"],
                 'protocols' : ["name","protocol"]}

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
    "datapoint_code":string,
    "legend": string,
    "writable": string,
    "id": string
}

export function tableDatapoints(data: Object[]){
    console.log("data")
    console.log(data)

    return(
        <TableBody>
            {data.map( row =>
                <TableRow>
                    {Object.keys(row).map(function(key, index) {
                    <TableCell>
                        {row[key]}                       
                    </TableCell>
                    })}
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
            datapointsData: [{
                    "name" : "string1",
                    "units": "string1",
                    "datapoint_code":"string1",
                    "legend": "string1",
                    "writable": "string1",
                    "id": "string1"},
                {
                    "name" : "string2",
                    "units": "string2",
                    "datapoint_code":"string2",
                    "legend": "string2",
                    "writable": "string2",
                    "id": "string2"}
                ],
            datapointsIsLoaded: false
        }
    }

    generateTable = (link: string) => {
        return (
            fetch(link)
                .then((response) => response.json())
                .then((jsonData) => {
                    console.log("jsonData")
                    console.log(jsonData)
                    // jsonData is parsed json object received from url
                    return jsonData
                }) //.then(data => {return data})
                .catch((error) => {
                    // handle your errors here
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
                        let data =
                        this.setState({
                            datapointsData: this.generateTable(newValue),
                            datapointsIsLoaded: true

                        })
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
                <p>{this.buttonType}</p>
                <this.ButtonNavigate name={"Buttons"} />
                <Table>
                    {tableHeaders(headersDatapoints)}    
                    {tableDatapoints(this.state.datapointsData)}
                </Table>
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