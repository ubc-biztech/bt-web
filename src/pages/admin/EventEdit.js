import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"
import { Formik } from "formik";
import { setEvent } from "../../actions/PageActions";
import EditEventForm from '../../components/Forms/EditEvent'
import { fetchBackend } from '../../utils'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';

function EventEdit(props) {

    const { id: eventId } = useParams();

    const { setEvent, event, events } = props;

    useEffect(() => {
        // Reupdate only if event does not exist, and there are events to filter
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

    return props.event ? (
        <React.Fragment>
            <Helmet>
                <title>Edit {props.event.ename} - BizTech Admin</title>
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
        event: state.pageState.event,
        events: state.pageState.events,
    };
};

export default connect(mapStateToProps, { setEvent })(EventEdit);