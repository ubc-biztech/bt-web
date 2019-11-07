import React from 'react'
import { Auth } from "aws-amplify";
import * as Yup from "yup"
import { Formik } from "formik";
import Form from './Form'

export default function SignUp() {

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
            .required("Please confirm your password")
    });

    const initialValues = { email: "", name: "", id: "", password: "", confirmPassword: "" };

    return (
        <Formik
            render={props => <Form {...props} />}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
        />
    )

    async function submitValues(values) {
        const { email, name, id, password } = values;

        try {
            await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    name,
                    nickname: id
                },
            })
            alert("Signed Up");
        } catch (e) {
            alert(e.message);
        }
    }

}
