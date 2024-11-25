import React, { useEffect, useState } from "react";
import { Typography, Button, TextField, FormControl } from "@material-ui/core";
import DataverseLogo from "../../../../../assets/2024/dataverse/Dataverse.png";
import BackgroundGradient from "../../../../../assets/2024/dataverse/bg.png";
import TimerDonut from "./Timer";
import Progress from "./Progress";
import { areAllQuestionsInArray, quizData } from "./QuizData";
import QuizRoom from "./QuizRoom";
import confetti from "canvas-confetti";
import { fetchBackend } from "utils";

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
    textShadow: "0px 0px 8px white"
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

const LeftHeader = ({ teamName, teamPoints }) => {
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

const MemoizedConfetti = React.memo(({ show }) => {
  useEffect(() => {
    if (show) {
      const duration = 1 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x: Math.random(), y: 1.05 },
          ticks: 500,
          startVelocity: 80
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [show]);
  if (!show) return null;
  return null;
});

MemoizedConfetti.displayName = "MemoizedConfetti";

const Congratulations = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${BackgroundGradient})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white"
      }}
      className={useStyles.root}
    >
      <img
        src={DataverseLogo}
        alt={"Dataverse"}
        style={{
          width: "300px",
          marginBottom: "20px"
        }}
      />
      <MemoizedConfetti show={showConfetti} />
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "2rem",
          letterSpacing: "0.5em"
        }}
      >
        <h1
          style={{
            fontFamily: "Audiowide",
            fontWeight: 400,
            textShadow: "0px 0px 8px white"
          }}
        >
          Congratulations!!
        </h1>
        <p style={{ fontSize: "1.5rem", letterSpacing: "0.1em" }}>
          You have completed the Dataverse data challenge!
          <br />
          Check out the leaderboard to see how you placed!
        </p>
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
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderColor: "rgba(255, 255, 255, 0.2)",
  color: "white",
  height: "300px",
  transition: "transform 0.3s ease, translateY 0.3s ease, opacity 0.3s ease",
  letterSpacing: "0.2em",
  whiteSpace: "nowrap"
};

const QuizCard = ({
  roomNumber,
  setSelectedRoom,
  completed = true,
  letters
}) => {
  return (
    <Button
      variant="outlined"
      style={buttonCardStyle}
      onClick={() => setSelectedRoom(roomNumber)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <span>{`Enter Room ${roomNumber}`}</span>
        {completed && (
          <span
            style={{
              color: "#00FF00",
              marginTop: "10px",
              fontFamily: "Gilroy",
              textTransform: "none"
            }}
          >
            {letters}
          </span>
        )}
      </div>
    </Button>
  );
};

const QuizDashboard = ({
  teamName,
  teamPoints,
  startTime,
  endTime,
  userRegistration,
  disabled = false
}) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [Answered, setAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchCompletedQuestions = async () => {
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

        setQuestions(response.response.scannedQRs || []);
        console.log(response.response.scannedQRs);
      } catch (error) {
        console.error("Error fetching completed questions:", error);
      }
    };

    fetchCompletedQuestions();
  }, [userRegistration.id]);

  const renderContent = () => {
    if (Answered) {
      return <Congratulations />;
    }

    if (selectedRoom && !disabled) {
      return (
        <QuizRoom
          roomNumber={selectedRoom}
          goBack={() => setSelectedRoom(null)}
          userRegistration={userRegistration}
          setQuestions={setQuestions}
          quizData={quizData}
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
          backgroundImage: `url(${BackgroundGradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh"
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
        <Progress
          teamScore={teamPoints}
          maxScore={15}
          setAnswered={setAnswered}
          disabled={false}
        />
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "100px"
          }}
        >
          <QuizCard
            setSelectedRoom={setSelectedRoom}
            completed={areAllQuestionsInArray(1, questions)}
            roomNumber={1}
            letters={"NSCC"}
          />
          <QuizCard
            setSelectedRoom={setSelectedRoom}
            completed={areAllQuestionsInArray(2, questions)}
            roomNumber={2}
            letters="winner"
          />
          <QuizCard
            setSelectedRoom={setSelectedRoom}
            completed={areAllQuestionsInArray(3, questions)}
            roomNumber={3}
            letters="2024"
          />
        </div>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default QuizDashboard;
