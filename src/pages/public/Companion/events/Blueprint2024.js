import React, {
  useState, useEffect
} from "react";
import {
  QrScanner
} from "@yudiel/react-qr-scanner";
import {
  Accordion, AccordionDetails, AccordionSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  fetchBackend
} from "utils";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  constantStyles
} from "../../../../constants/_constants/companion";
import {
  styled
} from "@material-ui/styles";
import {
  ScrollingCarousel
} from "@trendyol-js/react-carousel";

import Floorplan from "../../../../assets/2024/blueprint/floorplan.png";
import Companies from "../../../../assets/2024/blueprint/companies.svg";
import Sched from "../../../../assets/2024/blueprint/schedule_glow.svg";
import Mentors from "../components/mentor/Mentors";
import Podium from "../components/Podium";
import GamificationActivityTable from "../components/GamificationActivityTable";
import GamificationRewardTable from "../components/GamificationRewardTable";
import ShowcaseCard from "../components/ShowcaseCard";


const CustomAccordion = styled(Accordion)(({
  theme
}) => {
  return {
    background: "transparent"
  };
});

const projects = [
  {
    title: "ShipAI",
    desc: "AI project management tool helping you do less PMing",
    members: "James Shi, Serena Ge, Charley Lee",
    link: "https://unclegpt.app",
    image: "card1.png"
  },
  {
    title: "Gruwup",
    desc: "Our project enables travelers, like those flying solo to Toronto, to connect with new people sharing similar interests and plans. Unlike typical social media, which focuses on existing connections, our platform offers destination-based matching.",
    members: "Sijan Poudel, Kaleb Hui, Jerry Shao, Grant Li",
    link: "https://drive.google.com/drive/u/1/folders/1C2Ap7VbVOHJYZxZ1hF5239o_adyMEDHf",
    image: "card2.png"
  },
  {
    title: "Marketing Job Portal",
    desc: "This is a full-stack web application that serves as a job portal for marketing students to apply for internships and new-grad jobs, created for the UBC Marketing Association.",
    members: "Eric Lu, James Shi",
    link: "https://devpost.com/software/marketing-job-portal",
    image: "card3.png"
  },
  {
    title: "Glide- A ride sharing App",
    desc: "Glide is a ride-sharing app that enables users to seamlessly transition between being a rider or a glider (driver). It is a twist on the typical ride-sharing app experience. It encompasses a number of functionalities such as finding a ride, editing a ride, live communication with the driver through a chat feature, booking & confirming a ride, etc.",
    members: "Omar Ankit, Ammaar Khan, Raghav Bhagria, Raphael Mwachiti",
    link: "https://github.com/oankit/Glide-A-Ride-Sharing-App",
    image: "card4.jpeg"
  },
  {
    title: "Computer Lounge Tracker",
    desc: "Created a Lounge Tracker Application for a club which made the process of checking and tracking members into the lounge more efficient by having a visual aid based on the orientation of the room.",
    members: "Jason Kuo, Marcus Kam",
    link: "https://github.com/ubcesports/computertracker",
    image: "card5.png"
  },
  {
    title: "Yudo Fitness Trainer",
    desc: "Uses a custom-developed exercise detection algorithm, self-created datasets, TensorFlow AI, and Chat-GPT3 to help users improve their form and state relative accuracy score, feedback, and compliments/criticisms while doing various exercises.",
    members: "Michelle Wang, Joshua Chan, Theresa Xiao",
    link: "https://devpost.com/software/yudo",
    image: "card6.png"
  }
];


const StyledAccordionSummary = styled(AccordionSummary)(() => {
  return {
    display: "flex",
    alignContent: "center",
    marginLeft: "48px !important",
  };
});

const activities = [
  {
    name: "Early check-in",
    points: "25 points"
  },
  {
    name: "Scan another attendee’s LinkedIn QR on their name tag",
    points: "15 points"
  },
  {
    name: "Ask a question during the panel discussion",
    points: "20 points"
  },
  {
    name: "Attend a workshop",
    points: "25 points each"
  },
  {
    name: "Post an Instagram story using the Blueprint event filter (Visit the Biztech booth and show your post to redeem)",
    points: "30 points"
  },
  {
    name: "Take a photo at the photo booth",
    points: "20 points"
  },
  {
    name: "Take a photo with a professional at the photo booth",
    points: "35 points"
  },
  {
    name: "Get interviewed by BizTech’s marketing team for Instagram reels",
    points: "20 points"
  },
  {
    name: "View the attendee showcase & vote for a personal project!",
    points: "35 points"
  },
  {
    name: "Get a Blueprint souvenir 3D printed at Rapid x BizTech’s booth",
    points: "25 points each"
  },
  {
    name: "Get your photo taken at out headshot station",
    points: "20 points"
  },
  {
    name: "Participate in our attendee showcase",
    points: "25 points"
  },
];

const rewards = [
  {
    name: "Meta Quest",
    points: "200 points",
    value: 200
  },
  {
    name: "FitBit 6",
    points: "150 points",
    value: 150
  },
  {
    name: "Kindle",
    points: "120 points",
    value: 120
  },
  {
    name: "Amazon Echo Speaker",
    points: "100 points",
    value: 100
  },
  {
    name: "Blueprint Hoodie",
    points: "70 points",
    value: 70
  },
];

const Blueprint2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;
  const [websocket, setWebsocket] = useState(null);
  const [leaderboard, setLeaderboard] = useState();
  const [showQRerror, setShowQRerror] = useState(false);

  const rewardsAscending = [...rewards].sort((a, b) => a?.value - b?.value);
  const nextGoal = rewardsAscending.find(reward => userRegistration?.points ? userRegistration?.points < reward?.value : true);

  const invalidQR = () => {
    setShowQRerror(true);
    setTimeout(() => {
      setShowQRerror(false);
    }, 10000);
  };

  const refetchLeaderboard = async () => {
    const res = await fetchBackend(`/registrations/leaderboard/?eventID=${event?.id}&year=${event?.year}`, "GET", undefined, false);
    setLeaderboard(res);
  };

  useEffect(() => {
    refetchLeaderboard();
  }, [event]);
  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_API);

    // WebSocket on open
    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    // WebSocket on message
    ws.onmessage = (event) => {
      // Handle WebSocket messages
      const data = event.data;
      console.log("WebSocket message received:", data);
      refetchLeaderboard();
    };

    // WebSocket on close
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    setWebsocket(ws);
    refetchLeaderboard();
    return () => {
      // Close WebSocket connection on component unmount
      if (websocket) {
        websocket.close();
      }
    };
  }, []); // Only runs on component mount and unmount
  return (<>
    {event && registrations &&
      <div>
        <div id="Schedule" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Schedule</h1>
          <img src={Sched} alt="Schedule" style={renderMobileOnly ? styles.floorplanMobile : styles.floorplan} />
        </div>
        {false && <div id="Scanner" style={{
          ...styles.column,
          height: "35rem"
        }}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Scan Points</h1>
          <span style={{
            ...styles.text,
            color: "red",
            ...(renderMobileOnly && {
              fontSize: constantStyles.mobileFontSize
            })
          }}>{showQRerror ? "invalid Blueprint QR Code" : "            "}</span>
          <QrScanner
            onDecode={(link) => {
              if (!link.includes("redeem/blueprint/2024")) {
                invalidQR();
              }
              else {
                window.location.href = link;
              }
            }}
            onError={(error) => console.log(error?.message)}
            containerStyle={
              {
                width: "100%",
                height: "100%",
                paddingTop: "0"
              }
            }
          />
        </div>}
        <div id="Leaderboard" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Leaderboard</h1>
          <span style={{
            ...styles.text,
            ...(renderMobileOnly && {
              fontSize: constantStyles.mobileFontSize
            })
          }}>{nextGoal ? `Only ${nextGoal?.value - userRegistration?.points} points away from a ${nextGoal?.name} entry!` : "You're eligble for all entries! See if you can top the leaderboards 👀"}</span>
          <div>
            <CircularProgressbar styles={
              buildStyles({
                textSize: "12px",
                textColor: "#FFC3F4",
                pathColor: "#FFC3F4",
                trailColor: "#301631",
                strokeLinecap: "butt"
              })
            } value={nextGoal ? (userRegistration?.points / nextGoal?.value) * 100 : 100} text={`${userRegistration?.points ? userRegistration?.points : 0} points`} />;
          </div>
          {leaderboard && <Podium winners={leaderboard} />}
        </div>
        <div id="Activities" style={{
          ...styles.column,
          width: "90%"
        }}>
          <CustomAccordion>
            <StyledAccordionSummary id="panel-header" aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon />}>
              <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Points Activities</h1>
            </StyledAccordionSummary>
            <AccordionDetails>
              <GamificationActivityTable activitiesProp={activities} />
            </AccordionDetails>
          </CustomAccordion>

        </div>
        <div id="Rewards" style={{
          ...styles.column,
          width: "90%"
        }}>
          <CustomAccordion>
            <StyledAccordionSummary id="panel-header" aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon />}>
              <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Raffles</h1>
            </StyledAccordionSummary>
            <AccordionDetails>
              <GamificationRewardTable rewardsProp={rewards} />
            </AccordionDetails>
          </CustomAccordion>
        </div>
        <div id="Floorplan" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Floorplan</h1>
          <img src={Floorplan} alt="Blueprint Partners" style={renderMobileOnly ? styles.floorplanMobile : styles.floorplan} />
        </div>
        <div id="Showcase" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attendee Showcase</h1>
          <ScrollingCarousel style={{
            columnGap: "5px"
          }}>
            {
              projects.map((project, i) => {
                return <ShowcaseCard pos={i} key={i} title={project.title} image={project.image} members={project.members} link={project.link} desc={project.desc} />;
              })
            }
          </ScrollingCarousel>
        </div>
        <Mentors id="Mentors" event={event} registrations={registrations} styles={styles} />
        <div id="Partners" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
          <img src={Companies} alt="Blueprint Partners" style={styles.partners} />
        </div>
      </div>
    }
  </>
  );
};

export default Blueprint2024;

