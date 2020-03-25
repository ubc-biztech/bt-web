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
    values: { otherOptionValue },
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldTouched,
    groupName,
    displayName,
    options,
    otherOption
  } = props;
  console.log(errors)

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <React.Fragment>
      <FormLabel error={Boolean(errors[groupName])}>{displayName}</FormLabel>
      <FormHelperText error={true}>{errors[groupName]}</FormHelperText>
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
          // required
          id={groupName}
          onChange={change.bind(null, groupName)}
          helperText={touched.groupName ? errors.groupName : ""}
          error={touched.groupName && Boolean(errors.groupName)}
          value={otherOptionValue}
          disabled={otherDisabled}
        />
      </React.Fragment>
    )
  }

  function handleRadioChange(e, group) {
    e.preventDefault()
    const valueName = group;
    const value = e.target.value;

    setFieldTouched(valueName, true);
    setFieldValue(valueName, value);
    if (value === "Other") {
      disableOther(false)
    }
    else {
      disableOther(true)
    }
  }

}