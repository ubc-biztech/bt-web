import React from "react";
import { Button, Grid, Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,
  FormGroup,
  FormLabel,
  Checkbox,
  Radio,
} from "@material-ui/core";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import { makeStyles } from "@material-ui/core/styles";


import { COLORS } from "constants/_constants/theme";
import CustomTextField from "components/inputs/CustomTextField";
import CustomSelect from "components/inputs/CustomSelect";
import { MEMBER_TYPES, MEMBER_LABELS } from "constants/_constants/memberTypes";

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

export default function MembershipForm(props) {
  const classes = useStyles();

  const { isSubmitting, handleSubmit, memberType, setMemberType, topics, setTopics, errors } = props;

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
            <RadioGroup value={memberType} onChange={(e) => {
              setMemberType(e.target.value)
            }}>
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
            readOnly={true}
            label="Email Address *"
            groupName="email"
            autoComplete="email"
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
              readOnly={true}
              label="Student Number *"
              groupName="student_number"
              autoComplete="student_number"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <CustomSelect
            {...props}
            label="Preferred Pronouns"
            listOfOptions={[
              "He/Him/His",
              "She/Her/Hers",
              "They/Them/Their",
              "Other/Prefer not to say",
            ]}
            groupName="pronouns"
          />
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
            label="Any dietary restrictions?"
            listOfOptions={["None", "Vegetarian", "Vegan", "Gluten Free", "Pescetarian", "Kosher", "Halal"]}
            groupName="diet"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomSelect
            {...props}
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
                setTopics(topics.replace(`${e.target.value},`, ""))
              } else {
                setTopics(topics + `${e.target.value},`)
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
        Proceed to Payment
      </Button>
    </form>
  );
}
