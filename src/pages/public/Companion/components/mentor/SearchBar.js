import React, {
  useRef
} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  InputAdornment,
  TextField
} from "@material-ui/core";
import {
  Autocomplete
} from "@material-ui/lab";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  constantStyles
} from "../../../../../constants/_constants/companion";

const useStyles = makeStyles({
  textfield: {
    flexGrow: "1",
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
  searchIcon: {
    cursor: "pointer",
    flex: "none",
  },
  autocomplete: {
    width: "100%",
    flexGrow: "1"
  }
});

function SearchBar ({
  setSearchQuery, searchQuery, options
}) {
  const classes = useStyles();
  const searchRef = useRef(null);

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

  return (
    <>
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}>
        <Autocomplete
          id="search-bar"
          options={options}
          freeSolo
          size="small"
          onKeyDown={(e) => handleEnterKeyPress(e, e.target.value)}
          className={classes.autocomplete}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.textfield}
              variant="outlined"
              placeholder="Filter by skills..."
              color="primary"
              fullWidth
              inputRef={searchRef}
              InputProps={{
                ...params.InputProps,
                style: {
                  color: constantStyles.textColor,
                },
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    <InputAdornment position="end">
                      <SearchIcon
                        style={{
                          color: constantStyles.textColor,
                        }}
                        onClick={handleSearchClick}
                        className={classes.searchIcon}
                      />
                    </InputAdornment>
                  </>
                ),
              }}
              InputLabelProps={{
                shrink: false,
              }}
            />
          )}
        />
      </div>
    </>
  );
};

export default SearchBar;
