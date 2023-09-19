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
  Typography,
  Modal
} from "@material-ui/core";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import {
  Alert
} from "@material-ui/lab";
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
import LoginAccess from "components/LoginAccess/LoginAccess";
import Loading from "pages/Loading";
import {
  REGISTRATION_STATUS,
  CLIENT_URL,
  BASIC_QUESTIONS,
  QUESTION_DOMAINS
} from "constants/index";
import OtherCheckbox from "./components/OtherCheckbox";

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
  disabled: {
    pointerEvents: "none",
    color: "grey",
  }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: "4rem"
  },
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
  ArrowBackIcon: {
    color: COLORS.WHITE,
    fontSize: "40px"
  },
  boldText: {
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
  },
  registerButton: {
    textTransform: "none",
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BACKGROUND_COLOR,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE
    }
  },
  registerIcon: {
    color: "black",
    marginRight: 4
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#172037",
    borderColor: "#172037",
    margin: "auto",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  modalHeader: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20
  },
  modalText: {
    marginBottom: 20
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    "& > button": {
      width: "30%",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
    }
  }
}));

const FormRegister = (props) => {
  const {
    user, event, userRegisteredEvents
  } = props;
  const history = useHistory();
  const [currEvent, setCurrEvent] = useState(event);
  const [registeredEvents, setRegisteredEvents] = useState(
    userRegisteredEvents
  );
  const [regAlert, setRegAlert] = useState(null);
  const [questionDomain, setQuestionDomain] = useState("");
  const [isNonMemberModalOpen, setisNonMemberModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workshopChoicesArr, setWorkshopChoicesArr] = useState([]);
  // const [workshopCounts, setWorkShopCounts] = useState([]);

  const parsedRegistrationQuestions = currEvent.registrationQuestions?.map(
    ({
      type,
      label,
      choices,
      required,
      questionId,
      questionImageUrl,
      charLimit,
      domain
    }) => ({
      questionType: type,
      question: label,
      choices,
      required,
      questionId,
      questionImageUrl,
      charLimit,
      questionDomain: domain
    })
  );

  const domainSpecificQuestions = parsedRegistrationQuestions?.filter(
    (question) =>
      question.questionDomain === undefined ||
      question.questionDomain === questionDomain
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
    questions: BASIC_QUESTIONS.concat(domainSpecificQuestions || [])
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

  // data from "Other" checkboxes
  const [otherData] = useState({
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (!registeredEvents && user) {
        const registered = await fetchBackend(
          `/registrations?email=${user?.email}`,
          "GET"
        );
        setRegisteredEvents(registered);
      }
      if (!currEvent) {
        const params = new URLSearchParams({
          count: true
        });
        const eventData = await fetchBackend(
          `/events/${eventId}/${eventYear}`,
          "GET",
          undefined,
          false
        );
        const regData = await fetchBackend(
          `/events/${eventId}/${eventYear}?${params}`,
          "GET",
          undefined,
          false
        );
        eventData.counts = regData;
        setCurrEvent(eventData);

        // Populate the dynamicCounts array with data
        eventData.counts.dynamicCounts.forEach((dynamicCount) => {
          dynamicCount.counts.forEach((workshop) => {
            if (workshop.count >= workshop.cap) {
              workshop.isDisabled = true;
            } else {
              workshop.isDisabled = false;
            }
          });

          // Push the modified dynamicCount into the dynamicCounts array
          setWorkshopChoicesArr(eventData.counts.dynamicCounts);
        });
      }
    };
    fetchEvent();
  }, [user, eventId, eventYear, registeredEvents, currEvent]);

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
    if (currEvent) {
      const remaining =
        currEvent.capac -
        (currEvent.counts.registeredCount + currEvent.counts.checkedInCount);
      if (remaining > 0 && remaining <= 20) {
        setRegAlert(
          <Alert severity="error" className={classes.regAlert}>
            Warning: {currEvent.ename || "this event"} only has {remaining} spot
            {remaining > 1 ? "s" : ""} left!
          </Alert>
        );
      } else if (remaining <= 0 && !user) {
        setRegAlert(
          <Alert severity="error" className={classes.regAlert}>
            Warning: {currEvent.ename || "this event"} is full!
          </Alert>
        );
      } else {
        setRegAlert(null);
      }
      if (
        !(
          user?.isMember ||
          user?.admin ||
          currEvent.pricing?.nonMembers === undefined ||
          samePricing()
        )
      ) {
        setisNonMemberModalOpen(true);
      }
    }
  }, [currEvent]); // eslint-disable-line react-hooks/exhaustive-deps

  // disable workshops which are full from selection and mark them as such
  useEffect(() => {
    if (currEvent) {
      const remaining =
        currEvent.capac -
        (currEvent.counts.registeredCount + currEvent.counts.checkedInCount);
      if (remaining > 0 && remaining <= 20) {
        setRegAlert(
          <Alert severity="error" className={classes.regAlert}>
            Warning: {currEvent.ename || "this event"} only has {remaining} spot
            {remaining > 1 ? "s" : ""} left!
          </Alert>
        );
      } else if (remaining <= 0 && !user) {
        setRegAlert(
          <Alert severity="error" className={classes.regAlert}>
            Warning: {currEvent.ename || "this event"} is full!
          </Alert>
        );
      } else {
        setRegAlert(null);
      }
      if (
        !(
          user?.isMember ||
          user?.admin ||
          currEvent.pricing?.nonMembers === undefined ||
          samePricing()
        )
      ) {
        setisNonMemberModalOpen(true);
      }
    }
  }, [currEvent]); // eslint-disable-line react-hooks/exhaustive-deps

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
          dataReq: {
            data: rawLog,
            name: file.name,
            type: file.type
          },
          fname: "uploadFilesToGoogleDrive"
        }; // preapre info to send to API
        fetch(
          "https://script.google.com/macros/s/AKfycbyX8joJ5WeyqZxrUh-iS-Cay17N3ygO-YMuoNVaBN5o4jl6Cy0k9X0JcxRrwiWy1OEoiQ/exec", // your AppsScript URL
          {
            method: "POST",
            body: JSON.stringify(dataSend)
          }
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
    let workshopQuestionCount = 0;
    const returnArr = [];
    for (let i = 0; i < formData.questions.length; i++) {
      const {
        question,
        questionType,
        required,
        choices,
        questionImageUrl,
        charLimit
      } = formData.questions[i];
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
                {user ? (
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
                        readOnly: user && !user.admin
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
              <Button
                variant="contained"
                color="primary"
                component="label"
                style={{
                  width: "150px"
                }}
              >
                {responseData[i] ? "Reupload" : "Upload"}
                <CloudUpload style={{
                  color: "black",
                  marginLeft: 6
                }} />
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
      } else if (questionType === "WORKSHOP SELECTION") {
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
                value={responseData[i] || ""}
                onChange={(e) => updateField(i, e.target.value)}
              >
                {workshopChoicesArr.length && workshopChoicesArr[workshopQuestionCount].counts.map((countItem, index) => (
                  <MenuItem key={index} value={countItem.label} disabled={countItem.isDisabled}>
                    {countItem.label}
                    {countItem.isDisabled ? " (Workshop is full)" : ""}
                  </MenuItem>
                ))}
              </Select>
              {!!responseError[i] && (
                <FormHelperText>{responseError[i]}</FormHelperText>
              )}
            </FormControl>
          </div>
        );
        workshopQuestionCount += 1;
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

  const samePricing = () => {
    return currEvent.pricing?.members === currEvent.pricing?.nonMembers;
  };

  const handlePaymentSubmit = () => {
    setIsSubmitting(true);
    if (isValidSubmission()) {
      const dynamicResponses = {
      };
      for (let i = BASIC_QUESTIONS.length; i < formData.questions.length; i++) {
        if (formData.questions[i].questionType === "CHECKBOX" || formData.questions[i].questionType === "WORKSHOP SELECTION") {
          dynamicResponses[formData.questions[i].questionId] = responseData[
            i
          ]?.join(", ");
        } else {
          dynamicResponses[formData.questions[i].questionId] = responseData[i];
        }
      }
      const registrationBody = {
        email: responseData[0],
        fname: responseData[1],
        studentId: user?.id,
        eventID: currEvent.id,
        year: currEvent.year,
        registrationStatus: "incomplete",
        isPartner: false,
        points: 0,
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
      fetchBackend("/registrations", "POST", registrationBody, false)
        .then((response) => {
          if (response.url) {
            setIsSubmitting(false);
            window.open(response.url, "_self");
          } else {
            const paymentBody = {
              paymentName: `${currEvent.ename} ${
                user?.isMember || samePricing() ? "" : "(Non-member)"
              }`,
              paymentImages: [formData.image_url],
              paymentPrice:
                (user?.isMember
                  ? currEvent.pricing?.members
                  : currEvent.pricing.nonMembers) * 100,
              paymentType: "Event",
              success_url: `${
                process.env.REACT_APP_STAGE === "local"
                  ? "http://localhost:3000/"
                  : CLIENT_URL
              }event/${currEvent.id}/${currEvent.year}/register/success`,
              cancel_url: `${
                process.env.REACT_APP_STAGE === "local"
                  ? "http://localhost:3000/"
                  : CLIENT_URL
              }event/${currEvent.id}/${currEvent.year}/register`,
              email: responseData[0],
              fname: responseData[1],
              eventID: currEvent.id,
              year: currEvent.year
            };
            fetchBackend("/payments", "POST", paymentBody, false)
              .then(async (response) => {
                setIsSubmitting(false);
                window.open(response, "_self");
              })
              .catch((err) => {
                alert(
                  `An error has occured: ${err} Please contact an exec for support.`
                );
                setIsSubmitting(false);
              });
          }
        })
        .catch((err) => {
          alert(
            `An error has occured: ${err} Please contact an exec for support.`
          );
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
      console.error("Form errors");
    }
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    if (isValidSubmission()) {
      const dynamicResponses = {
      };
      for (let i = BASIC_QUESTIONS.length; i < formData.questions.length; i++) {
        if (formData.questions[i].questionType === "CHECKBOX") {
          if (otherData[i]) {
            dynamicResponses[formData.questions[i].questionId] = responseData[
              i
            ].push(otherData[i]);
          }
          dynamicResponses[formData.questions[i].questionId] = responseData[
            i
          ]?.join(", ");
        } else if (formData.questions[i].questionType === "WORKSHOP SELECTION") {
          dynamicResponses[formData.questions[i].questionId] = responseData[i];
        } else {
          dynamicResponses[formData.questions[i].questionId] = responseData[i];
        }
      }
      const registrationBody = {
        email: responseData[0],
        fname: responseData[1],
        studentId: user?.id,
        eventID: currEvent.id,
        year: currEvent.year,
        registrationStatus: "registered",
        isPartner: false,
        points: 0,
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
      fetchBackend("/registrations", "POST", registrationBody, false)
        .then(() => {
          history.push(
            `/event/${currEvent.id}/${currEvent.year}/register/success/attendee`
          );
        })
        .catch((err) => {
          alert(
            `An error has occured: ${err} Please contact an exec for support. 4`
          );
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
      console.error("Form errors");
    }
  };

  const updateUserRegistrationStatus = async (
    id,
    fname,
    registrationStatus
  ) => {
    const body = {
      eventID: eventId,
      year: Number(eventYear),
      registrationStatus
    };
    try {
      await fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);
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
          user?.fname,
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
          user?.fname,
          REGISTRATION_STATUS.CANCELLED
        );
      }
      break;
    default:
      return {
      };
    }
  };

  const isEventFull = () => {
    return (
      currEvent.capac -
        (currEvent.counts?.registeredCount +
          currEvent.counts?.checkedInCount) <=
      0
    );
  };

  const isDeadlinePassed = () => {
    const deadline = new Date(event.deadline).getTime();
    return deadline < new Date().getTime();
  };

  const userAlreadyRegistered = () =>
    registeredEvents?.data.find(
      (e) => e["eventID;year"] === currEvent.id + ";" + currEvent.year
    );

  if (!currEvent) {
    return <Loading message="Loading event..." />;
  }

  if (!user && currEvent.pricing?.nonMembers === undefined) {
    return (
      <Fragment>
        {regAlert}
        <LoginAccess
          header="This event is for members only. To access the form, please sign in."
          redirect={`/event/${eventId}/${eventYear}/register`}
        />
      </Fragment>
    );
  }

  const renderRegMessage = (status) => {
    switch (status) {
    case REGISTRATION_STATUS.CANCELLED:
      return `You have cancelled your registration for ${
        currEvent.ename || "this event"
      }.`;
    case REGISTRATION_STATUS.WAITLISTED:
      return `You are currently waitlisted for ${
        currEvent.ename || "this event"
      }.`;
    case REGISTRATION_STATUS.INCOMPLETE:
      return "You have not completed your payment yet!";
    default:
      return `Already registered for ${currEvent.ename || "this event"}!`;
    }
  };

  const renderFormQuestions = () => {
    const reg = userAlreadyRegistered();
    if (reg) {
      return (
        <Fragment>
          <div style={styles.section}>
            <Typography className={classes.boldText}>
              {renderRegMessage(reg.registrationStatus)}
            </Typography>
            {reg.registrationStatus === REGISTRATION_STATUS.REGISTERED && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => changeRegStatus(REGISTRATION_STATUS.CANCELLED)}
              >
                Cancel Registration
              </Button>
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
            {reg.registrationStatus === REGISTRATION_STATUS.INCOMPLETE && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.open(reg.checkoutLink, "_self")}
              >
                Complete Payment
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
            <Typography className={classes.boldText}>
              Deadline Passed
            </Typography>
            <Typography>
              The registration deadline for {currEvent.ename || "this event"}{" "}
              has already passed on{" "}
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
            <Typography className={classes.boldText}>Event is Full</Typography>
            <Typography>
              We sincerely apologize, {currEvent.ename || "this event"} is no
              longer taking registrations. Please be on the lookout for our
              other events throughout the year!
            </Typography>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Modal open={isNonMemberModalOpen}>
          <div className={classes.modal}>
            <Typography className={classes.modalHeader}>Hey there!</Typography>
            <div className={classes.modalText}>
              <Typography>
                We noticed you aren't a member yet. This may be because you
                aren't signed in, or your account hasn't been registered to
                become a member for this academic year.
              </Typography>
              <Typography>
                This event is available to non-members, but please note that you
                will be paying $
                {(
                  currEvent?.pricing?.nonMembers - currEvent?.pricing?.members
                ).toFixed(2)}{" "}
                more.
              </Typography>
              <Typography>
                Consider registering as a member this year to get access to ALL
                of our events at the best price!
              </Typography>
            </div>
            <div className={classes.modalButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/signup")}
              >
                Register
              </Button>
              {!user && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/login")}
                >
                  Sign-in
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setisNonMemberModalOpen(false)}
              >
                Continue anyway
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          open={
            event.hasDomainSpecificQuestions === true &&
            !questionDomain &&
            !isNonMemberModalOpen
          }
        >
          <div className={classes.modal}>
            <Typography className={classes.modalHeader}>
              What role would you like to apply for?
            </Typography>
            <div className={classes.modalButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setQuestionDomain(QUESTION_DOMAINS.SWE);
                }}
              >
                Software Engineer
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setQuestionDomain(QUESTION_DOMAINS.PM);
                }}
              >
                Product Manager
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setQuestionDomain(QUESTION_DOMAINS.UX);
                }}
              >
                UI/UX Designer
              </Button>
            </div>
          </div>
        </Modal>
        <div style={styles.section}>
          <Typography style={{
            fontWeight: "bold"
          }}>
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
          {!user?.admin &&
          ((user?.isMember && currEvent.pricing?.members > 0) ||
            (!user?.isMember && currEvent.pricing?.nonMembers)) ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePaymentSubmit}
                className={classes.registerButton}
                disabled={isSubmitting}
              >
                <CardMembershipIcon className={classes.registerIcon} />
              Proceed to Payment
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.registerButton}
                disabled={isSubmitting}
              >
              Submit
              </Button>
            )}
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
        {regAlert}
        <Paper className={classes.paper}>
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
            }}>
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
