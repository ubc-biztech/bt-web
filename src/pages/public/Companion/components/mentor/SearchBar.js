import React, {
  useRef,
  useState,
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
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();
  const searchRef = useRef(null);

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13 && inputValue) {
      e.preventDefault();
      setSearchQuery([...searchQuery, inputValue]);
      setInputValue("");
    }
  };

  const handleSearchClick = (e) => {
    if (inputValue !== "") {
      e.preventDefault();
      setSearchQuery([...searchQuery, inputValue]);
      setInputValue("");
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
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          className={classes.autocomplete}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.textfield}
              variant="outlined"
              placeholder="Filter by company..."
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
