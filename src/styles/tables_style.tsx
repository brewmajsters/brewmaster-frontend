import React = require("react");
import { blue } from "@material-ui/core/colors";


export default function getClasses(){
    return ({
        itWorks:{
         color: 'red'
        },
        test : {
            padding:50
        }
        //sem mozes pridavat svoje custom CSS/JSS pre tabulky vo formate JSON 
    });
}