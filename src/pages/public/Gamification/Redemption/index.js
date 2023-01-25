import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import { withRouter } from "react-router-dom";
import { Button, TextField, Typography, makeStyles, Modal } from "@material-ui/core";
import { fetchBackend } from "utils";
import Loading from "pages/Loading";

import BlueprintLogo from "assets/2023/blueprint/Blueprint 2023 Transparent Logo.png";
import SuccessAnimation from "assets/2023/blueprint/97240-success.json";
import ErrorAnimation from "assets/2023/blueprint/97670-tomato-error.json";

const styles = {
  container: {
    height: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // mobile-centric padding
    padding: "0 10px", // adding spacing between children
    // bring up the height of the container
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px"
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
};

const prefixNameText = [
    "Congrats",
    "You did it",
    "Way to go",
    "You're a champ",
    "Bravo",
    "Brilliant",
    "Incredible",
    "Amazing",
    "Sensational",
    "Kudos",
    "Fantastic",
    "Cheers"
];

const suffixNameText = [
    "Enjoy your spoils and keep up the good work!",
    "You're well on your way to some awesome prizes!",
    "Keep it up and you'll be on your way to some awesome prizes!",
    "You are doing great! Keep it up!",
    "Taking a step closer to some awesome tech prizes!",
    "May your tech skills soar to new heights at Blueprint!",
    "Cheers to your amazing experience at Blueprint!",
    "The BizTech Team is cheering you on!",
    "Loving the progress you're making at Blueprint!",
    "Showing the tech world what you're made of!",
    "Really making a run for those prizes, aren't you?!",
    "Taking initiative and shaping the future - keep it up!",
    "Way to go, BizTech superstar!",
    "You're making waves at Blueprint 🌊",
    "Making a name for yourself and unlocking awesome rewards, I see?",
    "Your tech savvy is paving the way to rewards and recognition!",
    "You're unlocking amazing opportunities - keep it up!",
    "Onward and upward with those prizes!",
    "Go get 'em! Those prizes aren't gonna win themselves!",
    "Blueprint is the perfect place to show off your tech skills!",
    "You are making a difference at Blueprint!",
    "Impressive work - you're making a name for yourself!",
    "You're really setting the tone for success at Blueprint!",
    "You've got the tech world talking!",
    "The BizTech world is lucky to have you!",
];

const useStyles = makeStyles((theme) => ({
  textfield: {
    background: "#1F2A47",
    width: "75%",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  centerText: {
    textAlign: "center", // readable font size for mobile
    fontSize: "1.3rem",
  },
  pointsText: { // bold italicize
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: "1.5rem",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: 8,
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
    fontSize: "16px",
    textAlign: "center",
  }
}));

const Redemption = ({ history, location }) => {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessAnimationFinished, setIsSuccessAnimationFinished] = useState(false);
  const [isErrorAnimationFinished, setIsErrorAnimationFinished] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");

  const [pointsAwardedText, setPointsAwardedText] = useState(0);
  const [congratNameText, setCongratNameText] = useState("");

  const classes = useStyles();

  const { eventID, year, qrID } = location?.state || {}

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID,
      year
    });
    await fetchBackend(`/registrations?${params}`, "GET", undefined, false)
      .then((response) => {
        setRegistrations(response.data)
        setIsLoading(false)
    }).catch((err) => {
      setError(err)
      setIsLoading(false)
    })
  }

  const checkEmail = () => registrations.some((entry) => entry.id === email)

  const submitEmail = async () => {
    setIsLoading(true)
    if (checkEmail()) {
      await fetchBackend("/qr", "POST", {
        "qrCodeID": qrID,
        "eventID": eventID,
        "year": Number(year),
        "email": email
      }, false).then((res) => {
        localStorage.setItem("BP2023EMAIL", email)
        determinePointsAwardedText(res.response.redeemed_points)
        determineCongratText(res.response.first_name)
        setIsModalOpen(false)
        setIsLoading(false)
      }).catch((err) => {
        setError(err.message.message)
        setIsLoading(false)
      })
    } else {
      setError("This email does not match an existing entry in our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const email = localStorage.getItem("BP2023EMAIL");
    if (email) {
      setEmail(email)
    }
    if (!eventID || !year || !qrID) {
      setError("We are missing some information and are unable to redeem the code. Please contact an exec if you think this is a mistake.")
      setIsLoading(false)
    } else {
      fetchRegistrations();
      determinePointsAwardedText(-1);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (email && registrations.length > 0) {
      submitEmail()
    }
  }, [email, registrations]) // eslint-disable-line react-hooks/exhaustive-deps

  const finishSuccess = () => {
    setIsSuccessAnimationFinished(true);
  }

  const finishError = () => {
    setIsErrorAnimationFinished(true);
  }

  const determineCongratText = (firstName) => {
    if (firstName) {
        setCongratNameText(`${prefixNameText[Math.floor(Math.random() * prefixNameText.length)]}, ${firstName}!`)
    } else {
        setCongratNameText(`${prefixNameText[Math.floor(Math.random() * prefixNameText.length)]}!`)
    }
  }

  const determinePointsAwardedText = (points) => {
      if (points > 0) {
        setPointsAwardedText(`+${points} points`)
      } else {
        setPointsAwardedText(`Already Redeemed`)
      }
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        >
        <motion.div style={styles.modal} animate={{ opacity: isModalOpen ? 1 : 0 }}>
          <Typography className={classes.boldText}>{input}</Typography>
          <Typography className={classes.errorText}>{error}</Typography>
          <div style={styles.modalText}>
            <Typography className={classes.centerText}>Are you sure you want to use this email?</Typography>
            <Typography className={classes.centerText}>Once you confirm, you will not be able to change this, and all future points at the event will be redeemed to this email.</Typography>
          </div>
          <div style={styles.modalButtons}>
            <Button variant="contained" color="primary"
              onClick={() => {
                setEmail(input)
                setIsModalOpen(false)
              }}
              style={{ backgroundColor: "#FFC107", marginRight: 10 }}
            >
              Yes
            </Button>
            <Button variant="contained" color="primary"
              onClick={() => {
                setIsModalOpen(false)
              }}>
              No
            </Button>
          </div>
        </motion.div>
      </Modal>
      {isLoading ? (
        <div style={styles.container}>
          <Loading/>
        </div>
      ) : (
          <motion.div style={styles.container}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}>
          {email ? ( <>
                  { !isSuccessAnimationFinished && !isErrorAnimationFinished ?
                      <div style={styles.successContainer}>

                      {error ? (
                        <Lottie animationData={ErrorAnimation} onLoopComplete={finishError}/>
                      ) : (
                        <Lottie animationData={SuccessAnimation} onLoopComplete={finishSuccess} />
                      )};

                      </div> :

                      <>
                        <motion.div style={styles.successContainer}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}>

                          <img src={BlueprintLogo} alt="Blueprint Logo" style={{ width: "50%", height: "auto", marginBottom: 20 }}/>

                        </motion.div>



                        <motion.div style={styles.successContainer}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}>
                          
                          {error ? (
                            <Typography className={classes.centerText} style={{margin: "20px 0"}}>{error}</Typography>
                          ) : (
                            <>
                              <Typography variant="h1">{congratNameText}</Typography>

                              <Typography className={classes.centerText}>{
                                suffixNameText[Math.floor(Math.random() * suffixNameText.length)]
                              }</Typography>
                              
                              <Typography className={classes.pointsText} style={{margin: "20px 0"}}>{pointsAwardedText}</Typography>
                            </>
                          )}

                        </motion.div>

                          <motion.div style={styles.successContainer}
                                      initial={{ opacity: 0, scale: 0.5 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.6, ease: 'easeOut' }}> 

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => {
                                  history.push("/companion");
                                }}
                            >
                              Return to Companion
                            </Button>
                          </motion.div>
                      </>
                  }
            </>
            ) : (
            <>
              <img src={BlueprintLogo} alt="Blueprint Logo" style={{ width: "35%", height: "auto", marginBottom: 20 }}/>
              <div style={styles.inputContainer}>
                <Typography variant="h1">Welcome!</Typography>
                <Typography className={classes.centerText}>To redeem points, please enter the email you used to register for Blueprint.</Typography>
                <TextField
                  className={classes.textfield}
                  style={{ marginTop: 20, marginBottom: 20 }}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  Confirm
                </Button>
              </div>
            </>
            )
          }
        </motion.div>
      )}
    </>
  )
}

export default withRouter(Redemption);
