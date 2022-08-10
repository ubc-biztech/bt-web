import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import CloudUpload from '@material-ui/icons/CloudUpload';
import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchBackend } from "utils";
import ImagePlaceholder from "../../../assets/placeholder.jpg";

const styles = {
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
  section: {
    padding: "1rem 2rem"
  },
  divider: {
    borderStyle: "none none solid none",
    borderWidth: "1px",
    borderColor: "#1F2A47"
  },
  submitSection: {
    padding: "2rem"
  },
};

const useStyles = makeStyles((theme) => ({
  textfield: {
    background: "#1F2A47",
    borderRadius: 10
  },
  select: {
    background: "#1F2A47",
    borderRadius: 10
  },
  uploadedFile: {
    marginBottom: 12,
  }
}));

const FormRegister = (props) => {

  const { user, event } = props;
  const history = useHistory();

  // should be pulled from database -- DEMO:
  const basicQuestions = [
    {
      questionType: "TEXT",
      question: "Email Address",
      choices: "",
      required: true
    },
    {
      questionType: "TEXT",
      question: "First Name",
      choices: "",
      required: true
    },
    {
      questionType: "TEXT",
      question: "Last Name",
      choices: "",
      required: true
    },
    {
      questionType: "SELECT",
      question: "Year Level",
      choices: "1st Year,2nd Year,3rd Year,4th Year,5+ Year,Other,Not Applicable",
      required: true,
    },
    {
      questionType: "SELECT",
      question: "Faculty",
      choices: "Arts,Commerce,Science,Engineering,Kinesiology,Land and Food Systems,Forestry,Other,Not Applicable",
      required: true,
    },
    {
      questionType: "TEXT",
      question: "Major/Specialization",
      choices: "",
      required: true,
    },
    {
      questionType: "SELECT",
      question: "How did you hear about this event?",
      choices: "Boothing,Facebook,Instagram,LinkedIn,Friends/Word of Mouth,BizTech Newsletter,Other",
      required: true,
    },
  ]


  const parsedRegistrationQuestions = event.registrationQuestions.map(({type,label,choices,required}) => ({
        questionType: type,
        question: label,
        choices: choices,
        required: required
    }))

  const formData = {
    image_url: event.imageUrl || "",
    name: event.ename || "",
    slug: event.id || "",
    description: event.description || "",
    capacity: event.capac || "",
    start: event.startDate ? new Date(event.startDate) : new Date(),
    end: event.endDate ? new Date(event.endDate) : new Date(),
    location: event.elocation || "",
    deadline: event.deadline ? new Date(event.deadline) : new Date(),
    questions: basicQuestions.concat(parsedRegistrationQuestions)
  }

  // const state = props.state
  // {JSON.stringify(state)}
  const classes = useStyles();

  // const [formData, setFormData] = useState([]); // Using a test constant rn
  const [refresh, setRefresh] = useState(false);
  const [displayQuestions, setDisplayQuestions] = useState([]);

  // const createBlankResponses = () => {
  //   // Array.from(Array(formData.questions.length))

  //   const arrayToCreate = []
  //   // creates empty array mapped to responses
  //   for (let i = 0; i < formData.questions.length; i++) {
  //     arrayToCreate.push("")
  //   }
  //   return arrayToCreate
  // }


  const [responseData, setResponseData] = useState(
    Array.from(Array(formData.questions.length))
  ); // index of answers correspond to questions array index
  const [responseError, setResponseError] = useState(
    Array.from(Array(formData.questions.length))
  ); // index of errors correspond to responses array (right above)
  useEffect(() => {
    if (user) {
      const newData = responseData.slice()
      newData[0] = user.email
      newData[1] = user.fname
      newData[2] = user.lname
      newData[3] = user.year
      newData[4] = user.faculty
      newData[5] = user.major
      // newData[6] = user.gender
      setResponseData(newData)
    }
  }, [user])

  const updateField = useCallback(
    (index, value) => {
      const responses = responseData;
      responses[index] = value;
      setResponseData(responses);
      setRefresh(!refresh);
    },
    [refresh, responseData]
  );

  const updateCheckbox = useCallback(
    (index, checked, value) => {
      // checked is true/false, if change is to checked
      // value is the selection corresponding to checkmark
      const responses = responseData;
      if (responses[index] && Array.isArray(responses[index])) {
        // todo; check if response already exists (shouldn't happen, but to be safe)

        if (checked) {
          // add
          responses[index].push(value);
        } else {
          // remove
          const newArr = responses[index].filter((choice) => choice !== value);
          responses[index] = newArr;
        }
      } else {
        // no items in yet
        const initialArr = [];
        initialArr.push(value);
        responses[index] = initialArr;
      }
      setResponseData(responses);
      setRefresh(!refresh);
    },
    [refresh, responseData]
  );

  const uploadFile = useCallback (
    (i, e) => {
      const file = e.target.files[0] // the file
      const reader = new FileReader() // this for convert to Base64 
      reader.readAsDataURL(e.target.files[0]) // start conversion...
      reader.onload = function (e) { // .. once finished..
        const rawLog = reader.result.split(',')[1]; // extract only the file data part
        const dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; // preapre info to send to API
        fetch('https://script.google.com/macros/s/AKfycbyX8joJ5WeyqZxrUh-iS-Cay17N3ygO-YMuoNVaBN5o4jl6Cy0k9X0JcxRrwiWy1OEoiQ/exec', // your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) }) // send to Api
          .then(res => res.json()).then((e) => {
            updateField(i, e.url)
          }).catch(e => alert('An error occurred while trying to upload the file. Please try again.'))
      }
    },
    [updateField]
  )

  const loadQuestions = useCallback(() => {
    const returnArr = [];
    for (let i = 0; i < formData.questions.length; i++) {
      const { question, questionType, required, choices } = formData.questions[
        i
      ];
      const choicesArr = choices ? choices.split(",") : [];

      if (questionType === "CHECKBOX") {
        returnArr.push(
          <div style={{ paddingBottom: "1.5rem" }}>
            <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
              {question}
              {question && required && "*"}
            </p>
            <FormControl error={!!responseError[i]}>
              <FormGroup>
                {choicesArr.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={
                            responseData[i] && Array.isArray(responseData[i])
                              ? responseData[i].includes(item)
                              : false
                          }
                          onChange={(e) =>
                            updateCheckbox(i, e.target.checked, item)
                          }
                          color="primary"
                        />
                      }
                      label={item}
                    />
                  );
                })}
              </FormGroup>
              {!!responseError[i] && (
                <FormHelperText>{responseError[i]}</FormHelperText>
              )}
            </FormControl>
          </div>
        );
      } else if (questionType === "SELECT") {
        returnArr.push(
          <div style={{ paddingBottom: "1.5rem" }}>
            <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
              {question}
              {question && required && "*"}
            </p>
            <FormControl
              error={!!responseError[i]}
              helperText={!!responseError[i] && responseError[i]}
            >
              <Select
                className={classes.select}
                labelId="q-type"
                variant="outlined"
                margin="dense"
                defaultValue={responseData[i] || ''}
                onChange={(e) => updateField(i, e.target.value)}
              >
                {choicesArr.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              {!!responseError[i] && (
                <FormHelperText>{responseError[i]}</FormHelperText>
              )}
            </FormControl>
          </div>
        );
      } else if (questionType === "TEXT") {
        returnArr.push(
          <div style={{ paddingBottom: "1.5rem" }}>
            <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
              {question}
              {question && required && "*"}
            </p>
            <TextField
              error={!!responseError[i]}
              helperText={!!responseError[i] && responseError[i]}
              className={classes.textfield}
              fullWidth
              margin="dense"
              variant="outlined"
              value={responseData[i]}
              onChange={(e) => updateField(i, e.target.value)}
            />
          </div>
        );
      } else if (questionType === "UPLOAD") {
          returnArr.push(
            <div style={{ paddingBottom: "1.5rem" }}>
              <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
                {question}
                {question && required && "*"}
              </p>
              <Typography className={classes.uploadedFile}>
                {responseData[i] ? (
                  <a
                    href={responseData[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%' }}
                  >
                    {responseData[i]}
                  </a>
                ) : (
                  "No file uploaded yet!"
                )}
              </Typography>
              <Button variant="contained" color="primary" component="label">
                {responseData[i] ? "Reupload" : "Upload"}
                <CloudUpload style={{ color: "black", marginLeft: 6 }}/>
                <input hidden type="file" accept="application/pdf" onChange={(e) => uploadFile(i, e)}/>
              </Button>
            </div>
          )
      }
    }

    setDisplayQuestions(returnArr);
  }, [
    classes.select,
    classes.textfield,
    classes.uploadedFile,
    formData.questions,
    responseData,
    responseError,
    updateCheckbox,
    updateField,
    uploadFile,
  ]);

  const validifyForm = () => {
    // currently only checks "required" field of question object in questions array
    // but further checks can be possible through refactoring "required" key
    // to "checks" or something similar to contain an array of different checks
    // to make (e.g. max characters), which can be accessed here

    const newErrors = Array.from(Array(formData.questions.length)); // start blank
    let valid = true;

    // looping for error messages
    for (let i = 0; i < responseData.length; i++) {
      // indices should correspond between formData.questions, responseData, and responseError arrays
      const question = formData.questions[i];

      if (question.questionType === "CHECKBOX") {
        // check if empty
        if (
          question.required && responseData[i]
            ? responseData[i].length <= 0
            : true
        ) {
          newErrors[i] = "A selection is required";

          valid = false;
        }
        // other checks can go here...
      } else {
        // check if empty
        if (
          question.required && responseData[i]
            ? responseData[i].length === 0
            : true
        ) {
          newErrors[i] = "This field is required";

          valid = false;
        }
        // other checks can go here...
      }
    }

    setResponseError(newErrors);
    return valid;
  };

  // handleSave helper
  const isValidSubmission = () => {
    const res = validifyForm();
    setRefresh(!refresh);
    return res;
  };

  const handleSubmit = () => {
    if (isValidSubmission()) {
      const registrationBody = {
        email: responseData[0],
        eventID: event.id,
        year: event.year,
        registrationStatus: "registered",
        heardFrom: responseData[6],
      }
      fetchBackend('/registrations', 'POST', registrationBody, false)
        .then(() => {
          history.push(`/event/${event.id}/${event.year}/register/success`)
        })
    } else {
      console.error("Form errors");
    }
  };

  useEffect(() => {
    loadQuestions()
  }, [refresh, responseData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Register for {formData.name}</title>
      </Helmet>

      <Container maxWidth="sm">
        <Paper>
          {/* Image */}
          <div style={styles.imageContainer}>
            <img
              style={styles.image}
              src={formData.image_url || ImagePlaceholder}
              alt="Event"
            />
          </div>
          <div style={{ ...styles.section, ...styles.divider }}>
            <h2 style={{ marginTop: 0 }}>{formData.name}</h2>
            <p>{formData.description}</p>
          </div>
          <div style={styles.section}>{displayQuestions}</div>
          <div style={styles.divider}></div>
          <div style={styles.submitSection}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default FormRegister;
