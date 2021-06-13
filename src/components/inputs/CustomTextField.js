import React from "react";
import { COLORS } from "../../constants/_constants/theme";

import { Typography, TextField, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  },
  mobileTextField: {
    padding: "10px",
    backgroundColor: COLORS.CARD_PAPER_COLOR,
    borderRadius: "4px",
    "& .MuiInputBase-root": {
      backgroundColor: COLORS.CARD_PAPER_COLOR,
    },
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.TEXTFIELD} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: COLORS.TEXTFIELD,
      borderRadius: "0px",
    },
  },
  mobileInput: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.CARD_PAPER_COLOR} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: `${COLORS.CARD_PAPER_COLOR} !important`,
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
    handleEvent,
    disabled,
    value,
    type,
    min,
    multiline,
    defaultValue
  } = props;

  const change = (name, e) => {
    e.persist();
    if (handleChange) {
      handleChange(e);
    }
    if (setFieldTouched) {
      setFieldTouched(name, true, false);
    }
  };

  function createTextField(className, variant, inputProps, label) {
    return (
      defaultValue ? (
        <TextField
          label={label}
          margin="none"
          className={className}
          helperText={touched[groupName] ? errors[groupName] : ""}
          error={touched[groupName] && Boolean(errors[groupName])}
          id={groupName}
          onChange={handleEvent ? handleEvent : change.bind(null, groupName)}
          disabled={disabled ? disabled : false}
          fullWidth
          variant={variant}
          type={type}
          min={min}
          defaultValue={defaultValue}
          multiline={multiline}
          inputProps={inputProps}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ) : (
        <TextField
          label={label}
          margin="none"
          className={className}
          helperText={touched && errors && touched[groupName] ? errors[groupName] : ""}
          error={touched && errors && touched[groupName] && Boolean(errors[groupName])}
          id={groupName}
          onChange={handleEvent ? handleEvent : change.bind(null, groupName)}
          disabled={disabled ? disabled : false}
          fullWidth
          variant={variant}
          value={value}
          type={type}
          min={min}
          multiline={multiline}
          inputProps={inputProps}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )
    );
  }

  return (
    <div>
      {!renderMobileOnly && <Typography>{label}</Typography>}
      {renderMobileOnly
        ? createTextField(
            classes.mobileTextField,
            "filled",
            {
              style: {
                padding: "7px",
                backgroundColor: COLORS.CARD_PAPER_COLOR,
                marginTop: "10px",
              },
              className: classes.mobileInput,
            },
            label
          )
        : createTextField(classes.textField, "outlined", {
            style: {
              padding: "7px",
            },
            className: classes.input,
          })}
    </div>
  );
}
