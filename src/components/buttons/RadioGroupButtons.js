import React, {
  useState
} from "react";
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";

export default function RadioGroupButtons(props) {
  const [otherDisabled, disableOther] = useState(true);

  const {
    values,
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
      <FormLabel error={submitCount > 0 && Boolean(errors[groupName])}>
        {displayName}
      </FormLabel>
      {submitCount > 0 ? (
        <FormHelperText error={true}>{errors[groupName]}</FormHelperText>
      ) : (
        ""
      )}
      <RadioGroup
        onChange={(e) => {
          handleRadioChange(e, groupName);
        }}
      >
        {createButtons()}
        {otherOption ? createOtherOption() : ""}
      </RadioGroup>
    </React.Fragment>
  );

  function createButtons() {
    return options.map((option) => (
      <FormControlLabel
        key={option}
        value={option}
        control={<Radio />}
        label={option}
      />
    ));
  }

  function createOtherOption() {
    return (
      <React.Fragment>
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
        {otherDisabled ? (
          ""
        ) : (
          <TextField
            id={groupName}
            onChange={change.bind(null, groupName)}
            helperText={
              submitCount > 0 && values[groupName] === "Other"
                ? "Field cannot be blank"
                : ""
            }
            error={submitCount > 0 && Boolean(errors[groupName])}
          />
        )}
      </React.Fragment>
    );
  }

  function handleRadioChange(e, group) {
    e.preventDefault();
    const valueName = group;
    const value = e.target.value;

    setFieldValue(valueName, value);
    if (value === "Other") {
      disableOther(false);
    } else {
      disableOther(true);
    }
  }
}
