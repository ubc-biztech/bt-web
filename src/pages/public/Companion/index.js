import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { ProgressBar, Step } from "react-step-progress-bar"
import { fetchBackend } from 'utils'
import Rocketbook from "../../../assets/rocketbook.png"
import SonyXM5 from "../../../assets/sonyxm5.png"
import BP2023Seating from "../../../assets/bp2023seating.png"
import "./biztecho.webflow.css"
import "react-step-progress-bar/styles.css"
import Loading from 'pages/Loading'

const Companion = () => {
  const maxPoints = 150
  const { email } = useParams()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserData = async () => {
    await fetchBackend(`/registrations?email=${email}&year=2023&eventID=blueprint`, 'GET', undefined, false).then((res) => {
      setData(res.data[0])
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (email) {
      fetchUserData();
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div className="div-block-89 attendees">
    {isLoading ? <Loading/> : (
      <div id="home" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-16 w-nav">
      <div className="container-35 w-container">
        <nav role="navigation" className="nav-menu-7 w-nav-menu">
          <a href="#welcome" className="nav-link-28 w-nav-link">Welcome</a>
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
        <ProgressBar
          percent={(data.points/maxPoints) * 100}
          filledBackground="linear-gradient(to right, #6495CD, #F5C4B2)"
          width="90%"
          stepPositions={[(50/maxPoints) * 100, (70/maxPoints) * 100, (90/maxPoints) * 100, (120/maxPoints) * 100, (150/maxPoints) * 100]}
        >
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)`, paddingBottom: 10 }}
                width="60"
                src={Rocketbook}
                alt="/"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                width="100"
                src="https://instax.com/common2/img/top/image_01.png"
                alt="/"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                width="100"
                src="https://instax.com/common2/img/top/image_01.png"
                alt="/"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ opacity: `${accomplished ? 1 : 0.7}` }}
                width="50"
                src={SonyXM5}
                alt="/"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ opacity: `${accomplished ? 1 : 0.7}`, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                width="50"
                src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-2022-hero-silver-wifi-select_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&.v=1664387253605"
                alt="/"
              />
            )}
          </Step>
        </ProgressBar>
        <div className="current-total"><strong>Current Total: </strong>{data.points}</div>
      </div>
      <div id="welcome" className="section-30 wf-section">
        <h1 className="heading-34">BLUEPRINT 2023</h1>
        <div className="text-block-72"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#x27;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
      </div>
      <div id="Timeline" className="section-29 wf-section">
        <h1 className="heading-34">YOUR SCHEDULE</h1>
        <div className="activity">
          <div className="columns-23 w-row">
          <div className="table-number"><strong>Table Number: </strong> x</div>
          <div className="activity-items"><strong>10:30 am - 11:00 am</strong> Registration & Check in</div>
          <div className="activity-items"><strong>11:00 am - 11:40 am</strong> Opening Remarks & Keynote</div>
          <div className="activity-items">
            <strong style={{ marginTop: "auto", marginBottom: "auto" }}>11:50 am - 12:30 pm</strong> 
            {workshops["fdcd18bc-8335-42dd-9ea8-ef927e742695"][data.dynamicResponses["fdcd18bc-8335-42dd-9ea8-ef927e742695"].trim()]}
          </div>
          <div className="activity-items"><strong>12:30 pm - 1:30 pm</strong> Lunch & Networking</div>
          <div className="activity-items">
            <strong style={{ marginTop: "auto", marginBottom: "auto" }}>11:50 am - 12:30 pm</strong>
            {workshops["aeeb699e-b2c9-47c7-aa57-b3a657fdf947"][data.dynamicResponses["aeeb699e-b2c9-47c7-aa57-b3a657fdf947"].trim()]}
          </div>
          <div className="activity-items"><strong>2:10 pm - 2:20 pm</strong> Coffee Break</div>
          <div className="activity-items">
            <strong style={{ marginTop: "auto", marginBottom: "auto" }}>2:20 pm - 3:00 pm</strong>
            {workshops["acba6e61-b8d9-4a1e-8ca9-305efcf40cbf"][data.dynamicResponses["acba6e61-b8d9-4a1e-8ca9-305efcf40cbf"].trim()]}
          </div>
          <div className="activity-items"><strong>3:00 pm - 4:00 pm</strong> Boothing Session & Networking</div>
          <div className="activity-items"><strong>4:00 pm - 4:30 pm</strong> Panel Session</div>
          <div className="activity-items"><strong>4:30 pm - 5:00 pm</strong> Closing Remarks & Raffles</div>
          </div>
        </div>
      </div>
      <div id="Floor-Plan" className="section-30 wf-section">
        <h1 className="heading-34">Layout</h1><img src={BP2023Seating} alt="" width="90%"/>
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
  )
}

export default Companion