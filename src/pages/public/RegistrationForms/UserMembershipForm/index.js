import React, { useState, Fragment } from "react";
import { CLIENT_URL } from "constants/index";
import { Auth } from "aws-amplify";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import UserMembershipForm from "./UserMembershipForm";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { MEMBER_TYPES } from "constants/_constants/memberTypes";

import { COLORS } from 'constants/_constants/theme'

import { fetchBackend } from 'utils'

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: 850,
      margin: 'auto'
    }
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3)
    }
  },
  content: {
    padding: theme.spacing(3)
  },
  registrationHeader: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '11px'
  },
  registrationText: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  description: {
    marginBottom: 16,
  }
}))

const UserMembershipFormContainer = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [memberType, setMemberType] = useState();
  const [topics, setTopics] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Please make your password a minimum of 8 characters'),
    confirmPassword: Yup.string().required('Password is required').when("password", {
      is: val => (val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password does not match"
      )
    }),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    education: Yup.string().required('Education is required'),
    prev_member: Yup.string().required('Please select Yes/No'),
    heardFromSpecify: Yup.string().when("heard_from", {
      is: val => (val && (val === 'Events' || val === 'Boothing' || val === 'Other')),
      then: Yup.string().required('Please fill in this field')
    }),
  })

  const UBCValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Please make your password a minimum of 8 characters'),
    confirmPassword: Yup.string().required('Password is required').when("password", {
      is: val => (val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password does not match"
      )
    }),
    student_number: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required'),
    major: Yup.string().required('Major is required'),
    international: Yup.string().required(
      'International or domestic student indication is required'
    ),
    prev_member: Yup.string().required('Please select Yes/No'),
    heardFromSpecify: Yup.string().when("heard_from", {
      is: val => (val && (val === 'Events' || val === 'Boothing' || val === 'Other')),
      then: Yup.string().required('Please fill in this field')
    }),
  })

  const UniversityValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Please make your password a minimum of 8 characters'),
    confirmPassword: Yup.string().required('Password is required').when("password", {
      is: val => (val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password does not match"
      )
    }),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    university: Yup.string().required('University name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required'),
    major: Yup.string().required('Major is required'),
    prev_member: Yup.string().required('Please select Yes/No'),
    heardFromSpecify: Yup.string().when("heard_from", {
      is: val => (val && (val === 'Events' || val === 'Boothing' || val === 'Other')),
      then: Yup.string().required('Please fill in this field')
    }),
  })

  const HighSchoolValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Please make your password a minimum of 8 characters'),
    confirmPassword: Yup.string().required('Password is required').when("password", {
      is: val => (val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password does not match"
      )
    }),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    year: Yup.string().required('Level of study is required'),
    high_school: Yup.string().required('High School is required'),
    prev_member: Yup.string().required('Please select Yes/No'),
    heardFromSpecify: Yup.string().when("heard_from", {
      is: val => (val && (val === 'Events' || val === 'Boothing' || val === 'Other')),
      then: Yup.string().required('Please fill in this field')
    }),
  })

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    student_number: '',
    year: '',
    faculty: '',
    major: '',
    international: '',
    prev_member: '',
    university: '',
    high_school: '',
    heardFromSpecify: '',
  }

  async function adminSkipPayment (values) {
    const {
      email,
      password,
      first_name,
      last_name,
      pronouns,
      student_number,
      faculty,
      year,
      major,
      diet,
    } = values
    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)

    const userBody = {
      education: memberType,
      studentId: memberType === 'UBC' ? student_number : '',
      fname: first_name,
      lname: last_name,
      major: (memberType === 'UBC' || memberType === 'UNI') ? major : '',
      email: email,
      year: memberType !== 'NA' ? year : '',
      faculty: (memberType === 'UBC' || memberType === 'UNI') ? faculty : '',
      gender: pronouns || 'Other/Prefer not to say',
      diet: diet || 'None',
      isMember: true,
      admin: true
    }

    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: first_name + ' ' + last_name,
          'custom:student_id': student_number
        }
      })
    } catch (err) {
      // TODO: add error handler, do not let the form submit
      alert(
        `AWS Amplify error: ${err}`
      )
      setIsSubmitting(false)
      return
    }

    fetchBackend('/users', 'POST', userBody, false)
      .then(async () => {
        history.push({
          pathname: `/signup/success/UserMember/${email}`
        })
      })
      .catch((err) => {
        if (err.status === 409) {
          alert(
            'A user with the given e-mail already exists! Double check that your e-mail is correct, or ensure that you are using the same account you signed up with the first time. If you are still having trouble registering, contact one of our devs.'
          )
          setIsSubmitting(false)
        } else {
          alert(
            `Error occurred when updating user DB: ${err}`
          )
          setIsSubmitting(false)
        }
      })
    setIsSubmitting(false);
  }

  async function proceedToPayment (values) {
    const {
      email,
      password,
      first_name,
      last_name,
      pronouns,
      student_number,
      faculty,
      year,
      major,
      prev_member,
      international,
      diet,
      heard_from,
      heardFromSpecify,
      university,
      high_school
    } = values

    if (email.substring(email.indexOf('@') + 1, email.length) === 'ubcbiztech.com') {
      adminSkipPayment(values);
      return
    } 

    const paymentBody = {
      paymentName: `BizTech Membership ${memberType !== 'UBC' ? '(Non-UBC Student)' : ''}`,
      paymentImages: ['https://imgur.com/TRiZYtG.png'],
      paymentPrice: memberType === 'UBC' ? 1000 : 1500,
      paymentType: 'UserMember',
      success_url: `${process.env.REACT_APP_STAGE === 'local' ? 'http://localhost:3000/' : CLIENT_URL}signup/success/UserMember/${email}`,
      cancel_url: `${process.env.REACT_APP_STAGE === 'local' ? 'http://localhost:3000/' : CLIENT_URL}signup`,
      education: memberType,
      student_number: memberType === 'UBC' ? student_number : '',
      fname: first_name,
      lname: last_name,
      major: (memberType === 'UBC' || memberType === 'UNI') ? major : '',
      email: email,
      password: password,
      year: memberType !== 'NA' ? year : '',
      faculty: (memberType === 'UBC' || memberType === 'UNI') ? faculty : '',
      pronouns: pronouns || 'Other/Prefer not to say',
      diet: diet || 'None',
      prev_member,
      international: memberType === 'UBC' ? international : '',
      topics: topics.slice(0, -1),
      heard_from,
      heardFromSpecify: (heard_from === 'Events' || heard_from === 'Boothing' || heard_from === 'Other') ? heardFromSpecify : '',
      university: memberType === 'UNI' ? university : '',
      high_school: memberType === 'HS' ? high_school : '',
    }
    fetchBackend('/payments', "POST", paymentBody, false)
      .then(async (response) => {
        setIsSubmitting(false)
        window.open(response, "_self");
      })
      .catch((err) => {
        alert(
          `An error has occured: ${err} Please contact an exec for support.`
        )
        setIsSubmitting(false)
      })
  }

  async function submitValues (values) {
    setIsSubmitting(true);
    fetchBackend(`/users/check/${values.email}`, 'GET', undefined, false).then((response) => {
      if (response) {
        alert(
          'A user with the given email already exists! Please log in and choose the "Membership Renewal" signup option instead. If you are still experiencing issues, contact an exec for support.'
        )
        setIsSubmitting(false)
      } else {
        proceedToPayment(values)
      }
    }).catch(() => {
      alert(
        'Sorry, a server error occured. Please try again later or contact an exec for support.'
      )
      setIsSubmitting(false)
    })

  }

  return (
    <div className={classes.layout}>
      <Helmet>
        <title>UBC BizTech User Registration &amp; 2022/23 Membership</title>
      </Helmet>
      <Fragment>
        <Typography className={classes.registrationText}>
        UBC BizTech User Registration &amp; 2022/23 Membership
        </Typography>
        <div className={classes.registrationHeader}>
          <Typography className={classes.description}>
            Thank you for signing up to be a BizTech Application user and 2022/23 member! By signing up for
            membership, you will also be a part of our mailing list!
          </Typography>
          <Typography className={classes.description}>
            Please keep in mind that membership costs <b>$10.00 ($15.00 for non-UBC students)</b> and are valid for one school year (Sept-May), so if you
            were a member last year and would like to continue being part of the
            BizTech Network, kindly renew your membership by filling out this
            form and completing the payment.
          </Typography>
          <Typography>
            You will be also prompted to enter a password; submitting this form
            will automatically create your new account for our application, where you can
            login using your email and password. If you already have an account, please log in and access the 
            membership registration form.
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
              isSubmitting,
              memberType,
              setMemberType,
              topics,
              setTopics,
            }
            return <UserMembershipForm {...props} />
          }}
        </Formik>
      </Fragment>
    </div>
  )
}

export default UserMembershipFormContainer
