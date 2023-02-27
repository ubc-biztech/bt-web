import React, { useState, useEffect } from 'react'
import Lottie from "lottie-react"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProgressBar, Step } from "react-step-progress-bar"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , TextField, Button, Modal, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from "@material-ui/styles";
import CatalogItem from './CatalogItem'

import { fetchBackend } from 'utils'
import Rocketbook from "../../../assets/rocketbook.png"
import SonyXM5 from "../../../assets/sonyxm5.png"
import "./biztecho.webflow.css"
import "react-step-progress-bar/styles.css"
import Loading from 'pages/Loading'
import readSpreadsheet from 'utils/_utils/sheets'

import { COLORS } from "../../../constants/_constants/theme";
import BlueprintLogo from "../../../assets/2023/blueprint/Blueprint 2023 Transparent Logo.png";
import CompanionFooter from "../../../assets/2023/blueprint/InnoventFooter.png";
import FlagshipGraphic from "../../../assets/2023/blueprint/Blueprint companion header.png";
import TimeAndLocation from "../../../assets/2023/blueprint/Time and Location.svg";
import BizTechLogo from "../../../assets/2023/blueprint/BizTechLogo.png";
import InnoventLogo from  "../../../assets/2023/blueprint/InnoventLogo.png";

import Printer from "../../../assets/2023/innovent/3d-printer.jpg";
import ArduinoNanoBle from "../../../assets/2023/innovent/arduino-nano-ble.jpg";
import ArduinoNano from "../../../assets/2023/innovent/arduino-nano.jpg";
import ArduinoUno from "../../../assets/2023/innovent/arduino-uno.jpg";
import Cardboard from "../../../assets/2023/innovent/cardboard.jpg";
import Cardstock from "../../../assets/2023/innovent/cardstock.jpg";
import DuctTape from "../../../assets/2023/innovent/duct-tape.jpg";
import ElegooUno from "../../../assets/2023/innovent/elegoo-uno.jpg";
import GlueGunSticks from "../../../assets/2023/innovent/glue-gun-sticks.jpeg";
import KnexBlocks from "../../../assets/2023/innovent/knex-blocks.png";
import LCD from "../../../assets/2023/innovent/lcd.jpeg";
import MaskingTape from "../../../assets/2023/innovent/masking-tape.jpeg";
import Servo from "../../../assets/2023/innovent/servo.jpeg";
import Soldering from "../../../assets/2023/innovent/soldering.jpeg";

import StreamPrizes from "../../../assets/2023/innovent/stream-prizes.png";
import Streams from "../../../assets/2023/innovent/streams.png";
import WinningPrizes from "../../../assets/2023/innovent/winning-prize.png";


import CelebrationAnimation from "assets/2023/blueprint/68064-success-celebration.json"
import GamificationActivityTable from './GamificationActivityTable'
import GamificationRewardTable from './GamificationRewardTable'

const styles = {
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
function FadeInWhenVisible({ children, className, id }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
      <motion.div
          className={className}
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
  // const maxPoints = 150
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [pageError, setPageError] = useState("");
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [regData, setRegData] = useState(null)
  const [teamData, setTeamData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCelebrationFinished, setIsCelebrationFinished] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
;
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUserData = async () => {
    const reg = registrations.find((entry) => entry.id === email)
    if (reg) {
      setError("")
      setRegData(reg)
      const spreadsheet = await readSpreadsheet();
      const assignment = spreadsheet.find((entry) => entry.email === email);
      setScheduleData(assignment)
      localStorage.setItem("INNOVENT2023EMAIL", email)
      setIsModalOpen(false)
      setIsLoading(false)
    } else {
      setError("This email does not match an existing entry our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.")
      setIsLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID: "innovent",
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
      "eventID": "innovent", 
        "year": 2023, 
        "user_id": email,
      }, false)
        .then((response) => {
          console.log("aaa", response);
          // setTeamData(response);
          setTeamData(response.response);
        })
        .catch((err) => {
          console.log(`unable to fetch user ${email} data`); 
          console.log("error here: ", err)
        });
  }

  useEffect(() => {
    fetchRegistrations();
    const email = localStorage.getItem("INNOVENT2023EMAIL");
    if (email) {
      setEmail(email)
    } else {
      setIsLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (email && registrations.length > 0) {
      fetchUserData()
    }
  }, [email, registrations]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (email && registrations.length > 0) {
      fetchTeamData()
    }
  }, [email, registrations])

  useEffect(() => {
    console.log("team data here", teamData);
  }, [teamData]);

  const workshops = {
    "acba6e61-b8d9-4a1e-8ca9-305efcf40cbf": {
      "Tech Entrepreneurship (CloudAdvisors)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Tech Entrepreneurship</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Rahul Rao (CloudAdvisors)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2311</div>
          </div>
        </div>,
      "FinTech (SAP)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>FinTech</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Phil Houmphan (SAP)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2314</div>
          </div>
        </div>,
      "Venture Capital (Front Row Ventures)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Venture Capital & Start-ups</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Gabriel D. (Front Row Ventures)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2504</div>
          </div>
        </div>,
      "Data Analytics (KPMG)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Data Analytics</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Emily Chee (KPMG)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2309</div>
          </div>
        </div>,
    },
    "aeeb699e-b2c9-47c7-aa57-b3a657fdf947": {
      "Customer Success (Athennian)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Customer Success</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Hilton Nguyen (Athennian)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2309</div>
          </div>
        </div>,
      "Product Management (Yelp)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Product Management</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Kyle Chua (Yelp)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2311</div>
          </div>
        </div>,
      "Project Management (Microsoft)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Project Management</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Ashar Kazi (Microsoft)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2314</div>
          </div>
        </div>,
      "Generative AI (Apply Digital)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Generative AI</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Nicholas Ning (Farpoint)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2504</div>
          </div>
        </div>,
      "Generative AI (Farpoint)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Generative AI</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Nicholas Ning (Farpoint)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2504</div>
          </div>
        </div>,
    },
    "fdcd18bc-8335-42dd-9ea8-ef927e742695": {
      "Cybersecurity (PwC)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Cybersecurity</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Liam Adams (PwC)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2311</div>
          </div>
        </div>,
      "SaaS Marketing (Visier)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Risk Advisory</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Neumann Lim (Deloitte)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2504</div>
          </div>
        </div>,
      "Risk Advisory (Deloitte)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Risk Advisory</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Neumann Lim (Deloitte)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2504</div>
          </div>
        </div>,
      "Software Engineering (Tesla)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Software Engineering</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Brooke Isenberg (Tesla)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2309</div>
          </div>
        </div>,
      "Embedded Systems (Tesla)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Software Engineering</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Brooke Isenberg (Tesla)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2309</div>
          </div>
        </div>,
      "Digital Transformation (IBM)":
        <div className="workshop">
          <div className="workshop-details">
            <div className="workshop-detail"><strong>Digital Transformation</strong></div>
            <div className="workshop-detail"><strong>Speaker:</strong> Armando Elias (IBM)</div>
            <div className="workshop-detail"><strong>Room:</strong> 2314</div>
          </div>
        </div>
    }
  }

  const prizeList = [
  {
    name: "Rocketbook Pro",
    points: 50
  },
  {
    name: "first Fujifilm Mini Instax",
    points: 70
  },
  {
    name: "second Fujifilm Mini Instax",
    points: 90
  },
  {
    name: "Sony WH-1000XM5",
    points: 120
  },
  {
    name: "10th Generation iPad",
    points: 150
  }]

  const nextPrize = () => {
    let next = prizeList[0]
    let nextDiff = Number.MAX_VALUE
    prizeList.forEach((prize) => {
      const diff = prize.points - regData.points
      if (diff > 0 && diff < nextDiff) {
        next = prize
        nextDiff = diff
      }
    })
    return next
  }

  if (pageError) {
    return (
      <div className="div-block-89 attendees welcome-container">
        <div className="text-block-72 red">A page error occured, please refresh the page. If the problem persists, contact a BizTech exec for support.</div>
      </div>
    )
  }

  return (
    <div className="div-block-89 attendees">
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
          <motion.div className="welcome-container"
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}>
            <img src={InnoventLogo} alt="Innovent Logo" style={{ width: "35%", height: "auto", marginBottom: 20 }}/>
            <Typography variant="h1">Welcome!</Typography>
            <Typography className={classes.centerText}>Please enter the email you used to register for InnoVent.</Typography>
            <TextField
              className={classes.textfield}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              variant="outlined"
              label="Email"
              autoCapitalize={false}
              inputProps={{
                autoCapitalize: 'none'
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
          </motion.div>
        ) : (

            <div id="home" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-16 w-nav">
              <div style={{
                display: "flex" , flexDirection: renderMobileOnly ? "column" : "row", 
                justifyContent: renderMobileOnly ? "" : "space-between", 
                paddingRight: renderMobileOnly ? "0" : "150px"}}>
              <FadeInWhenVisible className="container-35 w-container">
                <img src={InnoventLogo} alt="Innovent Logo" style={{ width: renderMobileOnly ? "30%" : "70%", height: "auto"}}/>
              </FadeInWhenVisible>
              <FadeInWhenVisible className="container-navigation w-container">
                {renderMobileOnly ? (
                  <div style={{width:"100%", borderStyle: "solid", borderColor: "blue", display: "flex", justifyContent: "center"}}>
                <nav role="navigation" className="nav-menu-7 w-nav-menu">
                  {/* <a href="#welcome" className="nav-link-30 w-nav-link">Welcome</a> */}
                  <a href="#Timeline" className="nav-link-30 w-nav-link">Schedule</a>
                  <a href="#Floor-Plan" className="nav-link-30 w-nav-link">Layout</a>
                  <a href="#Rules" className="nav-link-30 w-nav-link">Prizes</a>
                  <a href="#Marketplace" className="nav-link-30 w-nav-link">Marketplace</a>
                </nav>
                </div>) : (
                  <div style={{width: "700px"}}>
                <nav role="navigation" className="nav-menu-7 w-nav-menu" style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  {/* <a href="#welcome" className="nav-link-30 w-nav-link">Welcome</a> */}
                  <a href="#Timeline" className="nav-link-30 w-nav-link">Schedule</a>
                  <a href="#Floor-Plan" className="nav-link-30 w-nav-link">Layout</a>
                  <a href="#Rules" className="nav-link-30 w-nav-link">Prizes</a>
                  <a href="#Marketplace" className="nav-link-30 w-nav-link">Marketplace</a>
                </nav>
                </div>)}
                {/* <nav role="navigation" className="nav-menu-7 w-nav-menu">
                  <a href="#welcome" className="nav-link-30 w-nav-link">Welcome</a>
                  <a href="#Timeline" className="nav-link-30 w-nav-link">Schedule</a>
                  <a href="#Floor-Plan" className="nav-link-30 w-nav-link">Layout</a>
                  <a href="#Rules" className="nav-link-30 w-nav-link">Rules</a>
                </nav> */}
                <div className="menu-button-11 w-nav-button">
                  <div className="w-icon-nav-menu"></div>
                </div>
              </FadeInWhenVisible>
              </div>



        

                {/* your points section */}

              {/* <FadeInWhenVisible id="points" className="section-30 wf-section">
                <h1 className="heading-34">YOUR POINTS</h1>
                {regData.points >= maxPoints && !isCelebrationFinished && <div className="celebration-animation"><Lottie animationData={CelebrationAnimation} onLoopComplete={() => setIsCelebrationFinished(true)} /></div>}
                <ProgressBar
                percent={(regData.points / maxPoints) * 100}
                filledBackground="linear-gradient(to right, #F8C9B8, #FEE9DF)"
                width="90%"
                stepPositions={[(regData.points / maxPoints) * 100, (50 / maxPoints) * 100, (70 / maxPoints) * 100, (90 / maxPoints) * 100, (120 / maxPoints) * 100, (150 / maxPoints) * 100]}
                >
                <Step>
                {() => (
                  <span className="dot"></span>
                  )}
                  </Step>
                  <Step transition="scale">
                  {({ accomplished }) => (
                    <div>
                    <img
                    style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)`, paddingBottom: 10 }}
                    width="60"
                    src={Rocketbook}
                    alt="/"
                    />
                    {accomplished && <div className="checkmark"></div>}
                    </div>
                    )}
                    </Step>
                    <Step transition="scale">
                    {({ accomplished }) => (
                      <div>
                      <img
                      style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                      width="100"
                      src="https://instax.com/common2/img/top/image_01.png"
                      alt="/"
                      />
                      {accomplished && <div className="checkmark" style={{ marginTop: "33%" }}></div>}
                      </div>
                      )}
                      </Step>
                      <Step transition="scale">
                      {({ accomplished }) => (
                        <div>
                        <img
                        style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                        width="100"
                        src="https://instax.com/common2/img/top/image_01.png"
                        alt="/"
                        />
                        {accomplished && <div className="checkmark" style={{ marginTop: "33%" }}></div>}
                        </div>
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished }) => (
                          <div>
                          <img
                          style={{ opacity: `${accomplished ? 1 : 0.7}` }}
                          width="50"
                          src={SonyXM5}
                          alt="/"
                          />
                          {accomplished && <div className="checkmark" style={{ marginTop: "59%" }}></div>}
                          </div>
                          )}
                          </Step>
                          <Step transition="scale">
                          {({ accomplished }) => (
                            <div>
                            <img
                            style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                            width="60"
                            src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-2022-hero-silver-wifi-select_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&.v=1664387253605"
                            alt="/"
                            />
                            {accomplished && <div className="checkmark"></div>}
                            </div>
                            )}
                            </Step>
                            </ProgressBar>
                            <div className="current-total"><strong>Current Total: </strong>{regData.points}</div>
                            <div className="current-total">
                            {regData.points >= maxPoints ? (
                              <strong>All prizes unlocked!</strong>
                              ) : (
                                <strong>{nextPrize().points - regData.points + " points away from the " + nextPrize().name + "!"}</strong>
                                )}
                                </div>
                              </FadeInWhenVisible> */}

          





              <FadeInWhenVisible id="welcome" className="section-30 wf-section">
                <h1 className="heading-34">Hello, {regData.fname}!</h1>
                <div className="text-block-72">This will be your friend throughout the event! Check back regularly to see your personalized schedule, event layout, your current account balance, and a catalog of items.</div>
                <div className="text-block-72">InnoVent is a design and case competition targeted towards business and engineering students who have an interest in entrepreneurship and a passion for design. A completely new event to both UBC Biztech and UBC IEEE, this event is an unconventional competition that demands innovation and  cross-functional collaboration.</div>
                <div className="text-block-72">We hope you have an amazing time with us at InnoVent 2023!</div>
              </FadeInWhenVisible>

              <FadeInWhenVisible id="welcome" className="section-30 wf-section">
                <h1 className="heading-34">YOUR WALLET</h1>
                <div style={{width: renderMobileOnly ? "80%" : "25%", height: "150px" ,backgroundColor: "transparent", border: "solid", borderColor: "white", borderRadius: "9px", display: "flex", flexDirection: "column", padding: "1%", textAlign: "center", justifyContent: "space-around"}}>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>

                  <div style={{width: "45%", height: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign:"center", borderRadius: "9px", backgroundColor: "#D5EAE8", padding: "2%", borderWidth: "9px"}}>
                    Balance
                    <div style={{fontWeight: "bold", fontSize: "30px"}}>{teamData.points}</div>
                  </div>
                  <div style={{width: "45%", height: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign:"center", borderRadius: "9px", backgroundColor: "#D5EAE8", padding: "2%"}}>
                    Total Spent
                    <div style={{fontWeight: "bold", fontSize: "30px"}}>{teamData.pointsSpent}</div>
                  </div>
                  </div>
                </div>
              </FadeInWhenVisible>


                {/* QR Code for Check-in */}

                {/* <FadeInWhenVisible id="points" className="section-30 wf-section">
                <Button variant="contained" color="#D5E9E8" onClick={() => {
                  setShowQRCode(!showQRCode)
                }}>
                  { showQRCode ? "Hide QR Code to Purchase" : "Purchase an Item" }
                </Button>
                { showQRCode && <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${email};blueprint;2023`}
                    width="100%"
                    alt="registration QR code"
                /> }
              </FadeInWhenVisible> */}

              <FadeInWhenVisible id="welcome" className="section-30 wf-section">
                <h1 className="heading-34">QUICK LINKS</h1>
                {/* <div style={{width: renderMobileOnly ? "80%" : "25%", height: "150px", borderRadius: "9px", display: "flex", flexDirection: "column", padding: "1%", textAlign: "center", justifyContent: "space-around"}}>
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>

                  <div style={{width: "45%", height: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign:"center", borderRadius: "9px", backgroundColor: "#D5EAE8", padding: "2%"}}>
                    Applicant Package
                  </div>
                  <div style={{width: "45%", height: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", textAlign:"center", borderRadius: "9px", backgroundColor: "#D5EAE8", padding: "2%"}}>
                    Slide Submission
                  </div>
                  </div>
                </div> */}
              </FadeInWhenVisible>


              <FadeInWhenVisible id="Timeline" className="section-30 wf-section">
                <div id = "Schedule" className='section-31' style={{overflowX:"auto", width: "60%"}}>
                <h1 className="heading-34">YOUR SCHEDULE</h1>
                <h3 style={{color: "white"}}>Friday, March 3rd</h3>
                <h5 style={{color: "white"}}>Henry Angus Big 4 Conference Room</h5>
                <TableContainer component={Paper} style={{ backgroundColor: 'transparent', marginTop: '10px', marginBottom: '10px', border: "solid", borderColor: "rgba(1, 1, 1, 0.1)", borderWidth: "3px"}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align = "center" style={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                      <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Activity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>6:15 pm - 6:45 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Registration & Check in</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>6:45 pm - 7:00 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Opening Ceremony</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>7:00 pm - 7:20 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Keynote</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>7:20 pm - 8:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Dinner + Meet your Teams</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>8:00 pm - 8:45 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Professional Networking</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </TableContainer>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible id="Timeline" className="section-30 wf-section">
                <div id = "Schedule" className='section-31' style={{overflowX:"auto", width: "60%"}}>
                <h3 style={{color: "white"}}>Saturday, March 4th</h3>
                <h5 style={{color: "white"}}>Macleod UBC IEEE Building</h5>
                <TableContainer component={Paper} style={{ backgroundColor: 'transparent', marginTop: '10px', marginBottom: '10px', border: "solid", borderColor: "rgba(1, 1, 1, 0.1)", borderWidth: "3px"}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align = "center" style={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                      <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Activity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>9:30 am - 10:00 am</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Sign-In</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>10:00 am - 12:00 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Work Session with Mentors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>12:00 pm - 12:30 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Lunch</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>12:30 pm - 7:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Work Session with Mentors</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>7:00 pm - 9:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Asyncrhonous Work Session</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </TableContainer>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible id="Timeline" className="section-30 wf-section">
                <div id = "Schedule" className='section-31' style={{overflowX:"auto", width: "60%"}}>
                <h3 style={{color: "white"}}>Sunday, March 5th</h3>
                <h5 style={{color: "white"}}>Macleod UBC IEEE Building & Henry Angus 491</h5>
                <TableContainer component={Paper} style={{ backgroundColor: 'transparent', marginTop: '10px', marginBottom: '10px', border: "solid", borderColor: "rgba(1, 1, 1, 0.1)", borderWidth: "3px"}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align = "center" style={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                      <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Activity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>11:00 pm - 1:00 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Sign-In + Work Session</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>1:00 pm - 1:30 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Lunch</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>1:30 pm - 3:30 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Work Session</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>3:30pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Pitch Deck Submission</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>3:30 pm - 4:45 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>First Round Judging</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>4:45 pm - 5:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Walk to HA 491</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>5:00 pm - 6:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Top 3 Finalists, Final Round, Closing</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </TableContainer>
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible id="Floor-Plan" className="section-30 wf-section">
                <h1 className="heading-34">Layout</h1>
                <div className="seatingwrapper">
                  <iframe
                    title="seating"
                    className="seating"
                    width="100%"
                    height="100%"
                    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FT7fR29dF82CuAGwVQbsOqz%2FBP-2023-Seating%3Fpage-id%3D0%253A1%26node-id%3D97%253A10%26viewport%3D442%252C440%252C0.21%26scaling%3Dscale-down%26hide-ui%3D1"
                    allowFullScreen
                  />
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible id="Rules" className="section-31 wf-section">
                <h1 className="heading-34 big">Competition Streams</h1>
                <div className="text-block-72" style={{width: "60%"}}>
                  Collect points to earn raffle entries to rewards by completing event activities.
                  {/* <br></br> */}
                   You will be shown QR codes after completing each activity to redeem your points!
                   <TableContainer component={Paper} style={{ backgroundColor: "transparent", marginTop: '10px', marginBottom: '10px' }}>
        <Table>
          <TableBody>

              <TableRow>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  Sustainability 
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><i>Building future generations</i></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  Accessibility
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><i>Removing everyday barriers</i></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  Humanity
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><i>Empowering marginalized communities</i></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

                </div>

              </FadeInWhenVisible>
              <FadeInWhenVisible id="Rules" className="section-31 wf-section">
                <h1 className="heading-34 big">Prizes</h1>
                <div className="text-block-72" style={{width: "60%"}}>

                  <TableContainer component={Paper} style={{ backgroundColor: "transparent", marginTop: '10px', marginBottom: '10px' }}>
        <Table>
          <TableBody>

              <TableRow>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  Stream Winners (Top 3)
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><b>$500</b></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  Overall winner (First Place)
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><b>+ $500</b></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
                  
                </div>
              </FadeInWhenVisible>
            

                              <FadeInWhenVisible id="Catalog" className="section-31 wf-section">
                              <h1 id="Marketplace" className="heading-34">MARKETPLACE</h1>
                                <div className="catalog" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                
                                <CatalogItem item={"Arduino Nano BLE Sense"} image={ArduinoNanoBle} description={"A version of Arduino that is optimized for machine learning. Has additional built-in components such as bluetooth low energy support, a microphone, and various sensors."} quantity={3} price={"$45.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Arduino Uno"} image={ArduinoUno} description={"A standard microcontroller that can be programmed in conjunction with circuit components such as LEDs, sensors, and digital displays."} quantity={3} price={"$35.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Arduino Nano"} image={ArduinoNano} description={"Essentially a smaller version of the Arduino Uno"} quantity={2} price={"$40.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Elegoo Uno"} image={ElegooUno} description={"A microcontroller with the same capabilities of the Arduino Uno, but requires more initial setup to use."} quantity={2} price={"$25.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Sensor"} description={"Circuit components that perform specialized duties such as sensing temperature, heat, distance, humidity, etc."} quantity={46} price={"$4.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"LCD"} image={LCD} description={"A digital display component."} quantity={3} price={"$10.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Servo"} image={Servo} description={"A digital display component."} quantity={3} price={"$5.00/unit"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Cardstock"} image={Cardstock} description={"No description."} quantity={0} price={"$2.00/sheet"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Cardboard"} image={Cardboard} description={"No description."} quantity={0} price={"$5.00/sheet"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Clear and Masking Tape"} image={MaskingTape} description={"No description."} quantity={0} price={"$1.00/long strip"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Duct Tape"} image={DuctTape} description={"No description."} quantity={0} price={"$1.50/long strip"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Glue Gun Sticks"} image={GlueGunSticks} description={"No description."} quantity={0} price={"$1.00/stick"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"Soldering"} image={Soldering} description={"Thin board that hosts circuits (similar to a breadboard)."} quantity={0} price={"$1.00/board"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"3D Printing (PLA)"} description={"Rapid prototyping method that uses PLA filament to print virtual builds."} quantity={"N/A"} price={"$3.00/10g"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"3D Printing (ABS)"} description={"Rapid prototyping method that uses ABS filament to print virtual builds."} quantity={"N/A"} price={"$5.00/10g"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"3D Printing"} image={Printer} description={"Rapid prototyping method that uses filament to print virtual builds."} quantity={"N/A"} price={"$8.00/10g"} isMobile={renderMobileOnly}></CatalogItem>
                                <CatalogItem item={"K’nex Blocks"} image={KnexBlocks} description={"Rapid prototyping blocks that connect to each other."} quantity={"N/A"} price={"$5.00/small bag"} isMobile={renderMobileOnly}></CatalogItem>
                
                                </div>
                
                              </FadeInWhenVisible>
                <div id="Rules" className="section-31 wf-section" style={{marginTop: "20px"}}>
                {/* <h1 className="heading-34">REMINDERS</h1>
                <img src={TimeAndLocation} alt="Blueprint footer" style={{ width: "60%", height: "auto", marginBottom: "25px"}}/> */}
                Contact kamryn@ubcbiztech.com for any questions or concerns.
              </div>

              <img src={CompanionFooter} alt="Blueprint footer" style={{ width: "100%", height: "auto", marginBottom: "-10px"}}/>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Companion
