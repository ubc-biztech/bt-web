import React from 'react'
import * as Yup from "yup"
import { Formik } from "formik";
import NewEventForm from '../../components/Forms/NewEvent'
import { fetchBackend, log } from '../../utils'
import { Helmet } from 'react-helmet';

export default function EventNew() {

    const validationSchema = Yup.object({
        ename: Yup.string().required(),
        slug: Yup.string().matches(/^[a-z\-0-9]*$/, "Slug must be lowercase and have no whitespace").required(),
        description: Yup.string().required(),
        capacity: Yup.number('Valid number required')
            .min(0, 'Valid capacity required')
            .required(),
        // partners: Yup.string().required(),
        elocation: Yup.string().required(),
        imageUrl: Yup.string().url().required(),
    });

    const initialValues = {
        ename: "",
        slug: "",
        description: "",
        capacity: "",
        facebookUrl: "",
        elocation: "",
        imageUrl: "",
        startDate: new Date(),
        endDate: new Date()
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Create Event - BizTech Admin</title>
            </Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitValues}
            >
                {props => <NewEventForm {...props} />}
            </Formik>
        </React.Fragment>
    )

    async function submitValues(values) {
        const body = {
            ename: values.ename,
            id: values.slug,
            description: values.description,
            capac: values.capacity,
            elocation: values.elocation,
            imageUrl: values.imageUrl,
            facebookUrl: values.facebookUrl,
            startDate: values.startDate,
            endDate: values.endDate
        }
        fetchBackend('/events', 'POST', body)
            .then(response => {
                alert(response.message)
                window.location.href = '/';
            })
            .catch(err => {
                log(err)
                if (err.status === 409) {
                    alert('Failed. Event with that slug/id already exists')
                }
                else alert(err.message + ' Please contact a dev')
            })

    }

}