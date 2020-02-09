import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '"Proxima Nova"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        fontSize: 14,
        h1: {
            fontWeight: 700,
            fontSize: '1.3rem',
        },
        h2: {
            fontSize: '1.3rem',
        },
        h5: {
            fontSize: '1.3rem',
        },
    },
    shape: {
        borderRadius: 10
    },
    shadows: [
        "none",
        "0px 2px 10px rgba(34, 34, 34, 0.12)",
        "0px 4px 10px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
        "0px 8px 12px rgba(34, 34, 34, 0.12)",
    ]
});

function OverridesCss(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}

export default OverridesCss;