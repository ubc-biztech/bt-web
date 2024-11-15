import React, { useState } from "react";
import { Typography, Button, TextField, FormControl } from "@material-ui/core";

const QuizRoom = ({ roomNumber, goBack }) => {
  const [answers, setAnswers] = useState(Array(5).fill("")); // Array to hold answers for 5 questions

  const quizData = {
    1: {
      questions: [
        "What is the capital of France?",
        "What is the largest country by area?",
        "Who painted the Mona Lisa?",
        "What is the smallest prime number?",
        "What is the tallest mountain in the world?"
      ],
      correctAnswers: [
        "Paris",
        "Russia",
        "Leonardo da Vinci",
        "2",
        "Mount Everest"
      ]
    },
    2: {
      questions: [
        "Which planet is known as the Red Planet?",
        "What gas do plants absorb from the atmosphere?",
        "What is the chemical symbol for water?",
        "Who developed the theory of relativity?",
        "What is the speed of light?"
      ],
      correctAnswers: [
        "Mars",
        "Carbon dioxide",
        "H2O",
        "Albert Einstein",
        "299,792,458 m/s"
      ]
    },
    3: {
      questions: [
        "Who wrote 'To Kill a Mockingbird'?",
        "What is the main language spoken in Brazil?",
        "Who is known as the Father of Computers?",
        "What is the hardest natural substance?",
        "What is the boiling point of water in Celsius?"
      ],
      correctAnswers: [
        "Harper Lee",
        "Portuguese",
        "Charles Babbage",
        "Diamond",
        "100"
      ]
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const { correctAnswers } = quizData[roomNumber];
    let score = 0;

    answers.forEach((answer, index) => {
      if (
        answer.trim().toLowerCase() ===
        correctAnswers[index].trim().toLowerCase()
      ) {
        score += 1;
      }
    });

    alert(`You scored ${score} out of ${correctAnswers.length}!`);
  };

  // Render the questions based on the room number
  const renderQuiz = () => {
    const { questions } = quizData[roomNumber];

    return questions.map((question, index) => (
      <div
        key={index}
        style={{
          marginBottom: "20px"
        }}
      >
        <Typography variant="h6">{question}</Typography>
        <FormControl fullWidth>
          <TextField
            label={`Your Answer to Question ${index + 1}`}
            variant="outlined"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            style={{
              marginTop: "10px"
            }}
          />
        </FormControl>
      </div>
    ));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to Quiz Room {roomNumber}
      </Typography>
      {renderQuiz()}
      <Button
        variant="contained"
        color="tertiary"
        style={{
          marginTop: "20px"
        }}
        onClick={checkAnswers}
      >
        Submit Answers
      </Button>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#333333",
          color: "#FFFFFF",
          marginTop: "20px",
          marginLeft: "10px"
        }}
        onClick={goBack}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

const buttonCardStyle = {
  margin: "10px",
  padding: "25px 50px",
  fontSize: "18px",
  backgroundColor: "rgba(255, 255, 255, 0.05)", // Transparent background with 10% opacity
  borderColor: "white", // White borders
  color: "white", // White text color
  height: "400px", // Increased height to make the button taller
  transition: "transform 0.3s ease, translateY 0.3s ease, opacity 0.3s ease", // Smooth transitions for transform and opacity
  display: "inline-block",
  textAlign: "center", // Center text horizontally
};

const button1Style = {
  ...buttonCardStyle,
  transform: "rotate(-30deg) translateY(100px)", // Start button 1 lower by 100px
};

const button3Style = {
  ...buttonCardStyle,
  transform: "rotate(30deg) translateY(100px)", // Start button 3 lower by 100px
};

const button2Style = {
  ...buttonCardStyle,
  opacity: 1, // Normal opacity for button 2
};

const QuizDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const renderContent = () => {
    if (selectedRoom) {
      return (
        <QuizRoom
          roomNumber={selectedRoom}
          goBack={() => setSelectedRoom(null)}
        />
      );
    }

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Quizzes
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Select a quiz room to begin:
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

  return <div>{renderContent()}</div>;
};

export default QuizDashboard;
