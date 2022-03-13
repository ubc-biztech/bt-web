import React from "react";
import { COLORS } from "../../constants/_constants/theme";

import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(() => ({
  textField: {
    "& label.Mui-focused": {
      color: COLORS.TEXTFIELD,
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: COLORS.TEXTFIELD,
      borderRadius: "4px",
      "& fieldset": {
        borderColor: COLORS.TEXTFIELD,
      },
      "&:hover fieldset": {
        borderColor: COLORS.TEXTFIELD,
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.TEXTFIELD,
      },
    },
    "& .MuiOutlinedInput-multiline": {
      padding: '5px",',
    },
  },
  mobileTextField: {
    borderRadius: "4px",
    "& .MuiInputBase-root": {
      backgroundColor: COLORS.TEXTFIELD,
    },
    "& .MuiFilledInput-multiline": {
      padding: "35px 0",
    },
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.TEXTFIELD} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: COLORS.CARD_PAPER_COLOR,
      borderRadius: "0px",
    },
  },
  mobileInput: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.TEXTFIELD} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: `${COLORS.TEXTFIELD} !important`,
      borderRadius: "0px",
    },
  },
}));

export default function CustomTextField(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    errors,
    touched,
    handleChange,
    setFieldTouched,
    groupName,
    label,
    autoComplete,
    multiline,
    rows,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  function createTextField(renderMobileOnly, label) {
    return (
      <TextField
        margin="none"
        className={
          renderMobileOnly ? classes.mobileTextField : classes.textField
        }
        autoComplete={autoComplete}
        helperText={touched[groupName] ? errors[groupName] : ""}
        error={touched[groupName] && Boolean(errors[groupName])}
        id={groupName}
        onChange={change.bind(null, groupName)}
        fullWidth
        variant={"outlined"}
        size="small"
        multiline={multiline}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          classes: classes,
          inputProps: {
            classes: renderMobileOnly ? classes.mobileInput : classes.input,
          },
        }}
        rows={rows}
        padding="7px"
      />
    );
  }

  return (
    <React.Fragment>
      <Typography>{label}</Typography>
      {createTextField(renderMobileOnly, label)}
    </React.Fragment>
  );
}
