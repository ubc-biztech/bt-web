import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";

import EventView from "components/Event/EventView";
import EventRegisterForm from "./EventRegisterForm";
import EventRegisterSuccess from "./EventRegisterSuccess";
import NotFound from "pages/NotFound";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { COLORS } from "../../../../constants/_constants/theme";

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
  registrationHeader: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: "35px",
    paddingLeft: "19px",
    marginLeft: "11px",
  },
  registrationText: {
    fontWeight: "bold",
    fontSize: "24px",
  },
}));

const EventFormContainer = (props) => {
  const classes = useStyles();
  const { eventId, event, upcomingEvents, loading } = props;

  const initialRegistrationState = {
    isRegistered: false,
    registeredEmail: undefined,
  };

  const [registration, setRegistration] = useState(initialRegistrationState);
  // const [isUBCStudent, setIsUBCStudent] = useState(true);
  const [isMember, setIsMember] = useState("");

  const resetRegistration = () => setRegistration(initialRegistrationState);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    year: Yup.string().required("Level of study is required"),
    faculty: Yup.string().required("Faculty is required"),
    major: Yup.string().required("Major is required"),
    biztechMemberStatus: Yup.string().required("This field is required"),
    // gender: Yup.string().required("This field is required"),
    // diet: Yup.string().required("This field is required"),
    heardFrom: Yup.string().required("This field is required"),
  });

  // const UBCValidationSchema = Yup.object({
  //   email: Yup.string().email().required(),
  //   id: Yup.number("Valid Student ID required")
  //     .min(9999999, "Valid Student ID required")
  //     .max(100000000, "Valid Student ID required")
  //     .required(),
  //   fname: Yup.string().required("First name is required"),
  //   lname: Yup.string().required("Last name is required"),
  //   faculty: Yup.string().required("Faculty is required"),
  //   year: Yup.string().required("Level of study is required"),
  //   biztechMemberStatus: Yup.string().required("This field is required"),
  // });

  const initialValues = {
    email: "",
    fname: "",
    lname: "",
    year: "",
    faculty: "",
    major: "",
    biztechMemberStatus: "",
    // diet: "",
    heardFrom: "",
    // gender: "",
    // id: "",
  };

  const { isRegistered, registeredEmail } = registration;

  function handleIsMemberStatus(value) {
    console.log(value);
    setIsMember(value);
  }

  if (loading) {
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Skeleton
            animation="wave"
            variant="rect"
            width={"100%"}
            height={320}
          />
          <div className={classes.content}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width={300}
                  height={30}
                />
              </Grid>

              {[1, 2, 3].map((e) => (
                <Grid item container spacing={1} key={e}>
                  <Grid item xs={12}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={130}
                      height={20}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={"100%"}
                      height={20}
                    />
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width={90}
                  height={36}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
  return event ? (
    <div className={classes.layout}>
      <Helmet>
        <title>{event.ename} - Register</title>
      </Helmet>
      <EventView event={event}>
        {isRegistered ? (
          <EventRegisterSuccess
            email={registeredEmail}
            upcomingEvents={upcomingEvents}
            resetRegistration={resetRegistration}
          />
        ) : (
          <Fragment>
            <div className={classes.registrationHeader}>
              <Typography className={classes.registrationText}>
                Registration
              </Typography>
              <Typography>
                We need to know a little bit about you to get started.
              </Typography>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={
                /* isUBCStudent ? UBCValidationSchema : */
                validationSchema
              }
              onSubmit={submitValues}
            >
              {(props) => {
                props = {
                  ...props,
                  isMember,
                  setIsMember,
                  handleIsMemberStatus,
                  // isUBCStudent,
                  // setIsUBCStudent,
                };
                return <EventRegisterForm {...props} />;
              }}
            </Formik>
          </Fragment>
        )}
      </EventView>
    </div>
  ) : (
    <NotFound message={`The event with id ${eventId} could not be found!`} />
  );

  async function submitValues(values) {
    const {
      email,
      fname,
      lname,
      year,
      faculty,
      major,
      biztechMemberStatus,
      // diet,
      heardFrom,
      // gender,

      // id,
    } = values;
    const eventID = event.id;
    const eventYear = event.year;

    const body = {
      // studentId: parseInt(id),
      fname,
      lname,
      email,
      year,
      faculty,
      major,
      // gender,
      // diet,
    };

    const registrationBody = {
      email,
      eventID,
      year: eventYear,
      heardFrom,
      registrationStatus: "registered",
      // Careers in Tech specific fields
      biztechMemberStatus,
    };

    fetchBackend("/users", "POST", body, false)
      .catch((err) => {
        // If the error is not "User could not be created because it already exists"
        if (err.status !== 409) {
          alert(
            "An error occured while trying to register. Please try again or contact UBC BizTech."
          );
        }
      })
      .finally(() => {
        registerUser(registrationBody);
      });

    // registerUser(registrationBody);
  }

  async function registerUser(registrationBody) {
    fetchBackend("/registrations", "POST", registrationBody, false)
      .then(() => {
        // alert('Congratulations! You are now signed up.')
        setRegistration({
          ...registration,
          isRegistered: true,
          registeredEmail: registrationBody.email,
        });
      })
      .catch((err) => {
        if (err.status === 409) {
          alert("You are already registered for this event.");
        } else {
          alert(
            "An error occured while trying to register. Please try again or contact UBC BizTech."
          );
        }
      });
  }
};

export default EventFormContainer;
