import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"
import { Formik } from "formik";
import EditEventForm from '../../components/Forms/EditEvent'
import { fetchBackend } from '../../utils'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';

function EventEdit(props) {

    const { id: eventId } = useParams();
    const [ event, setEvent ] = useState(null);

    const { events } = props;

    useEffect(() => {
        // Get the initial values
        if(!event && events && eventId) {
            setEvent(events.find(event => event.id === eventId));
        }
    }, [event, events, setEvent, eventId])

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

    const initialValues = event ? {
        ename: event.ename,
        slug: event.id,
        description: event.description,
        capacity: event.capac,
        partners: event.partners,
        elocation: event.elocation,
        imageUrl: event.imageUrl,
        startDate: event.startDate,
        endDate: event.endDate
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

    return event ? (
        <React.Fragment>
            <Helmet>
                <title>Edit {event.ename} - BizTech Admin</title>
            </Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitValues}
            >
                {props => <EditEventForm {...props} />}
            </Formik>
        </React.Fragment>
    ) : null

    async function submitValues(values) {
        const body = {
            ename: values.ename,
            description: values.description,
            capac: values.capacity,
            elocation: values.elocation,
            imageUrl: values.imageUrl,
            startDate: values.startDate,
            endDate: values.endDate
        }

        fetchBackend(`/events/${values.slug}`, 'PATCH', body)
            .then((response) => response.json())
            .then((response) => {
                alert(response)
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
        events: state.pageState.events,
    };
};

export default connect(mapStateToProps, {})(EventEdit);