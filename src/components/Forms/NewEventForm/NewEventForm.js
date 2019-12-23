import React from 'react'
import * as Yup from "yup"
import { Formik } from "formik";
import NewEventFormComponent from './NewEventFormComponent'
import { API_URL, API_KEY } from '../../../utils'

export default function NewEventForm() {

    const validationSchema = Yup.object({
        ename: Yup.string().required(),
        slug: Yup.string().matches(/^[a-z\-0-9]*$/, "Slug must be lowercase and have no whitespace").required(),
        description: Yup.string().required(),
        capacity: Yup.number('Valid number required')
            .min(0, 'Valid capacity required')
            .required(),
        partners: Yup.string().required(),
        location: Yup.string().required(),
        imageUrl: Yup.string().url().required(),
    });

    const initialValues = { ename: "", slug: "", description: "", capacity: "", partners: "", location: "", imageUrl: "" };

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
        const { ename, slug, description, capacity, partners, location, imageUrl } = values;

        const body = JSON.stringify({
            ename,
            id: slug,
            description,
            capac: capacity,
            partners,
            location,
            img: imageUrl
          })

        fetch(API_URL + "/events/create", {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
          })
    }

}