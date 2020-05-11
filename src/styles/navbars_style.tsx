import React = require('react');

export default function getClasses() {
    return (
        {
            root: {
                display: 'flex',
            },
            appBar: {
                zIndex: 1,
            },
            drawer: {
                flexShrink: 0,
                position: 'relative' as 'relative',
                zIndex: 0,
                marginTop: '50px',
                width: '300px',
                padding: 10,
            },
            drawerPaper: {
                marginTop: 25,
            },
            content: {
                flexGrow: '1',
            },
            gridList: {
                width: '170px',
                marginTop: '50px',
                marginLeft: '20px',
                textAlign: 'center' as 'center',
                align: 'center' as 'center'
            },
            leftBarTile: {
                width: '170px',

            }
            //toolbar: theme.mixins.toolbar,
        });
} 