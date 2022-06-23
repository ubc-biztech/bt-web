import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import MembershipForm from "./MembershipForm";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { MEMBER_TYPES } from "../../../constants/_constants/memberTypes";

import { COLORS } from '../../../constants/_constants/theme'

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
  }
}))

const MembershipFormContainer = (props) => {
  const classes = useStyles()
  const history = useHistory()

  const [memberType, setMemberType] = useState(MEMBER_TYPES.UBC);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required')
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
    )
  })

  const UniversityValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    university: Yup.string().required('University name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required'),
    major: Yup.string().required('Major is required')
  })

  const HighSchoolValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    year: Yup.string().required('Level of study is required'),
    high_school: Yup.string().required('High School is required')
  })
  
  const { user } = props
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
  }

  async function submitValues (values) {
    const {
      education,
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

    let admin = false
    if (
      email.substring(email.indexOf('@') + 1, email.length) === 'ubcbiztech.com'
    ) {
      admin = true
    }

    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    const body = {
      education,
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
      topics,
      diet,
      heard_from,
      university,
      high_school,
      admin
    }

    const userBody = {
      studentId: student_number,
      fname: first_name,
      lname: last_name,
      major: major,
      email: email,
      year: year,
      faculty: faculty,
      gender: pronouns || 'Other/Prefer not to say',
      diet: diet || 'None',
      admin: admin
    }

    setIsSubmitting(true);

    // users table post

    fetchBackend('/members', 'POST', body, false)
      .then(async () => {
        history.push('/member-signup/success')
      })
      .catch((err) => {
        if (err.status === 409) {
          alert(
            'A user with the given e-mail already exists! Double check that your e-mail is correct, or ensure that you are using the same account you signed up with the first time. If you are still having trouble registering, contact one of our devs.'
          )
        } else {
          console.log(err)
        }
      })

    fetchBackend(`/users/${email}`, 'PATCH', userBody).then((response) => {
      console.log(response)
    })
    setIsSubmitting(false);
  }

  return (
    <div className={classes.layout}>
      <Helmet>
        <title>UBC BizTech Membership 2021/22</title>
      </Helmet>
      <Fragment>
        <Typography className={classes.registrationText}>
          UBC BizTech Membership 2021/22
        </Typography>
        <div className={classes.registrationHeader}>
          <Typography>
            Thank you for signing up to be a BizTech member! By signing up for
            membership, you will also be a part of our mailing list!
          </Typography>
          <Typography>
            Please keep in mind that membership costs $5 ($7.50 for non-UBC
            students) and are valid for one school year (Sept-May), so if you
            were a member last year and would like to continue being part of the
            BizTech Network, kindly renew your membership by filling out this
            form and completing the payment.
          </Typography>
          <Typography>
            If you are logged in, the form below will automatically be filled with 
            your user information. You can change these fields which will also automatically
            update your user profile in addition to your membership. However, you cannot change your email and student number;
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
              setMemberType
            }
            return <MembershipForm {...props} />
          }}
        </Formik>
      </Fragment>
    </div>
  )
}

export default MembershipFormContainer
