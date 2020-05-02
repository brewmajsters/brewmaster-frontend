import React = require('react'); 
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { render } from 'react-dom';


const ENDPOINT = "http://127.0.0.1:5000/web_socket";


export default class WebSocket extends React.Component <{onData: any},{}> {

    onData: any;

    constructor(props){
        super(props);
        this.onData = props.onData
    }

    componentDidMount(){
        let socket = socketIOClient(ENDPOINT);
        socket.on("C9:65:6E:EA:B0:8B", data => {
        console.log(data);
        console.log(data['values']['4fb9edf8-aa3c-4a04-8afe-6d601309999d']['value']);
        this.onData(data['values']['4fb9edf8-aa3c-4a04-8afe-6d601309999d']['value']);
        });
      
    }

    render(){
      return (
        <p>
          It's
        </p>
      );
    }
}

