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
        {createButtons(options)}
        {otherOption ? createOtherOption() : ""}
      </RadioGroup>
    </React.Fragment>
  )


  function createButtons(options) {
    return options.map((option) =>
      <FormControlLabel value={option} control={<Radio />} label={option} />
    );
  }

  function createOtherOption() {
    let optionId = "otherOption" + groupName
    return (
      <React.Fragment>
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
        <TextField
          // required
          id={optionId}
          name={optionId}
          onChange={change.bind(null, optionId)}
          helperText={touched.optionId ? errors.optionId : ""}
          error={touched.optionId && Boolean(errors.optionId)}
          value={otherOptionValue}
          disabled={otherDisabled}
        />
      </React.Fragment>
    )
  }

  function handleRadioChange(e, group) {
    e.preventDefault()
    let valueName = group;
    let value = e.target.value;

    setFieldValue(valueName, value);

    const buttonSelected = e.target.value;
    if (buttonSelected === "Other") {
      disableOther(false)
    }
    else {
      disableOther(true)
    }
  }


}