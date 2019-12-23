import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//TODO: import props and require the correct type

// import { Auth } from "aws-amplify";
import * as Yup from "yup" //TODO: avoid *, figure out what functions are actually used
import { Formik } from "formik";
import Form from './Form'; //ian's example form


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        UBC BizTech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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




export default function MyForm() {
  const classes = useStyles();


  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    id: Yup.number('Valid Student ID required')
        .min(9999999, 'Valid Student ID required')
        .max(100000000, 'Valid Student ID required')
        .required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password must match")
        .required("Please confirm your password"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    other_option: Yup.string().required("Please enter a response"),
  });

  const initialValues = { email: "", name: "", id: "", password: "", confirmPassword: "", firstname: "", lastname: "", other_option: "" };


  return (
    <React.Fragment>
      {/* <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}

    
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Coding for Noobs 1 with Lighthouse Labs
          </Typography>
          <br></br>

          {/* <FormBody/> */}
          <Formik
            render={props => <Form {...props} />}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
          />
          <Button
            variant="contained"
            color="primary"
            // onClick="TODO"
            className={classes.button}
          >
            Submit
          </Button>

        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
  async function submitValues(values) {
      const { email, name, id, password } = values;
      console.log(values);
      alert("Signed Up");
  }
}

