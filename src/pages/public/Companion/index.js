import React, { useState, useEffect } from 'react'
import { ProgressBar, Step } from "react-step-progress-bar"
import ConfettiExplosion from "react-confetti-explosion"
import { fetchBackend } from 'utils'
import Rocketbook from "../../../assets/rocketbook.png"
import SonyXM5 from "../../../assets/sonyxm5.png"
import "./biztecho.webflow.css"
import "react-step-progress-bar/styles.css"
import Loading from 'pages/Loading'
import readSpreadsheet from 'utils/_utils/sheets'
import { TextField, Button } from '@material-ui/core'

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

  const fetchUserData = async () => {
    const reg = registrations.find((entry) => entry.id === email)
    if (reg) {
      setError("")
      setRegData(reg)
      const spreadsheet = await readSpreadsheet();
      const assignment = spreadsheet.find((entry) => entry.email === email);
      setScheduleData(assignment)
      localStorage.setItem("BP2023EMAIL", email)
      setIsLoading(false)
    } else {
      setError("This email does not match any of our records. If you believe this is a mistake, please contact a BizTech exec.")
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
    {isLoading ? <Loading/> : (
      <div>
        {!email || error ? (
          <div className="welcome-container">
            <strong className="text-block-72">Welcome to Blueprint 2023!</strong>
            <div className="text-block-72 centered">Please enter your email you used to register for Blueprint. Note that once you confirm, you will not be able to change this.</div>
            <TextField 
              className="input-field"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              variant="outlined"
            />
            <div className="text-block-72 red centered">{error}</div>
            <Button
              variant="contained" 
              color="primary" 
              onClick={() => {
                setIsLoading(true);
                setEmail(input)
              }}
            >
              Confirm
            </Button>
          </div>
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
              {regData.points >= maxPoints && <ConfettiExplosion height={2750}/>}
              <ProgressBar
                percent={(regData.points/maxPoints) * 100}
                filledBackground="linear-gradient(to right, #F8C9B8, #FEE9DF)"
                width="90%"
                stepPositions={[(regData.points/maxPoints) * 100, (50/maxPoints) * 100, (70/maxPoints) * 100, (90/maxPoints) * 100, (120/maxPoints) * 100, (150/maxPoints) * 100]}
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
                <strong>{nextPrize().points-regData.points + " points away from the " + nextPrize().name + "!"}</strong>
              )}
              </div>
            </div>
            <div id="welcome" className="section-30 wf-section">
              <h1 className="heading-34">Hello, {regData.fname}!</h1>
              <div className="text-block-72"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
            </div>
            <div id="Timeline" className="section-29 wf-section">
              <h1 className="heading-34">YOUR SCHEDULE</h1>
              <div className="activity">
                <div className="columns-23 w-row">
                <div className="table-number"><strong>Table Number: </strong>{scheduleData.tablenumber}</div>
                <div className="activity-items"><strong>10:30 am - 11:00 am</strong> Registration & Check in</div>
                <div className="activity-items"><strong>11:00 am - 11:40 am</strong> Opening Remarks & Keynote</div>
                <div className="activity-items">
                  <strong style={{ marginTop: "auto", marginBottom: "auto" }}>11:50 am - 12:30 pm</strong> 
                  {workshops["fdcd18bc-8335-42dd-9ea8-ef927e742695"][scheduleData.workshop1.trim()]}
                </div>
                <div className="activity-items"><strong>12:30 pm - 1:30 pm</strong> Lunch & Networking</div>
                <div className="activity-items">
                  <strong style={{ marginTop: "auto", marginBottom: "auto" }}>11:50 am - 12:30 pm</strong>
                  {workshops["aeeb699e-b2c9-47c7-aa57-b3a657fdf947"][scheduleData.workshop2.trim()]}
                </div>
                <div className="activity-items"><strong>2:10 pm - 2:20 pm</strong> Coffee Break</div>
                <div className="activity-items">
                  <strong style={{ marginTop: "auto", marginBottom: "auto" }}>2:20 pm - 3:00 pm</strong>
                  {workshops["acba6e61-b8d9-4a1e-8ca9-305efcf40cbf"][scheduleData.workshop3.trim()]}
                </div>
                <div className="activity-items"><strong>3:00 pm - 4:00 pm</strong> Boothing Session & Networking</div>
                <div className="activity-items"><strong>4:00 pm - 4:30 pm</strong> Panel Session</div>
                <div className="activity-items"><strong>4:30 pm - 5:00 pm</strong> Closing Remarks & Raffles</div>
                </div>
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
                  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FT7fR29dF82CuAGwVQbsOqz%2FBP-2023-Seating%3Fnode-id%3D1%253A2%26scaling%3Dscale-down%26page-id%3D0%253A1%26hide-ui%3D1" 
                  allowFullScreen
                />
              </div>
            </div>
            <div id="Rules" className="section-31 wf-section">
              <h1 className="heading-34 big">gamification rules</h1>
              <div className="text-block-72"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
            </div>
            <div id="Rules" className="section-31 wf-section">
              <h1 className="heading-34">REMINDERS</h1>
              <div className="text-block-70 reminders">Wear Formal!<br/>Be There at 10:30 am<br/>Contact email: ubcbiztech@gmail.com</div>
            </div>
          </div>
        )}
    </div>
    )}
  </div>
  )
}

export default Companion