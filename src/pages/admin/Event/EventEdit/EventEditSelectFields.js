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

export default function EventEditSelectFields(props) {
  const classes = useStyles();
  const [isRequired, setIsRequired] = useState(false);
  const [currSelectField, setCurrSelectField] = useState("");
  const [options, setOptions] = useState("");

  const {
    initialValues,
    setInitialValues
  } = props;

  const handleSelectField = (e) => {
    e.persist();
    setCurrSelectField(e.target.value);
  };

  const handleOptionsField = (e) => {
      e.persist();
      setOptions(e.target.value);
  }

  const handleAddSelectField = () => {
    const selectOptions = options.split(/,\s*/);
    initialValues.selectFields.push({
      value: currSelectField,
      options: selectOptions,
      isRequired
    });
    setInitialValues({
      ...props.initialValues,
    })
    setCurrSelectField("");
    setOptions("");
    setIsRequired(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <CustomTextField
            {...props}
            label="Add a Select Field"
            groupName="currSelectField"
            value={currSelectField}
            handleEvent={(event) => handleSelectField(event)} />
        </Grid>

        <Grid item xs={5}>
            <CustomTextField
                {...props}
                label="Options (comma separated)"
                groupName="options"
                value={options}
                handleEvent={(event) => handleOptionsField(event)} />
        </Grid>

        <Grid item xs={3}>
            <Typography>Field required?</Typography>
            <Checkbox
              checked={isRequired}
              onChange={() => setIsRequired(!isRequired)}
              color="primary" />
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={() => {handleAddSelectField()}}>Add Field</Button>

      <Table className={classes.table} overflow="hidden">
          <TableHead>
              <TableRow>
                  <TableCell style={{color: "white"}}>Select Field</TableCell>
                  <TableCell style={{color: "white"}}>Options Field</TableCell>
                  <TableCell style={{color: "white"}} align="right">Is Required</TableCell>
                  <TableCell />
              </TableRow>
          </TableHead>

          <TableBody>
              {initialValues.selectFields.map((selectField, index) => (
                  <TableRow key={selectField.value + index}>
                      <TableCell style={{color: "white", maxWidth: "0"}}>
                        <div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                          {selectField["value"]}
                        </div>
                      </TableCell>
                      <TableCell style={{color: "white", maxWidth: "0"}}>
                        <div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                          {selectField["options"].map((option) => <p>{option}</p>)}
                        </div>
                      </TableCell>
                      <TableCell style={{color: "white"}} align="right">
                        {selectField["isRequired"] ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon className={classes.deleteIcon} onClick={() => {
                          const removedObj = initialValues.selectFields.filter(obj => obj !== selectField);
                          setInitialValues({
                            ...initialValues,
                            selectFields: removedObj
                          });
                        }}/>
                      </TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
    </React.Fragment>
  );
}
