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
  Tooltip,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloudUpload from "@material-ui/icons/CloudUpload";
import React, { useEffect, useState, useCallback, Fragment } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchBackend } from "utils";
import { ArrowBack as arrowBackIcon } from "@material-ui/icons";
import { COLORS } from "../../../constants/_constants/theme";
import ImagePlaceholder from "../../../assets/placeholder.jpg";
import LoginAccess from "components/LoginAccess/LoginAccess";
import Loading from "pages/Loading";
import { REGISTRATION_STATUS } from "constants/index";

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
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: " 100%"
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
    marginBottom: 12
  },
  arrowBackIcon: {
    color: COLORS.WHITE,
    fontSize: "40px"
  },
  cancelButton: {
    background: COLORS.LIGHT_RED
  },
  deadlineText: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: 8
  },
  regAlert: {
    fontWeight: "bold",
    backgroundColor: "#E38424",
    color: "white",
    maxWidth: 552,
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const FormRegister = (props) => {
  const { user, event, userRegisteredEvents } = props;
  const history = useHistory();
  const [currEvent, setCurrEvent] = useState(event);
  const [registeredEvents, setRegisteredEvents] = useState(
    userRegisteredEvents
  );
  const [regAlert, setRegAlert] = useState(null);
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
      choices:
        "1st Year,2nd Year,3rd Year,4th Year,5+ Year,Other,Not Applicable",
      required: true
    },
    {
      questionType: "SELECT",
      question: "Faculty",
      choices:
        "Arts,Commerce,Science,Engineering,Kinesiology,Land and Food Systems,Forestry,Other,Not Applicable",
      required: true
    },
    {
      questionType: "TEXT",
      question: "Major/Specialization",
      choices: "",
      required: true
    },
    {
      questionType: "SELECT",
      question: "Preferred Pronouns",
      choices:
        "He/Him/His,She/Her/Hers,They/Them/Their,Other/Prefer not to say",
      required: true
    },
    {
      questionType: "SELECT",
      question: "Any dietary restrictions?",
      choices: "None,Vegetarian,Vegan,Gluten Free,Pescetarian,Kosher,Halal",
      required: true
    },
    {
      questionType: "SELECT",
      question: "How did you hear about this event?",
      choices:
        "Boothing,Facebook,Instagram,LinkedIn,Friends/Word of Mouth,BizTech Newsletter,Other",
      required: true
    }
  ];

  const parsedRegistrationQuestions = currEvent.registrationQuestions?.map(
    ({ type, label, choices, required, questionId }) => ({
      questionType: type,
      question: label,
      choices: choices,
      required: required,
      questionId: questionId
    })
  );

  const formData = {
    image_url: currEvent.imageUrl || "",
    name: currEvent.ename || "",
    slug: currEvent.id || "",
    description: currEvent.description || "",
    capacity: currEvent.capac || "",
    start: currEvent.startDate ? new Date(currEvent.startDate) : new Date(),
    end: currEvent.endDate ? new Date(currEvent.endDate) : new Date(),
    location: currEvent.elocation || "",
    deadline: currEvent.deadline ? new Date(currEvent.deadline) : new Date(),
    questions: basicQuestions.concat(parsedRegistrationQuestions || [])
  };

  const classes = useStyles();

  const [refresh, setRefresh] = useState(false);

  const { id: eventId, year: eventYear } = useParams();

  const [responseData, setResponseData] = useState(
    Array.from(Array(formData.questions.length))
  ); // index of answers correspond to questions array index
  const [responseError, setResponseError] = useState(
    Array.from(Array(formData.questions.length))
  ); // index of errors correspond to responses array (right above)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!registeredEvents) {
        const registered = await fetchBackend(
          `/registrations?email=${user?.email}`,
          "GET"
        );
        setRegisteredEvents(registered);
      }
      if (!currEvent) {
        const eventData = await fetchBackend(
          `/events/${eventId}/${eventYear}`,
          "GET",
          undefined
        );
        setCurrEvent(eventData);
      }
    };
    fetchEvent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user) {
      const newData = responseData.slice();
      newData[0] = user.email;
      newData[1] = user.fname;
      newData[2] = user.lname;
      newData[3] = user.year;
      newData[4] = user.faculty;
      newData[5] = user.major;
      newData[6] = user.gender;
      newData[7] = user.diet;
      setResponseData(newData);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (event) {
      const remaining =
        event.capac -
        (event.counts.registeredCount + event.counts.checkedInCount);
      if (remaining > 0 && remaining <= 20) {
        setRegAlert(
          <Alert severity="error" className={classes.regAlert}>
            Warning: {event.ename || "this event"} only has {remaining} spot
            {remaining > 1 ? "s" : ""} left!
          </Alert>
        );
      } else if (remaining <= 0 && !user) {
        setRegAlert(
          <Alert severity="error" className={classes.regAlert}>
            Warning: {event.ename || "this event"} is full!
          </Alert>
        );
      } else {
        setRegAlert(null);
      }
    }
  }, [event]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const uploadFile = useCallback(
    (i, e) => {
      if (e.target.files.length === 0) return;
      const file = e.target.files[0]; // the file
      const reader = new FileReader(); // this for convert to Base64
      reader.readAsDataURL(e.target.files[0]); // start conversion...
      reader.onload = function (e) {
        // .. once finished..
        const rawLog = reader.result.split(",")[1]; // extract only the file data part
        const dataSend = {
          dataReq: { data: rawLog, name: file.name, type: file.type },
          fname: "uploadFilesToGoogleDrive"
        }; // preapre info to send to API
        fetch(
          "https://script.google.com/macros/s/AKfycbyX8joJ5WeyqZxrUh-iS-Cay17N3ygO-YMuoNVaBN5o4jl6Cy0k9X0JcxRrwiWy1OEoiQ/exec", // your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) }
        ) // send to Api
          .then((res) => res.json())
          .then((e) => {
            updateField(i, e.url);
          })
          .catch((e) =>
            alert(
              "An error occurred while trying to upload the file. Please try again."
            )
          );
      };
    },
    [updateField]
  );

  const loadQuestions = () => {
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
          <div style={{ paddingBottom: "1.5rem" }}>
            <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
              {question}
              {question && required && "*"}
            </p>
            {question === "Email Address" ? (
              <Tooltip
                title="If you would like to change your account's email address, please contact an executive for support."
                arrow
              >
                <TextField
                  error={!!responseError[i]}
                  helperText={!!responseError[i] && responseError[i]}
                  className={classes.textfield}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  value={responseData[i]}
                  onChange={(e) => updateField(i, e.target.value)}
                />
              </Tooltip>
            ) : (
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
            )}
          </div>
        );
      } else if (questionType === "UPLOAD") {
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
              <Typography className={classes.uploadedFile}>
                {responseData[i] ? (
                  <a
                    href={responseData[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "100%", wordWrap: "break-word" }}
                  >
                    {responseData[i]}
                  </a>
                ) : (
                  "No file uploaded yet!"
                )}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component="label"
                style={{ width: "150px" }}
              >
                {responseData[i] ? "Reupload" : "Upload"}
                <CloudUpload style={{ color: "black", marginLeft: 6 }} />
                <input
                  hidden
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => uploadFile(i, e)}
                />
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
      if (question.questionType === "CHECKBOX") {
        // check if empty
        if (question.required) {
          if (!responseData[i] || responseData[i].length <= 0) {
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

  const handleSubmit = () => {
    if (isValidSubmission()) {
      const dynamicResponses = {};
      for (let i = basicQuestions.length; i < formData.questions.length; i++) {
        if (formData.questions[i].questionType === "CHECKBOX") {
          dynamicResponses[formData.questions[i].questionId] = responseData[
            i
          ]?.join(", ");
        } else {
          dynamicResponses[formData.questions[i].questionId] = responseData[i];
        }
      }
      const registrationBody = {
        email: responseData[0],
        studentId: user.id,
        eventID: currEvent.id,
        year: currEvent.year,
        registrationStatus: "registered",
        basicInformation: {
          fname: responseData[1],
          lname: responseData[2],
          year: responseData[3],
          faculty: responseData[4],
          major: responseData[5],
          gender: responseData[6],
          diet: responseData[7],
          heardFrom: responseData[8]
        },
        dynamicResponses
      };
      fetchBackend("/registrations", "POST", registrationBody, false).then(
        () => {
          history.push(
            `/event/${currEvent.id}/${currEvent.year}/register/success`
          );
        }
      );
    } else {
      console.error("Form errors");
    }
  };

  const updateUserRegistrationStatus = async (id, registrationStatus) => {
    const body = {
      eventID: eventId,
      year: Number(eventYear),
      registrationStatus
    };
    try {
      await fetchBackend(`/registrations/${id}`, "PUT", body);
      alert(
        "Successfully updated registration status! Please check your inbox (including Spam/Promotions) for an email."
      );
      window.location.reload();
    } catch (e) {
      alert(
        "An error has occurred. Please contact a BizTech exec for support."
      );
    }
  };

  const changeRegStatus = (newStatus) => {
    switch (newStatus) {
      case REGISTRATION_STATUS.REGISTERED:
        if (
          window.confirm(
            `Do you want to re-register for ${
              event.ename || "this event"
            }?\nYou will be sent an email confirming your registration.`
          )
        ) {
          updateUserRegistrationStatus(
            user?.email,
            REGISTRATION_STATUS.REGISTERED
          );
        }
        break;
      case REGISTRATION_STATUS.CANCELLED:
        if (
          window.confirm(
            `Are you sure you would cancel your spot at ${
              event.ename || "this event"
            }?\nYou will be sent an email regarding your cancellation.`
          )
        ) {
          updateUserRegistrationStatus(
            user?.email,
            REGISTRATION_STATUS.CANCELLED
          );
        }
        break;
      default:
        return {};
    }
  };

  const isEventFull = () => {
    return (
      event.capac -
        (event.counts?.registeredCount + event.counts?.checkedInCount) <=
      0
    );
  };

  const isDeadlinePassed = () => {
    const deadline = new Date(event.deadline).getTime();
    return deadline < new Date().getTime();
  };

  const userAlreadyRegistered = () =>
    registeredEvents?.data.find(
      (e) => e["eventID;year"] === event.id + ";" + event.year
    );

  if (!user) {
    return (
      <Fragment>
        {regAlert}
        <LoginAccess
          header="To register for our events, please sign in."
          redirect={`/event/${eventId}/${eventYear}/register`}
        />
      </Fragment>
    );
  }

  if (!currEvent && !userRegisteredEvents) {
    return <Loading message="Loading event..." />;
  }

  const renderRegMessage = (status) => {
    switch (status) {
      case REGISTRATION_STATUS.CANCELLED:
        return `You have cancelled your registration for ${
          event.ename || "this event"
        }.`;
      case REGISTRATION_STATUS.WAITLISTED:
        return `You are currently waitlisted for ${
          event.ename || "this event"
        }.`;
      default:
        return `Already registered for ${event.ename || "this event"}!`;
    }
  };

  const renderFormQuestions = () => {
    const reg = userAlreadyRegistered();
    if (reg) {
      return (
        <Fragment>
          <div style={styles.section}>
            <Typography className={classes.deadlineText}>
              {renderRegMessage(reg.registrationStatus)}
            </Typography>
            {reg.registrationStatus === REGISTRATION_STATUS.REGISTERED && (
              <div>
                <div style={styles.center}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.email};${currEvent.id};${currEvent.year}`}
                    width="200px"
                    alt="registration QR code"
                  />
                </div>
                <Typography className={classes.deadlineText}></Typography>
                <div style={styles.center}>
                  <Button
                    variant="contained"
                    // color="primary"
                    className={classes.cancelButton}
                    onClick={() =>
                      changeRegStatus(REGISTRATION_STATUS.CANCELLED)
                    }
                  >
                    Cancel Registration
                  </Button>
                </div>
              </div>
            )}
            {reg.registrationStatus === REGISTRATION_STATUS.CANCELLED && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => changeRegStatus(REGISTRATION_STATUS.REGISTERED)}
              >
                Re-register
              </Button>
            )}
          </div>
        </Fragment>
      );
    }
    if (isDeadlinePassed()) {
      return (
        <Fragment>
          <div style={styles.section}>
            <Typography className={classes.deadlineText}>
              Deadline Passed
            </Typography>
            <Typography>
              The registration deadline for {event.ename || "this event"} has
              already passed on{" "}
              {formData.deadline.toLocaleString(navigator.language, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              })}
              .
            </Typography>
          </div>
        </Fragment>
      );
    }
    if (isEventFull()) {
      return (
        <Fragment>
          <div style={styles.section}>
            <Typography className={classes.deadlineText}>
              Event is Full
            </Typography>
            <Typography>
              We sincerely apologize, {event.ename || "this event"} is no longer
              taking registrations. Please be on the lookout for our other
              events throughout the year!
            </Typography>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div style={styles.section}>
          <Typography style={{ fontWeight: "bold" }}>
            Registration open now until{" "}
            {formData.deadline.toLocaleString(navigator.language, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </Typography>
        </div>
        <div style={styles.section}>{loadQuestions()}</div>
        <div style={styles.divider}></div>
        <div style={styles.submitSection}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Fragment>
    );
  };

  return (
    <>
      <arrowBackIcon
        cursor="pointer"
        className={classes.arrowBackIcon}
        onClick={() => history.push("/events")}
      />
      <Helmet>
        <title>Register for {formData.name}</title>
      </Helmet>
      <Container maxWidth="sm">
        {regAlert}
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
            <p style={{ whiteSpace: "pre-line" }}>
              {formData.description.split("<br/>").join("\n")}
            </p>
          </div>
          {renderFormQuestions()}
        </Paper>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userRegisteredEvents: state.userState.userRegisteredEvents.data
  };
};

export default connect(mapStateToProps)(FormRegister);
