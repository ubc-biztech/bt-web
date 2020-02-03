import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { API_URL, API_KEY } from '../../utils'
//TODO: import props and require the correct type

import * as Yup from "yup" //TODO: avoid *, figure out what functions are actually used
import { Formik } from "formik";
import EventForm from './EventForm';

//Unused but should use down the road (TODO)
// const radioButtonFields = { "Faculty": ["Arts","Commerce","Science","Engineering","Kineseology","Land and Food Systems","Forestry"],
//                             "Year": ["1st Year","2nd Year","3rd Year","4th Year","5+ Year"],
//                             "How did you hear about this event?": ["Facebook","Boothing","Friends","BizTech Newsletter","Faculty Newsletter","Other:"],
//                             "Do you have any dietary restrictions? If yes, please specify in 'Other'": ["No","Other:"]}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));




const EventFormWrapper = (event) => {
  const classes = useStyles();
  const eventInfo = event.event;
  console.log(eventInfo);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    // other_option: Yup.string().required("Please enter a response"), //TODO: get other option validation working along with radio button validation 
  });

  const initialValues = { email: "", fname: "", lname: "", id: "", faculty: "", year: "", heardFrom: "", diet: "" };


  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {eventInfo.ename}

          </Typography>
          <div>
            <img src={eventInfo.imageUrl} alt="Event" height="500" align="middle"></img>
            {/* TODO: fix image scaling */}
          </div>
          <Typography variant="h6" gutterBottom>
            {eventInfo.description}
          </Typography>
          <br></br>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
          >
            {props => <EventForm {...props} />}
          </Formik>

        </Paper>
      </main>
    </React.Fragment>
  );
  async function submitValues(values) {
    const { email, fname, lname, id, faculty, year, diet, heardFrom } = values;
    const eventID = eventInfo.id;
    //TODO: pass heardFrom to backend.
    //TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    console.log(heardFrom);
    console.log(values);
    fetch(API_URL + "/users/get?id=" + values.id, {
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response === "User not found.") {
          // Need to create new user
          console.log("User not found, creating user");
          const body = JSON.stringify({
            id,
            fname,
            lname,
            email,
            year,
            faculty,
            diet
          });
          fetch(API_URL + "/users/create", {
            method: "POST",
            headers: {
              'x-api-key': API_KEY,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: body
          })
            .then((userResponse) => userResponse.json())
            .then((userResponse) => {
              if (userResponse.message === "Created!") {
                registerUser(id, eventID);
              } else {
                alert("Signup failed");
              }
            })
        } else {
          registerUser(id, eventID);
        }
      })
      .catch(err => {
        console.log("registration error");
        alert("Signup failed");
      });
  }

  async function registerUser(id, eventID) {
    console.log(id)
    console.log(eventID);
    const body = JSON.stringify({
      id: id,
      eventID: eventID,
      registrationStatus: "registered"
    })
    //TODO: pass the headFrom field as well
    fetch(API_URL + "/registration/create", {
      method: "POST",
      headers: {
        'x-api-key': API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body
    })
      .then((regResponse) => regResponse.json())
      .then((regResponse) => {
        if (regResponse.message === "Update succeeded") {
          alert("Signed Up");
        } else {
          console.log("registration error");
          console.log(regResponse.message);
          alert("Signup failed");
        }
      })
      .catch(err => {
        console.log("registration error");
        alert("Signup failed");
      });
  }
}

export default EventFormWrapper;
