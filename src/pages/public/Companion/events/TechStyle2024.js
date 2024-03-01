import React, {
  useState, useEffect
} from "react";
import {
  Accordion, AccordionDetails, AccordionSummary,
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
import Sched from "../../../../assets/2024/techstyle/techstyle_schedule.png";
import Mentors from "../components/mentor/Mentors";
import Podium from "../components/Podium";
import GamificationActivityTable from "../components/GamificationActivityTable";
import GamificationRewardTable from "../components/GamificationRewardTable";

const CustomAccordion = styled(Accordion)(({
  theme
}) => {
  return {
    background: "transparent",
    boxShadow: "none",
  };
});

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
    name: "Vote for best outfit",
    points: "15 points"
  },
  {
    name: "Ask a question during the workshop (can only redeem once per workshop)",
    points: "20 points"
  },
  {
    name: "Attend a workshop",
    points: "25 points"
  },
  {
    name: "Take a photo at the red carpet",
    points: "20 points"
  },
  {
    name: "Take a photo with a professional at the red carpet",
    points: "25 points"
  },
  {
    name: "Go shopping (can only redeem once)",
    points: "20 points"
  },
  {
    name: "Decorate your landyard",
    points: "20 points"
  },
  {
    name: "Scan a BizTech member's QR code during Fashion Bingo (can only redeem once)",
    points: "15 points"
  },
  {
    name: "Visit the BizTech booth",
    points: "15 points"
  },
  {
    name: "Get your drawing done at the fashion illustration booth",
    points: "20 points"
  },
];

const rewards = [
  {
    name: "Lululemon Giftcard",
    points: "220 points",
    value: 220
  },
  {
    name: "Leah Alexandra's Love Token Square Necklace",
    points: "150 points",
    value: 150
  },
  {
    name: "TechStyle Sweater + TechStyle Totebag",
    points: "100 points",
    value: 100
  },
];

const TechStyle2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;
  const [websocket, setWebsocket] = useState(null);
  const [leaderboard, setLeaderboard] = useState();

  const rewardsAscending = [...rewards].sort((a, b) => a?.value - b?.value);
  const nextGoal = rewardsAscending.find(reward => userRegistration?.points ? userRegistration?.points < reward?.value : true);

  const refetchLeaderboard = async () => {
    const res = await fetchBackend(`/registrations/leaderboard/?eventID=${event?.id}&year=${event?.year}`, "GET", undefined, false);
    setLeaderboard(res);
  };

  useEffect(() => {
    refetchLeaderboard();
  }, [event]);

  useEffect(() => {
    try {
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
    } catch {
      console.error("Error connecting to websocket");
    } finally {
      refetchLeaderboard();
    }
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
          {renderMobileOnly ? <img src={Sched} alt="Schedule" style={renderMobileOnly ? styles.scheduleMobile : styles.schedule} />
            : <img src={Sched} alt="Schedule" style={renderMobileOnly ? styles.scheduleMobile : styles.schedule} />}
        </div>
        <div id="Leaderboard" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Your Points</h1>
          <div style={{
            width: renderMobileOnly ? "60%" : "20%"
          }}>
            <CircularProgressbar styles={
              buildStyles({
                textSize: "12px",
                textColor: "black",
                pathColor: "black",
                trailColor: "#8994a3",
                strokeLinecap: "butt"
              })
            } value={nextGoal ? (userRegistration?.points / nextGoal?.value) * 100 : 100} text={`${userRegistration?.points ? userRegistration?.points : 0} points`} />
          </div>
          <span style={{
            ...styles.text,
            ...(renderMobileOnly && {
              fontSize: constantStyles.mobileFontSize
            })
          }}>{nextGoal ? `Only ${nextGoal?.value - userRegistration?.points} points away from a ${nextGoal?.name} entry!` : "You're eligible for all entries! See if you can top the leaderboards 👀"}</span>
          {leaderboard && <Podium winners={leaderboard} />}
        </div>
        <div id="Activities" style={{
          ...styles.column,
          width: "90%"
        }}>
          <CustomAccordion>
            <StyledAccordionSummary id="panel-header" aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon style={{
                color: "black"
              }} />}>
              <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Points Activities</h1>
            </StyledAccordionSummary>
            <AccordionDetails>
              <GamificationActivityTable activitiesProp={activities} textColor={"black"} backgroundColor={"rgba(255, 255, 255, 0.6)"} />
            </AccordionDetails>
          </CustomAccordion>

        </div>
        <div id="Rewards" style={{
          ...styles.column,
          width: "90%"
        }}>
          <CustomAccordion>
            <StyledAccordionSummary id="panel-header" aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon style={{
                color: "black"
              }} />}>
              <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Prizes</h1>
            </StyledAccordionSummary>
            <AccordionDetails>
              <GamificationRewardTable rewardsProp={rewards} textColor={"black"} backgroundColor={"rgba(255, 255, 255, 0.6)"} />
            </AccordionDetails>
          </CustomAccordion>
        </div>
        <Mentors id="Mentors" event={event} registrations={registrations} styles={styles} />
        {/* <div id="Partners" style={styles.column}>
            <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
            <img src={Companies} alt="Blueprint Partners" style={styles.partners} />
          </div> */}
      </div>
    }
  </>
  );
};

export default TechStyle2024;

