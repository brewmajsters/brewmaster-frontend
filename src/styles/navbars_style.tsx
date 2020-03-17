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
                marginTop: 50,
                width: 300,
                padding: 10,
                zIndex: 1,
            },
            content: {
                flexGrow: '1',
            }
            //toolbar: theme.mixins.toolbar,
        });
} 