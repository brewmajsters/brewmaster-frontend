import React = require('react'); 
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { render } from 'react-dom';


const HOST = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;


export default class WebSocket extends React.Component <{onData: any,id: any, moduleId: any},{}> {

    onData: any;
    id: any;
    moduleId: any;

    constructor(props){
        super(props);
        this.onData = props.onData;
        this.id = props.id;
        this.moduleId = props.moduleId;

        let socket = socketIOClient(HOST+"/web_socket");
        socket.on(this.moduleId, data => {
//          console.log(this.id, data.values[this.id].value)
          this.onData(data.values[this.id].value);  
        })
    }

    render(){
      return (
        <div></div>
      );
    }
}

