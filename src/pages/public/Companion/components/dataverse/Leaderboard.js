import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

const LeaderboardRow = ({ placement, teamName, score, isTeam }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: "10px 20px",
        marginY: "10px",
        maxWidth: "1000px",
        backgroundColor: isTeam ? "#7163BC" : "#1B1746", // Background color
        color: "#fff", // Text color: black for team row
        borderRadius: "8px",
        width: "100%", // Ensures the row takes full width
      }}
    >
      <Typography variant="h6">{placement}</Typography>
      <Typography variant="body1">{teamName}</Typography>
      <Typography variant="body1">{score}</Typography>
    </Box>
  );
};

const Leaderboard = ({ teamName, teamScore }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Check out how your team is doing:
      </Typography>

      <div
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          display: "flex", // Enable Flexbox layout
          flexDirection: "column", // Stack rows vertically
          alignItems: "center", // Center content horizontally
          justifyContent: "center", // Optional: centers content vertically (if container height is defined)
          width: "100%", // Ensures the div takes up full available width
        }}
      >
        <LeaderboardRow placement={1} teamName="Team A" score={1500} />
        <LeaderboardRow placement={2} teamName="Team B" score={1200} />
        <LeaderboardRow placement={3} teamName="Team C" score={1000} />
        ...
        <LeaderboardRow placement={11} teamName="Team mogged" score={1000} />
        <LeaderboardRow placement={12} teamName={teamName} score={teamScore} isTeam />
        <LeaderboardRow placement={13} teamName="Team shitters" score={1000} />
      </div>

      <Button variant="contained" color="secondary" style={{ margin: "10px", minWidth: "1000px", minHeight: "40px" }}>
        Check out the full leaderboard
      </Button>
    </div>
  );
};

export default Leaderboard;
