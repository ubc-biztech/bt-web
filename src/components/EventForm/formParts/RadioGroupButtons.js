import React, { useState } from "react"
import { TextField } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioGroupButtons(props) {
  const [otherDisabled, disableOther] = useState(true)
  const radioGroupLabelFontSize = '17px'

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

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <React.Fragment>
      <FormLabel style={{ fontSize: radioGroupLabelFontSize }}>{displayName}</FormLabel>
      <RadioGroup onChange={(e) => { handleRadioChange(e, groupName) }}>
        {createButtons()}
        {otherOption ? createOtherOption() : ""}
      </RadioGroup>
    </React.Fragment>
  )


  function createButtons() {
    return options.map((option) =>
      <FormControlLabel value={option} control={<Radio />} label={option} />
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

    setFieldValue(valueName, value);
    if (value === "Other") {
      disableOther(false)
    }
    else {
      disableOther(true)
    }
  }

}