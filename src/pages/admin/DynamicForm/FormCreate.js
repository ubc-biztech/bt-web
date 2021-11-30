import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns"
import { Button, Checkbox, Container, Fab, Grid, MenuItem, Paper, Select, TextField } from "@material-ui/core"
import { Add, Delete, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import ImagePlaceholder from "../../../assets/placeholder.jpg"

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
    height: 300,
    objectFit: "cover"
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
const dummyData = [
  {
    questionType: "TEXT",
    question: "How old are you",
    choices: "",
    required: true
  },
  {
    questionType: "CHECKBOX",
    question: "Which college do you attend?",
    choices: "UBC, SFU, KPU, Douglas",
    required: true
  },
  {
    questionType: "SELECT",
    question: "How interested are you in this event?",
    choices: "1, 2, 3, 4, 5",
    required: true
  }
]

// made separate component in case want to make a new file
const Question = (props) => {
  const classes = useStyles()

  const index = props.index
  const length = props.length // the length of entire questions array

  const [questionType, setQuestionType] = useState(props.data.questionType ? props.data.questionType : "")
  const [question, setQuestion] = useState(props.data.question ? props.data.question : "")
  const [choices, setChoices] = useState(props.data.choices ? props.data.choices : "")
  const [required, setRequired] = useState(props.data.required ? props.data.required : false)

  const questionStyles = {
  // -------- QUESTION COMPONENT STYLES ----------
    card: {
      background: "#1F2A47",
      borderRadius: 5,
      padding: "1rem",
      marginBottom: "1rem"
    },
    cardActions: {
      display: "flex",
      alignItems: "center"
    },
    iconsContainer: {
      flexGrow: 2,
      display: "flex",
      justifyContent: "flex-end"
    },
    deleteIcon: {
      borderRadius: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      background: "rgba(0,0,0,0.2)",
      padding: 5,
      "&:hover": {
        background: "rgba(0,0,0,0.5)"
      }
    },
    arrowIcon: {
      height: 16,
      borderRadius: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    },
    move: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    requiredContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }
  }

  useEffect(() => {
    setQuestionType(props.data.questionType)
    setQuestion(props.data.question)
    setChoices(props.data.choices)
    setRequired(props.data.required)
  }, [props.data])

  const handleEditQuestionType = (e) => {
    props.fnEdit(index, "questionType", e.target.value)
    if (e.target.value === "TEXT") {
      props.fnEdit(index, "choices", "") // Clear options
      setChoices("")
    }
    setQuestionType(e.target.value)
  }

  const handleEditQuestion = (e) => {
    props.fnEdit(index, "question", e.target.value)
    setQuestion(e.target.value)
  }

  const handleEditChoices = (e) => {
    props.fnEdit(index, "choices", e.target.value)
    setChoices(e.target.value)
  }

  const handleEditRequired = (e) => {
    props.fnEdit(index, "required", e.target.checked)
    setRequired(e.target.checked)
  }

  return (
    <div style={questionStyles.card}>
      <div style={questionStyles.cardActions}>
        <Select
          className={classes.select}
          labelId="q-type"
          variant="outlined"
          margin="dense"
          value={questionType}
          onChange={handleEditQuestionType}>
          <MenuItem value="TEXT">Text</MenuItem>
          <MenuItem value="CHECKBOX">Checkbox</MenuItem>
          <MenuItem value="SELECT">Selection</MenuItem>
        </Select>
        <div style={questionStyles.iconsContainer}>
          <div style={questionStyles.move}>
            {!(index === 0) && (
              <div style={questionStyles.arrowIcon} onClick={() => props.fnMove(index, "up")}>
                <KeyboardArrowUp />
              </div>
            )}
            {!(index === length) && (
              <div style={questionStyles.arrowIcon} onClick={() => props.fnMove(index, "down")}>
                <KeyboardArrowDown />
              </div>
            )}
          </div>
          <div style={questionStyles.deleteIcon} onClick={() => props.fnDelete(index)}>
            <Delete />
          </div>
        </div>
      </div>
      <div>

        <TextField
          label="Question"
          fullWidth required
          margin="normal"
          variant="filled"
          onChange={handleEditQuestion}
          value={question} />

        {(questionType === "SELECT" || questionType === "CHECKBOX") && (
          <TextField
            label="Options"
            fullWidth required
            margin="normal"
            variant="filled"
            onChange={handleEditChoices}
            value={choices} />
        )}

        <div style={questionStyles.requiredContainer}>
          Required?
          <Checkbox aria-label="Required question?" checked={required} onChange={handleEditRequired} />
        </div>

      </div>
    </div>
  )
}

const FormCreate = () => {
  const classes = useStyles()

  // Show preview
  const [showPreview, setShowPreview] = useState(false)

  // Basic questions hooks
  const [selectedImage, setSelectedImage] = useState() // image to upload
  const [imageURL, setImageURL] = useState("") // for reference when upload to DB
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
    const displayArray = []

    for (let index = 0; index < questionsData.length; index++) {
      displayArray.push(
        <Question
          key={index}
          index={index}
          data={questionsData[index]}
          fnMove={handleMoveQuestion}
          fnEdit={handleEditQuestion}
          fnDelete={handleDeleteQuestion} />
      )
    }

    setDisplayCustomQuestions(displayArray)
  }, [refresh, questionsData])

  const handleAddQuestion = () => {
    const newQuestionsData = questionsData

    newQuestionsData.push({
      questionType: "TEXT",
      question: "",
      choices: "",
      required: true
    })

    setQuestionsData(newQuestionsData)
    setRefresh(!refresh)
  }

  const handleEditQuestion = (index, key, value) => {
    const newQuestionsData = questionsData

    newQuestionsData[index][key] = value

    setQuestionsData(newQuestionsData)
    setRefresh(!refresh)
  }

  const handleMoveQuestion = (index, direction) => {
    // PREREQUISITE: if moving down, index is not last; if moving up, index is not first

    const newQuestionsData = questionsData
    const temp = newQuestionsData[index]
    // swap with index above or below (if moving up or down, respectively)
    const swapIndex = (direction === "up") ? index - 1 : index + 1

    newQuestionsData[index] = newQuestionsData[swapIndex]
    newQuestionsData[swapIndex] = temp

    setQuestionsData(newQuestionsData)
    setRefresh(!refresh)
  }

  const handleDeleteQuestion = (index) => {
    const newQuestionsData = questionsData

    newQuestionsData.splice(index, 1)

    setQuestionsData(newQuestionsData)
    setRefresh(!refresh)
  }

  const handleSelectImage = (e) => {
    const imageBlob = e.target.files[0]
    setSelectedImage(imageBlob)
    setImageURL(URL.createObjectURL(imageBlob))
  }

  const handleSave = (e) => {
    e.preventDefault()

    const payload = {
      image_url: imageURL,
      image_blob: selectedImage,
      name: eventName,
      slug: slug,
      description: description,
      capacity: capacity,
      start: start,
      end: end,
      location: location,
      questions: questionsData
    }

    // TODO: Validify inputs
    // TODO: Handle actual submit to DB

    console.log(payload)
  }

  return (
    <>
      <Helmet>
        <title>Create Event - Biztech Admin</title>
      </Helmet>

      <Container maxWidth="sm">
        <div className="editor">

          <div style={styles.head}>
            <h1 style={styles.header1}>{eventName || "New Event"}</h1>
            <div>
              <Button
                className={classes.button}
                variant="contained"
                style={{ marginRight: "1rem" }}
                onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>

          <Paper className={classes.paper}>

            {/* Image */}
            <div style={styles.imageContainer}>
              <img style={styles.image} src={imageURL || ImagePlaceholder} alt="Image" />
              {imageURL ? (
                <Button
                  style={styles.imageButton}
                  className={classes.button}
                  onClick={() => { setSelectedImage(); setImageURL("") }}
                  variant="contained"
                  component="label">
                Remove Image
                </Button>
              ) : (
                <Button
                  style={styles.imageButton}
                  className={classes.button}
                  variant="contained"
                  component="label">
                Upload File
                  <input
                    type="file"
                    onChange={handleSelectImage}
                    hidden
                  />
                </Button>
              )}
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
        </div>

        <div className="previewer">

        </div>

      </Container>
    </>
  )
}

export default FormCreate
