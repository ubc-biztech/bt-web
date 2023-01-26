import React, { useState, useEffect } from 'react'
import Lottie from "lottie-react"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProgressBar, Step } from "react-step-progress-bar"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , TextField, Button, Modal, makeStyles, Typography } from '@material-ui/core';

import { fetchBackend } from 'utils'
import Rocketbook from "../../../assets/rocketbook.png"
import SonyXM5 from "../../../assets/sonyxm5.png"
import "./biztecho.webflow.css"
import "react-step-progress-bar/styles.css"
import Loading from 'pages/Loading'
import readSpreadsheet from 'utils/_utils/sheets'

import { COLORS } from "../../../constants/_constants/theme";
import BlueprintLogo from "../../../assets/2023/blueprint/Blueprint 2023 Transparent Logo.png";
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
  const maxPoints = 150
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [pageError, setPageError] = useState("");
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [regData, setRegData] = useState(null)
  const [scheduleData, setScheduleData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCelebrationFinished, setIsCelebrationFinished] = useState(false);

  const classes = useStyles();
  
  const fetchUserData = async () => {
    const reg = registrations.find((entry) => entry.id === email)
    if (reg) {
      setError("")
      setRegData(reg)
      const spreadsheet = await readSpreadsheet();
      const assignment = spreadsheet.find((entry) => entry.email === email);
      setScheduleData(assignment)
      localStorage.setItem("BP2023EMAIL", email)
      setIsModalOpen(false)
      setIsLoading(false)
    } else {
      setError("This email does not match an existing entry our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.")
      setIsLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID: "blueprint",
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

  useEffect(() => {
    fetchRegistrations();
    const email = localStorage.getItem("BP2023EMAIL");
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
            <img src={BlueprintLogo} alt="Blueprint Logo" style={{ width: "35%", height: "auto", marginBottom: 20 }}/>
            <Typography variant="h1">Welcome!</Typography>
            <Typography className={classes.centerText}>Please enter the email you used to register for Blueprint.</Typography>
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
              <div className="container-35 w-container">
                <nav role="navigation" className="nav-menu-7 w-nav-menu">
                  <a href="#welcome" className="nav-link-30 w-nav-link">Welcome</a>
                  <a href="#Timeline" className="nav-link-30 w-nav-link">Schedule</a>
                  <a href="#Floor-Plan" className="nav-link-30 w-nav-link">Layout</a>
                  <a href="#Rules" className="nav-link-30 w-nav-link">Rules</a>
                </nav>
                <div className="menu-button-11 w-nav-button">
                  <div className="w-icon-nav-menu"></div>
                </div>
              </div>
              <div id="points" className="section-30 wf-section">
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
              </div>
              <div id="welcome" className="section-30 wf-section">
                <h1 className="heading-34">Hello, {regData.fname}!</h1>
                <div className="text-block-72">This will be your friend throughout the event! Check back regularly to see your personalized schedule, table seating, event layout, and of course, your progression towards chances at amazing prizes. If you need a refresher on how gamification works, we have provided a small set of guidelines below.</div>
                <div className="text-block-72">The theme for this year's conference is <strong>Technology in Everyday Life</strong>. In our current world, technology impacts almost every aspect of our daily lives. Every industry, from financial, transportation to even health, has begun to evolve and utilize technology to improve efficiency and effectiveness. Inspired by this, we are here to offer you engaging workshops and unique networking opportunities that highlight the ways we use technology today.</div>
                <div className="text-block-72">We hope you have an amazing time with us at Blueprint 2023!</div>
              </div>
              <div id="Timeline" className="section-30 wf-section">
                <div id = "Schedule" className='section-31'>
                <h1 className="heading-34">YOUR SCHEDULE</h1>
                <div className="table-number"><strong>Table Number: </strong><div>{scheduleData.tablenumber}</div></div>
                <TableContainer component={Paper} style={{ backgroundColor: 'transparent', marginTop: '10px', marginBottom: '10px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align = "center" style={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                      <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Activity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>10:30 am - 11:00 am</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Registration & Check in</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>11:00 am - 11:40 am</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>Opening Remarks & Keynote</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>11:50 am - 12:30 pm</b></TableCell>
                      <TableCell align="center" style={{ color: "white" }}>{workshops["fdcd18bc-8335-42dd-9ea8-ef927e742695"][scheduleData.workshop1.trim()]}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>12:30 pm - 1:30 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Lunch & Networking</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>11:50 am - 12:30 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>{workshops["aeeb699e-b2c9-47c7-aa57-b3a657fdf947"][scheduleData.workshop2.trim()]}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>2:10 pm - 2:20 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Coffee Break</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>2:20 pm - 3:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>{workshops["acba6e61-b8d9-4a1e-8ca9-305efcf40cbf"][scheduleData.workshop3.trim()]}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>3:00 pm - 4:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Boothing Session & Networking</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>4:00 pm - 4:30 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Panel Session</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" align = "center" style={{ color: "white" }}><b>4:30 pm - 5:00 pm</b></TableCell>
                    <TableCell align="center" style={{ color: "white" }}>Closing Remarks & Raffles</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </TableContainer>
                </div>
              </div>
              <div id="Floor-Plan" className="section-30 wf-section">
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
              </div>
              <div id="Rules" className="section-31 wf-section">
                <h1 className="heading-34 big">gamification rules</h1>
                <div className="text-block-72">
                  Collect points to earn raffle entries to rewards by completing event activities -
                  <br></br>
                  You will be shown QR codes after completing each activity to redeem your points!
                  <GamificationActivityTable />
                </div>
              </div>
              <div id="Rules" className="section-31 wf-section">
                <h1 className="heading-34 big">gamification prizes</h1>
                <div className="text-block-72">
                  By reaching certain point thresholds, you will unlock raffle entries to the following prizes!
                  <GamificationRewardTable />
                </div>
              </div>
              <div id="Rules" className="section-31 wf-section">
                <h1 className="heading-34">REMINDERS</h1>
                <div className="text-block-70 reminders">Wear Business Casual!<br/>Be There at 10:30 am<br/>Contact email: melissa@gmail.com</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Companion
