import React, { useState, useEffect } from 'react'
// import Lottie from "lottie-react"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from "@material-ui/styles";

import { fetchBackend } from 'utils'
import { ProgressBar, Step } from 'react-step-progress-bar';
import "react-step-progress-bar/styles.css"
import Loading from 'pages/Loading'
import readSpreadsheet from 'utils/_utils/sheets'

import { COLORS } from "../../../constants/_constants/theme";
import BizTechDBLogo from "../../../assets/2023/data&beyond/BizTechD&BLogo.png";
import DBLogo from "../../../assets/2023/data&beyond/D&BLogo.png";
import BoltDog from "../../../assets/2023/data&beyond/BoltDog.png";
import DBPartners from "../../../assets/2023/data&beyond/D&BPartners.png";

import { constantStyles } from '../../../constants/_constants/companion';

const styles = {
  container: {
    backgroundColor: "transparent",
    backgroundImage: constantStyles.backgroundGradient,
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
    backgroundImage: "linear-gradient(180deg, #614AD7, #719DF8)",
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
    backgroundImage: "linear-gradient(180deg, #614AD7, #719DF8)",
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
    backgroundColor: 'transparent', 
    marginTop: '10px', 
    marginBottom: '10px', 
    border: "solid", 
    borderColor: "rgba(1, 1, 1, 0.1)", 
    borderWidth: "3px"
  },
  partners: {
    marginTop: -30, 
    width: "100%"
  },
}

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
}))

// eslint-disable-next-line no-unused-vars
function FadeInWhenVisible({ children, style, id }) {
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
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 1, scale: 0.8 }
          }}
      >
        {children}
      </motion.div>
  );
}

const Companion = () => {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [pageError, setPageError] = useState("");
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [regData, setRegData] = useState(null)
  const [teamData, setTeamData] = useState(null);
  const [teamPoints, setTeamPoints] = useState({
    current: 0,
    possible: 0,
  })
  const [placements, setPlacements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const TOTAL_POSSIBLE = 73 + 25

  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  function getSortOrder(prop) {    
    return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return -1;    
      } else if (a[prop] < b[prop]) {    
          return 1;    
      }    
      return 0;    
    }    
  }

  function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

  const renderPlacement = () => {
    const idx = placements.findIndex((team) => team.name === teamData.teamName)
    return `${idx + 1}` + nth(idx + 1) + " Place" 
  }

  const fetchUserData = async () => {
    const reg = registrations.find((entry) => entry.id === email)
    if (reg) {
      setError("")
      setRegData(reg)
      localStorage.setItem("D&B2023EMAIL", email)
      setIsModalOpen(false)
    } else {
      setError("This email does not match an existing entry our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.")
      setIsLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID: "data-and-beyond",
      year: 2023
    });
    await fetchBackend(`/registrations?${params}`, "GET", undefined, false)
      .then((response) => {
        setRegistrations(response.data)
      }).catch((err) => {
        setPageError(err)
        setIsLoading(false)
      })
  }

  const fetchTeamData = async () => {
    await fetchBackend("/team/getTeamFromUserID", "post", {
      "eventID": "data-and-beyond", 
        "year": 2023, 
        "user_id": email,
      }, false)
        .then(async (response) => {
          // setTeamData(response);
          setTeamData(response.response);
        })
        .catch((err) => {
          console.log(`unable to fetch user ${email} data`); 
          console.log("error here: ", err)
          setIsLoading(false)
        });
  }

  const fetchTeamPoints = async () => {
    const spreadsheet = await readSpreadsheet();
    const teams = await fetchBackend("/team/data-and-beyond/2023", "GET", undefined, false)
    let current = 0 + teamData.points
    let possible = TOTAL_POSSIBLE - teamData.points
    const points = []
    spreadsheet.forEach((entry) => {
      if (entry.Team === teamData.teamName && entry.Score) {
        const result = entry.Score.split("/")
        const score = Number(result[0].trim())
        const total = Number(result[1].trim())
        if (!isNaN(score) && !isNaN(total)) {
          current += score
          possible -= total
        }
      } 
      if (entry.Score) {
        const result = entry.Score.split("/")
        const score = Number(result[0].trim())
        if (!(points.find((obj) => obj.name === entry.Team))) {
          points.push({name: entry.Team, current: 0})
        }
        const i = points.findIndex((obj) => obj.name === entry.Team)
        points[i].current += isNaN(score) ? 0 : score
      }
    })
    teams.forEach((team) => {
      if (!(points.find((obj) => obj.name === team.teamName))) {
        points.push({name: team.teamName, current: 0})
      }
      const i = points.findIndex((obj) => obj.name === team.teamName)
      points[i].current += team.points
    })
    points.sort(getSortOrder("current"))
    setPlacements(points)
    setTeamPoints({
      current,
      possible
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRegistrations();
    const email = localStorage.getItem("D&B2023EMAIL");
    if (email) {
      setEmail(email)
    } else {
      setIsLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (email && registrations.length > 0) {
      fetchUserData()
      fetchTeamData()
    }
  }, [email, registrations]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (teamData) {
      fetchTeamPoints()
    }
  }, [teamData]); // eslint-disable-line react-hooks/exhaustive-deps

  if (pageError) {
    return (
      <div style={styles.container}>
        <div>A page error occured, please refresh the page. If the problem persists, contact a BizTech exec for support.</div>
      </div>
    )
    }

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
                setIsLoading(true)
                setEmail(input)
              }}
            >
              Yes
            </Button>
            <Button variant="contained" color="secondary" disabled={isLoading} className={classes.button}
              onClick={() => {
                setError("")
                setEmail("")
                setIsModalOpen(false)
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
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}>
            <div style={styles.column}>
              <img src={BizTechDBLogo} alt="D&B Logo" style={styles.introLogo}/>
              <Typography variant="h1" className={classes.boldText} style={{color: constantStyles.textColor}}>Welcome!</Typography>
              <Typography className={classes.centerText} style={{color: constantStyles.textColor}}>Please enter the email you used to register for Data & Beyond.</Typography>
              <TextField
                className={classes.textfield}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                variant="outlined"
                label="Email"
                autoCapitalize={false}
                inputProps={{
                  autoCapitalize: 'none',
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
                  setIsModalOpen(true)
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
                  <img src={DBLogo} alt="D&B Logo" style={renderMobileOnly ? styles.mobileHomeLogo : styles.homeLogo}/>
                  <nav role="navigation" style={{...styles.nav, ...(renderMobileOnly && {width: "100%"})}}>
                  <a href="#Welcome" style={{...styles.link, fontSize: constantStyles.fontSize}}>Welcome</a>
                    {teamData && <a href="#DataChallenge" style={{...styles.link, fontSize: constantStyles.fontSize}}>Data Challenge</a>}
                    <a href="#Schedule" style={{...styles.link, fontSize: constantStyles.fontSize}}>Schedule</a>
                    <a href="#Partners" style={{...styles.link, fontSize: constantStyles.fontSize}}>Partners</a>
                  </nav>
                </FadeInWhenVisible>
              </div>
              <FadeInWhenVisible id="welcome" style={styles.column}>
                {teamData ? 
                  <h1 id="Welcome" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Hello, {regData.fname} from {teamData.teamName}!</h1>
                :
                  <h1 id="Welcome" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Hello, {regData.fname}!</h1>
                }
                <div style={{...styles.text, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize})}}>This will be your friend throughout the event! Check back regularly to see the event schedule, and your team's current point total during the Data Challenge!</div>
                <div style={{...styles.text, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize})}}>Data & Beyond is a half-day conference hosted in collaboration between UBC BizTech and BOLT UBC. The theme is "Launching Careers in Data" - as data becomes ever-present in our lives, there are endless opportunities offered in numerous industries and we want to guide you through the journey of discovering the prospects of data science-related careers.</div>
                <div style={{...styles.text, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize})}}>We hope you have an amazing time with us at Data & Beyond 2023!</div>
              </FadeInWhenVisible>

              {teamData && 
                <FadeInWhenVisible id="welcome" style={styles.column}>
                  <h1 id="DataChallenge" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Data Challenge</h1>
                  <img src={BoltDog} alt="Bolt Dog" style={{marginTop: -30, marginRight: 100, height: 150, width: "auto"}}/>
                    <ProgressBar
                      percent={(teamPoints.current/TOTAL_POSSIBLE) * 100}
                      filledBackground="linear-gradient(to right, #ABADF7, #8FEEE7)"
                      unfilledBackground="rgba(173, 173, 173, 0.2)"
                      width="70%"
                      height={25}
                      stepPositions={[(teamPoints.current/TOTAL_POSSIBLE) * 100]}
                    >
                      <Step>
                        {() => (
                          <img src={BizTechDBLogo} alt="BizTech Logo" style={styles.progressButton}></img>
                        )}
                      </Step>
                    </ProgressBar>
                    <div style={{...styles.text, marginTop: "25px", fontWeight: "bold", ...{fontSize: renderMobileOnly ? constantStyles.mobileFontSize + 4 : 20}}}>{renderPlacement()}</div>
                    <div style={{...styles.text, marginTop: "10px", fontWeight: "bold", ...{fontSize: renderMobileOnly ? constantStyles.mobileFontSize + 4 : 20}}}>{teamPoints.possible === 0 ? `Your team collected a total of ${teamPoints.current} throughout the challenge. Fantastic work!` : `Your team is currently at ${teamPoints.current} points and can still gain up to ${teamPoints.possible} points. Keep progressing!`}</div>
                    <div style={{...styles.text, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize})}}>Please note that your current total and placement may not be completely accurate, as will manually assess the results and fix grading errors where necessary. Please refresh the page to update your total as you go. Thanks for your patience!</div>
                </FadeInWhenVisible>
              }
              <FadeInWhenVisible id="Timeline">
                <div id="Schedule" style={{...styles.column, width: "90%"}}>
                <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Your Schedule</h1>
                <h3 style={{color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize, marginBottom: "8px", marginTop: "-12px"})}}>Friday, March 17th</h3>
                <h5 style={{color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize, marginBottom: "8px"})}}>Birmingham & CPA Hall</h5>
                <TableContainer component={Paper} style={styles.tableBorder}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align = "center" style={{ color: constantStyles.textColor, fontWeight: "bold", ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Time</TableCell>
                      <TableCell align="center" style={{ color: constantStyles.textColor, fontWeight: "bold", ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Activity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}><b>5:30 pm - 6:00 pm</b></TableCell>
                      <TableCell align="center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Registration & Check in</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}><b>6:00 pm - 6:15 pm</b></TableCell>
                      <TableCell align="center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Opening (BizTech and BOLT Introduction)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}><b>6:15 pm - 6:30 pm</b></TableCell>
                      <TableCell align="center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Keynote Speech</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}><b>6:30 pm - 7:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Workshop: {regData.dynamicResponses["a3f58578-219c-4e8f-b4be-8af8f6b9e1fb"]}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}><b>7:30 pm - 8:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}>Data Challenge</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize}) }}><b>8:00 pm - 9:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: constantStyles.textColor, ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize})}}>Boothing and Networking Session</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </TableContainer>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible id="welcome">
                <div id="Partners" style={styles.column}>
                  <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
                  <img src={DBPartners} alt="D&B Partners" style={styles.partners}/>
                </div>
              </FadeInWhenVisible>
              
              <div style={{...styles.text, width: "100%", marginBottom: "0px", ...(renderMobileOnly && {fontSize: constantStyles.mobileFontSize})}}>
                Contact <a href="mailto:karena@ubcbiztech.com" style={styles.link}>karena@ubcbiztech.com</a> for any questions or concerns.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Companion;
