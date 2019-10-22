import React = require('react');
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import orange from "@material-ui/core/colors/orange";



const data = {
    labels: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00'],
    datasets: [
        {
            label: 'Teplota - Vrchný senzor',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Teplota - Spodný senzor',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(192,75,75,0.4)',
            borderColor: 'rgba(192,75,75,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(192,75,75,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(192,75,75,1)',
            pointHoverBorderColor: 'rgba(192,75,75,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [63, 59, 83, 75, 57, 54, 40]
        },
        {
            label: 'Želaná teplota',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(255, 196, 0,0.4)',
            borderColor: 'rgba(255, 196, 0,1)',
            borderCapStyle: 'butt',
            borderDash: ["."],
            borderDashOffset: 3,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 196, 0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 196, 0,1)',
            pointHoverBorderColor: 'rgba(255, 196, 0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [63, 59, 83, 75, 57, 54, 40]
        }

    ]
};

const useStyles = makeStyles(theme => ({
alert: {
    boxShadow: '0px 0px 0px 4px rgba(255, 193, 7,1)',
}
}));

export default function Dashboard(){
// @ts-ignore
const classes = useStyles();
    return (
            <div>
                <Grid container spacing={10}>
                    <Grid item xs={1}/>

                    <Grid item xs={5}>
                        <Card>
                            <CardContent>
                                <Typography variant={"h5"}>Teplota</Typography>
                            </CardContent>
                        <Line data={data} />
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Card>
                            <CardContent>
                                <Typography variant={"h5"}>Hustota</Typography>
                            </CardContent>
                            <Line data={data} />
                        </Card>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <Card className={classes.alert}>
                            <CardContent>
                                <Typography variant={"h5"}>Tlak</Typography>
                            </CardContent>
                            <Line data={data} />
                        </Card>
                    </Grid>

                </Grid>
            </div>
        );

};