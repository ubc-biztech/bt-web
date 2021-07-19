import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import MemberCreateForm from "./MemberCreateForm";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { COLORS } from "../../../constants/_constants/theme";
import { MEMBER_TYPES } from "../../../constants/_constants/memberTypes";

import { setUser } from "store/user/userActions";
import { fetchBackend } from "utils";

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: 850,
      margin: "auto",
    },
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3),
    },
  },
  content: {
    padding: theme.spacing(3),
  },
}));

const MemberCreateFormContainer = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [memberType, setMemberType] = useState(MEMBER_TYPES.UBC);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    year: Yup.string().required("Level of study is required"),
  });

  const UBCValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    student_id: Yup.number("Valid Student ID required")
      .min(9999999, "Valid Student ID required")
      .max(100000000, "Valid Student ID required")
      .required(),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    faculty: Yup.string().required("Faculty is required"),
    year: Yup.string().required("Level of study is required"),
    isInternational: Yup.string().required(
      "International or domestic student indication is required"
    ),
  });

  const UniversityValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    university: Yup.string().required("University name is required"),
    faculty: Yup.string().required("Faculty is required"),
    year: Yup.string().required("Level of study is required"),
    major: Yup.string().required("Major is required"),
  });

  const HighSchoolValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    year: Yup.string().required("Level of study is required"),
    high_school: Yup.string().required("High School is required"),
  });

  const { user } = props;
  const initialValues = {
    email: (user && user.email) || "",
    fname: (user && user.fname) || "",
    lname: (user && user.lname) || "",
  };

  const submitValues = async (values) => {
    console.log(values);
    const {
      education,
      email,
      first_name,
      last_name,
      pronouns,
      student_number,
      faculty,
      year,
      major,
      prev_member,
      is_international,
      topics,
      heard_from,
      university,
      high_school,
      admin,
    } = values;

    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    const body = {
      education,
      email,
      first_name,
      last_name,
      pronouns,
      student_number,
      faculty,
      year,
      major,
      prev_member,
      is_international,
      topics,
      heard_from,
      university,
      high_school,
      admin,
    };
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    await Auth.updateUserAttributes(authUser, {
      "custom:student_number": student_number,
    });

    fetchBackend("/users", "POST", body)
      .then(async () => {
        const admin =
          email.substring(email.indexOf("@") + 1, email.length) ===
          "ubcbiztech.com";

        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        await Auth.updateUserAttributes(authUser, {
          "custom:student_number": student_number,
        });

        props.setUser({
          education,
          email,
          first_name,
          last_name,
          pronouns,
          student_number,
          faculty,
          year,
          major,
          prev_member,
          is_international,
          topics,
          heard_from,
          university,
          high_school,
          admin,
        });
        alert("Thanks for signing up!");
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 409) {
          alert(
            "A user with the given student ID already exists! Double check that your student ID is correct, or ensure that you are using the same account you signed up with the first time. If you are still having trouble registering, contact one of our devs."
          );
        } else if (err.status === 404) {
          sessionStorage.removeItem("inviteCode");
          alert("Membership code is invalid");
        }
      });
  };

  return (
    <div className={classes.layout}>
      <Helmet>
        <title>BizTech Member Sign Up</title>
      </Helmet>
      <Fragment>
        <div className={classes.registrationHeader}>
          <Typography className={classes.registrationText}>Sign Up</Typography>
          <Typography>
            To avoid having to provide your information every time you sign up
            for an event, please fill out the form below. The given information
            will allow UBC BizTech to better our future events and cater content
            towards our members needs.
          </Typography>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={
            memberType === MEMBER_TYPES.UBC
              ? UBCValidationSchema
              : memberType === MEMBER_TYPES.UNIVERSITY
              ? UniversityValidationSchema
              : memberType === MEMBER_TYPES.HIGH_SCHOOL
              ? HighSchoolValidationSchema
              : validationSchema
          }
          onSubmit={submitValues}
        >
          {(props) => {
            props = {
              ...props,
              memberType,
              setMemberType,
            };
            return <MemberCreateForm {...props} />;
          }}
        </Formik>
      </Fragment>
    </div>
  );
};

export default MemberCreateFormContainer;
