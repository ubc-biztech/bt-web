import React, {
  useEffect, useState
} from "react";
import {
  useLocation, useHistory
} from "react-router-dom";
import Quiz from "./Quiz";
import {
  fetchBackend
} from "utils";

const Dashboard = () => {
  const startTime = new Date();
  const endTimeAt3PM = new Date();
  endTimeAt3PM.setHours(15, 35, 0, 0);
  const endTimeIn50Minutes = new Date(startTime.getTime() + 50 * 60 * 1000);
  const endTime = (endTimeIn50Minutes < endTimeAt3PM) ? endTimeIn50Minutes : endTimeAt3PM;
  const location = useLocation();
  const history = useHistory();
  const {
    teamName,
    teamPoints: initialTeamPoints,
    userRegistration
  } = location.state || {
  };

  const [teamPoints, setTeamPoints] = useState(initialTeamPoints || 0);

  useEffect(() => {
    if (!teamName) {
      history.push("/companion");
    }
  }, [teamName, history]);

  useEffect(() => {
    if (!teamName) return;

    const fetchTeamPoints = async () => {
      try {
        const response = await fetchBackend(
          "/team/getTeamFromUserID",
          "post",
          {
            eventID: "dataverse",
            year: 2024,
            user_id: userRegistration.id
          },
          false
        );

        const data = await response.response;
        if (data && data.points !== undefined) {
          setTeamPoints(data.scannedQRs.length);
        }
      } catch (error) {
        console.error("Error fetching team points:", error);
      }
    };

    fetchTeamPoints();
    const interval = setInterval(() => {
      fetchTeamPoints();
    }, 10000);

    return () => clearInterval(interval);
  }, [teamName, userRegistration.id]);

  return (
    <Quiz
      teamName={teamName}
      teamPoints={teamPoints}
      startTime={startTime}
      endTime={endTime}
      userRegistration={userRegistration}
    />
  );
};

export default Dashboard;
