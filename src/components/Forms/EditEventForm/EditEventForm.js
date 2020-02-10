import React from 'react'
import * as Yup from "yup"
import { Formik } from "formik";
import EditEventFormComponent from './EditEventFormComponent'
import { fetchBackend } from '../../../utils'
import { connect } from "react-redux";

function EditEventForm(props) {
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

    const initialValues = props.event ? {
        ename: props.event.ename,
        slug: props.event.id,
        description: props.event.description,
        capacity: props.event.capac,
        partners: props.event.partners,
        elocation: props.event.elocation,
        imageUrl: props.event.imageUrl,
        startDate: props.event.startDate,
        endDate: props.event.endDate
    } : {
            ename: "",
            slug: "",
            description: "",
            capacity: "",
            partners: "",
            elocation: "",
            imageUrl: "",
            startDate: "",
            endDate: ""
        };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
        >
            {props => <EditEventFormComponent {...props} />}
        </Formik>
    )

    async function submitValues(values) {
        const body = JSON.stringify({
            ename: values.ename,
            id: values.slug,
            description: values.description,
            capac: values.capacity,
            elocation: values.elocation,
            imageUrl: values.imageUrl,
            startDate: values.startDate,
            endDate: values.endDate
        })

        fetchBackend('/events/update', 'POST', body)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                alert('Event Updated!')
                window.location.href = "/";
            })
            .catch(err => {
                console.log(err)
                alert(err.message + ' Please contact a dev')
            })
    }

}
const mapStateToProps = state => {
    return {
        event: state.pageState.event,
    };
};

export default connect(mapStateToProps)(EditEventForm);