import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import RadioGroupButtons from "components/buttons/RadioGroupButtons";
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'
import { COLORS } from "../../../constants/_constants/theme";
import CustomTextField from "../../../components/inputs/CustomTextField";
import CustomSelect from "../../../components/inputs/CustomSelect";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: "5px",
  },
  submitButton: {
    textTransform: "none",
  },
  submitIcon: {
    color: COLORS.FONT_COLOR,
    marginRight: "5px",
  }
}));

export default function MemberCreateForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    initialValues,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    submitCount,
    dirty,
    isSubmitting,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const textFieldError = (id) => {
    return (errors[id] && submitCount > 0) || (touched[id] ? errors[id] : "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
     
      <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "I am a current/prospective UBC student",
              "I am a current/prospective university student",
              "I am a high school student",
              "None of the above"
            ]}
            groupName={"faculty"}
            displayName={"Please choose the option that's most relevant to you *"}
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
            label="Student Number *"
            groupName="id"
            autoComplete="id"
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            {...props}
            defaultValue={initialValues.inviteCode}
            label="Membership Code"
            groupName="inviteCode"
            autoComplete="inviteCode"
          />
        </Grid>
        

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "Arts",
              "Commerce",
              "Science",
              "Engineering",
              "Kinesiology",
              "Land and Food Systems",
              "Forestry",
            ]}
            groupName={"faculty"}
            displayName={"Faculty*"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={false}
            options={[
              "1st Year",
              "2nd Year",
              "3rd Year",
              "4th Year",
              "5+ Year",
            ]}
            groupName={"year"}
            displayName={"Level of study*"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={["None", "Vegetarian", "Vegan", "Gluten Free"]}
            groupName={"diet"}
            displayName={"Dietary restrictions*"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "He/Him/His",
              "She/Her/Hers",
              "They/Them/Their",
              "Prefer not to say",
            ]}
            groupName={"gender"}
            displayName={"Preferred Pronouns"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "Facebook",
              "Boothing",
              "Friends",
              "BizTech Newsletter",
              "Faculty Newsletter"
            ]}
            groupName={"heardFrom"}
            displayName={"How did you hear about UBC BizTech?"}
          />
        </Grid>
      </Grid>
      <br></br>
      <Button
      className={classes.registerButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!dirty || isSubmitting}
        style={{ color: COLORS.BACKGROUND_COLOR, marginRight: "5px"}}
      >
        Submit
      </Button>
    </form>
  );
}
