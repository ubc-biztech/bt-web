import React, {
  useState, useEffect
} from "react";
import {
  QrScanner
} from "@yudiel/react-qr-scanner";
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


import Floorplan from "../../../../assets/2024/blueprint/floorplan.svg";

import Mentors from "../components/mentor/Mentors";
import Podium from "../components/Podium";
import GamificationActivityTable from "../components/GamificationActivityTable";
import GamificationRewardTable from "../components/GamificationRewardTable";

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
    name: "Post an Instagram story using the Blueprint event filter",
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
    name: "Partiticipate in our attendee showcase",
    points: "25 points"
  },
];

const rewards = [
  {
    name: "Meta Quest",
    points: "200 points",
    value: 2000
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
    name: "Blueprint hoodie",
    points: "70 points",
    value: 70
  },
];

const Blueprint2024 = (params) => {
  const {
    event, registrations, FadeInWhenVisible, styles, renderMobileOnly, userRegistration
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
    const res = await fetchBackend(`/registrations/leaderboard/?eventID=${event?.id}&year=${event?.year}`, "GET");
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

    return () => {
      // Close WebSocket connection on component unmount
      if (websocket) {
        websocket.close();
      }
    };
  }, []); // Only runs on component mount and unmount
  console.log(leaderboard);
  return (<>
    {event && registrations &&
      <FadeInWhenVisible>
        <div id="Scanner" style={{
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
        </div>
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
                trailColor: "transparent",
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
          <GamificationActivityTable activities={activities} />
        </div>
        <div id="Rewards" style={{
          ...styles.column,
          width: "90%"
        }}>
          <GamificationRewardTable rewards={rewards} />
        </div>
        <div id="Floorplan" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Floorplan</h1>
          {/* <img src={MISNightPartners} alt="MISNight Partners" style={styles.partners}/> */}
        </div>
        <Mentors id="Mentors" event={event} registrations={registrations} styles={styles} />
        <div id="Partners" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
          {/* <img src={MISNightPartners} alt="MISNight Partners" style={styles.partners}/> */}
        </div>
      </FadeInWhenVisible>
    }
  </>
  );
};

export default Blueprint2024;

