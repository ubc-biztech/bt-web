import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Quiz from "./Quiz";
import Leaderboard from "./Leaderboard";

const useStyles = {
  root: {
    position: "relative",
    minHeight: "180vh",
    background: "linear-gradient(135deg, #3C1F62, #5A3D89, #2F3C53, #121C2C)",
    color: "white",
    padding: "20px",
    textAlign: "center", // Centering the content
  },
  heading: {
    fontSize: "6rem", // Making the main heading bigger
    fontWeight: "bold", // Making the text bold
    marginTop: "40px", // Adding space above the heading
  },
  subheading: {
    fontSize: "1.5rem", // Increasing the font size for subheadings
    fontWeight: "500", // Optional: make the subheading a bit lighter
  },
  text: {
    fontSize: "1.2rem", // Make other text a bit larger
  },
  infoRow: {
    display: "flex", // Align items in a row
    justifyContent: "center", // Center the row
    gap: "30px", // Space between the items
    marginBottom: "20px", // Space below the row
  },
  label: {
    color: "#B0B0B0", // Gray color for labels
    fontWeight: "500", // Optional: make labels a bit lighter
  },
  value: {
    background: "linear-gradient(to bottom, #FFFFFF, #7B7DFF)", // Gradient from white to light purple
    WebkitBackgroundClip: "text", // Clip the background to the text
    color: "transparent", // Make the text color transparent so the gradient shows through
    fontWeight: "700", // Optional: make values bold
  },
};

const Dashboard = () => {
  const location = useLocation();
  const history = useHistory();
  const { teamName, teamPoints, accessKey } = location.state || {};

  useEffect(() => {
    if (teamPoints == null || teamName == null) {
      history.push("/companion");
    }
  }, [teamPoints, teamName, history]);

  return (
    <div style={useStyles.root}>
      {teamPoints == null || teamName == null ? (
        <Typography style={useStyles.text} variant="h6">
          Redirecting to Companion...
        </Typography>
      ) : (
        <>
          <Typography style={useStyles.heading} variant="h4">
            Team Dashboard
          </Typography>
          
          {/* Flex container for the Team Name and Current Points */}
          <div style={useStyles.infoRow}>
            <Typography style={useStyles.label} variant="h6">
              Team Name:
            </Typography>
            <Typography style={useStyles.value} variant="h6">
              {teamName}
            </Typography>
            <Typography style={useStyles.label} variant="h6">
              Current Points:
            </Typography>
            <Typography style={useStyles.value} variant="h6">
              {teamPoints}
            </Typography>
          </div>
          <Quiz />
          <Leaderboard teamName={teamName} teamScore={teamPoints} />
          
        </>
      )}
    </div>
  );
};

export default Dashboard;
