import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

// LIVE PREVIEW QUESTION component
const QuestionPreview = (props) => {
  const useStyles = makeStyles((theme) => ({
    textfield: {
      background: "#1F2A47",
      borderRadius: 10,
    },
    select: {
      background: "#1F2A47",
      borderRadius: 10,
    },
  }));
  const classes = useStyles();

  const { type, label, choices, required } = props;

  const choicesArr = choices ? choices.split(",") : [];

  // types: CHECKBOX, SELECT, TEXT
  if (type === "CHECKBOX") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          <FormGroup>
            {choicesArr.map((item) => {
              return (
                <FormControlLabel
                  key={item}
                  control={<Checkbox color="primary" />}
                  label={item}
                />
              );
            })}
          </FormGroup>
        </div>
      )
    );
  } else if (type === "SELECT") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          <Select
            className={classes.select}
            labelId="q-type"
            variant="outlined"
            margin="dense"
          >
            {choicesArr.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      )
    );
  } else if (type === "TEXT") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          <TextField
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </div>
      )
    );
  } else {
    // Could just default to text but just in case
    return <div>Invalid question type</div>;
  }
};

export default QuestionPreview;
