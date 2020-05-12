import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { setEvent } from "../../actions/PageActions";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fetchBackend } from '../../utils'
import * as Yup from "yup"
import { Formik } from "formik";
import RegisterEvent from '../../components/Forms/RegisterEvent';
import queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: 600,
      margin: 'auto',
    },
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3),
    },
  },
  content: {
    padding: theme.spacing(3),
  }
}));

const EventFormContainer = (props) => {
  const classes = useStyles();
  const { event } = props;

  useEffect(() => {
      const params = queryString.parse(window.location.search);
      const eventID = params.id;
      if (eventID) {
          const events = props.events
          if (events) {
              props.setEvent(events.find(event => event.id === params.id))
          }
      }
  }, [props])

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    faculty: Yup.string().required("Faculty is required"),
    year: Yup.string().required("Level of study is required"),
    diet: Yup.string().required("Dietary restriction is required"), 
  });

  const initialValues = { email: "", fname: "", lname: "", id: "", faculty: "", year: "", diet: "", gender: "", heardFrom: ""};

  if (event) {
    return (
        <div className={classes.layout}>
          <Helmet>
            <title>{event.ename} - Register</title>
          </Helmet>
          <Paper className={classes.paper}>
            <React.Fragment>
              <img src={event.imageUrl || require("../../assets/placeholder.jpg")} alt="Event" style={{maxWidth: '100%'}} />
              
              <div className={classes.content}>
                <Typography variant="h4" align="center" gutterBottom>
                  {event.ename}
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  {event.description}
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitValues}
                >
                  {props => <RegisterEvent {...props} />}
                </Formik>
              </div>
            </React.Fragment>
          </Paper>
        </div>
    )
  } else {
      return (
          <div className={classes.layout}>
              <Paper className={classes.paper}>
                  <Skeleton animation="wave" variant="rect" width={'100%'} height={320} />
                  <div className={classes.content}>

                      <Grid container spacing={3}>

                          <Grid item xs={12}>
                              <Skeleton animation="wave" variant="rect" width={300} height={30} />
                          </Grid>

                          {[1, 2, 3].map((e) =>
                          <Grid item container spacing={1} key={e}> 
                              <Grid item xs={12}>
                                  <Skeleton animation="wave" variant="rect" width={130} height={20} />
                              </Grid>
                              <Grid item xs={12}>
                                  <Skeleton animation="wave" variant="rect" width={'100%'} height={20} />
                              </Grid>
                          </Grid>)
                          }
                          
                          <Grid item xs={12}>
                              <Skeleton animation="wave" variant="rect" width={90} height={36} />
                          </Grid>

                      </Grid>
                  </div>
              </Paper>
          </div>
      )
  }

  async function submitValues(values) {
    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values;
    const eventID = event.id;
    //TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    fetchBackend(`/users/${values.id}`, 'GET')
      .then((response) => response.json())
      .then((response) => {
        if (response === "User not found.") {
          // Need to create new user
          // console.log("User not found, creating user");
          const body = {
            id,
            fname,
            lname,
            email,
            year,
            faculty,
            gender,
            diet
          }
          fetchBackend("/users", "POST", body)
            .then((userResponse) => userResponse.json())
            .then((userResponse) => {
              if (userResponse.message === "Created!") {
                registerUser(id, eventID, heardFrom);
              } else {
                alert("Signup failed");
              }
            })
        } else {
          registerUser(id, eventID, heardFrom);
        }
      })
      .catch(err => {
        console.log("registration error");
        alert("Signup failed");
      });
  }

  async function registerUser(id, eventID, heardFrom) {
    const body = {
      id,
      eventID,
      heardFrom,
      registrationStatus: "registered"
    }
    fetchBackend("/registration", "POST", body)
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

const mapStateToProps = state => {
  return {
      events: state.pageState.events,
      event: state.pageState.event
  };
};

export default connect(mapStateToProps, { setEvent })(EventFormContainer);