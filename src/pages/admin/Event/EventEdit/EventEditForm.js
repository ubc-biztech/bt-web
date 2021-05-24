import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import slugify from "slugify";

import CustomTextField from "../../../../components/inputs/CustomTextField";
import {
  Grid
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

export default function EventEditForm(props) {
  const {
    values: {
      ename,
      description,
      capacity,
      facebookUrl,
      imageUrl,
      elocation,
    },
    initialValues,
    setInitialValues,
    setFieldTouched,
    isEditing,
  } = props;

  const handleDateChange = (field, date) => {
    const tempValues = {
      ...initialValues,
      [field]: date
    }
    setInitialValues(tempValues);
  };

  const handleEventNameChange = (name, e) => {
    e.persist();
    const newSlug = slugify(e.target.value, { lower: true });
    setFieldTouched(name, true, false);
    const tempValues = {
      ...initialValues,
      [name]: e.target.value,
      ...!isEditing && {"slug": newSlug}
    };
    setInitialValues(tempValues);
  };

  const handleFieldChange = (name, e) => {
    e.persist();
    setFieldTouched(name, true, false);
    const tempValues = {
      ...initialValues,
      [name]: e.target.value,
    };
    setInitialValues(tempValues);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Event Name"
            groupName="ename"
            defaultValue={ename}
            handleEvent={(event) => handleEventNameChange("ename", event)} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label={`Slug ${isEditing ? "(Not editable)" : ""}`}
            groupName="slug"
            disabled={isEditing}
            value={props.initialValues.slug}
            handleEvent={(event) => handleFieldChange("slug", event)} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Description"
            groupName="description"
            multiline={true}
            defaultValue={description}
            handleEvent={(event) => handleFieldChange("description", event)} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Capacity"
            groupName="capacity"
            defaultValue={capacity}
            type="number"
            min="0"
            handleEvent={(event) => handleFieldChange("capacity", event)} />
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12} sm={6}>
            <KeyboardDateTimePicker
              margin="normal"
              label="Start Date"
              value={initialValues.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDateTimePicker
              margin="normal"
              label="End Date"
              minDate={initialValues.startDate}
              value={initialValues.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Location"
            groupName="elocation"
            defaultValue={elocation}
            handleEvent={(event) => handleFieldChange("elocation", event)} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Facebook Event Page"
            groupName="facebookUrl"
            defaultValue={facebookUrl}
            handleEvent={(event) => handleFieldChange("facebookUrl", event)} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Image URL"
            groupName="imageUrl"
            defaultValue={imageUrl}
            handleEvent={(event) => handleFieldChange("imageUrl", event)} />
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
}
