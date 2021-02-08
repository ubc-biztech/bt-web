import React from "react";
import Grid from "@material-ui/core/Grid";
import { COLORS } from "../../../../constants/_constants/theme";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { IconButton } from "@material-ui/core";
import IndividualBox from "./IndividualBox";

const IndividualGrid = (props) => {
  return (
    <Grid item spacing={0} xs={12} container>
      <Grid item xs={1}>
        <IconButton disabled={true}>
          {props.filter === props.condition ? (
            <RadioButtonCheckedIcon
              style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }}
            />
          ) : (
              <RadioButtonUncheckedIcon
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

export default IndividualGrid;
