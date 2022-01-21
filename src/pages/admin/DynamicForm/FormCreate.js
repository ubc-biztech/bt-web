import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns"
import { Button, Checkbox, Container, Fab, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Select, TextField } from "@material-ui/core"
import { Add, Delete, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import ImagePlaceholder from "../../../assets/placeholder.jpg"
import { Link } from "react-router-dom"

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
}

// Reg form styles (for use on Register page)
const formStyles = {
  section: {
    padding: "1rem 2rem"
  },
  divider: {
    borderStyle: "none none solid none",
    borderWidth: "1px",
    borderColor: "#1F2A47"
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
    choices: "UBC,SFU,KPU,Douglas",
    required: true
  },
  {
    questionType: "SELECT",
    question: "How interested are you in this event?",
    choices: "1,2,3,4,5",
    required: true
  }
]

// EDITOR QUESTION component - made separate component in case want to make a new file
const CustomQuestion = (props) => {
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
      alignItems: "center",
      color: "rgba(255,255,255,0.8)"
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
            {!(index === length - 1) && (
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
          <Checkbox color="primary" aria-label="Required question?" checked={required} onChange={handleEditRequired} />
        </div>

      </div>
    </div>
  )
}

// LIVE PREVIEW QUESTION component
const Question = (props) => {
  const useStyles = makeStyles((theme) => ({
    textfield: {
      background: "#1F2A47",
      borderRadius: 10
    },
    select: {
      background: "#1F2A47",
      borderRadius: 10
    }
  }))
  const classes = useStyles()

  const { type, question, choices, required } = props

  const choicesArr = choices ? choices.split(",") : []

  // types: CHECKBOX, SELECT, TEXT
  if (type === "CHECKBOX") {
    return question && (
      <div style={{ paddingBottom: "1.5rem" }}>
        <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>{question}{question && required && "*"}</p>
        <FormGroup>
          {choicesArr.map((item) => {
            return (
              <FormControlLabel key={item} control={<Checkbox color="primary" />} label={item} />
            )
          })}
        </FormGroup>
      </div>
    )
  } else if (type === "SELECT") {
    return question && (
      <div style={{ paddingBottom: "1.5rem" }}>
        <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>{question}{question && required && "*"}</p>
        <Select
          className={classes.select}
          labelId="q-type"
          variant="outlined"
          margin="dense">
          {choicesArr.map((item) => {
            return (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            )
          })}

        </Select>
      </div>
    )
  } else if (type === "TEXT") {
    return question && (
      <div style={{ paddingBottom: "1.5rem" }}>
        <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>{question}{question && required && "*"}</p>
        <TextField
          className={classes.textfield}
          fullWidth
          margin="dense"
          variant="outlined" />
      </div>
    )
  } else {
    // Could just default to text but just in case
    return (<div>Invalid question type</div>)
  }
}

const FormCreate = () => {
  const classes = useStyles()

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
  const [refresh, setRefresh] = useState(false) // since content of object =/= a change for useEffect dependency array

  // Renders custom questions for the editor
  useEffect(() => {
    const editorDisplayArray = []

    for (let index = 0; index < questionsData.length; index++) {
      editorDisplayArray.push(
        <CustomQuestion
          key={index}
          index={index}
          length={questionsData.length}
          data={questionsData[index]}
          fnMove={handleMoveQuestion}
          fnEdit={handleEditQuestion}
          fnDelete={handleDeleteQuestion} />
      )
    }

    setDisplayCustomQuestions(editorDisplayArray)
  }, [refresh, questionsData]) // @codingStandardsIgnoreLine

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

  // displaying custom questions on the live preview
  const [displayQuestions, setDisplayQuestions] = useState([])

  useEffect(() => {
    const returnArray = []

    for (let i = 0; i < questionsData.length; i++) {
      returnArray.push(
        <Question
          type={questionsData[i].questionType}
          question={questionsData[i].question}
          choices={questionsData[i].choices}
          required={questionsData[i].required} />
      )
    }

    setDisplayQuestions(returnArray)
  }, [questionsData, refresh])

  return (
    <>
      <Helmet>
        <title>Create Event - Biztech Admin</title>
      </Helmet>

      <Grid container>
        <Grid item xs={8} style={{
          maxHeight: "calc(100vh - 130px)"
        }}>
          {/* Live Preview */}
          <div style={styles.preview} className="discrete-scrollbar">
            <Container maxWidth="sm">

              <Paper>
                {/* Image */}
                <div style={styles.imageContainer}>
                  <img style={styles.image} src={imageURL || ImagePlaceholder} alt="Registration Form" />
                </div>
                {(eventName || description) && (
                  <div style={{ ...formStyles.section, ...formStyles.divider }}>
                    <h2 style={{ marginTop: 0 }}>{eventName}</h2>
                    <p>{description}</p>
                  </div>
                )}
                <div style={formStyles.section}>
                  {displayQuestions}
                </div>
              </Paper>

            </Container>
          </div>
        </Grid>
        <Grid item xs={4} style={{
          maxHeight: "calc(100vh - 130px)"
        }}>

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
                  to={{ pathname: `/register/${slug}` }}>
                  Event Link
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log("Published")}>
                  Publish
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
            <div style={styles.editorDivider}></div>

            <div style={styles.editorSection}>
              <h3 style={styles.editorSectionTitle}>Event Cover Photo</h3>
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

            <div style={styles.editorDivider}></div>
            <div style={styles.editorSection}>
              <h3 style={styles.editorSectionTitle}>Event Information</h3>
              {/* Basic Information */}
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
                <div style={{ color: "#FFFFFF", opacity: "0.7" }}>
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

            <div style={styles.editorDivider}></div>
            <div style={styles.editorSection}>
              {/* Dynamic Information */}
              {displayCustomQuestions}

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
            </div>

          </div>
        </Grid>
      </Grid>

    </>
  )
}

export default FormCreate
