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
  TextField, Button, makeStyles, Typography, useMediaQuery
} from "@material-ui/core";
import {
  useTheme
} from "@material-ui/styles";
import {
  Link
} from "react-router-dom/cjs/react-router-dom";

import "react-step-progress-bar/styles.css";
import Loading from "pages/Loading";
import LogoutButton from "./LogoutButton";
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
    width: "80%",
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
    width: "80%",
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 15,
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
      BackgroundImage,
      title,
      date,
      location,
      extraStyles,
      colors,
      welcomeData,
      headers,
      disableWelcomeHeader,
      landing
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
      backgroundColor: BackgroundImage ? "#F5EE9E" : "transparent",
      backgroundImage: BackgroundImage ? `url(${BackgroundImage})` : colors.background,
      backgroundRepeat: "repeat",
      overflow: "hidden",
      minHeight: "100vh",
      display: "flex",
      padding: "10px",
      flexDirection: "column",
      width: "100%",
    },
    introLogo: {
      width: "60%",
      height: "auto",
      marginBottom: "20px",
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
      width: "100%"
    },
    schedule: {
      width: "60%",
    },
    scheduleMobile: {
      width: "90%",
    },
    landing: {
      paddingBottom: "20px",
    },
    subheading: {
      color: constantStyles.textColor,
      textAlign: "center",
    },
    listItem: {
      color: constantStyles.textColor,
      textAlign: "left",
    },
    tabImage: {
      height: "300px",
    },
    video: {
      position: "fixed",
      top: "0px",
      right: "-18px",
      left: "-15px",
      height: "120%",
      width: "auto",
      minWidth: "120vw",
      minHeight: "100vh",
      overflow: "hidden",
      display: "block",
      userSelect: "none",
      WebkitMediaControlsPanel: "none !important"
    },
    ...extraStyles
  };

  const [input, setInput] = useState("");
  const [transition, setShowTransition] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
    handlePlay();
  }, [showBackground]);

  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

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
    handlePlay();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(backgroundId);
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.click();
      video.play()
        .catch(error => {
          console.error("Autoplay prevented:", error);
        });
    }
  };

  return (
    <div style={(!email || !userRegistration) ? {
      ...styles.container,
      padding: "0"
    } : styles.container}>
      {isLoading ? <Loading /> : (
        <div>
          {(!email || !userRegistration) ?
            <div style={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden"
            }}>
              {showVideo && (<div className="video-container" >
                <video autoPlay muted playsInline style={styles.video}
                  loop={true} ref={videoRef}>
                  {!showBackground ?
                    <source src="intro.mp4" type="video/mp4" /> :
                    <source src="gif.mp4" type="video/mp4" />}
                  Your browser does not support the video tag.
                </video>
              </div>
              )}
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
                    <img src={BiztechLogo} alt={`${title} Logo`} style={{
                      ...styles.introLogo,
                      width: renderMobileOnly ? "60%" : "50%"
                    }} />
                    <Typography variant="h1" className={classes.boldText} style={{
                      color: constantStyles.textColor
                    }}>Welcome!</Typography>
                    <Typography className={classes.centerText} style={{
                      color: constantStyles.textColor
                      // HOT FIX old -> Please enter the email you used to register for {title} 
                    }}>Thanks for applying to Hello Hacks 2024</Typography>
                    <Typography className={classes.centerText} style={{
                      color: constantStyles.textColor
                      // HOT FIX 
                    }}>Check back later for your application status! </Typography>
                    {/* <TextField
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
                      className={classes.button}
                      onClick={() => {
                        setEmail(input);
                      }}
                    >
                      Confirm
                    </Button> */}
                    <Typography className={classes.errorText} style={{
                      color: constantStyles.textColor
                    }}>{error}</Typography>
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
                    background: colors.background,
                    zIndex: "9999",
                    paddingBottom: "0.75rem"
                  }}>
                    <LogoutButton />
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
                      {scheduleData && scheduleData.length > 0 && <a href="#Schedule" className={classes.link} style={{
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
                            color: "black",
                            ...lastTabItem,
                          }}>{header.text}</a>);
                        } else if (header.route) {
                          return <Link to={header.route} className={classes.link} key={i} style={{
                            fontSize: constantStyles.fontSize,
                            color: "black",
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
                    <FeedbackForm feedbackLink={event.feedback} renderMobileOnly={renderMobileOnly} styles={styles} headerText={"Thanks for attending!"} />
                  </FadeInWhenVisible> : <></>}
                <FadeInWhenVisible id="welcome" style={styles.column}>
                  {landing && <img src={landing}
                    style={{
                      ...styles.landing,
                      width: renderMobileOnly ? "90%" : "40%",
                      marginTop: renderMobileOnly ? "auto" : "50px",
                    }} />}
                  <h1 id="Welcome" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Hello, {userRegistration.fname}!</h1>
                  {event && event.isCompleted ? <div style={{
                    ...styles.text,
                    ...(renderMobileOnly && {
                      fontSize: constantStyles.mobileFontSize
                    })
                  }}>The event is now over, please head back to the main room, we hope you enjoyed your time 😊!</div> :
                    welcomeData.map((paragraph, i) => {
                      return <div key={i} style={{
                        ...styles.text,
                        ...(renderMobileOnly && {
                          fontSize: constantStyles.mobileFontSize
                        })
                      }}>{paragraph}</div>;
                    }
                    )}
                </FadeInWhenVisible>
                {scheduleData.length > 0 &&
                  <FadeInWhenVisible id="Timeline">
                    <Schedule data={scheduleData} renderMobileOnly={renderMobileOnly} date={date} location={location} styles={styles} />
                  </FadeInWhenVisible>}
                <ChildComponent event={event} registrations={registrations} styles={styles} renderMobileOnly={renderMobileOnly} FadeInWhenVisible={FadeInWhenVisible} userRegistration={userRegistration} {...props} />
                {/* <div style={{
                  ...styles.text,
                  width: "100%",
                  marginBottom: "0px",
                  ...(renderMobileOnly && {
                    fontSize: constantStyles.mobileFontSize
                  })
                }}>
                  Contact <a href="mailto:karena@ubcbiztech.com" style={styles.link}>karena@ubcbiztech.com</a> for any questions or concerns.
                </div> */}
              </div>
            )}
        </div>
      )
      }
    </div >
  );
};

export default CompanionLayout;

