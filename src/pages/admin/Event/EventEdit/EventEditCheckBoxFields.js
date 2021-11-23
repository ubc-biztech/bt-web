import React, { useState } from "react";

import {
  Button,
  Grid,
  Checkbox,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomTextField from "components/inputs/CustomTextField";

const useStyles = makeStyles(() => ({
  table: {
    width: "550px"
  },
  deleteIcon: {
    cursor: "pointer"
  }
}));

export default function EventEditCheckBoxFields(props) {
  const classes = useStyles();
  const [isRequired, setIsRequired] = useState(false);
  const [currCheckBoxField, setCurrCheckBoxField] = useState("");

  const {
    initialValues,
    setInitialValues
  } = props;

  const handleCheckBoxField = (e) => {
    e.persist();
    setCurrCheckBoxField(e.target.value);
  };

  const handleAddCheckBoxField = () => {
    if (isRequired) {
      initialValues.requiredCheckBoxFields.push(currCheckBoxField);
    } else {
      initialValues.unrequiredCheckBoxFields.push(currCheckBoxField);
    }

    setInitialValues({
      ...props.initialValues,
    })
    setCurrCheckBoxField("");
    setIsRequired(false);
  };

  function CheckBoxFieldsDisplay({checkBoxFields, isRequiredField}) {
    return (
      checkBoxFields.map((checkBoxField, index) => (
          <TableRow key={checkBoxField + index}>
              <TableCell style={{color: "white", maxWidth: "0"}}>
                <div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  {checkBoxField}
                </div>
              </TableCell>
              <TableCell style={{color: "white"}} align="right">
                {isRequiredField ? "Yes" : "No"}
              </TableCell>
              <TableCell>
                <DeleteIcon className={classes.deleteIcon} onClick={() => {
                  const removedObj = checkBoxFields.filter(obj => obj !== checkBoxField);
                  setInitialValues({
                    ...initialValues,
                    [isRequiredField ? "requiredCheckBoxFields" : "unrequiredCheckBoxFields"]: removedObj
                  });
                }}/>
              </TableCell>
          </TableRow>
      ))
    )
  }

  return (
    <>
      <Typography>Note: required checkboxes are boxes that MUST be checked for the form to be submitted</Typography>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomTextField
            {...props}
            label="Add a CheckBox Field"
            groupName="currCheckBoxField"
            value={currCheckBoxField}
            handleEvent={(event) => handleCheckBoxField(event)} />
        </Grid>

        <Grid item xs={6}>
            <Typography>Field required?</Typography>
            <Checkbox
              checked={isRequired}
              onChange={() => setIsRequired(!isRequired)}
              color="primary" />
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={() => {handleAddCheckBoxField()}}>Add Field</Button>

      <Table className={classes.table} overflow="hidden">
          <TableHead>
              <TableRow>
                  <TableCell style={{color: "white"}}>Select Field</TableCell>
                  <TableCell style={{color: "white"}} align="right">Is Required</TableCell>
                  <TableCell />
              </TableRow>
          </TableHead>

          <TableBody>
              <CheckBoxFieldsDisplay checkBoxFields={initialValues.requiredCheckBoxFields} isRequiredField={true} />
              <CheckBoxFieldsDisplay checkBoxFields={initialValues.unrequiredCheckBoxFields} isRequiredField={false} />
          </TableBody>
      </Table>
    </>
  );
}
