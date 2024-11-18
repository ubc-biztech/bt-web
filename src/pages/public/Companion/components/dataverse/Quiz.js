import React, {
  useState
} from "react";
import {
  Typography, Button
} from "@material-ui/core";
import QuizRoom from "./QuizRoom";

const buttonCardStyle = {
  margin: "10px",
  padding: "25px 50px",
  fontSize: "18px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderColor: "white",
  color: "white",
  height: "400px",
  transition: "transform 0.3s ease, translateY 0.3s ease, opacity 0.3s ease",
  display: "inline-block",
  textAlign: "center",
};

const button1Style = {
  ...buttonCardStyle,
  transform: "rotate(-30deg) translateY(100px)",
};

const button3Style = {
  ...buttonCardStyle,
  transform: "rotate(30deg) translateY(100px)",
};

const button2Style = {
  ...buttonCardStyle,
  opacity: 1,
};

const QuizDashboard = ({
  userRegistration
}) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

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
    <div style={{
      textAlign: "center",
      marginTop: "20px"
    }}>
      <Typography variant="h4" gutterBottom>
        Select a Quiz Room
      </Typography>
      <Button
        variant="outlined"
        style={button1Style}
        onClick={() => setSelectedRoom(1)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-30deg) translateY(70px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-30deg) translateY(100px)")}
      >
        Enter Quiz Room 1
      </Button>
      <Button
        variant="outlined"
        style={button2Style}
        onClick={() => setSelectedRoom(2)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(30px)")}
      >
        Enter Quiz Room 2
      </Button>
      <Button
        variant="outlined"
        style={button3Style}
        onClick={() => setSelectedRoom(3)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(30deg) translateY(70px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(30deg) translateY(100px)")}
      >
        Enter Quiz Room 3
      </Button>
    </div>
  );
};

export default QuizDashboard;
