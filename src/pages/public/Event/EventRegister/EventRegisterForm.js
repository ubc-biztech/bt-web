import React from "react";
import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

import { COLORS } from "../../../../constants/_constants/theme";
import CustomTextField from "../../../../components/inputs/CustomTextField";
import CustomSelect from "../../../../components/inputs/CustomSelect";
import CustomLink from "components/links/CustomLink";
// import { CLIENT_URL } from "constants/index";
const HOPIN_URL = `https://hopin.com/events/ubc-biztech-blueprint-conference-2021-22/registration`;

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

// const MEMBERSHIP_FORM_URL = `${CLIENT_URL}signup`;

export default function RegisterEventForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    handleSubmit,
    isSubmitting /* isUBCStudent  setIsUBCStuden t */,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
        {/* <Grid item xs={12}>
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
        </Grid> */}

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Email Address *"
            groupName="email"
            autoComplete="email"
          />
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

        {/* {isUBCStudent && (
          <Grid item xs={12}>
            <CustomTextField
              {...props}
              label="Student Number *"
              groupName="id"
              autoComplete="id"
            />
          </Grid>
        )} */}

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="Year Level *"
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
          <CustomTextField
            {...props}
            label="Major/Specialization *"
            groupName="major"
          />
        </Grid>

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="Are you currently a Biztech member? *"
            listOfOptions={["Yes", "No"]}
            groupName="biztechMemberStatus"
          />
        </Grid>

        {/* <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="Preferred Pronouns *"
            listOfOptions={[
              "He/Him/His",
              "She/Her/Hers",
              "They/Them/Their",
              "Prefer not to say",
            ]}
            groupName="gender"
          />
        </Grid> */}

        {/* <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="Dietary Restrictions *"
            listOfOptions={[
              "Vegetarian",
              "Vegan",
              "Kosher",
              "Halal",
              "Gluten-free",
              "None",
              "Other",
            ]}
            groupName="diet"
          />
        </Grid> */}

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label={
              <>
                {`To attend Blueprint & pick your workshop preferences, you MUST be registered on Hopin. Have you registered on Hopin? `}
                <CustomLink href={HOPIN_URL}>{HOPIN_URL}</CustomLink>
                {". *"}
              </>
            }
            listOfOptions={[
              "Yes, I've already registered on Hopin!",
              "No, but I'll do that right now!",
            ]}
            groupName="hopinStatus"
          />
        </Grid>

        <Grid item xs={renderMobileOnly ? 12 : 8}>
          <CustomSelect
            {...props}
            label="How did you hear about this event? *"
            listOfOptions={[
              "Biztech Boothing",
              "Facebook",
              "Instagram",
              "LinkedIn",
              "Friends/Word of Mouth",
              "BizTech Newsletter",
              "Other",
            ]}
            groupName="heardFrom"
          />
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
