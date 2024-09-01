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
import CloudUpload from "@material-ui/icons/CloudUpload";
import React, {
  useEffect, useState, useCallback, Fragment
} from "react";
import {
  connect
} from "react-redux";
import {
  useParams, useHistory
} from "react-router-dom";
import {
  Helmet
} from "react-helmet";
import {
  fetchBackend
} from "utils";
import {
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import {
  COLORS
} from "../../../constants/_constants/theme";
import ImagePlaceholder from "../../../assets/placeholder.jpg";
import Loading from "pages/Loading";
import OtherCheckbox from "./components/OtherCheckbox";
import {
  QRCodeTypes
} from "constants/index";

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
  modal: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    backgroundColor: "#172037",
    borderColor: "#172037",
    margin: "auto",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalText: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  }
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
  },
  ArrowBackIcon: {
    color: COLORS.WHITE,
    fontSize: "40px"
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: 8,
  },
  regAlert: {
    fontWeight: "bold",
    backgroundColor: "#E38424",
    color: "white",
    maxWidth: 552,
    marginLeft: "auto",
    marginRight: "auto",
  },
  registerButton: {
    textTransform: "none",
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BACKGROUND_COLOR,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE,
    },
  },
  registerIcon: {
    color: "black",
    marginRight: 4,
  },
}));

const FormRegisterPartner = (props) => {
  const {
    event
  } = props;
  console.log(event)
  const history = useHistory();
  const [currEvent, setCurrEvent] = useState(event);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      question: "Preferred Pronouns",
      choices: "He/Him/His,She/Her/Hers,They/Them/Their,Other/Prefer not to say",
      required: true,
    },
    {
      questionType: "TEXT",
      question: "Company Name",
      choices: "",
      required: true
    },
    {
      questionType: "TEXT",
      question: "Role/Occupation at Company",
      choices: "",
      required: true,
    },
  ];

  const parsedRegistrationQuestions = currEvent.partnerRegistrationQuestions?.map(({
    type,label,choices,required,questionId,questionImageUrl,charLimit
  }) => ({
    questionType: type,
    question: label,
    choices,
    required,
    questionId,
    questionImageUrl,
    charLimit,
  }));

  const formData = {
    image_url: currEvent.imageUrl || "",
    name: currEvent.ename || "",
    slug: currEvent.id || "",
    description: currEvent.partnerDescription || "",
    capacity: currEvent.capac || "",
    start: currEvent.startDate ? new Date(currEvent.startDate) : new Date(),
    end: currEvent.endDate ? new Date(currEvent.endDate) : new Date(),
    location: currEvent.elocation || "",
    deadline: currEvent.deadline ? new Date(currEvent.deadline) : new Date(),
    questions: basicQuestions.concat(parsedRegistrationQuestions || [])
  };

  const classes = useStyles();

  const [refresh, setRefresh] = useState(false);

  const {
    id: eventId, year: eventYear
  } = useParams();

  const [responseData, setResponseData] = useState(
    Array.from(Array(formData.questions.length))
  ); // index of answers correspond to questions array index
  const [responseError, setResponseError] = useState(
    Array.from(Array(formData.questions.length))
  ); // index of errors correspond to responses array (right above)
  const [otherData] = useState({
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (!currEvent) {
        const eventData = await fetchBackend(`/events/${eventId}/${eventYear}`, "GET", undefined, false);
        setCurrEvent(eventData);
      }
    };
    fetchEvent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          if (value) {
            // add
            responses[index].push(value);
          }
        } else {
          // remove
          const newArr = responses[index].filter((choice) => choice !== value);
          responses[index] = newArr;
        }
      } else {
        // no items in yet
        const initialArr = [];
        if (value) {
          initialArr.push(value);
        }
        responses[index] = initialArr;
      }
      setResponseData(responses);
      setRefresh(!refresh);
    },
    [refresh, responseData]
  );

  const uploadFile = useCallback (
    (i, e) => {
      if (e.target.files.length === 0) return;
      const file = e.target.files[0]; // the file
      const reader = new FileReader(); // this for convert to Base64 
      reader.readAsDataURL(e.target.files[0]); // start conversion...
      reader.onload = function (e) { // .. once finished..
        const rawLog = reader.result.split(",")[1]; // extract only the file data part
        const dataSend = {
          dataReq: {
            data: rawLog,
            name: file.name,
            type: file.type
          },
          fname: "uploadFilesToGoogleDrive"
        }; // preapre info to send to API
        fetch("https://script.google.com/macros/s/AKfycbyX8joJ5WeyqZxrUh-iS-Cay17N3ygO-YMuoNVaBN5o4jl6Cy0k9X0JcxRrwiWy1OEoiQ/exec", // your AppsScript URL
          {
            method: "POST",
            body: JSON.stringify(dataSend)
          }) // send to Api
          .then(res => res.json()).then((e) => {
            updateField(i, e.url);
          }).catch(e => alert("An error occurred while trying to upload the file. Please try again."));
      };
    },
    [updateField]
  );

  const loadQuestions = () => {
    const returnArr = [];
    for (let i = 0; i < formData.questions.length; i++) {
      const {
        question, questionType, required, choices, questionImageUrl, charLimit
      } = formData.questions[
        i
      ];
      const choicesArr = choices ? choices.split(",") : [];
      if (questionType === "CHECKBOX" || questionType === "SKILLS") {
        returnArr.push(
          <div style={{
            paddingBottom: "1.5rem"
          }}>
            <p style={{
              opacity: "0.7",
              fontSize: "1rem",
              margin: "0.5rem 0"
            }}>
              {question}
              {question && required && "*"}
            </p>
            {questionImageUrl && (
              <div style={styles.imageContainer}>
                <img
                  style={styles.image}
                  src={questionImageUrl || ImagePlaceholder}
                  alt="Registration Form"
                />
              </div>
            )}
            <FormControl error={!!responseError[i]}>
              <FormGroup>
                {choicesArr.map((item) => {
                  if (item === "...") {
                    return <OtherCheckbox key={item} onChange={(e) => updateCheckbox(i, e.target.checked, null)} otherData={otherData} index={i}/>;
                  }
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
          <div style={{
            paddingBottom: "1.5rem"
          }}>
            <p style={{
              opacity: "0.7",
              fontSize: "1rem",
              margin: "0.5rem 0"
            }}>
              {question}
              {question && required && "*"}
            </p>
            {questionImageUrl && (
              <div style={styles.imageContainer}>
                <img
                  style={styles.image}
                  src={questionImageUrl || ImagePlaceholder}
                  alt="Registration Form"
                />
              </div>
            )}
            <FormControl
              error={!!responseError[i]}
              helperText={!!responseError[i] && responseError[i]}
            >
              <Select
                className={classes.select}
                labelId="q-type"
                variant="outlined"
                margin="dense"
                defaultValue={responseData[i] || ""}
                value={responseData[i] || ""}
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
          <div style={{
            paddingBottom: "1.5rem"
          }}>
            <p style={{
              opacity: "0.7",
              fontSize: "1rem",
              margin: "0.5rem 0"
            }}>
              {question}
              {question && required && "*"}
            </p>
            {questionImageUrl && (
              <div style={styles.imageContainer}>
                <img
                  style={styles.image}
                  src={questionImageUrl || ImagePlaceholder}
                  alt="Registration Form"
                />
              </div>
            )}
            {question === "Email Address" ? (
              <>
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
              </>
            ) : (
              <TextField
                error={!!responseError[i]}
                helperText={!!responseError[i] && responseError[i]}
                className={classes.textfield}
                fullWidth
                multiline
                inputProps={{
                  maxLength: charLimit
                }}
                margin="dense"
                variant="outlined"
                value={responseData[i]}
                onChange={(e) => updateField(i, e.target.value)}
              />
            )}
          </div>
        );
      } else if (questionType === "UPLOAD") {
        returnArr.push(
          <div style={{
            paddingBottom: "1.5rem"
          }}>
            <p style={{
              opacity: "0.7",
              fontSize: "1rem",
              margin: "0.5rem 0"
            }}>
              {question}
              {question && required && "*"}
            </p>
            {questionImageUrl && (
              <div style={styles.imageContainer}>
                <img
                  style={styles.image}
                  src={questionImageUrl || ImagePlaceholder}
                  alt="Registration Form"
                />
              </div>
            )}
            <FormControl
              error={!!responseError[i]}
              helperText={!!responseError[i] && responseError[i]}
            >
              <Typography className={classes.uploadedFile}>
                {responseData[i] ? (
                  <a
                    href={responseData[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "100%",
                      wordWrap: "break-word"
                    }}
                  >
                    {responseData[i]}
                  </a>
                ) : (
                  "No file uploaded yet!"
                )}
              </Typography>
              <Button variant="contained" color="primary" component="label" style={{
                width: "150px"
              }}>
                {responseData[i] ? "Reupload" : "Upload"}
                <CloudUpload style={{
                  color: "black",
                  marginLeft: 6
                }}/>
                <input hidden type="file" accept="application/pdf, image/jpg, image/png, image/jpeg" onChange={(e) => uploadFile(i, e)}/>
              </Button>
              {!!responseError[i] && (
                <FormHelperText>{responseError[i]}</FormHelperText>
              )}
            </FormControl>
          </div>
        );
      }
    }
    return returnArr;
  };

  const validifyForm = () => {
    // currently only checks "required" field of question object in questions array
    // but further checks can be possible through refactoring "required" key
    // to "checks" or something similar to contain an array of different checks
    // to make (e.g. max characters), which can be accessed here

    const newErrors = Array.from(Array(formData.questions.length)); // start blank
    let valid = true;

    // looping for error messages
    for (let i = 0; i < formData.questions.length; i++) {
      // indices should correspond between formData.questions, responseData, and responseError arrays
      const question = formData.questions[i];
      if (question.questionType === "CHECKBOX" || question.questionType === "SKILLS") {
        // check if empty
        if (question.required) {
          if (!otherData[i] && (!responseData[i] || responseData[i].length <= 0)) {
            newErrors[i] = "A selection is required";
            valid = false;
          }
        }
        // other checks can go here...
      } else {
        // check if empty
        if (question.required) {
          if (!responseData[i] || responseData[i].length === 0) {
            newErrors[i] = "This field is required";
            valid = false;
          }
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

  const createPartnerQR = (registrationBody) => {
    const id = `${registrationBody.eventID};${registrationBody.year};${registrationBody.email}`;
    const data = {
      "partnerID": registrationBody.email,
    };

    return {
      id,
      eventID: registrationBody.eventID,
      year: registrationBody.year,
      type: QRCodeTypes.PARTNER,
      data: data
    };
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (isValidSubmission()) {
      const dynamicResponses = {
      };
      for (let i = basicQuestions.length; i < formData.questions.length; i++) {
        if (formData.questions[i].questionType === "CHECKBOX") {
          if (otherData[i]) {
            dynamicResponses[formData.questions[i].questionId] = responseData[
              i
            ].push(otherData[i]);
          }
          dynamicResponses[formData.questions[i].questionId] = responseData[
            i
          ]?.join(", ");
        } else if (formData.questions[i].questionType === "SKILLS") {
          if (otherData[i]) {
            dynamicResponses[formData.questions[i].questionId] = responseData[
              i
            ].concat(otherData[i].split(",").map(d => d.trim()));
          }
        } else {
          dynamicResponses[formData.questions[i].questionId] = responseData[i];
        }
      }
      const registrationBody = {
        email: responseData[0],
        fname: responseData[1],
        eventID: currEvent.id,
        year: currEvent.year,
        registrationStatus: "registered",
        isPartner: true,
        basicInformation: {
          fname: responseData[1],
          lname: responseData[2],
          gender: responseData[3],
          companyName: responseData[4],
          role: responseData[5],
        },
        dynamicResponses,
      };
      fetchBackend("/registrations", "POST", registrationBody, false)
        .then(() => {
          history.push(`/event/${currEvent.id}/${currEvent.year}/register/success/partner`);
        })
        .catch((err) => {
          alert(
            `An error has occured: ${err} Please contact an exec for support.`
          );
          setIsSubmitting(false);
        });

      const partnerQR = createPartnerQR(registrationBody);

      fetchBackend("/qr", "POST", partnerQR, false)
        .catch((err) => {
          console.log("QR code could not be created for the partner: ", err);
        });
    } else {
      setIsSubmitting(false);
      console.error("Form errors");
    }
  };

  const isDeadlinePassed = () => {
    const deadline = new Date(event.deadline).getTime();
    return deadline < new Date().getTime();
  };

  if (!currEvent) {
    return (
      <Loading
        message='Loading event...'
      />
    );
  }

  const renderFormQuestions = () => {
    if (isDeadlinePassed()) {
      return (
        <Fragment>
          <div style={styles.section}>
            <Typography className={classes.boldText}>
              Deadline Passed
            </Typography>
            <Typography>
              The registration deadline for {currEvent.ename || "this event"} has already passed on {formData.deadline.toLocaleString(navigator.language, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute:"2-digit"
              })}.
            </Typography>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div style={styles.section}>
          <Typography style={{
            fontWeight: "bold"
          }}>
              Registration open now until {formData.deadline.toLocaleString(navigator.language, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute:"2-digit"
            })}
          </Typography>
        </div>
        <div style={styles.section}>{loadQuestions()}</div>
        <div style={styles.divider}></div>
        <div style={styles.submitSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.registerButton}
            disabled={isSubmitting}
          >
              Submit
          </Button>
        </div>
      </Fragment>
    );
  };

  return (
    <>
      <ArrowBackIcon
        cursor="pointer"
        className={classes.ArrowBackIcon}
        onClick={() => history.push("/events")}
      />
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
          <div style={{
            ...styles.section,
            ...styles.divider
          }}>
            <h2 style={{
              marginTop: 0
            }}>{formData.name}</h2>
            <p style={{
              whiteSpace: "pre-line"
            }}>{formData.description.split("<br/>").join("\n")}</p>
          </div>
          {renderFormQuestions()}
        </Paper>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userRegisteredEvents: state.userState.userRegisteredEvents.data,
  };
};

export default connect(mapStateToProps)(FormRegisterPartner);
