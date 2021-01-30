import React from "react";
import Grid from "@material-ui/core/Grid";
import { COLORS } from "../../../../constants/_constants/theme";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { IconButton } from "@material-ui/core";
import IndividualBox from "./IndividualBox";

const CheckBoxGrid = (props) => {
  return (
    <Grid item spacing={0} xs={12} container>
      <Grid item xs={1}>
        <IconButton disabled={true}>
          {props.filter == props.condition ? (
            <CheckBoxIcon
              style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }}
            />
          ) : (
            <CheckBoxOutlineBlankIcon
              style={{ color: "C4C4C4", width: 25, height: 25 }}
            />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={11}>
        <IndividualBox label={props.label} />
      </Grid>
    </Grid>
  );
};

export default CheckBoxGrid;
