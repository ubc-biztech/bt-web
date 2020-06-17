import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const fontFamily = [
    'Gilroy',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
].join(',')

const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontFamily,
                fontSize: '.7rem',
            }
        },
        MuiCard: {
            root: {
                background: 'rgb(174, 196, 244, 0.19)',
                color: '#FFFFFF'
            }
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily,
        fontSize: 12,
        h1: {
            fontWeight: 700,
            fontSize: '1.5rem',
            fontFamily,
        },
        h2: {
            fontSize: '1.3rem',
            fontFamily,
        },
        h5: {
            fontSize: '1.2rem',
            fontFamily,
        },

    },
    shape: {
        borderRadius: 10
    },
    palette: {
        background: {
            default: "#070F21"
        }
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