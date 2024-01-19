import React, {
  useState, useEffect, useRef
} from "react";
// import Lottie from "lottie-react"
import {
  motion, useAnimation
} from "framer-motion";
import {
  useInView
} from "react-intersection-observer";
import {
  TextField, Button, Modal, makeStyles, Typography, useMediaQuery
} from "@material-ui/core";
import {
  useTheme
} from "@material-ui/styles";
import {
  Link
} from "react-router-dom/cjs/react-router-dom";

import "react-step-progress-bar/styles.css";
import Loading from "pages/Loading";
import FeedbackForm from "./FeedbackForm";
import Schedule from "./Schedule";

import {
  COLORS
} from "../../../../constants/_constants/theme";

import {
  constantStyles
} from "../../../../constants/_constants/companion";

const useStyles = makeStyles((theme) => ({
  textfield: {
    borderRadius: 10,
    marginBottom: 20,
  },
  centerText: {
    textAlign: "center", // readable font size for mobile
    fontSize: "1.3rem",
    marginBottom: "1rem",
    fontFamily: "Proximanova",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: 8,
    fontFamily: "Proximanova",
    textAlign: "center",
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
    fontSize: "16px",
    textAlign: "center",
    fontFamily: "Proximanova",
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE,
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
    textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    "&:hover": {
      color: COLORS.WHITE,
    }
  },
}));

// eslint-disable-next-line no-unused-vars
function FadeInWhenVisible({
  children, style, id
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      style={style}
      id={id}
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{
        duration: 0.3
      }}
      variants={{
        visible: {
          opacity: 1,
          scale: 1
        },
        hidden: {
          opacity: 1,
          scale: 0.8
        }
      }}
    >
      {children}
    </motion.div>
  );
}

const CompanionLayout = (params) => {
  const {
    options: {
      BiztechLogo,
      Logo,
      title,
      date,
      location,
      extraStyles,
      colors,
      welcomeData,
      headers,
      disableWelcomeHeader
    },
    email,
    setEmail,
    isLoading,
    error,
    userRegistration,
    registrations,
    event,
    scheduleData,
    ChildComponent,
    props
  } = params;

  const styles = {
    container: {
      backgroundColor: "transparent",
      backgroundImage: colors.background,
      overflow: "hidden",
      minHeight: "100vh",
      display: "flex",
      padding: "10px",
      flexDirection: "column",
      width: "100%",
    },
    introLogo: {
      width: "35%",
      height: "auto",
      marginBottom: "25px",
    },
    homeLogo: {
      marginTop: "24px",
      width: "20%",
      height: "auto",
    },
    mobileHomeLogo: {
      marginTop: "24px",
      width: "35%",
      height: "auto",
    },
    modal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      background: colors.background,
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
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "50px",
      width: "100%",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "25px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      scrollMarginTop: "110px"
    },
    nav: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "25px",
      width: "100%",
    },
    title: {
      fontFamily: "Proximanova",
      textAlign: "center",
      backgroundImage: colors.primary,
      WebkitBackgroundClip: "text",
      height: "60px",
      color: "transparent",
      fontSize: constantStyles.titleFontSize,
      fontWeight: 700,
      marginBottom: "10px",
      width: "80%",
    },
    mobileTitle: {
      fontFamily: "Proximanova",
      textAlign: "center",
      backgroundImage: colors.primary,
      WebkitBackgroundClip: "text",
      height: "50px",
      color: "transparent",
      fontSize: constantStyles.titleMobileFontSize,
      fontWeight: 700,
      marginBottom: "10px",
      width: "100%",
    },
    text: {
      width: "80%",
      color: constantStyles.textColor,
      fontSize: constantStyles.fontSize,
      lineHeight: "28px",
      textAlign: "center",
      marginTop: "8px",
      marginBottom: "8px",
    },
    progressButton: {
      height: 60,
      width: 60,
    },
    feedbackIFrameContainer: {
      backgroundColor: "transparent",
      marginTop: "10px",
      marginBottom: "10px",
      border: "solid",
      borderColor: "rgba(1, 1, 1, 0.1)",
      borderWidth: "3px",
      borderRadius: 10,
      width: "90%"
    },
    feedbackIFrame: {
      width: "100%",
      height: "60vh",
      border: "none",
      fontSize: "14px"
    },
    tableBorder: {
      backgroundColor: "transparent",
      marginTop: "10px",
      marginBottom: "10px",
      border: "solid",
      borderColor: "rgba(1, 1, 1, 0.1)",
      borderWidth: "3px"
    },
    partners: {
      marginTop: -30,
      width: "100%"
    },
    floorplan: {
      width: "60%",
    },
    floorplanMobile: {
      width: "100%",
    },
    ...extraStyles
  };

  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transition, setShowTransition] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [transition]);

  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (userRegistration) {
      setIsModalOpen(false);
    }
  }, [userRegistration]);

  useEffect(() => {
    // Pause the video after 2 seconds
    const timeoutId = setTimeout(() => {
      setShowTransition(false);
    }, 2200);
    const backgroundId = setTimeout(() => {
      setShowBackground(true);
    }, 4000);
    if (window.screen.width > 500) {
      setShowTransition(false);
      setShowVideo(false);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(backgroundId);
    };
  }, []);

  return (
    <div style={styles.container}>
      <Modal
        open={isModalOpen}
      >
        <div style={styles.modal}>
          <Typography className={classes.boldText}>{input}</Typography>
          <Typography className={classes.errorText}>{error}</Typography>
          <div style={styles.modalText}>
            <Typography className={classes.centerText}>Are you sure you want to use this email?</Typography>
            <Typography className={classes.centerText}>Once you confirm, you will not be able to change this, and all future points at the event will be redeemed to this email.</Typography>
          </div>
          <div style={styles.modalButtons}>
            <Button variant="contained" color="primary" disabled={isLoading} className={classes.button}
              onClick={() => {
                setEmail(input);
              }}
            >
              Yes
            </Button>
            <Button variant="contained" color="secondary" disabled={isLoading} className={classes.button}
              onClick={() => {
                setEmail("");
                setIsModalOpen(false);
              }}>
              No
            </Button>
          </div>
        </div>
      </Modal>
      {isLoading ? <Loading /> : (
        <div>
          {(!email || !userRegistration) ?
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              {showVideo && (<><>{!showBackground && <div className="video-container" >
                <video autoPlay muted style={{
                  position: "fixed",
                  top: "0",
                  right: "0",
                  height: "100%",
                  maxWidth: "100vh",
                  overflow: "hidden",
                }}
                loop={true}>
                  <source src="intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>}</>
              <>{showBackground &&
                  <div className="video-container" >
                    <video autoPlay muted style={{
                      position: "fixed",
                      top: "0",
                      right: "0",
                      height: "100%",
                      maxWidth: "100vh",
                      overflow: "hidden",
                    }}
                    loop={true}>
                      <source src="gif.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>}</></>)}
              {!transition &&
                (<motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    duration: 1
                  }}
                  style={{
                    position: "fixed",
                    zIndex: "1"
                  }}>
                  <div style={{
                    ...styles.column,
                    alignItems: "center",
                    minHeight: "100vh",
                  }}>
                    <img src={BiztechLogo} alt={`${title} Logo`} style={styles.introLogo} />
                    <Typography variant="h1" className={classes.boldText} style={{
                      color: constantStyles.textColor
                    }}>Welcome!</Typography>
                    <Typography className={classes.centerText} style={{
                      color: constantStyles.textColor
                    }}>Please enter the email you used to register for {title}</Typography>
                    <TextField
                      className={classes.textfield}
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      variant="outlined"
                      label="Email"
                      inputProps={{
                        autoCapitalize: "none",
                        style: {
                          color: constantStyles.textColor,
                          fontFamily: "Proximanova",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </motion.div>)
              }</div> : (
              <div id="home" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner">
                <div>
                  <FadeInWhenVisible style={{
                    ...styles.column,
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    width: "100%",
                    background: "#060818",
                    zIndex: "9999",
                    paddingBottom: "0.75rem"
                  }}>
                    <img src={Logo} alt={`${title} Logo`} style={renderMobileOnly ? styles.mobileHomeLogo : styles.homeLogo} />
                    <nav role="navigation" style={{
                      ...styles.nav,
                      ...(renderMobileOnly && {
                        width: "100%"
                      })
                    }}>
                      {welcomeData && !disableWelcomeHeader && <a href="#Welcome" className={classes.link} style={{
                        fontSize: constantStyles.fontSize
                      }}>Welcome</a>}
                      {scheduleData?.length && <a href="#Schedule" className={classes.link} style={{
                        fontSize: constantStyles.fontSize
                      }}>Schedule</a>}
                      {headers.map((header, i) => {
                        const lastTabItem = i === headers.length - 1 ? {
                          borderRight: "none"
                        } : {
                        };
                        if (header.id) {
                          return (<a href={`#${header.id}`} key={i} className={classes.link} style={{
                            fontSize: constantStyles.fontSize,
                            ...lastTabItem
                          }}>{header.text}</a>);
                        } else if (header.route) {
                          return <Link to={header.route} className={classes.link} key={i} style={{
                            fontSize: constantStyles.fontSize,
                            ...lastTabItem
                          }}>{header.text}</Link>;
                        }
                      })}
                    </nav>
                  </FadeInWhenVisible>
                </div>
                <div style={{
                  background: "transparent",
                  height: "110px"
                }}> </div>
                {event && event.isCompleted && event.feedback ?
                  <FadeInWhenVisible>
                    <FeedbackForm feedbackLink={event.feedback} renderMobileOnly={renderMobileOnly} styles={styles} />
                  </FadeInWhenVisible> : <></>}
                <FadeInWhenVisible id="welcome" style={styles.column}>
                  <h1 id="Welcome" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Hello, {userRegistration.fname}!</h1>
                  {welcomeData.map((paragraph, i) => {
                    return <div key={i} style={{
                      ...styles.text,
                      ...(renderMobileOnly && {
                        fontSize: constantStyles.mobileFontSize
                      })
                    }}>{paragraph}</div>;
                  })}
                </FadeInWhenVisible>
                {scheduleData.length > 0 &&
                  <FadeInWhenVisible id="Timeline">
                    <Schedule data={scheduleData} renderMobileOnly={renderMobileOnly} date={date} location={location} styles={styles} />
                  </FadeInWhenVisible>}
                <ChildComponent event={event} registrations={registrations} styles={styles} renderMobileOnly={renderMobileOnly} FadeInWhenVisible={FadeInWhenVisible} userRegistration={userRegistration} {...props} />
                <div style={{
                  ...styles.text,
                  width: "100%",
                  marginBottom: "0px",
                  ...(renderMobileOnly && {
                    fontSize: constantStyles.mobileFontSize
                  })
                }}>
                  Contact <a href="mailto:karena@ubcbiztech.com" style={styles.link}>karena@ubcbiztech.com</a> for any questions or concerns.
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CompanionLayout;

