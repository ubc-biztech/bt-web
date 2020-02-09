import React from 'react'
import * as Yup from "yup"
import { Formik } from "formik";
import NewEventFormComponent from './NewEventFormComponent'
import { fetchBackend } from '../../../utils'

export default function NewEventForm() {

    const validationSchema = Yup.object({
        ename: Yup.string().required(),
        slug: Yup.string().matches(/^[a-z\-0-9]*$/, "Slug must be lowercase and have no whitespace").required(),
        description: Yup.string().required(),
        capacity: Yup.number('Valid number required')
            .min(0, 'Valid capacity required')
            .required(),
        // partners: Yup.string().required(),
        location: Yup.string().required(),
        imageUrl: Yup.string().url().required(),
    });

    const initialValues = {
        ename: "",
        slug: "",
        description: "",
        capacity: "",
        partners: "",
        location: "",
        imageUrl: "",
        startDate: new Date(),
        endDate: new Date()
    };

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
        const body = JSON.stringify({
            ename: values.ename,
            id: values.slug,
            description: values.description,
            capac: values.capacity,
            location: values.location,
            imageUrl: values.imageUrl,
            startDate: values.startDate,
            endDate: values.endDate
        })
        fetchBackend('/events/get', 'GET')
            .then((response) => response.json())
            .then((response) => {
                const isDuplicate = response.find(event => event.id === values.slug)
                if (isDuplicate) {
                    alert('Event with that slug already exists!')
                } else {
                    fetchBackend('/events/create', 'POST', body)
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response)
                            alert('Event Created!')
                            window.location.href = "/";
                        })
                        .catch(err => {
                            console.log(err)
                            alert(err.message + 'Please contact a dev')
                        })
                }
            })

    }

}