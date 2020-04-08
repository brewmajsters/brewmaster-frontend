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

const headers = {'datapoints' : ["id", "module_device_type_id", "name", "units", "code","legend","writable"],
                 'protocols' : ["id","datatype_id","name"],
                 'devices' : ["id","module_id","uuid","address","poll_rate"],
                 'devicetypes' : ["id","protocol_id","manufacturer","model","code"],
                 'datatypes' : ["id","name"],
                 'modules' : ["id","module_device_type_id","mac"]}

/* Neviem naco je toto ked je vsetko v const headers
const headersDatapoints = ["id", "module_device_type_id","name", "units","code","legend","writable"]
const headersProtocols = ["id","datatype_id","name"]
const headersDevices = ["id","module_id","uuid","address","poll_rate"]
const headersDevicetypes = ["id","name"]
const headersModules = ["id","module_device_type_id","mac"]
*/
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
    "id": string,
    "module_device_type_id": string,
    "name":string,
    "units": string,
    "code": string,
    "legend": string,
    "writable": boolean
}

export function tableDatapoints(data: DatapointsData[]){
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

interface ProtocolsData {
    "id": string,
    "datatype_id": string,
    "name":string,
}

export function tableProtocols(data: ProtocolsData[]){
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

interface DevicesData {
    "id": string,
    "module_id": string,
    "uuid":string,
    "address": string,
    "poll_rate": string
}

export function tableDevices(data: DevicesData[]){
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

interface DevicetypesData {
    "id": string,
    "protocol_id": string,
    "manufacturer":string,
    "model": string,
    "code": string
}

export function tableDevicetypes(data: DevicetypesData[]){
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

interface DatatypesData {
    "id": string,
    "name":string,
}

export function tableDatatypes(data: DatatypesData[]){
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

interface ModulesData {
    "id": string,
    "module_device_type_id": string,
    "mac":string,
}

export function tableModules(data: ModulesData[]){
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

export class Tables extends React.Component<{classes},{datapointsData: any, datapointsIsLoaded: boolean}> {
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
                    console.log(error)
                    console.log("Unable to get data")
                })
        );
    }

    // todo: tuto mozes robit svoje tabulky, state moze mat iba
    render() {
        const { classes } = this.props;
        return (
            <div>
                <BottomNavigation
                    //value={value}
                    onChange={(event, newValue) => {
                        this.buttonType = newValue.split('/')[6];
                        this.setState({
                            datapointsIsLoaded: false
                        })
                        this.generateTable(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction
                        key="1" label="Datapoints"  icon={<FolderIcon />}
                        classes={{
                            root: classes.actionItem,
                            selected: classes.selected
                          }}
                        value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/datapoints'
                        />
                    <BottomNavigationAction key="2" label="Protocol"  icon={<FolderIcon />}
                        classes={{
                            root: classes.actionItem,
                            selected: classes.selected
                          }}
                          value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/protocols'
                          />
                    <BottomNavigationAction key="3" label="Device" icon={<FolderIcon />}
                        classes={{
                            root: classes.actionItem,
                            selected: classes.selected
                        }}
                        value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devices'
                    />
                    <BottomNavigationAction key="5" label="Device Type" icon={<FolderIcon />}
                        classes={{
                            root: classes.actionItem,
                            selected: classes.selected
                        }}
                    value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/devicetypes'
                    />
                    <BottomNavigationAction key="5" label="Data Type" icon={<FolderIcon />}
                        classes={{
                            root: classes.actionItem,
                            selected: classes.selected
                        }}
                        value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/datatypes'
                    />
                    <BottomNavigationAction key="4" label="Modules" icon={<FolderIcon />}
                        classes={{
                            root: classes.actionItem,
                            selected: classes.selected
                        }}
                        value='https://virtserver.swaggerhub.com/Brewmaster/Brewmaster/1.0.0/modules'
                    />
                </BottomNavigation>
                {this.state.datapointsIsLoaded && this.buttonType == 'datapoints' &&
                    <Table>
                        <TableHead>
                            {tableHeaders(headers[this.buttonType])}   
                        </TableHead>
                        {tableDatapoints(this.state.datapointsData)}
                    </Table>
                }
                {this.state.datapointsIsLoaded && this.buttonType == 'protocols' &&
                    <Table>
                        <TableHead>
                            {tableHeaders(headers[this.buttonType])}   
                        </TableHead>
                        {tableProtocols(this.state.datapointsData)}
                    </Table>
                }
                {this.state.datapointsIsLoaded && this.buttonType == 'devices' &&
                    <Table>
                        <TableHead>
                            {tableHeaders(headers[this.buttonType])}   
                        </TableHead>
                        {tableDevices(this.state.datapointsData)}
                    </Table>
                }
                {this.state.datapointsIsLoaded && this.buttonType == 'devicetypes' &&
                    <Table>
                        <TableHead>
                            {tableHeaders(headers[this.buttonType])}   
                        </TableHead>
                        {tableDevicetypes(this.state.datapointsData)}
                    </Table>
                }
                {this.state.datapointsIsLoaded && this.buttonType == 'datatypes' &&
                    <Table>
                        <TableHead>
                            {tableHeaders(headers[this.buttonType])}   
                        </TableHead>
                        {tableDatatypes(this.state.datapointsData)}
                    </Table>
                }
                {this.state.datapointsIsLoaded && this.buttonType == 'modules' &&
                    <Table>
                        <TableHead>
                            {tableHeaders(headers[this.buttonType])}   
                        </TableHead>
                        {tableModules(this.state.datapointsData)}
                    </Table>
                }
            </div>
        );

    }
};

export default withStyles(tablesClasses)(Tables);