import React from 'react'
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'
import {
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup
} from '@material-ui/core'

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
  lumaContainer: {
    width: '100%'
  }
}));

export default function RegisterEventForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    handleSubmit,
    isSubmitting,
    isUBCStudent,
    setIsUBCStudent,
    isRegisteredOnLuma,
    setIsRegisteredOnLuma
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={12}>
          <FormControl>
            <FormGroup>
              <FormControlLabel
              label="UBC Student"
              control={
                <Checkbox
                  checked={isUBCStudent}
                  onChange={() => setIsUBCStudent(!isUBCStudent)}
                  color='primary'
                />
              } />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
            <FormControl>
              <FormGroup>
                <div style={{display: 'flex'}}>
                  <FormControlLabel
                  label="In order to receive the Zoom link for this event, you must sign up here: "
                  control={
                    <Checkbox
                      checked={isRegisteredOnLuma}
                      onChange={() => setIsRegisteredOnLuma(!isRegisteredOnLuma)}
                      color='primary'
                    />
                  } />
                  <a href={'https://lu.ma/fintech'} target="_blank" rel="noopener noreferrer" style={{margin: 'auto'}}><Typography>lu.ma/fintech</Typography></a>
                </div>

              </FormGroup>
            </FormControl>
          </Grid>

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

        <Grid item xs={renderMobileOnly ? 12 : 8}>
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
              label="In order to fully register for this event, you first need to be a member of UBC Trading Group. Membership is FREE. Please fill out the following member registration form before continuing: https://forms.gle/Zu4bXZDxiYd2331z7 *"
              listOfOptions={['I\'m already a member', 'I have yet to fill out the member registration form and will do so here: https://forms.gle/Zu4bXZDxiYd2331z7']}
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
