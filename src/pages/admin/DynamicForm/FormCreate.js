import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Fab, Grid, TextField, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { useParams, useHistory, Link } from "react-router-dom";
import CustomQuestion from "./components/CustomQuestion";
import FormCreatePreview from "./FormCreatePreview";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { fetchBackend, log } from "utils";
import { fetchEvents } from "store/event/eventActions";


// Styling Material UI Components
const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      margin: "auto"
    }
  },
  content: {
    padding: theme.spacing(3)
  },
  fab: {
    marginBottom: 0
  },
  button: {
    background: "#7EA4C8",
    color: "#FFFFFF",
    "&:hover": {
      background: "#5D8AB4"
    }
  },
  upDownFab: {
    background: "#172037",
    "&:hover": {
      background: "#11182B"
    }
  }
}));

// Styling custom Components
const styles = {
  // Above the paper/dynamic form
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  header1: {
    color: "white"
  },
  // Container for custom form image
  imageContainer: {
    boxSizing: "border-box",
    padding: "1rem",
    display: "flex",
    justifyContent: "stretch",
    position: "relative"
  },
  image: {
    background: "#EEEEEE",
    borderRadius: 5,
    width: "100%",
    height: 300,
    objectFit: "cover"
  },
  // Sections (divides image / basic info / custom questions)
  basicInfoSection: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  // Add question (bottom of the dynamic form)
  addQuestion: {
    display: "flex",
    justifyContent: "center"
  },
  // Preview pane
  preview: {
    marginTop: -80,
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "100px 0"
  },
  // Editor pane
  editor: {
    background: "#172037",
    marginTop: -80,
    height: "100vh",
    overflowY: "auto"
  },
  editorDivider: {
    width: "100%",
    height: 1,
    background: "#1F2A47"
  },
  editorSection: {
    padding: "1rem"
  },
  editorHeadmast: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  editorTitle: {
    marginTop: 0,
    fontSize: "1.2rem",
    paddingTop: "1rem",
    color: "#FFFFFF"
  },
  editorSectionTitle: {
    color: "#FFFFFF",
    opacity: "0.63",
    fontSize: "1rem",
    fontWeight: "500"
  }
};

const FormCreateForm = (props) => {
  const classes = useStyles();
  const { id: eventId, year: eventYear } = useParams();
  const {
    values: {
      imageUrl,
      eventName,
      slug,
      description,
      capacity,
      start,
      end,
      location,
      deadline,
      registrationQuestions
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    submitCount,
    handlePublish,
    isSaved,
    isPublished
  } = props;

  const defaultQuestion = {
    type: "TEXT",
    label: "",
    choices: "",
    required: true
  };

  const handleStartDateChange = (date) => {
    setFieldValue("start", date);
    setFieldTouched("start", true, false);
  };

  const handleEndDateChange = (date) => {
    setFieldValue("end", date);
    setFieldTouched("end", true, false);
  };

  const handleDeadlineChange = (date) => {
    setFieldValue("deadline", date);
    setFieldTouched("deadline", true, false);
  };

  const showError = (id) => {
    return Boolean(errors[id] && (touched[id] || submitCount > 0));
  };

  const CustomQuestions = (
    <FieldArray name="registrationQuestions">
      {({ push, swap, remove }) => {
        return (
          <>
            {registrationQuestions.map((question, index) => {
              return (
                <CustomQuestion
                  id={`registrationQuestions[${index}]`}
                  name={`registrationQuestions[${index}]`}
                  key={index}
                  index={index}
                  length={registrationQuestions.length}
                  data={question}
                  fnMove={swap}
                  fnDelete={remove}
                />
              );
            })}
            {/* Add question */}
            <div style={styles.addQuestion}>
              <Fab
                onClick={() => push({ ...defaultQuestion })}
                className={classes.fab}
                color="primary"
                aria-label="add"
              >
                <Add />
              </Fab>
            </div>
          </>
        );
      }}
    </FieldArray>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Helmet>
        <title>Create Event - Biztech Admin</title>
      </Helmet>

      <Grid container>
        <Grid
          item
          xs={8}
          style={{
            maxHeight: "calc(100vh - 130px)"
          }}
        >
          <FormCreatePreview
            imageUrl={imageUrl}
            eventName={eventName}
            description={description}
            questionsData={registrationQuestions}
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            maxHeight: "calc(100vh - 130px)"
          }}
        >
          {/* Editor Pane */}
          <div style={styles.editor} className="discrete-scrollbar">
            {/* Editor Head */}
            <div style={{ ...styles.editorSection, ...styles.editorHeadmast }}>
              <h3 style={styles.editorTitle}>{eventName || "New Event"}</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                {isSaved ? 
                <Link
                  variant="contained"
                  component={Button}
                  color="primary"
                  to={{ pathname: `/event/${eventId}/${eventYear}/register`}}
                  target="_blank"
                >
                  Event Link
                </Link> : <></>}

                {isSaved &&
                  (isPublished ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePublish(false)}
                    >
                      Unpublish
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePublish(true)}
                    >
                      Publish
                    </Button>
                  ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </div>
            <div style={styles.editorDivider}></div>

            <div style={styles.editorSection}>
              <h3 style={styles.editorSectionTitle}>Event Cover Photo</h3>
              <Tooltip title="Please upload an image of size 1920px x 1080px" arrow>
                <TextField
                  id="imageUrl"
                  name="imageUrl"
                  label="Image URL"
                  fullWidth
                  required
                  margin="normal"
                  variant="filled"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={imageUrl}
                  error={showError("imageUrl")}
                  helperText={showError("imageUrl") && errors.imageUrl}
                />
              </Tooltip>
            </div>

            <div style={styles.editorDivider}></div>
            <div style={styles.editorSection}>
              <h3 style={styles.editorSectionTitle}>Event Information</h3>
              {/* Basic Information */}
              <TextField
                id="eventName"
                name="eventName"
                label="Event Name"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={eventName}
                error={showError("eventName")}
                helperText={showError("eventName") && errors.eventName}
              />
              <TextField
                id="slug"
                name="slug"
                label="Event Slug (URL)"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={slug}
                error={showError("slug")}
                helperText={showError("slug") && errors.slug}
              />
              {slug && (
                <div style={{ color: "#FFFFFF", opacity: "0.7" }}>
                  {"https://ubcbiztech.com/event/" + slug + "/" + start.getFullYear() + "/register"}
                </div>
              )}
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={description}
                error={showError("description")}
                helperText={showError("description") && errors.description}
              />
              <TextField
                id="capacity"
                name="capacity"
                label="Capacity"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={capacity}
                error={showError("capacity")}
                helperText={showError("capacity") && errors.capacity}
              />

              {/* TODO: start and end should be date pickers */}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <KeyboardDateTimePicker
                      id="start"
                      name="start"
                      label="Start Time & Date"
                      required
                      margin="normal"
                      inputVariant="filled"
                      onChange={handleStartDateChange}
                      onBlur={handleBlur}
                      value={start}
                      error={showError("start")}
                      helperText={showError("start") && errors.start}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDateTimePicker
                      id="end"
                      name="end"
                      label="End Time & Date"
                      required
                      margin="normal"
                      inputVariant="filled"
                      minDate={start}
                      onChange={handleEndDateChange}
                      onBlur={handleBlur}
                      value={end}
                      error={showError("end")}
                      helperText={showError("end") && errors.end}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>

              <TextField
                id="location"
                name="location"
                label="Location"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={location}
                error={showError("location")}
                helperText={showError("location") && errors.location}
              />

<MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <KeyboardDateTimePicker
                      id="deadline"
                      name="deadline"
                      label="Registration Deadline"
                      required
                      margin="normal"
                      inputVariant="filled"
                      onChange={handleDeadlineChange}
                      onBlur={handleBlur}
                      value={deadline}
                      error={showError("deadline")}
                      helperText={showError("deadline") && errors.deadline}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div style={styles.editorDivider}></div>
            <div style={styles.editorSection}>
              {/* Dynamic Questions */}
              {CustomQuestions}
            </div>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

/*
  Question types:
   - TEXT
   - SELECT
   - CHECKBOX

  Below is the data struct for registrationQuestions

  Full form data struct would include basic questions. E.g.:

    registration: {
      ...basicQuestions,
      ...registrationQuestion
    }
*/
const dummyData = [
  {
    type: "TEXT",
    label: "How old are you",
    choices: "",
    required: true
  },
  {
    type: "CHECKBOX",
    label: "Which college do you attend?",
    choices: "UBC,SFU,KPU,Douglas",
    required: true
  },
  {
    type: "SELECT",
    label: "How interested are you in this event?",
    choices: "1,2,3,4,5",
    required: true
  }
];

const FormCreate = (props) => {
  const { events } = props;
  const { id: eventId, year: eventYear } = useParams();
  const history = useHistory();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Get the initial values
    if (eventId && eventYear) {
      fetchBackend(`/events/${eventId}/${eventYear}`, "GET", undefined).then(
        (response) => {
          setEvent(response);
        }
      );
    }
  }, [eventId, eventYear, events]);

  const initialValues = event
    ? {
        imageUrl: event.imageUrl || "",
        eventName: event.ename || "",
        slug: event.id || "",
        description: event.description || "",
        capacity: event.capac || "",
        start: event.startDate ? new Date(event.startDate) : new Date(),
        end: event.endDate ? new Date(event.endDate) : new Date(),
        location: event.elocation || "",
        deadline: event.deadline ? new Date(event.deadline) : new Date(),
        registrationQuestions: event.registrationQuestions || dummyData
      }
    : {
        imageUrl: "",
        eventName: "",
        slug: "",
        description: "",
        capacity: "",
        start: new Date(),
        end: new Date(),
        location: "",
        deadline: new Date(),
        registrationQuestions: dummyData
      };

  const regQuestionSchema = Yup.object({
    type: Yup.mixed().oneOf(["TEXT", "SELECT", "CHECKBOX", "UPLOAD"]).required(),
    label: Yup.string().required("Question is a required field"),
    choices: Yup.string(),
    required: Yup.boolean().required()
  });

  const validationSchema = Yup.object({
    imageUrl: Yup.string().url().required(),
    eventName: Yup.string().required(),
    slug: Yup.string()
      .matches(/^[a-z\-0-9]*$/, "Slug must be lowercase and have no whitespace")
      .required(),
    description: Yup.string().required(),
    capacity: Yup.number("Valid number required")
      .min(0, "Valid capacity required")
      .required(),
    start: Yup.date().required(),
    end: Yup.date()
      .min(Yup.ref("start"), "End must be later than Start")
      .required(),
    location: Yup.string().required(),
    deadline: Yup.date()
    .max(Yup.ref("end"), "Deadline cannot be later than End")
    .required(),
    registrationQuestions: Yup.array().of(regQuestionSchema)
  });

  async function submitValues(values) {
    if (eventId && eventYear) {
      // Save edited event
      await editExistingEvent(values);
    } else {
      await createNewEvent(values);
    }
  }

  async function editExistingEvent(values) {
    const id = values.slug;
    const year = values.start.getFullYear();

    const body = {
      ename: values.eventName,
      description: values.description,
      capac: parseInt(values.capacity),
      elocation: values.location,
      imageUrl: values.imageUrl,
      startDate: values.start,
      endDate: values.end,
      deadline: values.deadline,
      registrationQuestions: values.registrationQuestions
    };

    fetchBackend(`/events/${eventId}/${parseInt(eventYear)}`, "PATCH", body)
      .then((response) => {
        alert(response.message);
        fetchEvents();
        // TODO: refactor using redux to update the event
        history.replace(`/admin/event/${id}/${year}/edit`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message + " Please contact a dev");
      });
  }

  async function createNewEvent(values) {
    const id = values.slug;
    const year = values.start.getFullYear();

    const body = {
      id,
      year,
      ename: values.eventName,
      description: values.description,
      capac: parseInt(values.capacity),
      elocation: values.location,
      imageUrl: values.imageUrl,
      startDate: values.start,
      endDate: values.end,
      deadline: values.deadline,
      isPublished: false,
      registrationQuestions: values.registrationQuestions
    };

    fetchBackend("/events", "POST", body)
      .then((response) => {
        alert(response.message);
        fetchEvents();
        history.push(`/admin/event/${id}/${year}/edit`);
      })
      .catch((err) => {
        log(err);
        if (err.status === 409) {
          alert("Failed. Event with that slug/id and year already exists");
        } else alert(err.message + " Please contact a dev");
      });
  }

  const isPublished = (event && event.isPublished) || false;
  const isSaved = !!(eventId && eventYear);

  async function handlePublish(publish = false) {
    const body = { isPublished: publish };

    fetchBackend(`/events/${eventId}/${parseInt(eventYear)}`, "PATCH", body)
      .then((response) => {
        alert(response.message);
        fetchEvents();
        // TODO: refactor using redux to update the event
        history.replace(`/admin/event/${eventId}/${eventYear}/edit`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message + " Please contact a dev");
      });
  }

  const formProps = {
    handlePublish,
    isSaved,
    isPublished
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitValues}
    >
      {(formikProps) => <FormCreateForm {...formikProps} {...formProps} />}
    </Formik>
  );
};

export default FormCreate;
