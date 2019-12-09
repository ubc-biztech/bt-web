import React from 'react'
import * as Yup from "yup"
import { Formik } from "formik";
import NewEventFormComponent from './NewEventFormComponent'

export default function NewEventForm() {

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        description: Yup.string().required(),
        capacity: Yup.number('Valid number required')
            .min(0, 'Valid capacity required')
            .required(),
        partners: Yup.string().required(),
        location: Yup.string().required(),
        imageUrl: Yup.string().url().required(),
    });

    const initialValues = { name: "", description: "", capacity: "", partners: "", location: "", imageUrl: "" };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
        >
            {props => <NewEventFormComponent {...props} />}
        </Formik>
    )

    async function submitValues(values) {
        // const { name, description, capacity, partners, location, imageUrl } = values;

        console.log(values)
    }

}