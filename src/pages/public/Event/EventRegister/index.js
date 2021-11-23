import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";

import EventView from "components/Event/EventView";
import EventRegisterForm from "./EventRegisterForm";
import EventRegisterSuccess from "./EventRegisterSuccess";
import NotFound from "pages/NotFound";

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

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
    fontWeight: 'bold',
    fontSize: '24px'
  }
}))

const EventFormContainer = (props) => {
  const classes = useStyles();
  const { eventId, event, upcomingEvents, loading } = props;

  const initialRegistrationState = {
    isRegistered: false,
    registeredEmail: undefined,
  };

  const [registration, setRegistration] = useState(initialRegistrationState);
  const [isUBCStudent, setIsUBCStudent] = useState(true);
  // object that stores checkbox, select, and text fields Q and A
  const [customFields, setCustomFields] = useState({});

  const resetRegistration = () => setRegistration(initialRegistrationState);

  console.log(event)

  useEffect(() => {
    // unwrap custom fields
    const requiredCheckBoxFields = {};
    const unrequiredCheckBoxFields = {};
    const requiredSelectFields = {};

    if (event["requiredCheckBoxFields"]) {
      event["requiredCheckBoxFields"].forEach((checkBoxField) => {
        requiredCheckBoxFields[checkBoxField] = false;
      });
    }
    if (event["unrequiredCheckBoxFields"]) {
      event["unrequiredCheckBoxFields"].forEach((checkBoxField) => {
        unrequiredCheckBoxFields[checkBoxField] = false;
      });
    }
    if (event["requiredSelectFields"]) {
      event["requiredSelectFields"].forEach((selectField) => {
        requiredSelectFields[selectField] = {
          answer: "",
          options: selectField["options"]
        }
      })
    }
    if (event["unrequiredSelectFields"]) {
      event["unrequiredSelectFields"].forEach((selectField) => {
        requiredSelectFields[selectField] = "";
      })
    }

    const initialCustomFields = {
      requiredCheckBoxFields,
      unrequiredCheckBoxFields
    }
    setCustomFields(initialCustomFields)
  }, [event]);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),

    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required')
  })

  const UBCValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required')
  })

  const initialValues = { email: '', fname: '', lname: '', id: '', faculty: '', year: '', diet: '', gender: '', heardFrom: '' }

  const { isRegistered, registeredEmail } = registration

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
                <Typography className={classes.registrationText}>Registration</Typography>
              <Typography>We need to know a little bit about you to get started.</Typography>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={isUBCStudent ? UBCValidationSchema : validationSchema}
              onSubmit={submitValues}
            >
              {(props) => {
                  props = {
                    ...props,
                    isUBCStudent,
                    setIsUBCStudent,
                    customFields,
                    setCustomFields
                  }
                  return <EventRegisterForm {...props} />
                }
              }
            </Formik>
          </Fragment>
        )}
      </EventView>
    </div>
  ) : (
    <NotFound message={`The event with id ${eventId} could not be found!`} />
  );

  async function submitValues (values) {
    if (!validatedRequiredCheckBoxes()) {
      alert("In order to sign up for this event, one or more of the checkboxes are required.");
      return;
    }

    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values

    const eventID = event.id
    const eventYear = event.year
    const body = {
      studentId: parseInt(id),
      fname,
      lname,
      email,
      year,
      faculty,
      gender,
      diet
    }
    fetchBackend('/users', 'POST', body, false)
      .catch(err => {
        // If the error is not "User could not be created because it already exists"
        if (err.status !== 409) {
          alert('An error occured while trying to register. Please try again or contact UBC BizTech.')
        }
      })
      .finally(() => {
        registerUser(eventID, eventYear, heardFrom, email)
      })
  }

  async function registerUser (eventID, eventYear, heardFrom, email) {
    const body = {
      email,
      eventID,
      year: eventYear,
      heardFrom,
      registrationStatus: 'registered'
    }
    fetchBackend('/registrations', 'POST', body, false)
      .then(() => {
        // alert('Congratulations! You are now signed up.')
        setRegistration({ ...registration, isRegistered: true, registeredEmail: email })
      })
      .catch((err) => {
        if (err.status === 409) {
          alert('You are already registered for this event.')
        } else {
          alert('An error occured while trying to register. Please try again or contact UBC BizTech.')
        }
      });
  }

  // confirm that all required checkboxes have been checked
  function validatedRequiredCheckBoxes () {
    for (const key in Object.keys(customFields.requiredCheckBoxFields)) {
      if (!customFields.requiredCheckBoxFields[key]) {
        return false;
      }
    }

    return true;
  }
};

export default EventFormContainer;
