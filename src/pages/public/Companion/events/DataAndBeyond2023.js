import React, {
  useState, useEffect
} from "react";

import {
  fetchBackend
} from "utils";
import {
  ProgressBar, Step
} from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import Loading from "pages/Loading";
import readSpreadsheet from "utils/_utils/sheets";

import BizTechDBLogo from "../../../../assets/2023/data&beyond/BizTechD&BLogo.png";
import BoltDog from "../../../../assets/2023/data&beyond/BoltDog.png";
import DBPartners from "../../../../assets/2023/data&beyond/D&BPartners.png";

import {
  constantStyles
} from "../../../../constants/_constants/companion";

const DataAndBeyond2023 = (params) => {
  const {
    regData, email, styles, renderMobileOnly, FadeInWhenVisible
  } = params;
  const [teamData, setTeamData] = useState(null);
  const [teamPoints, setTeamPoints] = useState({
    current: 0,
    possible: 0,
  });
  const [placements, setPlacements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const TOTAL_POSSIBLE = 68 + 25;

  function getSortOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }

  function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th";}

  const renderPlacement = () => {
    const idx = placements.findIndex((team) => team.name === teamData.teamName);
    return `${idx + 1}` + nth(idx + 1) + " Place";
  };

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
        console.log("error here: ", err);
        setIsLoading(false);
      });
  };

  const fetchTeamPoints = async () => {
    const spreadsheet = await readSpreadsheet();
    const teams = await fetchBackend("/team/data-and-beyond/2023", "GET", undefined, false);
    let current = 0 + teamData.points;
    let possible = TOTAL_POSSIBLE - teamData.points;
    const points = [];
    spreadsheet.forEach((entry) => {
      if (entry.Team === teamData.teamName && entry.Score) {
        const result = entry.Score.split("/");
        const score = Number(result[0].trim());
        const total = Number(result[1].trim());
        if (!isNaN(score) && !isNaN(total)) {
          current += score;
          possible -= total;
        }
      }
      if (entry.Score) {
        const result = entry.Score.split("/");
        const score = Number(result[0].trim());
        if (!(points.find((obj) => obj.name === entry.Team))) {
          points.push({
            name: entry.Team,
            current: 0
          });
        }
        const i = points.findIndex((obj) => obj.name === entry.Team);
        points[i].current += isNaN(score) ? 0 : score;
      }
    });
    teams.forEach((team) => {
      if (!(points.find((obj) => obj.name === team.teamName))) {
        points.push({
          name: team.teamName,
          current: 0
        });
      }
      const i = points.findIndex((obj) => obj.name === team.teamName);
      points[i].current += team.points;
    });
    points.sort(getSortOrder("current"));
    setPlacements(points);
    setTeamPoints({
      current,
      possible
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (email && regData) {
      fetchTeamData();
    }
  }, [email, regData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (teamData) {
      fetchTeamPoints();
    }
  }, [teamData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
    {isLoading ? <Loading/> : (<>
      {teamData &&
                  <FadeInWhenVisible id="welcome" style={styles.column}>
                    <h1 id="DataChallenge" style={renderMobileOnly ? styles.mobileTitle : styles.title}>Data Challenge</h1>
                    <img src={BoltDog} alt="Bolt Dog" style={{
                      marginTop: -30,
                      marginRight: 100,
                      height: 150,
                      width: "auto"
                    }}/>
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
                    <div style={{
                      ...styles.text,
                      marginTop: "25px",
                      fontWeight: "bold",
                      ...{
                        fontSize: renderMobileOnly ? constantStyles.mobileFontSize + 4 : 20
                      }
                    }}>{renderPlacement()}</div>
                    <div style={{
                      ...styles.text,
                      marginTop: "10px",
                      fontWeight: "bold",
                      ...{
                        fontSize: renderMobileOnly ? constantStyles.mobileFontSize + 4 : 20
                      }
                    }}>{teamPoints.possible === 0 ? `Your team collected a total of ${teamPoints.current} points throughout the challenge. Fantastic work!` : `Your team is currently at ${teamPoints.current} points and can still gain up to ${teamPoints.possible} points. Keep progressing!`}</div>
                    <div style={{
                      ...styles.text,
                      ...(renderMobileOnly && {
                        fontSize: constantStyles.mobileFontSize
                      })
                    }}>Please note that your current total and placement may not be completely accurate, as will manually assess the results and fix grading errors where necessary. Please refresh the page to update your total as you go. Thanks for your patience!</div>
                  </FadeInWhenVisible>
      }
      <FadeInWhenVisible id="welcome">
        <div id="Partners" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
          <img src={DBPartners} alt="D&B Partners" style={styles.partners}/>
        </div>
      </FadeInWhenVisible>
    </>)}
  </>
  );
};

export default DataAndBeyond2023;

