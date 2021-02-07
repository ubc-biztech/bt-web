import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { COLORS } from "../../../../constants/_constants/theme";
import CustomTextField from "../../../../components/inputs/CustomTextField";
import CustomSelect from "../../../../components/inputs/CustomSelect";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "5px",
  },
  registerButton: {
    textTransform: "none",
  },
  registerIcon: {
    color: COLORS.FONT_COLOR,
    marginRight: "5px",
  },
}));

export default function RegisterEventForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    handleSubmit,
    isSubmitting,
    isUBCStudent
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="First Name *"
            groupName="fname"
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Last Name *"
            groupName="lname"
            autoComplete="family-name"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Email Address *"
            groupName="email"
            autoComplete="email"
          />
        </Grid>

        {isUBCStudent && <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Student Number *"
            groupName="id"
            autoComplete="id"
          />
        </Grid>}

        <Grid item xs={renderMobileOnly ? 12 : 4}>
          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Faculty *"
              listOfOptions={[
                "Arts",
                "Commerce",
                "Science",
                "Engineering",
                "Kinesiology",
                "Land and Food Systems",
                "Forestry",
              ]}
              groupName="faculty"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Level of study *"
              listOfOptions={[
                "1st Year",
                "2nd Year",
                "3rd Year",
                "4th Year",
                "5+ Year",
              ]}
              groupName="year"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Preferred Pronouns"
              listOfOptions={[
                "He/Him/His",
                "She/Her/Hers",
                "They/Them/Their",
                "Prefer not to say",
              ]}
              groupName="gender"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="How did you hear about this event?"
              listOfOptions={[
                "Facebook",
                "Boothing",
                "Friends",
                "BizTech Newsletter",
                "Faculty Newsletter",
                "Other",
              ]}
              groupName="heardFrom"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Do you want to opt in for UBC Trading Group Membership?"
              listOfOptions={['Yes', 'No']}
              groupName='optTradingGroup'/>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Button
        className={classes.registerButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        <EventAvailableIcon
          style={{ color: COLORS.BACKGROUND_COLOR, marginRight: "5px" }}
        />
        register
      </Button>
    </form>
  );
}
