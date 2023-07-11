import React, {
  useState, useEffect
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

import "react-step-progress-bar/styles.css";
import Loading from "pages/Loading";

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
      eventID,
      year,
      date,
      location,
      extraStyles,
      colors,
      welcomeData,
      headers
    },
    email,
    setEmail,
    isLoading,
    error,
    regData,
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
    },
    nav: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "25px",
      width: "75%",
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
    link: {
      textDecoration: "none",
      color: "#9598FE",
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
    ...extraStyles
  };

  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (regData) {
      setIsModalOpen(false);
    }
  }, [regData]);

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
      {isLoading ? <Loading/> : (
        <div>
          {!email || !regData ? (
            <motion.div
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
              }}>
              <div style={styles.column}>
                <img src={BiztechLogo} alt={`${title} Logo`} style={styles.introLogo}/>
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
                  autoCapitalize={false}
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
            </motion.div>
          ) : (
            <div id="home" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner">
              <div>
                <FadeInWhenVisible style={styles.column}>
                  <img src={Logo} alt={`${title} Logo`} style={renderMobileOnly ? styles.mobileHomeLogo : styles.homeLogo}/>
                  <nav role="navigation" style={{
                    ...styles.nav,
                    ...(renderMobileOnly && {
                      width: "100%"
                    })
                  }}>
                    {welcomeData && <a href="#Welcome" style={{
                      ...styles.link,
                      fontSize: constantStyles.fontSize
                    }}>Welcome</a>}
                    {scheduleData?.length && <a href="#Schedule" style={{
                      ...styles.link,
                      fontSize: constantStyles.fontSize
                    }}>Schedule</a>}
                    {headers.map((header, i) => {
                      return (<a href={`#${header.id}`} key={i} style={{
                        ...styles.link,
                        fontSize: constantStyles.fontSize
                      }}>{header.text}</a>);
                    })}
                  </nav>
                </FadeInWhenVisible>
              </div>
              <FadeInWhenVisible id="welcome" style={styles.column}>
                <h1 id="Welcome" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Hello, {regData.fname}!</h1>
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
                  <Schedule data={scheduleData} date={date} location={location} styles={styles} renderMobileOnly={renderMobileOnly}/>
                </FadeInWhenVisible>}
              <ChildComponent regData={regData} email={email} eventID={eventID} year={year} styles={styles} renderMobileOnly={renderMobileOnly} theme={theme} classes={classes} FadeInWhenVisible={FadeInWhenVisible} {...props}/>
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

