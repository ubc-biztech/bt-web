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

export default function EventEditTextFields(props) {
  const classes = useStyles();
  const [isRequired, setIsRequired] = useState(false);
  const [currTextField, setCurrTextField] = useState("");

  const {
    initialValues,
    setInitialValues
  } = props;

  const handleTextField = (e) => {
    e.persist();
    setCurrTextField(e.target.value);
  };

  function TextFieldsDisplay({textFields, isRequiredField}) {
    return (
      textFields.map((textField, index) => (
          <TableRow key={textField + index}>
              <TableCell style={{color: "white", maxWidth: "0"}}>
                <div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  {textField}
                </div>
              </TableCell>
              <TableCell style={{color: "white"}} align="right">
                {isRequiredField ? "Yes" : "No"}
              </TableCell>
              <TableCell>
                <DeleteIcon className={classes.deleteIcon} onClick={() => {
                  const removedObj = textFields.filter(obj => obj !== textField);
                  setInitialValues({
                    ...props.initialValues,
                    [isRequiredField ? "requiredTextFields" : "unrequiredTextFields"]: removedObj
                  });
                }}/>
              </TableCell>
          </TableRow>
      ))
    )
  }

  const handleAddTextField = () => {
    if (isRequired) {
      initialValues.requiredTextFields.push(currTextField);
    } else {
      initialValues.unrequiredTextFields.push(currTextField);
    }
    setInitialValues({
      ...props.initialValues,
    })
    setCurrTextField("");
    setIsRequired(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomTextField
            {...props}
            label="Add a Text Field"
            groupName="currTextField"
            value={currTextField}
            handleEvent={(event) => handleTextField(event)} />
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
      <Button variant="contained" onClick={() => {handleAddTextField()}}>Add Field</Button>

      <Table className={classes.table} overflow="hidden">
          <TableHead>
              <TableRow>
                  <TableCell style={{color: "white"}}>Text Field</TableCell>
                  <TableCell style={{color: "white"}} align="right">Is Required</TableCell>
                  <TableCell />
              </TableRow>
          </TableHead>

          <TableBody>
              <TextFieldsDisplay textFields={initialValues.requiredTextFields} isRequiredField={true} />
              <TextFieldsDisplay textFields={initialValues.unrequiredTextFields} isRequiredField={false} />
          </TableBody>
      </Table>
    </>
  );
}
