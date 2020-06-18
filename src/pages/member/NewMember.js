import React from 'react';
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux"
import * as Yup from "yup"
import { Formik } from "formik";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import NewMember from '../../components/Forms/NewMember';

import { log, fetchBackend } from '../../utils'
import { setUser } from "../../actions/UserActions"

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

const NewMemberRegisterFormContainer = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required'),
    diet: Yup.string().required('Dietary restriction is required'),
  });

  // form initial values (if exist). If email exists will disable email field
  const { user } = props;
  const initialValues = {
    email: user?.email || "",
    fname: user?.fname || "",
    lname: user?.lname || "",
  };

  const submitValues = async (values) => {
    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values;

    //TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    const body = {
      email,
      fname,
      lname,
      id,
      faculty,
      year,
      diet,
      heardFrom,
      gender
    };
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    await Auth.updateUserAttributes(authUser, { 'custom:student_id': id });

    fetchBackend('/users', 'POST', body)
      .then(async () => {
        const admin = email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com';

        const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
        await Auth.updateUserAttributes(authUser, { 'custom:student_id': id });

        props.setUser({
          email,
          fname,
          lname,
          id,
          faculty,
          year,
          diet,
          heardFrom,
          gender,
          admin
        });
        alert('Thanks for signing up!');
        history.push('/');
      })
      .catch(err => {
        //TODO: parse out error code 409
        log(err)
        alert('A user with the given student ID already exists! Double check that your student ID is correct, or ensure that you are using the same account you signed up with the first time. If you are still having trouble registering, contact one of our devs.')
      })
  }

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <div className={classes.content}>
          <Typography variant="h4" align="center" gutterBottom>
            Member Information
            </Typography>

          <Typography variant="subtitle1" gutterBottom>
            To avoid having to provide your information every time you sign up for an event, please fill out the form below.
            The given information will allow UBC BizTech to better our future events and cater content towards our members
            needs.
            </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
          >
            {props => <NewMember {...props} />}
          </Formik>
        </div>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userState.user
  };
};

export default connect(mapStateToProps, { setUser })(NewMemberRegisterFormContainer);
