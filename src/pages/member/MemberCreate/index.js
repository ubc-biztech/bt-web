import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Formik } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

import MemberCreateForm from "./MemberCreateForm";
import { COLORS } from "../../../constants/_constants/theme";

import { setUser } from "store/user/userActions";
import { fetchBackend } from "utils";

import * as biztechBanner from "../../../assets/biztechbanner.png";

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
  registrationHeader: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: "35px",
    paddingLeft: "19px",
    marginLeft: "11px",
  },
  registrationText: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  banner: {
    maxWidth: "100%",
    borderRadius: "5px",
    // height: "234px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "234px",
    },
    paddingBottom: "20px"
  }
}))

const MemberCreate = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number("Valid Student ID required")
      .min(9999999, "Valid Student ID required")
      .max(100000000, "Valid Student ID required")
      .required(),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    faculty: Yup.string().required("Faculty is required"),
    userYear: Yup.string().required("Level of study is required"),
    diet: Yup.string().required("Dietary restriction is required"),
  });

  // form initial values (if exist). If email exists will disable email field
  const { user } = props;
  const initialInviteCode = sessionStorage.getItem("inviteCode");
  const initialValues = {
    email: (user && user.email) || "",
    fname: (user && user.fname) || "",
    lname: (user && user.lname) || "",
    inviteCode: initialInviteCode || "",
  };

  const submitValues = async (values) => {
    console.log(values);
    const {
      email,
      fname,
      lname,
      id,
      inviteCode,
      faculty,
      year,
      diet,
      heardFrom,
      gender,
    } = values;

    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    const body = {
      email,
      fname,
      lname,
      id,
      inviteCode,
      faculty,
      year,
      diet,
      heardFrom,
      gender,
    };
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    await Auth.updateUserAttributes(authUser, { "custom:student_id": id });

    fetchBackend("/users", "POST", body)
      .then(async () => {
        const admin =
          email.substring(email.indexOf("@") + 1, email.length) ===
          "ubcbiztech.com";

        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        await Auth.updateUserAttributes(authUser, { "custom:student_id": id });

        props.setUser({
          email,
          fname,
          lname,
          id,
          inviteCode,
          faculty,
          year,
          diet,
          heardFrom,
          gender,
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
        <title>UBC BizTech Membership</title>
      </Helmet>
      <React.Fragment>
      {/* <div style={{ position: "relative" }}>
        <img
          src={biztechWordmark}
          className={classes.banner}
          alt="Event"
        />
        </div> */}
    </React.Fragment>
    <Typography variant="h4" align="left" gutterBottom>
      UBC BizTech Membership
        </Typography>
      <Fragment>
            <div>
                {/* <Typography className={classes.registrationText}>UBC BizTech Membership</Typography> */}
              <Typography>We need to know a little bit about you to get started.</Typography>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={submitValues}
            >
              {(props) => {
                  props = {...props}
                  return <MemberCreateForm {...props} />
                }
              }
            </Formik>
          </Fragment>
      {/* <Paper className={classes.paper}>
        <div className={classes.content}>
          <Typography variant="h4" align="center" gutterBottom>
            Member Information
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            To avoid having to provide your information every time you sign up
            for an event, please fill out the form below. The given information
            will allow UBC BizTech to better our future events and cater content
            towards our members needs.
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
          >
            {(props) => <MemberCreateForm {...props} />}
          </Formik>
        </div>
      </Paper> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps, { setUser })(MemberCreate);
