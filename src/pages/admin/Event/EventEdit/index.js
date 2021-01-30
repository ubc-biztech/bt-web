import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

import Loading from "pages/Loading";
import NotFound from "pages/NotFound";
import EventView from "components/Event/EventView";
import EventEditForm from "./EventEditForm";

import { fetchBackend } from "utils";

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      margin: "auto",
    },
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      width: 600,
      margin: theme.spacing(3),
    },
  },
  content: {
    padding: theme.spacing(3),
  },
}));

const EventEdit = (props) => {
  const { events } = props;

  const classes = useStyles();
  const { id: eventId, year: eventYear } = useParams();
  const history = useHistory();

  const [event, setEvent] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [previewEvent, setPreviewEvent] = useState({});

  useEffect(() => {
    // Get the initial values
    if (eventId && eventYear) {
      const event = events.find(
        (event) => event.id === eventId && event.year.toString() === eventYear
      );
      setEvent(event);
      setPreviewEvent(event);
      setLoaded(true);
    }
  }, [eventId, eventYear, events]);

  const validationSchema = Yup.object({
    ename: Yup.string().required(),
    description: Yup.string().required(),
    capacity: Yup.number("Valid number required")
      .min(0, "Valid capacity required")
      .required(),
    elocation: Yup.string().required(),
    longitude: Yup.number("Valid number required")
      .min(-180, "Valid number required")
      .max(180, "Valid number required")
      .required(),
    latitude: Yup.number("Valid number required")
      .min(-180, "Valid number required")
      .max(180, "Valid number required")
      .required(),
    facebookUrl: Yup.string().url(),
    imageUrl: Yup.string().url().required(),
  });

  const initialValues = event
    ? {
        ename: event.ename,
        slug: event.id,
        description: event.description,
        capacity: event.capac,
        facebookUrl: event.facebookUrl,
        elocation: event.elocation || "",
        longitude: event.longitude || "",
        latitude: event.latitude || "",
        imageUrl: event.imageUrl,
        startDate: event.startDate,
        endDate: event.endDate,
      }
    : {
        ename: "",
        description: "",
        capacity: "",
        facebookUrl: "",
        elocation: "",
        longitude: "",
        latitude: "",
        imageUrl: "",
        startDate: "",
        endDate: "",
      };

  if (!loaded)
    return (
      <Loading
        message={`Loading event with id ${eventId} and year ${eventYear}`}
      />
    );
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
            {(props) => (
              <EventEditForm updatePreview={setPreviewEvent} {...props} />
            )}
          </Formik>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <EventView event={previewEvent} />
      </Paper>
    </div>
  ) : (
    <NotFound
      message={`The event with id ${eventId} and ${eventYear} could not be found`}
    />
  );

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
      endDate: values.endDate,
    };

    fetchBackend(
      `/events/${values.slug}/${parseInt(values.startDate)}`,
      "PATCH",
      body
    )
      .then((response) => {
        alert(response.message);
        history.push(`/event/${values.slug}/${parseInt(values.startDate)}`);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message + " Please contact a dev");
      });
  }
};

export default EventEdit;
