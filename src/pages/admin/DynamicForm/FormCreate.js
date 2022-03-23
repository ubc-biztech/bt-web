import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Fab, Grid, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Link } from "react-router-dom";
import CustomQuestion from "./components/CustomQuestion";
import QuestionPreview from "./components/QuestionPreview";
import FormCreatePreview from "./FormCreatePreview";

// Styling Material UI Components
const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      margin: "auto",
    },
  },
  content: {
    padding: theme.spacing(3),
  },
  fab: {
    marginBottom: 0,
  },
  button: {
    background: "#7EA4C8",
    color: "#FFFFFF",
    "&:hover": {
      background: "#5D8AB4",
    },
  },
  upDownFab: {
    background: "#172037",
    "&:hover": {
      background: "#11182B",
    },
  },
}));

// Styling custom Components
const styles = {
  // Above the paper/dynamic form
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header1: {
    color: "white",
  },
  // Container for custom form image
  imageContainer: {
    boxSizing: "border-box",
    padding: "1rem",
    display: "flex",
    justifyContent: "stretch",
    position: "relative",
  },
  image: {
    background: "#EEEEEE",
    borderRadius: 5,
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  // Sections (divides image / basic info / custom questions)
  basicInfoSection: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  // Add question (bottom of the dynamic form)
  addQuestion: {
    display: "flex",
    justifyContent: "center",
  },
  // Preview pane
  preview: {
    marginTop: -80,
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "100px 0",
  },
  // Editor pane
  editor: {
    background: "#172037",
    marginTop: -80,
    height: "100vh",
    overflowY: "auto",
  },
  editorDivider: {
    width: "100%",
    height: 1,
    background: "#1F2A47",
  },
  editorSection: {
    padding: "1rem",
  },
  editorHeadmast: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editorTitle: {
    marginTop: 0,
    fontSize: "1.2rem",
    paddingTop: "1rem",
    color: "#FFFFFF",
  },
  editorSectionTitle: {
    color: "#FFFFFF",
    opacity: "0.63",
    fontSize: "1rem",
    fontWeight: "500",
  },
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
    required: true,
  },
  {
    type: "CHECKBOX",
    label: "Which college do you attend?",
    choices: "UBC,SFU,KPU,Douglas",
    required: true,
  },
  {
    type: "SELECT",
    label: "How interested are you in this event?",
    choices: "1,2,3,4,5",
    required: true,
  },
];

const FormCreate = () => {
  const classes = useStyles();

  // Basic questions hooks
  const [imageURL, setImageURL] = useState(""); // for reference when upload to DB
  const [eventName, setEventName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [location, setLocation] = useState("");

  // Custom questions data
  const [questionsData, setQuestionsData] = useState(dummyData);

  const handleAddQuestion = () => {
    const defaultQuestion = {
      type: "TEXT",
      label: "",
      choices: "",
      required: true,
    };
    const newQuestionsData = [...questionsData, defaultQuestion];
    setQuestionsData(newQuestionsData);
  };

  const handleEditQuestion = (index, key, value) => {
    const newQuestionsData = [...questionsData];

    newQuestionsData[index][key] = value;

    setQuestionsData(newQuestionsData);
  };

  const handleMoveQuestion = (index, direction) => {
    // PREREQUISITE: if moving down, index is not last; if moving up, index is not first

    const newQuestionsData = [...questionsData];
    const temp = newQuestionsData[index];
    // swap with index above or below (if moving up or down, respectively)
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    newQuestionsData[index] = newQuestionsData[swapIndex];
    newQuestionsData[swapIndex] = temp;

    setQuestionsData(newQuestionsData);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestionsData = [...questionsData];

    newQuestionsData.splice(index, 1);

    setQuestionsData(newQuestionsData);
  };

  const editorCustomQuestions = questionsData.map((question, index) => {
    return (
      <CustomQuestion
        key={index}
        index={index}
        length={questionsData.length}
        data={question}
        fnMove={handleMoveQuestion}
        fnEdit={handleEditQuestion}
        fnDelete={handleDeleteQuestion}
      />
    );
  });

  const handleSave = (e) => {
    e.preventDefault();

    const registrationQuestions = questionsData.map((question) => {
      return {
        type: question.questionType,
        label: question.question,
        required: question.required,
        choices: question.choices,
      };
    });

    const payload = {
      imageUrl: imageURL,
      name: eventName,
      slug: slug,
      description: description,
      capacity: capacity,
      start: start,
      end: end,
      location: location,
      registrationQuestions: registrationQuestions,
    };

    // TODO: Validify inputs
    // TODO: Handle actual submit to DB

    console.log(payload);
  };

  return (
    <>
      <Helmet>
        <title>Create Event - Biztech Admin</title>
      </Helmet>

      <Grid container>
        <Grid
          item
          xs={8}
          style={{
            maxHeight: "calc(100vh - 130px)",
          }}
        >
          <FormCreatePreview
            imageURL={imageURL}
            eventName={eventName}
            description={description}
            questionsData={questionsData}
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            maxHeight: "calc(100vh - 130px)",
          }}
        >
          {/* Editor Pane */}
          <div style={styles.editor} className="discrete-scrollbar">
            {/* Editor Head */}
            <div style={{ ...styles.editorSection, ...styles.editorHeadmast }}>
              <h3 style={styles.editorTitle}>{eventName || "New Event"}</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                  variant="contained"
                  component={Button}
                  color="primary"
                  to={{ pathname: `/register/${slug}` }}
                >
                  Event Link
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("Published")}
                >
                  Publish
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
            <div style={styles.editorDivider}></div>

            <div style={styles.editorSection}>
              <h3 style={styles.editorSectionTitle}>Event Cover Photo</h3>
              <TextField
                label="Image URL"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={(e) => setImageURL(e.target.value)}
                value={imageURL}
              />
            </div>

            <div style={styles.editorDivider}></div>
            <div style={styles.editorSection}>
              <h3 style={styles.editorSectionTitle}>Event Information</h3>
              {/* Basic Information */}
              <TextField
                label="Event Name"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
              />
              <TextField
                label="Event Slug (URL)"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
              />
              {slug && (
                <div style={{ color: "#FFFFFF", opacity: "0.7" }}>
                  {"http://ubcbiztech.com/register/" + slug}
                </div>
              )}
              <TextField
                label="Description"
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
                variant="filled"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <TextField
                label="Capacity"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              />

              {/* TODO: start and end should be date pickers */}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <KeyboardDateTimePicker
                      label="Start Time & Date"
                      required
                      margin="normal"
                      inputVariant="filled"
                      onChange={(date) => setStart(date)}
                      value={start}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardDateTimePicker
                      label="End Time & Date"
                      required
                      margin="normal"
                      inputVariant="filled"
                      onChange={(date) => setEnd(date)}
                      value={end}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>

              <TextField
                label="Location"
                fullWidth
                required
                margin="normal"
                variant="filled"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>

            <div style={styles.editorDivider}></div>
            <div style={styles.editorSection}>
              {/* Dynamic Information */}
              {editorCustomQuestions}

              {/* Add question */}
              <div style={styles.addQuestion}>
                <Fab
                  onClick={() => handleAddQuestion()}
                  className={classes.fab}
                  color="primary"
                  aria-label="add"
                >
                  <Add />
                </Fab>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default FormCreate;
