import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup } from "@material-ui/core";

import Loading from "pages/Loading";
import NotFound from "pages/NotFound";
import EventView from "components/Event/EventView";
import CustomTextField from "components/inputs/CustomTextField";
import CustomSelect from "components/inputs/CustomSelect"
import EventEditForm from "./EventEditForm";
import EventEditTextFields from './EventEditTextFields';
import EventEditSelectFields from './EventEditSelectFields';
import EventEditCheckBoxFields from './EventEditCheckBoxFields'
import DropDown from "components/layout/DropDown";

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
    padding: "10px 20px 10px 20px",
  },
  container: {
    padding: "10px 0px 10px 0px",
  },
  dropDownButton: {
    cursor: "pointer",
    fontSize: "20px",
  }
}));

const EventEdit = (props) => {
  const { events } = props;

  const classes = useStyles();
  const { id: eventId, year: eventYear } = useParams();
  const history = useHistory();

  const [event, setEvent] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    // Get the initial values
    setIsEditing(eventId !== undefined && eventYear !== undefined);
    let event = null;
    if (eventId && eventYear) {
      event = events.find(
        (event) => event.id === eventId && event.year.toString() === eventYear
      );
      setEvent(event);
      setLoaded(true);
    }
    setInitialValues(event
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
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          textFields: event.textFields ?? [],
          selectFields: event.selectFields ?? [],
          checkBoxFields: event.checkBoxFields ?? []

        }
      : {
          ename: "",
          slug: "",
          description: "",
          capacity: "",
          facebookUrl: "",
          elocation: "",
          longitude: "",
          latitude: "",
          imageUrl: "",
          startDate: new Date(),
          endDate: new Date(),
          textFields: [],
          selectFields: [],
          checkBoxFields: []
        });
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

  if (!loaded && isEditing)
    return (
      <Loading
        message={`Loading event with id ${eventId} and year ${eventYear}`}
      />
    );
  return event || !isEditing ? (
    <div className={classes.layout}>
      <Helmet>
        <title>{isEditing ? `Edit ${event.ename}` : "Create Event"} - BizTech Admin</title>
      </Helmet>
      <div>
        <Typography variant="h4" align="center">
          {isEditing ? "Edit Event" : "Create Event"}
        </Typography>

        <DropDown dropDownName={"Event Details"}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
            enableReinitialize
          >
            {(props) => (
              <EventEditForm initialValues={initialValues} setInitialValues={setInitialValues} isEditing={isEditing} {...props} />
            )}
          </Formik>
        </DropDown>

        <DropDown dropDownName={"Registration Form Text Fields"}>
          <EventEditTextFields initialValues={initialValues} setInitialValues={setInitialValues} />
        </DropDown>

        <DropDown dropDownName={"Registration Form Select Fields"}>
          <EventEditSelectFields initialValues={initialValues} setInitialValues={setInitialValues} />
        </DropDown>

        <DropDown dropDownName={"Registration Form CheckBox Fields"}>
          <EventEditCheckBoxFields initialValues={initialValues} setInitialValues={setInitialValues} />
        </DropDown>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {submitValues()}}>
          Submit
        </Button>
      </div>

      <div>
        <Paper className={classes.paper}>
          <EventView event={initialValues}>
            {initialValues.checkBoxFields.map((checkBoxField, index) =>
              <div style={{marginBottom: "15px"}} key={checkBoxField.value + index}>
                <FormControl>
                  <FormGroup>
                    <FormControlLabel
                      label={checkBoxField.value}
                      control={
                        <Checkbox />
                      } />
                  </FormGroup>
                </FormControl>
              </div>
            )}

            {initialValues.textFields.map((textField, index) =>
              <div style={{marginBottom: "15px"}} key={textField.value + index}>
                <CustomTextField
                  label={textField.value}
                  touched={{}}
                />
              </div>
            )}

            {initialValues.selectFields.map((selectField, index) =>
              <div style={{marginBottom: "15px"}} key={selectField.value + index}>
                <CustomSelect
                  label={selectField.value}
                  listOfOptions={selectField.options}
                  touched={{}}
                />
              </div>
            )}
          </EventView>
        </Paper>
      </div>
    </div>
  ) : (
    <NotFound
      message={`The event with id ${eventId} and ${eventYear} could not be found`}
    />
  );

  async function submitValues() {
    const body = {
      ...initialValues,
      id: initialValues.slug,
      year: initialValues.startDate.getFullYear(),
      capac: parseInt(initialValues.capacity)
    };

    const endpoint = isEditing ? `/events/${body.id}/${parseInt(body.year)}`: "/events";
    const method = isEditing ? "PATCH" : "POST";

    fetchBackend(endpoint, method, body)
      .then((response) => {
        alert(response.message);
        // TODO: refactor using redux to update the event
        history.push(`/admin/home`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message + " Please contact a dev");
      });
  }
};

export default EventEdit;
