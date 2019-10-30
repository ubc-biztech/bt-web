import React from 'react'
import { Auth } from "aws-amplify";
import * as Yup from "yup"
import { Formik } from "formik";
import Form from './Form'

export default function SignUp() {

    const validationSchema = Yup.object({
        confirmPassword: Yup.string().min(6).required("Please confirm your password"),
        password: Yup.string().min(6).required(),
        id: Yup.number('Valid Student ID required')
            .min(9999999, 'Valid Student ID required')
            .max(100000000, 'Valid Student ID required')
            .required(),
        name: Yup.string().required(),
        email: Yup.string().email().required()
    });

    const values = { email: "", name: "", confirmPassword: "", password: "", id: "" };

    return (
        <Formik
            render={props => <Form {...props} />}
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={submitValues}
        />
    )

    function submitValues(e) {
        console.log(e)
    }

}
