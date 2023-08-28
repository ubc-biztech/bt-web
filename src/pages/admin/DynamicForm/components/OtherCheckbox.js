import React, {
  useEffect,
  useState
} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import {
  makeStyles
} from "@material-ui/core/styles";

const OtherCheckbox = ({
  onChange, otherData, index
}) => {
  const useStyles = makeStyles((theme) => ({
    otherContainer: {
      display: "flex",
      alignItems: "center",
    },
    otherCheckbox: {
      marginRight: 0
    }
  }));
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  useEffect(() => {
    if (checked && otherValue) {
      otherData[index] = otherValue;
    } else if (!checked && otherValue) {
      delete otherData[index];
      setOtherValue("");
    }
  }, [otherValue, checked]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    onChange(event);
  };

  const handleInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  return (
    <>
      <div className={classes.otherContainer}>
        <FormControlLabel
          className={checked ? classes.otherCheckbox : ""}
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label={checked ? "" : "Other"}
        />
        {checked && (
          <TextField
            placeholder='Specify'
            value={otherValue}
            onChange={handleInputChange}
          />
        )}
      </div>
      <p style={{
        color: "#FFFFFF",
        opacity: "0.7",
        margin: 0
      }}>To add multiple options, separate by comma, no spaces (Opion 1,Option 2)</p>
    </>
  );
};

export default OtherCheckbox;

