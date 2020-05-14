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
import { withStyles } from "@material-ui/core/styles";


const tablesClasses = getClasses();
const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;
//const HOST = "localhost:5000";
const headers = {
    'datapoints': ["id", "module_device_type_id", "name", "units", "code", "legend", "writable"],
    'protocols': ["id", "datatype_id", "name"],
    'devices': ["id", "module_id", "uuid", "address", "poll_rate"],
    'devicetypes': ["id", "protocol_id", "manufacturer", "model", "code"],
    'datatypes': ["id", "name"],
    'modules': ["id", "module_device_type_id", "mac"]
}

const NAVIGATION = [
    ['Datapoints', '/datapoints'],
    ['Protocols', '/protocols'],
    ['Devices', '/devices'],
    ['Device Types', '/devicetypes'],
    ['Data Types', '/datatypes'],
    ['Modules', '/modules']

];

/* Neviem naco je toto ked je vsetko v const headers
const headersDatapoints = ["id", "module_device_type_id","name", "units","code","legend","writable"]
const headersProtocols = ["id","datatype_id","name"]
const headersDevices = ["id","module_id","uuid","address","poll_rate"]
const headersDevicetypes = ["id","name"]
const headersModules = ["id","module_device_type_id","mac"]
*/
type ModulesData = {
    "id": string,
    "module_device_type_id": string,
    "mac": string,
}

type DatapointsData = {
    "id": string,
    "module_device_type_id": string,
    "name": string,
    "units": string,
    "code": string,
    "legend": string,
    "writable": boolean
}

type DevicesData  = {
    "id": string,
    "module_id": string,
    "uuid": string,
    "address": string,
    "poll_rate": string
}

type ProtocolsData = {
    "id": string,
    "datatype_id": string,
    "name": string,
}

type DevicetypesData = {
    "id": string,
    "protocol_id": string,
    "manufacturer": string,
    "model": string,
    "code": string
}

type DatatypesData = {
    "id": string,
    "name": string,
}


export function tableHeaders(headerLabels: string[]) {
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


export function tableDatapoints(data: DatapointsData[]) {
    console.log("Datapoints table")
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.module_device_type_id}
                    </TableCell>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {row.units}
                    </TableCell>
                    <TableCell>
                        {row.code}
                    </TableCell>
                    <TableCell>
                        {row.legend}
                    </TableCell>
                    <TableCell>
                        {row.writable}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};


export function tableProtocols(data: ProtocolsData[]) {
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.datatype_id}
                    </TableCell>
                    <TableCell>
                        {row.name}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};


export function tableDevices(data: DevicesData[]) {
    console.log(data)
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.module_id}
                    </TableCell>
                    <TableCell>
                        {row.uuid}
                    </TableCell>
                    <TableCell>
                        {row.address}
                    </TableCell>
                    <TableCell>
                        {row.poll_rate}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};


export function tableDevicetypes(data: DevicetypesData[]) {
    console.log(data)
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.protocol_id}
                    </TableCell>
                    <TableCell>
                        {row.manufacturer}
                    </TableCell>
                    <TableCell>
                        {row.model}
                    </TableCell>
                    <TableCell>
                        {row.code}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};


export function tableDatatypes(data: DatatypesData[]) {
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.name}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};


export function tableModules(data: ModulesData[]) {
    return (
        <TableBody>
            {data.map(row =>
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.module_device_type_id}
                    </TableCell>
                    <TableCell>
                        {row.mac}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};



export class Tables extends React.Component<{ classes }, { datapointsData: any, datapointsIsLoaded: boolean }> {

    buttonType: string = "default button";


    constructor(props) {
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
                    console.log(error)
                    console.log("Unable to get data")
                })
        );
    }


    renderTable(buttonType: string, data: []) {
        return (
            <Table
                size="small"
            >
                <TableHead>
                    {tableHeaders(headers[buttonType])}
                </TableHead>
                {tableDatapoints(data)}
            </Table>
        )
    }


    onNavigationChange = (event, newValue) => {
        console.log(newValue)
        this.buttonType = newValue.split('/')[3];
        this.setState({
            datapointsIsLoaded: false
        })
        this.generateTable(newValue);
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <BottomNavigation
                    //value={value}
                    onChange={this.onNavigationChange}
                    showLabels
                >
                    {NAVIGATION.map((data, i) => {
                        return (
                            <BottomNavigationAction
                                key={String(i)} 
                                label={data[0]} 
                                icon={<FolderIcon />}
                                classes={{
                                    root: classes.actionItem,
                                    selected: classes.selected
                                }}
                                value={"http://" + HOST + data[1]}
                            />)
                    })}
                </BottomNavigation>
                {this.state.datapointsIsLoaded &&
                    this.renderTable(this.buttonType, this.state.datapointsData)
                }
            </div>
        );

    }
};

export default withStyles(tablesClasses)(Tables);