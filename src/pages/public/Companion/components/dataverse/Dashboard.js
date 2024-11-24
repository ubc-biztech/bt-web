import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Quiz from "./Quiz";


const Dashboard = () => {
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 5 * 60000);
  const location = useLocation();
  const history = useHistory();
  const { teamName, teamPoints } = location.state || {};

  useEffect(() => {
    if (teamPoints == null || teamName == null) {
      history.push("/companion");
    }
  }, [teamPoints, teamName, history]);

  return (
    <Quiz
      teamName={teamName}
      teamPoints={teamPoints}
      startTime={startTime}
      endTime={endTime}
    />
  );
};

export default Dashboard;
