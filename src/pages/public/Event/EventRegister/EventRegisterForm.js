import React from "react";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  Box,
} from "@material-ui/core";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

import { COLORS } from "../../../../constants/_constants/theme";
import CustomTextField from "../../../../components/inputs/CustomTextField";
import CustomSelect from "../../../../components/inputs/CustomSelect";
import CustomLink from "../../../../components/links/CustomLink";
import { CLIENT_URL } from "constants/index";

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
    width: "100%",
  },
  hopinDisclaimer: {
    color: COLORS.WHITE,
  },
}));

const HOPIN_REGISTRATION_URL = "https://hopin.com/events/mis-night-2021";
const HOPIN_URL = "http://hopin.to";

const MEMBERSHIP_FORM_URL = `${CLIENT_URL}signup`;

export default function RegisterEventForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const { handleSubmit, isSubmitting, isUBCStudent, setIsUBCStudent } = props;

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
                    color="primary"
                  />
                }
              />
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

        {isUBCStudent && (
          <Grid item xs={12}>
            <CustomTextField
              {...props}
              label="Student Number *"
              groupName="id"
              autoComplete="id"
            />
          </Grid>
        )}

        <Grid item xs={renderMobileOnly ? 12 : 8}>
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
              "Other",
              "Not Applicable",
            ]}
            groupName="faculty"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField {...props} label="Major" groupName="major" />
        </Grid>

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="Level of study *"
            listOfOptions={[
              "1st Year",
              "2nd Year",
              "3rd Year",
              "4th Year",
              "5+ Year",
              "Other",
              "Not Applicable",
            ]}
            groupName="year"
          />
        </Grid>

        <Grid item xs={renderMobileOnly ? 12 : 8}>
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

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="How did you hear about this event?"
            listOfOptions={[
              "Facebook",
              "Instagram",
              "LinkedIn",
              "Friends",
              "BizTech Newsletter",
              "Other",
            ]}
            groupName="heardFrom"
          />
        </Grid>

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label={
              <>
                {`In order to attend this event, you need to create an account and
                register on our event platform, Hopin.to. Please register using
                the following link before proceeding: `}

                <CustomLink href={HOPIN_REGISTRATION_URL}>
                  {HOPIN_REGISTRATION_URL}
                </CustomLink>

                {`. Additionally, you may edit your Hopin.to profile to include
                your LinkedIn URL to connect with others during our event. *`}
              </>
            }
            listOfOptions={[
              "I have registered on Hopin.to and received a confirmation email from Hopin.to",
              "I have not registered on Hopin.to due to technical difficulties and will contact BizTech immediately",
            ]}
            groupName="hopinStatus"
          />
          <HopinDisclaimer />
        </Grid>

        {/* <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label={
              <>
                {`Sign up to be a BizTech member! Membership is NOT mandatory for this event, 
                but we highly encourage you to sign up now to be on our mailing list! Use this link to sign up: `}
                <CustomLink href={MEMBERSHIP_FORM_URL}>
                  {MEMBERSHIP_FORM_URL}
                </CustomLink>
                {". *"}
              </>
            }
            listOfOptions={[
              "I am a UBC Biztech member",
              "I have yet to sign up to be a UBC BizTech member, and will do so",
              "I'm opting out of membership for now",
            ]}
            groupName="biztechMemberStatus"
          />
        </Grid> */}

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Do you have any potential roundtable discussion topics you would like to see at the event? (Optional)"
            groupName="topicSuggestions"
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Do you have any questions for the professionals and/or MIS Faculty? (Optional)"
            groupName="questions"
            multiline
            rows={3}
          />
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

const HopinDisclaimer = () => {
  const classes = useStyles();
  return (
    <>
      <Box mt={1}>
        <Typography variant="body2">
          **Disclaimer for <CustomLink href={HOPIN_URL}>Hopin.to</CustomLink>**
        </Typography>
        <Typography variant="body2">
          {"By registering for this event on "}
          <CustomLink href={HOPIN_URL}>Hopin.to</CustomLink>
          {`, you acknowledge
          that your data may be stored by Hopin Limited, a virtual event
          platform incorporated in the United Kingdom for the following:`}
        </Typography>
        <ul className={classes.hopinDisclaimer}>
          <li>
            Your data on Hopin will be governed within the European Economic
            Area
          </li>
          <li>
            Hopin staff will have limited access to your data should it only be
            necessary
          </li>
          <li>You may request to delete your account after the event</li>
          <li>Hopin servers are located in Ireland and the US</li>
        </ul>
      </Box>
    </>
  );
};
