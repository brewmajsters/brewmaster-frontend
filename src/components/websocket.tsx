import React = require('react'); 
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { render } from 'react-dom';


const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;


export default class WebSocket extends React.Component <{onData: any, moduleId: any, deviceId: any, datapointCode: any},{}> {

    onData: any;
    moduleId: any;

    constructor(props){
        super(props);
        this.onData = props.onData;
        this.moduleId = props.moduleId;


        let socket = socketIOClient(HOST+"/web_socket");
        socket.on(this.moduleId, data => {
//          console.log(this.id, data.values[this.id].value)
            console.log(data.values);
            if (data.values.hasOwnProperty(this.props.deviceId) && data.values[this.props.deviceId].hasOwnProperty(this.props.datapointCode)){

                this.onData(data.values[this.props.deviceId][this.props.datapointCode]);
            }
        });

    }

    render(){
      return (
        <div></div>
      );
    }
}

