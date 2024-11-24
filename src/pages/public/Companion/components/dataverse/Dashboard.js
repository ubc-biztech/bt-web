import React, {
  useEffect
} from "react";
import {
  useLocation, useHistory
} from "react-router-dom";
import Quiz from "./Quiz";


const Dashboard = () => {
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 5 * 60000);
  const location = useLocation();
  const history = useHistory();
  const {
    teamName, teamPoints, teamData, userRegistration
  } = location.state || {
  };

  useEffect(() => {
    if (!teamPoints || !teamName) {
      history.push("/companion");
    }
  }, [teamPoints, teamName, history]);

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
