import React, {
  useState
} from "react";
import {
  Typography, Button, TextField, FormControl
} from "@material-ui/core";
import DataverseLogo from "../../../../../assets/2024/dataverse/Dataverse.png";
import TimerDonut from "./Timer";
import Progress from "./Progress";
import QuizRoom from "./QuizRoom";

const useStyles = {
  root: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0d1b61, #0a143b, #081027, #000000)",
    color: "white",
    padding: "20px",
    textAlign: "center"
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginTop: "0px",
    letterSpacing: "0.2em",
    textShadow: "0px 0px 4px white"
  },
  subheading: {
    fontSize: "1.5rem", // Increasing the font size for subheadings
    fontWeight: "500" // Optional: make the subheading a bit lighter
  },
  text: {
    fontSize: "1.2rem" // Make other text a bit larger
  },
  infoRow: {
    display: "flex", // Align items in a row
    width: "200px", // Fixed width for the row
    justifyContent: "space-between", // Distribute space between items
    marginBottom: "20px", // Space below the row
    marginTop: "20px"
  },
  label: {
    fontSize: "1rem", // Make other text a bit larger
    color: "#FFFFFF", // Gray color for labels
    fontWeight: "100" // Optional: make labels a bit lighter
  },
  value: {
    background: "#FFFFFF", // Gradient from white to light purple
    WebkitBackgroundClip: "text", // Clip the background to the text
    color: "transparent", // Make the text color transparent so the gradient shows through
    fontWeight: "700" // Optional: make values bold
  }
};

const LeftHeader = ({
  teamName, teamPoints
}) => {
  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        height: "300px"
      }}
    >
      <img
        src={DataverseLogo}
        alt={"Dataverse"}
        style={{
          width: "150px",
          marginBottom: "20px"
        }}
      />
      <Typography style={useStyles.heading} variant="h4">
        DATA
      </Typography>
      <Typography style={useStyles.heading} variant="h4">
        CHALLENGE
      </Typography>
      <div style={useStyles.infoRow}>
        <div>
          <Typography style={useStyles.label} variant="h6">
            Team
          </Typography>
          <Typography style={useStyles.value} variant="h6">
            {teamName}
          </Typography>
        </div>
        <div>
          <Typography style={useStyles.label} variant="h6">
            Points
          </Typography>
          <Typography style={useStyles.value} variant="h6">
            {teamPoints}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const buttonCardStyle = {
  width: "315px",
  margin: "10px",
  marginBottom: "200px",
  padding: "25px 50px",
  fontSize: "20px",
  fontFamily: "Audiowide",
  backgroundColor: "rgba(255, 255, 255, 0.05)", // Transparent background with 10% opacity
  borderColor: "white", // White borders
  color: "white", // White text color
  height: "300px", // Increased height to make the button taller
  transition: "transform 0.3s ease, translateY 0.3s ease, opacity 0.3s ease", // Smooth transitions for transform and opacity
  display: "inline-block",
  textAlign: "center" // Center text horizontally
};

const QuizDashboard = ({
  teamName, teamPoints, startTime, endTime, userRegistration
}) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const renderContent = () => {
    if (selectedRoom) {
      return (
        <QuizRoom
          roomNumber={selectedRoom}
          goBack={() => setSelectedRoom(null)}
          userRegistration={userRegistration}
        />
      );
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0d1b61, #0a143b, #081027, #000000)"
        }}
        className={useStyles.root}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
            width: "1000px",
            marginTop: "60px"
          }}
        >
          <LeftHeader teamName={teamName} teamPoints={teamPoints} />
          <TimerDonut startTime={startTime} endTime={endTime} />
        </div>
        <Progress teamScore={teamPoints} maxScore={100000} />
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "100px"
          }}
        >
          <Button
            variant="outlined"
            style={buttonCardStyle}
            onClick={() => setSelectedRoom(1)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Enter Room 1
          </Button>
          <Button
            variant="outlined"
            style={buttonCardStyle}
            onClick={() => setSelectedRoom(2)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Enter Room 2
          </Button>
          <Button
            variant="outlined"
            style={buttonCardStyle}
            onClick={() => setSelectedRoom(3)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Enter Room 3
          </Button>
        </div>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default QuizDashboard;
