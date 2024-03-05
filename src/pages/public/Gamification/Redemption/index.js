import React, {
  useEffect, useState
} from "react";
import {
  motion
} from "framer-motion";
import Lottie from "lottie-react";

import {
  withRouter
} from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Modal
} from "@material-ui/core";
import {
  fetchBackend
} from "utils";
import Loading from "pages/Loading";

import BizTechDBLogo from "assets/2024/techstyle/techstyle_biztech_logo.png";
// import SuccessAnimation from "assets/2023/blueprint/97240-success.json";
import ErrorAnimation from "assets/2023/blueprint/97670-tomato-error.json";
import DressAnimation from "assets/2024/techstyle/DressAnimation.json";
import {
  COLORS
} from "../../../../constants/_constants/theme";
import {
  constantStyles
} from "../../../../constants/_constants/companion";
import TechStyleTexture from "assets/2024/techstyle/techstyle_grid.png";

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
    // backgroundImage: constantStyles.backgroundGradient

    // for TechStyle Only
    backgroundColor: "#e2e2e2",
    backgroundImage: `url(${TechStyleTexture})`,
    backgroundRepeat: "repeat",
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
    transform: "translate(-50%, -50%)"
  },
  modalText: {
    marginTop: 20,
    marginBottom: 20
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10
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
  "Cheers",
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
  // "May your skills soar to new heights at Blueprint!",
  // "Cheers to your amazing experience at Blueprint!",
  "The BizTech Team is cheering you on!",
  // "Loving the progress you're making at Blueprint!",
  "Showing the world what you're made of!",
  "Really making a run for those prizes, aren't you?!",
  "Taking initiative and shaping the future - keep it up!",
  "Way to go, BizTech superstar!",
  // "You're making waves at Blueprint 🌊",
  "Making a name for yourself and unlocking awesome rewards, I see?",
  "Your tech savvy is paving the way to rewards and recognition!",
  "You're unlocking amazing opportunities - keep it up!",
  "Onward and upward with those prizes!",
  "Go get 'em! Those prizes aren't gonna win themselves!",
  // "Blueprint is the perfect place to show off your skills!",
  // "You are making a difference at Blueprint!",
  "Impressive work - you're making a name for yourself!",
  // "You're really setting the tone for success at Blueprint!",
  "You've got the whole world talking!",
  "The BizTech world is lucky to have you!",
  "Enjoy your spoils and keep up the good work!",
  "You're well on your way to some awesome prizes!",
  "Keep it up and you'll be on your way to some awesome prizes!",
  "You are doing great! Keep it up!",
  "Taking a step closer to some awesome tech prizes!",
  // "May your skills soar to new heights at Blueprint!",
  // "Cheers to your amazing experience at Blueprint!",
  "The BizTech Team is cheering you on!",
  // "Loving the progress you're making at Blueprint!",
  "Showing the world what you're made of!",
  "Really making a run for those prizes, aren't you?!",
  "Taking initiative and shaping the future - keep it up!",
  "Way to go, BizTech superstar!",
  // "You're making waves at Blueprint 🌊",
  "Making a name for yourself and unlocking awesome rewards, I see?",
  "Your tech savvy is paving the way to rewards and recognition!",
  "You're unlocking amazing opportunities - keep it up!",
  "Onward and upward with those prizes!",
  "Go get 'em! Those prizes aren't gonna win themselves!",
  // "Blueprint is the perfect place to show off your skills!",
  // "You are making a difference at Blueprint!",
  "Impressive work - you're making a name for yourself!",
  // "You're really setting the tone for success at Blueprint!",
  "You've got the whole world talking!",
  "The BizTech world is lucky to have you!"
];

const useStyles = makeStyles((theme) => ({
  textfield: {
    background: "#1F2A47",
    width: "75%",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8
  },
  welcome: {
    textAlign: "center", // readable font size for mobile
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: constantStyles.textColor
  },
  centerText: {
    textAlign: "center", // readable font size for mobile
    fontSize: "1.3rem"
  },
  themeText: {
    textAlign: "center", // readable font size for mobile
    fontSize: "1.3rem",
    color: constantStyles.textColor
  },
  pointsText: {
    // bold italicize
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: "1.5rem",
    color: constantStyles.textColor
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: 8
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
    fontSize: "16px",
    textAlign: "center"
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE
    }
  },
  DBButton: {
    marginBottom: 16
  }
}));

const Redemption = ({
  history, location
}) => {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isNegativeQRModalOpen, setNegativeQRModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessAnimationFinished, setIsSuccessAnimationFinished] =
    useState(false);
  const [isErrorAnimationFinished, setIsErrorAnimationFinished] =
    useState(false);
  const [isNegativeQRPointsConfirmed, setIsNegativeQRPointsConfirmed] =
    useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");

  const [pointsAwardedText, setPointsAwardedText] = useState(0);
  const [congratNameText, setCongratNameText] = useState("");
  const [congratSuffixText, setCongratSuffixText] = useState("");
  const [timestampText, setTimestampText] = useState("");
  const [negativePointsAwardedText, setNegativePointsAwardedText] = useState(0);
  const [qrMetaData, setQRMetaData] = useState({
  });

  const classes = useStyles();

  const {
    eventID, year, qrID
  } = location?.state || {
  };

  // Temp for Blueprint
  const id = qrID.slice(6);
  const links = {
    "data-challenge-1":
      "https://docs.google.com/forms/d/e/1FAIpQLScdJC-w2ypk9109ud-77VfgK4srdaujYeE8LBFXkbHf8fhY0w/viewform",
    "data-challenge-2":
      "https://docs.google.com/forms/d/e/1FAIpQLSdAmNcw4iwlsIej01iOOte7QVpTC3gBUU99zTrP88STCMtetQ/viewform",
    "data-challenge-3":
      "https://docs.google.com/forms/d/e/1FAIpQLSdpbfthDx27LrMzyvMkK_W9jFytG5D4805qNNDY26VCQKmnKQ/viewform",
    "data-challenge-4":
      "https://docs.google.com/forms/d/e/1FAIpQLSedwv5fsVU99OJrgIu5HozWoMM06C0xkULP3vT4u_quv5HVWw/viewform",
    "data-challenge-5":
      "https://docs.google.com/forms/d/e/1FAIpQLSf3tESUF_w_4JK7H9ngtg9oqcl7ld4hGssIcr6dl1zGtedAgA/viewform"
  };

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID,
      year
    });
    await fetchBackend(`/registrations?${params}`, "GET", undefined, false)
      .then((response) => {
        if (response.data.length === 0) {
          setError(
            "The information we received is incorrect and we are unable to redeem the code. Please contact an exec if you think this is a mistake."
          );
          setIsLoading(false);
        } else {
          setRegistrations(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };


  const submitEmail = async () => {
    setIsLoading(true);
    const reg = registrations.find((entry) => entry.id.toLowerCase() === email.toLowerCase());
    if (reg) {
      await fetchBackend(
        "/qrscan",
        "POST",
        {
          qrCodeID: qrID === "pTbLt-View the attendee showcase" ? "pTbLt-View the attendee showcase & vote for a personal project!" : qrID,
          eventID,
          year: Number(year),
          email: reg.id,
          negativePointsConfirmed: isNegativeQRPointsConfirmed
        },
        false
      )
        .then((res) => {
          localStorage.setItem("companionEmail", reg.id);
          setQRMetaData(res.response.qr_data);
          determinePointsAwardedText(res.response.redeemed_points);
          determineCongratText(res.response.first_name);
          determineCongratSuffixText(res.response.redeemed_points);
          determineTimestampText();
          setIsEmailModalOpen(false);
          setIsLoading(false);
        })
        .catch((err) => {
          handleQrScanError(err);
          setIsLoading(false);
        });
    } else {
      setError(
        "This email does not match an existing entry in our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("companionEmail");
    if (email) {
      setEmail(email);
    }
    if (!eventID || !year || !qrID) {
      setError(
        "We are missing some information and are unable to redeem the code. Please contact an exec if you think this is a mistake."
      );
      setIsLoading(false);
    } else {
      fetchRegistrations();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (email && registrations.length > 0) {
      submitEmail();
    }
  }, [email, registrations, isNegativeQRPointsConfirmed]); // eslint-disable-line react-hooks/exhaustive-deps

  const finishSuccess = () => {
    setIsSuccessAnimationFinished(true);
    if (qrMetaData?.linkedin) {
      window.location.href = qrMetaData?.linkedin;
    }
  };

  const finishError = () => {
    setIsErrorAnimationFinished(true);
  };

  const determineCongratText = (firstName) => {
    if (firstName) {
      setCongratNameText(
        `${prefixNameText[Math.floor(Math.random() * prefixNameText.length)]
        }, ${firstName}!`
      );
    } else {
      setCongratNameText(
        `${prefixNameText[Math.floor(Math.random() * prefixNameText.length)]}!`
      );
    }
  };

  const determineCongratSuffixText = (points) => {
    if (points > 0) {
      setCongratSuffixText(
        suffixNameText[Math.floor(Math.random() * suffixNameText.length)]
      );
    } else {
      setCongratSuffixText("Successfully purchased!");
    }
  };

  const determinePointsAwardedText = (points) => {
    if (points > 0) {
      setPointsAwardedText(`+${points} Points`);
    } else {
      const pts = `${points} Points`;
      setPointsAwardedText(`${points} Points`);
      setNegativePointsAwardedText(pts.substring(1, `${points} Points`.length));
    }
  };
  const determineTimestampText = () => {
    const date = new Date().toLocaleString("en-US", {
      timeZone: "PST"
    });
    setTimestampText(date);
  };

  const handleQrScanError = (err) => {
    switch (err.status) {
      case 405:
        determinePointsAwardedText(err.message.qr_points);
        setNegativeQRModalOpen(true);
        break;
      case 406:
        setError("You do not have sufficient funds to make this purchase.");
        break;
      default:
        if (
          err.message.message &&
          err.message.message.includes("already scanned")
        ) {
          // TEMPORARY for Blueprint: remove this conditional branch once we have a better way to handle this
          // this is neccessary because the backend error message for already scanned QRs is not
          // user friendly: "ERROR: Team QR code already scanned and is not an unlimited scan QR code"
          setError(
            "This code is already scanned and can only be redeemed once."
          );
        } else {
          setError(err.message.message);
        }
        break;
    }
    console.log(err);
  };

  return (
    <>
      <Modal open={isEmailModalOpen}>
        <motion.div
          style={styles.modal}
          animate={{
            opacity: isEmailModalOpen ? 1 : 0
          }}
        >
          <Typography className={classes.boldText}>{input}</Typography>
          <Typography className={classes.errorText}>{error}</Typography>
          <div style={styles.modalText}>
            <Typography className={classes.centerText}>
              Are you sure you want to use this email?
            </Typography>
            <Typography className={classes.centerText}>
              Once you confirm, you will not be able to change this, and all
              future points at the event will be redeemed to this email.
            </Typography>
          </div>
          <div style={styles.modalButtons}>
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={classes.button}
              onClick={() => {
                setEmail(input);
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              className={classes.button}
              onClick={() => {
                setError("");
                setEmail("");
                setIsEmailModalOpen(false);
              }}
            >
              No
            </Button>
          </div>
        </motion.div>
      </Modal>

      <Modal open={isNegativeQRModalOpen}>
        <motion.div
          style={styles.modal}
          animate={{
            opacity: isNegativeQRModalOpen ? 1 : 0
          }}
        >
          <img
            src={BizTechDBLogo}
            alt="Blueprint Logo"
            style={{
              width: "60%",
              height: "auto"
            }}
          />
          <Typography className={classes.boldText}>
            You are about to spend {negativePointsAwardedText}
          </Typography>
          <div style={styles.modalText}>
            <Typography className={classes.centerText}>
              Confirm this purchase
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={classes.button}
              onClick={() => {
                setNegativeQRModalOpen(false);
                setIsNegativeQRPointsConfirmed(true);
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              className={classes.button}
              onClick={() => {
                setError("QR code not redeemed.");
                setNegativeQRModalOpen(false);
              }}
            >
              No
            </Button>
          </div>
        </motion.div>
      </Modal>

      {isLoading ? (
        <div style={styles.container}>
          <Loading />
        </div>
      ) : (
        <motion.div
          style={styles.container}
          initial={{
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.5
          }}
        >
          {email ? (
            <>
              {!isSuccessAnimationFinished &&
                !isErrorAnimationFinished &&
                !isEmailModalOpen ? (
                <div style={styles.successContainer}>
                  {error ? (
                    <Lottie
                      animationData={ErrorAnimation}
                      onLoopComplete={finishError}
                    />
                  ) : (
                    <Lottie
                      animationData={DressAnimation}
                      onLoopComplete={finishSuccess}
                    />
                  )}
                  ;
                </div>
              ) : (
                <>
                  <motion.div
                    style={styles.successContainer}
                    initial={{
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    <img
                      src={BizTechDBLogo}
                      alt="Blueprint Logo"
                      style={{
                        width: "60%",
                        height: "auto",
                        marginBottom: 20
                      }}
                    />
                  </motion.div>

                  <motion.div
                    style={styles.successContainer}
                    initial={{
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {error ? (
                      <Typography
                        className={classes.themeText}
                        style={{
                          margin: "20px 0"
                        }}
                      >
                        {error}
                      </Typography>
                    ) : (
                      <>
                        <Typography className={classes.welcome}>
                          {congratNameText}
                        </Typography>

                        <Typography className={classes.themeText}>
                          {congratSuffixText}
                        </Typography>

                        <Typography
                          className={classes.pointsText}
                          style={{
                            margin: "20px 0"
                          }}
                        >
                          {pointsAwardedText}
                        </Typography>
                      </>
                    )}
                  </motion.div>

                  <motion.div
                    style={styles.successContainer}
                    initial={{
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  >
                    {links[id] && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.DBButton}
                        onClick={() => {
                          window.open(links[id]);
                        }}
                      >
                        Proceed to Challenge
                      </Button>
                    )}
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
                    <Typography
                      className={classes.themeText}
                      style={{
                        margin: "20px 0"
                      }}
                    >
                      {timestampText}
                    </Typography>
                  </motion.div>
                </>
              )}
            </>
          ) : (
            <>
              <img
                src={BizTechDBLogo}
                alt="Blueprint Logo"
                style={{
                  width: "35%",
                  height: "auto"
                }}
              />
              <div style={styles.inputContainer}>
                <Typography className={classes.welcome}>Welcome!</Typography>
                <Typography className={classes.themeText}>
                  To redeem points, please enter the email you used to register
                  for the event.
                </Typography>
                <TextField
                  className={classes.textfield}
                  style={{
                    marginTop: 20,
                    marginBottom: 20
                  }}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsEmailModalOpen(true);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
};

export default withRouter(Redemption);
