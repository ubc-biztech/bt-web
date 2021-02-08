import React, { createContext, useState } from "react";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { COLORS } from "constants/index";

export const fontFamily = [
  "Gilroy",
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
].join(",");

const darkTheme = createMuiTheme({
  overrides: {
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: "transparent",
        color: COLORS.WHITE,
      },
  },
    MuiTooltip: {
      tooltip: {
        fontFamily,
        fontSize: ".7rem",
      },
    },
    MuiCard: {
      root: {
        background: COLORS.LIGHT_BACKGROUND_COLOR,
        color: COLORS.WHITE,
      },
    },
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: "reset",
        },
      },
    },
    MuiInput: {
      root: {
        color: COLORS.WHITE,
      },
      input: {
        borderColor: COLORS.FONT_COLOR,
      },
    },
    MuiFormLabel: {
      root: {
        color: COLORS.FONT_COLOR,
      },
    },
    MuiInputLabel: {
      filled: {
        backgroundColor: COLORS.CARD_PAPER_COLOR,
      },
    },
    MuiSvgIcon: {
      root: {
        color: COLORS.WHITE,
      },
    },
    MuiFilledInput: {
      underline: {
        borderBottom: `1px solid ${COLORS.FONT_COLOR}`,
      },
    },
    MuiIcon: {
      root: {
        color: COLORS.WHITE,
      },
    },
    MuiSelect: {
      root: {
        color: COLORS.WHITE,
      },
    },
    MuiInputBase: {
      root: {
        color: COLORS.WHITE,
      },
    },
    MuiTypography: {
      root: {
        color: COLORS.WHITE,
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: COLORS.BIZTECH_GREEN,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR,
        color: COLORS.WHITE,
      },
    },
    MuiCardHeader: {
      subheader: {
        color: COLORS.FONT_COLOR,
      },
    },
    MuiLinearProgress: {
      root: {
        height: "8px",
        borderRadius: "4px",
      },
      colorPrimary: {
        backgroundColor: "#627295",
      },
      barColorPrimary: {
        backgroundColor: COLORS.BIZTECH_GREEN,
      },
    },
    MuiChip: {
      colorPrimary: {
        color: COLORS.WHITE,
        backgroundColor: COLORS.BIZTECH_GREEN,
      },
      colorSecondary: {
        color: COLORS.BLACK,
        backgroundColor: COLORS.WHITE,
      },
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily,
    fontSize: 14,
    h1: {
      fontWeight: 700,
      fontSize: "36px",
      fontFamily,
    },
    h2: {
      fontWeight: 700,
      fontSize: "28px",
      fontFamily,
    },
    h5: {
      fontSize: "1.2rem",
      fontFamily,
    },
  },
  shape: {
    borderRadius: 10,
  },
  palette: {
    primary: {
      main: COLORS.BIZTECH_GREEN,
    },
    background: {
      default: COLORS.BACKGROUND_COLOR,
    },
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
  ],
});

// context allows us to change "darkMode" state from anywhere in the app
// to do this, import and use "ThemeConsumer" like so:
// <ThemeConsumer>
//  {({ darkMode, setDarkMode }) => (
//    <button onClick={() => setDarkMode(!darkMode)} />
//  )}
// </ThemeConsumer

const ThemeContext = createContext({
  darkMode: true,
  setDarkMode: () => {},
});

// Provider is used to initialize at the root of the app
function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(true);

  const value = {
    darkMode,
    setDarkMode,
  };
  return (
    <MuiThemeProvider theme={darkTheme}>
      <ThemeContext.Provider value={value}>
        {/* Extra div wrapper for any scss overwrites we might use */}
        <div className={darkMode ? "DarkMode" : ""}>{props.children}</div>
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

const ThemeConsumer = ThemeContext.Consumer;

export { ThemeProvider, ThemeConsumer };
