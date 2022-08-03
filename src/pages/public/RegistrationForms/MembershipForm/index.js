import React, { useState, Fragment } from "react";
import { CLIENT_URL } from "constants/index";
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";
import MembershipForm from "./MembershipForm";
import Login from "./Login";
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
  alreadyMember: {
    height: '85vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  alreadyMemberText: {
    fontWeight: 'bold',
    fontSize: '32px',
  },
  description: {
    marginBottom: 16
  }
}))

const MembershipFormContainer = (props) => {
  const classes = useStyles()
  const { user } = props
  const [memberType, setMemberType] = useState(user?.education);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    education: Yup.string().required('Education is required'),
    prev_member: Yup.string().required('Please select Yes/No'),
  })

  const UBCValidationSchema = Yup.object({
    email: Yup.string().email().required(),
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
  })

  const UniversityValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    university: Yup.string().required('University name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required'),
    major: Yup.string().required('Major is required'),
    prev_member: Yup.string().required('Please select Yes/No'),
  })

  const HighSchoolValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    year: Yup.string().required('Level of study is required'),
    high_school: Yup.string().required('High School is required'),
    prev_member: Yup.string().required('Please select Yes/No'),
  })
  
  const initialValues = {
    email: (user && user.email) || '',
    first_name: (user && user.fname) || '',
    last_name: (user && user.lname) || '',
    student_number: (user && user.id) || '',
    pronouns: (user && user.gender) || '',
    year: (user && user.year) || '',
    major: (user && user.major) || '',
    diet: (user && user.diet) || '',
    faculty: (user && user.faculty) || '',
    prev_member: '',
    international: '',
    university: '',
    high_school: '',
  }

  async function submitValues (values) {
    setIsSubmitting(true);
    const {
      email,
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
      topics,
      heard_from,
      university,
      high_school
    } = values

    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    const paymentBody = {
      paymentName: 'BizTech Membership',
      paymentImages: ['https://imgur.com/TRiZYtG.png'],
      paymentPrice: 1000,
      paymentType: 'Member',
      success_url: `${process.env.REACT_APP_STAGE === 'local' ? 'http://localhost:3000' : CLIENT_URL}/signup/success/Member/${email}`,
      cancel_url: `${process.env.REACT_APP_STAGE === 'local' ? 'http://localhost:3000' : CLIENT_URL}/signup`,
      education: memberType,
      student_number: memberType === 'UBC' ? student_number : '',
      fname: first_name,
      lname: last_name,
      major: (memberType === 'UBC' || memberType === 'UNI') ? major : '',
      email: email,
      year: memberType !== 'NA' ? year : '',
      faculty: (memberType === 'UBC' || memberType === 'UNI') ? faculty : '',
      pronouns: pronouns || 'Other/Prefer not to say',
      diet: diet || 'None',
      prev_member,
      international: memberType === 'UBC' ? international : '',
      topics,
      heard_from,
      university: memberType === 'UNI' ? university : '',
      high_school: memberType === 'HS' ? high_school : '',
    }

    fetchBackend('/payments', 'POST', paymentBody, false)
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

  const renderMemberForm = (isMember, isAdmin) => {
    return isMember || isAdmin ? (
      <div className={classes.alreadyMember}>
        <Typography className={classes.alreadyMemberText}>
          Oops, you are already a BizTech member for this year!
        </Typography>
      </div>
    ) : (
      <Fragment>
        <Typography className={classes.registrationText}>
          UBC BizTech Membership 2022/23
        </Typography>
        <div className={classes.registrationHeader}>
          <Typography className={classes.description}>
            Thank you for choosing to sign up to be a BizTech member! By signing up for
            membership, you will also be a part of our mailing list!
          </Typography>
          <Typography className={classes.description}>
            Please keep in mind that membership costs $10.00 ($15.00 for non-UBC
            students) and are valid for one school year (Sept-May), so if you
            were a member last year and would like to continue being part of the
            BizTech Network, kindly renew your membership by filling out this
            form and completing the payment.
          </Typography>
          <Typography>
            The form below has been automatically filled with 
            your current user information. You can change these fields which will also automatically
            update your user profile in addition to your member status. However, you CANNOT change your email and student number;
            if you wish to do so, please contact a BizTech executive for support. 
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
            }
            return <MembershipForm {...props} />
          }}
        </Formik>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {!user ? (
        <Login />
      ) : (
        <div className={classes.layout}>
            <Helmet>
              <title>UBC BizTech Membership 2022/23</title>
            </Helmet>
        {renderMemberForm(user.isMember, user.admin)}
        </div>
      )}
      </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data,
  }
}

export default connect(mapStateToProps, {})(MembershipFormContainer)
