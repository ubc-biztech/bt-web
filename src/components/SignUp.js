import React, { useState } from 'react'
import { Auth } from "aws-amplify";
import { object, string, number } from 'yup';
import { useFormFields } from "../libs/hooks";
import Form from './Form'

export default function SignUp() {

    const schema = object().shape({
        passwordConfirm: string().min(6).required("Please confirm your password"),
        password: string().min(6).required(),
        id: number('Valid Student ID required')
            .min(9999999, 'Valid Student ID required')
            .max(100000000, 'Valid Student ID required')
            .required(),
        name: string().required(),
        email: string().email().required()
    });

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        id: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    function validate() {
        setIsLoading(true);

        schema
            .validate({
                email: fields.email,
                password: fields.password,
                passwordConfirm: fields.passwordConfirm,
                name: fields.name,
                id: fields.id
            })
            .then(() => {
                if (fields.password === fields.passwordConfirm)
                    signIn()
            })
            .catch(err => {
                console.log(err)
                alert(err.errors[0]);
                setIsLoading(false);
            });
    }

    return (
        <Form />
    )

    async function signIn() {

        try {
            await Auth.signUp({
                username: fields.email,
                password: fields.password,
                attributes: {
                    email: fields.email,
                    name: fields.fname,
                    nickname: fields.id
                }
            });
            alert("Signed up");
            setIsLoading(false);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }

    }

    function handleKey(e) {
        if (e.key === 'Enter')
            validate()
    }
}
