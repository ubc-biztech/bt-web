import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"
import { Formik } from "formik";
import EditEventForm from '../../components/Forms/EditEvent'
import { fetchBackend } from '../../utils'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    layout: {
        [theme.breakpoints.up('sm')]: {
            width: 600,
            margin: 'auto',
        },
    },
    paper: {
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(3),
        },
        color: '#FFFFFF',
        backgroundColor: 'rgb(174, 196, 244, 0.19)'
    },
    content: {
        padding: theme.spacing(3),
    }
}));

function EventEdit(props) {
    const classes = useStyles();

    const { id: eventId } = useParams();
    const [event, setEvent] = useState(null);

    const { events } = props;

    useEffect(() => {
        // Get the initial values
        if (!event && events && eventId) {
            setEvent(events.find(event => event.id === eventId));
        }
    }, [event, events, setEvent, eventId])

    const validationSchema = Yup.object({
        ename: Yup.string().required(),
        description: Yup.string().required(),
        capacity: Yup.number('Valid number required')
            .min(0, 'Valid capacity required')
            .required(),
        elocation: Yup.string().required(),
        longitude: Yup.number('Valid number required')
            .min(-180, 'Valid number required')
            .max(180, "Valid number required")
            .required(),
        latitude: Yup.number('Valid number required')
            .min(-180, 'Valid number required')
            .max(180, "Valid number required")
            .required(),
        facebookUrl: Yup.string().url(),
        imageUrl: Yup.string().url().required(),
    });

    const initialValues = event ? {
        ename: event.ename,
        slug: event.id,
        description: event.description,
        capacity: event.capac,
        facebookUrl: event.facebookUrl,
        elocation: event.elocation,
        longitude: event.longitude,
        latitude: event.latitude,
        imageUrl: event.imageUrl,
        startDate: event.startDate,
        endDate: event.endDate
    } : {
            ename: "",
            description: "",
            capacity: "",
            facebookUrl: "",
            elocation: "",
            longitude: "",
            latitude: "",
            imageUrl: "",
            startDate: "",
            endDate: ""
        };

    return event ? (
        <div className={classes.layout}>
            <Helmet>
                <title>Edit {event.ename} - BizTech Admin</title>
            </Helmet>
            <Paper className={classes.paper}>
                <div className={classes.content}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Edit Event
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitValues}
                    >
                        {props => <EditEventForm {...props} />}
                    </Formik>
                </div>
            </Paper>
        </div>
    ) : null

    async function submitValues(values) {
        const body = {
            ename: values.ename,
            description: values.description,
            capac: values.capacity,
            elocation: values.elocation,
            longitude: values.longitude,
            latitude: values.latitude,
            imageUrl: values.imageUrl,
            facebookUrl: values.facebookUrl,
            startDate: values.startDate,
            endDate: values.endDate
        }

        fetchBackend(`/events/${values.slug}`, 'PATCH', body)
            .then((response) => {
                alert(response)
                window.location.href = '/';
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