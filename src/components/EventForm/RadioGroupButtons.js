import React, { useState } from "react"
import { TextField } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioGroupButtons(props) {
  const [otherDisabled, disableOther] = useState(true)

  const {
    errors,
    handleChange,
    setFieldValue,
    setFieldTouched,
    submitCount,
    groupName,
    displayName,
    options,
    otherOption
  } = props;
  
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <React.Fragment>
      <FormLabel error={submitCount > 0 && Boolean(errors[groupName])}>{displayName}</FormLabel>
      {submitCount > 0 ? <FormHelperText error={true}>{errors[groupName]}</FormHelperText> : ""}
      <RadioGroup onChange={(e) => { handleRadioChange(e, groupName) }}>
        {createButtons()}
        {otherOption ? createOtherOption() : ""}
      </RadioGroup>
    </React.Fragment>
  )


  function createButtons() {
    return options.map((option) =>
      <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
    );
  }

  function createOtherOption() {
    return (
      <React.Fragment>
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
        <TextField
          id={groupName}
          onChange={change.bind(null, groupName)}
          helperText={otherOption ? "Field cannot be blank" : ""}
          error={otherOption && Boolean(errors[groupName])}
          disabled={otherDisabled}
        />
      </React.Fragment>
    )
  }

  function handleRadioChange(e, group) {
    e.preventDefault()
    const valueName = group;
    const value = e.target.value;

    setFieldTouched(valueName, true, false);
    setFieldValue(valueName, value);
    if (value === "Other") {
      disableOther(false)
    }
    else {
      disableOther(true)
    }
  }

}