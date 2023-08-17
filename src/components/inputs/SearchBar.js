import React, {
  useState, useRef
} from "react";
import SearchIcon from "@material-ui/icons/Search";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  TextField
} from "@material-ui/core";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  useTheme
} from "@material-ui/styles";
import {
  COLORS
} from "constants/index";

const useStyles = makeStyles({
  textfield: {
    border: "solid white 2px",
    borderRadius: "10px",
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR,
      borderRadius: "10px",
      "& fieldset": {
        borderColor: COLORS.LIGHT_BACKGROUND_COLOR
      },
      "&:hover fieldset": {
        borderColor: COLORS.LIGHT_BACKGROUND_COLOR
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.LIGHT_BACKGROUND_COLOR
      }
    },
  },
  searchIcon: {
    cursor: "pointer"
  }
});

function SearchBar ({
  setSearchQuery, searchQuery
}) {
  const classes = useStyles();
  const theme = useTheme();
  const searchRef = useRef(null);
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      e.preventDefault();
      setSearchQuery([...searchQuery, e.target.value]);
      e.target.value = "";
    }
  };

  const handleSearchClick = (e) => {
    if (searchRef.current.value !== "") {
      e.preventDefault();
      setSearchQuery([...searchQuery, searchRef.current.value]);
      searchRef.current.value = "";
    }
  };

  const handleQueryChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  return (
    <>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1%"
      }}>
        <TextField
          id="search-bar"
          className={classes.textfield}
          onKeyDown={handleEnterKeyPress}
          style={{
            backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR,
            color: "black"
          }}
          variant="outlined"
          placeholder="Enter a skill..."
          size="small"
          inputRef={searchRef}
          InputLabelProps={{
            shrink: false,
          }}
        />
        <div style={{
          transform: "translateX(-50px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <SearchIcon onClick={handleSearchClick} className={classes.searchIcon}/>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
