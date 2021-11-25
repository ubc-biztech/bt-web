import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Helmet } from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns"
import { Button, Container, Fab, Grid, MenuItem, Paper, Select, TextField } from "@material-ui/core"
import { Add, Delete, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

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
  paper: {
    marginBottom: theme.spacing(5)
  },
  fab: {
    marginBottom: -28
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
}))

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
    height: 300
  },
  imageButton: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem"
  },
  // Sections (divides image / basic info / custom questions)
  section: {
    borderStyle: "solid none none none",
    borderWidth: 1,
    borderColor: "#1F2A47"
  },
  basicInfoSection: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  customQuestionsSection: {
    padding: "1rem"
  },
  // Add question (bottom of the dynamic form)
  addQuestion: {
    display: "flex",
    justifyContent: "center"
  },
  // -------- QUESTION COMPONENT STYLES ----------
  card: {
    background: "#1F2A47",
    borderRadius: 5,
    padding: "1rem",
    marginBottom: "1rem"
  },
  cardActions: {
    display: "flex"
  },
  iconsContainer: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "flex-end"
  }
}

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
const dummyData = {
  101: {
    questionType: "TEXT",
    question: "How old are you",
    data: "",
    required: true
  },
  102: {
    questionType: "CHECKBOX",
    question: "Which college do you attend?",
    data: "UBC, SFU, KPU, Douglas",
    required: true
  },
  103: {
    questionType: "SELECT",
    question: "How interested are you in this event?",
    data: "1, 2, 3, 4, 5",
    required: true
  }
}

const FormCreate = () => {
  const classes = useStyles()

  // Basic questions hooks
  const [eventName, setEventName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [capacity, setCapacity] = useState("")
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [location, setLocation] = useState("")

  // Custom questions data
  const [questionsData, setQuestionsData] = useState(dummyData)
  const [displayCustomQuestions, setDisplayCustomQuestions] = useState([])
  const [refresh, setRefresh] = useState(false) // since content of object =/= change for useEffect

  // Renders custom questions
  useEffect(() => {
    const questions = []

    Object.entries(questionsData).map(([id, data]) => (
      questions.push(<Question key={id} data={{ id, ...data }} />)
    ))

    setDisplayCustomQuestions(questions)
  }, [refresh, questionsData])

  const handleAddQuestion = () => {
    const newId = uuidv4()
    const newQuestionsData = {
      ...questionsData,
      [newId]: {
        questionType: "TEXT",
        question: "",
        data: "",
        required: true
      }
    }
    setQuestionsData(newQuestionsData)
  }

  const handleEditQuestion = ({ id, data }) => {
    const newQuestionsData = questionsData

    setQuestionsData(newQuestionsData)
  }

  const handleDeleteQuestion = (id) => {
    const newQuestionsData = questionsData
    delete newQuestionsData[id]
    setQuestionsData(newQuestionsData)
    setRefresh(!refresh)
  }

  const Question = (props) => {
    const { id, questionType, question, data, required } = props.data

    return (
      <div style={styles.card}>
        <div style={styles.cardActions}>
          <Select
            className={classes.select}
            labelId="q-type"
            variant="outlined"
            margin="dense"
            value={questionType}
            // onChange={handleChange}
          >
            <MenuItem value="TEXT">Text</MenuItem>
            <MenuItem value="CHECKBOX">Checkbox</MenuItem>
            <MenuItem value="SELECT">Selection</MenuItem>
          </Select>
          <div style={styles.iconsContainer}>
            <Fab className={classes.upDownFab} size="small" aria-label="add">
              <KeyboardArrowUp />
            </Fab>
            <Fab className={classes.upDownFab} size="small" aria-label="add">
              <KeyboardArrowDown />
            </Fab>
            <Fab onClick={() => handleDeleteQuestion(id)} size="small" color="secondary" aria-label="add">
              <Delete />
            </Fab>
          </div>
        </div>
        <div>
          {id}, {question}, {data}, {required ? "yes" : "no"} <br />

        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Create Event - Biztech Admin</title>
      </Helmet>

      <Container maxWidth="sm">

        <div style={styles.head}>
          <h1 style={styles.header1}>{eventName || "New Event"}</h1>
          <div>
            <Button
              className={classes.button}
              variant="contained"
              style={{ marginRight: "1rem" }}>
                Preview
            </Button>
            <Button
              variant="contained"
              color="primary">
                Save
            </Button>
          </div>
        </div>

        <Paper className={classes.paper}>

          {/* Image */}
          <div style={styles.imageContainer}>
            <img style={styles.image} src="" alt="Image" />
            <Button
              style={styles.imageButton}
              className={classes.button}
              variant="contained" >
                Add Image
            </Button>
          </div>

          {/* Basic Information */}
          <div style={{ ...styles.section, ...styles.basicInfoSection }}>

            <TextField
              label="Event Name"
              fullWidth required
              margin="normal"
              variant="filled"
              onChange={e => setEventName(e.target.value)}
              value={eventName} />
            <TextField
              label="Event Slug (URL)"
              fullWidth required
              margin="normal"
              variant="filled"
              onChange={e => setSlug(e.target.value)}
              value={slug} />
            {slug && (
              <div style={{ opacity: "0.7" }}>
                {"http://ubcbiztech.com/register/" + slug}
              </div>
            )}
            <TextField
              label="Description"
              fullWidth required multiline
              rows={4}
              margin="normal"
              variant="filled"
              onChange={e => setDescription(e.target.value)}
              value={description} />
            <TextField
              label="Capacity"
              fullWidth required
              margin="normal"
              variant="filled"
              onChange={e => setCapacity(e.target.value)}
              value={capacity} />

            {/* TODO: start and end should be date pickers */}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <KeyboardDateTimePicker
                    label="Start Time & Date"
                    required
                    margin="normal"
                    inputVariant="filled"
                    onChange={e => setStart(e.target.value)}
                    value={start} />
                </Grid>
                <Grid item xs={6}>
                  <KeyboardDateTimePicker
                    label="End Time & Date"
                    required
                    margin="normal"
                    inputVariant="filled"
                    onChange={e => setEnd(e.target.value)}
                    value={end} />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>

            <TextField
              label="Location"
              fullWidth required
              margin="normal"
              variant="filled"
              onChange={e => setLocation(e.target.value)}
              value={location} />

          </div>

          {/* Dynamic Information */}
          <div style={{ ...styles.section, ...styles.customQuestionsSection }}>

            {displayCustomQuestions}

          </div>

          {/* Add question */}
          <div style={styles.addQuestion}>
            <Fab
              onClick={() => handleAddQuestion()}
              className={classes.fab}
              color="primary"
              aria-label="add">
              <Add />
            </Fab>
          </div>
        </Paper>

      </Container>
    </>
  )
}

export default FormCreate
