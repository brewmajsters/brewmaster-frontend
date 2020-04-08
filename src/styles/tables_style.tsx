import React = require("react");
import { blue } from "@material-ui/core/colors";


export default function getClasses(){
    return ({
          actionItem: {
            color: "blue",
            "&$selected": {
              color: "red"
            }
          },
          selected: {}
    });
}