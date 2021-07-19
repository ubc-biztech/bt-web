import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import {
  useMediaQuery,
  FormControlLabel,
  FormControl,
  FormGroup,
  RadioGroup,
  FormLabel,
  Radio,
} from "@material-ui/core";

import { COLORS } from "../../../constants/_constants/theme";
import CustomTextField from "../../../components/inputs/CustomTextField";
import CustomSelect from "../../../components/inputs/CustomSelect";
import { MEMBER_TYPES, MEMBER_LABELS } from "constants/_constants/memberTypes";

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
  multiSelect: {
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

export default function MemberCreateForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));
  const [memberType, setMemberType] = useState(MEMBER_TYPES.UBC);

  const { handleSubmit, isSubmitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>
              Please select the option that's most relevant to you
            </FormLabel>
            <RadioGroup onChange={(e) => setMemberType(e.target.value)}>
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
            label="First Name *"
            groupName="first_name"
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

        <Grid item xs={renderMobileOnly ? 12 : 8}>
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
            <Grid item xs={12}>
              <CustomTextField
                {...props}
                label="Major *"
                groupName="major"
                autoComplete="major"
              />
            </Grid>
          )}
          {memberType === MEMBER_TYPES.UBC && (
            <Grid item xs={12} className={classes.multiSelect}>
              <FormControl>
                <FormLabel>Are you an international student?</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <CustomSelect
              {...props}
              label="How did you hear about us?"
              listOfOptions={[
                "Facebook",
                "Instagram",
                "LinkedIn",
                "Boothing",
                "Friends",
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
      </Grid>
      <br />
      <Button
        className={classes.registerButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        <CardMembershipIcon
          style={{ color: COLORS.BACKGROUND_COLOR, marginRight: "5px" }}
        />
        sign me up!
      </Button>
    </form>
  );
}
