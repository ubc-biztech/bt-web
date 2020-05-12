import React from 'react';
import { connect } from 'react-redux';
import { setEvent } from '../../actions/PageActions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fetchBackend, log } from '../../utils'
import * as Yup from 'yup'
import { Formik } from 'formik';
import NewMember from '../../components/Forms/NewMember';
import Paper from '@material-ui/core/Paper';

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

  const initialValues = { email: '', fname: '', lname: '', id: '', faculty: '', year: '', diet: '', gender: '', heardFrom: ''};
    return (
        <div className={classes.layout}>
            <Paper className={classes.paper}>
              <React.Fragment>
                
                <div className={classes.content}>
                  <Typography variant='h4' align='center' gutterBottom>
                    Member Information
                  </Typography>
                  
                  <Typography variant='h7' gutterBottom>
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
              </React.Fragment>
            </Paper>
        </div>
    )

  async function submitValues(values) {
    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values;
    const eventID = event.id;
    //TODO: Standardize the values passed to DB (right now it passes '1st Year' instead of 1)
    // Create new user
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
    fetchBackend('/users', 'POST', body)
      .then((userResponse) => userResponse.json())
      .then((userResponse) => {
        if (userResponse.message === 'Created!') {
          alert('Thanks for signing up!');
        }
      })
      .catch((err) => {
        log(err)
        alert('Signup failed');
      })
  }
}

const mapStateToProps = state => {
  return {
      events: state.pageState.events,
      event: state.pageState.event
  };
};

export default connect(mapStateToProps, { setEvent })(EventFormContainer);