import React from "react";
import {
  Button, Grid, Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@material-ui/core";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import {
  makeStyles
} from "@material-ui/core/styles";


import {
  COLORS
} from "constants/_constants/theme";
import CustomTextField from "components/inputs/CustomTextField";
import CustomSelect from "components/inputs/CustomSelect";
import {
  MEMBER_TYPES, MEMBER_LABELS
} from "constants/_constants/memberTypes";

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: "50px",
  },
  gridContainer: {
    marginTop: "5px",
  },
  registerButton: {
    textTransform: "none",
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BACKGROUND_COLOR,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE,
    },
  },
  registerIcon: {
    color: "inherit",
    marginRight: "5px",
  },
  topics: {
    marginTop: "10px",
    paddingLeft: "10px",
    marginBottom: "10px",
  },
  paymentCheck: {
    paddingBottom: "10px",
  },
}));

export default function UserMembershipForm(props) {
  const classes = useStyles();

  const {
    isSubmitting, handleSubmit, memberType, setMemberType, topics, setTopics, values, errors
  } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>
              <Typography color={errors.education ? "error" : "primary"}>
                Please select the option that's most relevant to you *
              </Typography>
            </FormLabel>
            <RadioGroup value={memberType} onChange={(e) => setMemberType(e.target.value)}>
              <FormControlLabel
                value={MEMBER_TYPES.UBC}
                control={<Radio />}
                label={MEMBER_LABELS.UBC}
              />
              <FormControlLabel
                value={MEMBER_TYPES.UNIVERSITY}
                control={<Radio />}
                label={MEMBER_LABELS.UNIVERSITY}
              />
              <FormControlLabel
                value={MEMBER_TYPES.HIGH_SCHOOL}
                control={<Radio />}
                label={MEMBER_LABELS.HIGH_SCHOOL}
              />
              <FormControlLabel
                value={MEMBER_TYPES.OTHER}
                control={<Radio />}
                label={MEMBER_LABELS.OTHER}
              />
            </RadioGroup>
            {errors.education && (
              <Typography variant="caption" color={"error"}>
                {errors.education}
              </Typography>
            )}
          </FormControl>
        </Grid>

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
            label="Password *"
            groupName="password"
            autoComplete="password"
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Confirm Password *"
            groupName="confirmPassword"
            autoComplete="confirmPassword"
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="First Name *"
            groupName="first_name"
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            label="Last Name *"
            groupName="last_name"
            autoComplete="family-name"
          />
        </Grid>

        {memberType === MEMBER_TYPES.UBC && (
          <Grid item xs={12}>
            <CustomTextField
              {...props}
              label="Student Number *"
              groupName="student_number"
              autoComplete="student_number"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Preferred Pronouns</FormLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox name="He/Him/His" />} label="He/Him/His" />
              <FormControlLabel control={<Checkbox name="She/Her/Hers" />} label="She/Her/Hers" />
              <FormControlLabel control={<Checkbox name="They/Them/Theirs" />} label="They/Them/Theirs" />
              <FormControlLabel control={<Checkbox name="Other/Prefer not to say" />} label="Other/Prefer not to say" />
            </FormGroup>
          </FormControl>
        </Grid>

        {memberType === MEMBER_TYPES.UNIVERSITY && (
          <Grid item xs={12}>
            <CustomTextField
              {...props}
              label="Which university do you currently attend? *"
              groupName="university"
              autoComplete="university"
            />
          </Grid>
        )}

        {memberType === MEMBER_TYPES.HIGH_SCHOOL && (
          <Grid item xs={12}>
            <CustomTextField
              {...props}
              label="Which high school do you currently attend? *"
              groupName="high_school"
              autoComplete="high_school"
            />
          </Grid>
        )}

        {(memberType === MEMBER_TYPES.UBC ||
          memberType === MEMBER_TYPES.UNIVERSITY) && (
          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Level of study *"
              initialValues=""
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
        )}

        {memberType === MEMBER_TYPES.HIGH_SCHOOL && (
          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Level of study *"
              initialValues=""
              listOfOptions={[
                "Grade 9",
                "Grade 10",
                "Grade 11",
                "Grade 12",
                "Pre-university",
                "Other",
              ]}
              groupName="year"
            />
          </Grid>
        )}

        {(memberType === MEMBER_TYPES.UBC ||
          memberType === MEMBER_TYPES.UNIVERSITY) && (
          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="Faculty *"
              initialValues=""
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
        )}

        {(memberType === MEMBER_TYPES.UBC ||
          memberType === MEMBER_TYPES.UNIVERSITY) && (
          <Grid item xs={12} className={classes.major}>
            <CustomTextField
              {...props}
              label="Major *"
              groupName="major"
              autoComplete="major"
            />
          </Grid>
        )}

        {memberType === MEMBER_TYPES.UBC && (
          <Grid item xs={12}>
            <CustomSelect
              initialValues=""
              {...props}
              label="Are you an international student? *"
              listOfOptions={["Yes", "No"]}
              groupName="international"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <CustomSelect
            {...props}
            initialValues=""
            label="Any dietary restrictions?"
            listOfOptions={["None", "Vegetarian", "Vegan", "Gluten Free", "Pescetarian", "Kosher", "Halal"]}
            groupName="diet"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomSelect
            {...props}
            initialValues=""
            label="Were you a BizTech member last year? *"
            listOfOptions={["Yes", "No"]}
            groupName="prev_member"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel>
              <Typography>
                What topics do you want to see discussed in future events?
              </Typography>
            </FormLabel>
            <FormGroup onChange={(e) => {
              if (topics.includes(e.target.value)) {
                setTopics(topics.replace(`${e.target.value},`, ""));
              } else {
                setTopics(topics + `${e.target.value},`);
              }
            }}>
              <FormControlLabel
                control={<Checkbox name="Cyber Security" />}
                label="Cyber Security"
                value="Cyber Security"
              />
              <FormControlLabel control={<Checkbox name="AI" />} label="AI" value="AI" />
              <FormControlLabel
                control={<Checkbox name="Tech Startups" />}
                label="Tech Startups"
                value="Tech Startups"
              />
              <FormControlLabel
                control={<Checkbox name="eCommerce" />}
                label="eCommerce"
                value="eCommerce"
              />
              <FormControlLabel
                control={<Checkbox name="Health Tech" />}
                label="Health Tech"
                value="Health Tech"
              />
              <FormControlLabel
                control={<Checkbox name="Careers in the Tech Industry" />}
                label="Careers in the Tech Industry"
                value="Careers in the Tech Industry"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <CustomSelect
            {...props}
            initialValues=""
            label="How did you hear about us?"
            listOfOptions={[
              "Facebook",
              "Instagram",
              "LinkedIn",
              "Boothing",
              "Friends/Word of Mouth",
              "BizTech Newsletter",
              "Faculty Newsletter",
              "Posters",
              "Events",
              "Other",
            ]}
            groupName="heard_from"
          />
        </Grid>

        {(values.heard_from === "Events" || values.heard_from === "Boothing" || values.heard_from === "Other") && (
          <Grid item xs={12}>
            <CustomTextField
              {...props}
              label="Please provide some more details of how you heard of BizTech (e.g. which event, boothing day, etc..) *"
              groupName="heardFromSpecify"
              autoComplete="heardFromSpecify"
            />
          </Grid>
        )}
      </Grid>
      <br />
      {/* {memberType === MEMBER_TYPES.UBC && (
        <FormControlLabel
          control={<Checkbox />}
          groupName="payment_check"
          className={classes.paymentCheck}
          label="I have e-transferred $5.00 to rita@ubcbiztech.com *"
        />
      )}
      <br />
      {memberType !== MEMBER_TYPES.UBC && (
        <FormControlLabel
          control={<Checkbox />}
          groupName="payment_check"
          className={classes.paymentCheck}
          label="I have e-transferred $7.50 to rita@ubcbiztech.com *"
        />
      )} */}
      <br />
      <Button
        className={classes.registerButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        <CardMembershipIcon className={classes.registerIcon} />
        Proceed To Payment
      </Button>
    </form>
  );
}
