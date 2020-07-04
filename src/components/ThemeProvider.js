import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { COLOR } from '../constants/Constants'

const fontFamily = [
  'Gilroy',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif'
].join(',')

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontFamily,
        fontSize: '.7rem'
      }
    },
    MuiCard: {
      root: {
        background: COLOR.LIGHT_BACKGROUND_COLOR,
        color: COLOR.WHITE
      }
    },
    MuiInput: {
      root: {
        color: COLOR.WHITE
      }
    },
    MuiFormLabel: {
      root: {
        color: COLOR.FONT_COLOR
      }
    },
    MuiSvgIcon: {
      root: {
        color: COLOR.WHITE
      }
    },
    MuiIcon: {
      root: {
        color: COLOR.WHITE
      }
    },
    MuiSelect: {
      root: {
        color: COLOR.WHITE
      }
    },
    MuiInputBase: {
      root: {
        color: COLOR.WHITE
      }
    },
    MuiTypography: {
      root: {
        color: COLOR.WHITE
      }
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: COLOR.LIGHT_BACKGROUND_COLOR,
        color: COLOR.WHITE
      },
      containedSecondary: {
        backgroundColor: "#303960",
        color: COLOR.WHITE
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: COLOR.CARD_PAPER_COLOR,
        color: COLOR.WHITE
      }
    },
    MuiCardHeader: {
      subheader: {
        color: COLOR.FONT_COLOR
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
      fontFamily
    },
    h2: {
      fontSize: '36px',
      fontFamily
    },
    h5: {
      fontSize: '1.2rem',
      fontFamily
    }

  },
  shape: {
    borderRadius: 10
  },
  palette: {
    background: {
      default: COLOR.BACKGROUND_COLOR
    }
  },
  shadows: [
    'none',
    '0px 2px 10px rgba(34, 34, 34, 0.12)',
    '0px 4px 10px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)',
    '0px 8px 12px rgba(34, 34, 34, 0.12)'
  ]
})

function OverridesCss (props) {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default OverridesCss
