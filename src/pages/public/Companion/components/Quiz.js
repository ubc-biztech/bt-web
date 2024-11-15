import React, {
  useState
} from "react";
import {
  Typography, Button, TextField, FormControl
} from "@material-ui/core";

const QuizRoom = ({
  roomNumber, goBack
}) => {
  const [answers, setAnswers] = useState(Array(5).fill("")); // Array to hold answers for 5 questions

  const quizData = {
    1: {
      questions: [
        "What is the capital of France?",
        "What is the largest country by area?",
        "Who painted the Mona Lisa?",
        "What is the smallest prime number?",
        "What is the tallest mountain in the world?",
      ],
      correctAnswers: ["Paris", "Russia", "Leonardo da Vinci", "2", "Mount Everest"]
    },
    2: {
      questions: [
        "Which planet is known as the Red Planet?",
        "What gas do plants absorb from the atmosphere?",
        "What is the chemical symbol for water?",
        "Who developed the theory of relativity?",
        "What is the speed of light?",
      ],
      correctAnswers: ["Mars", "Carbon dioxide", "H2O", "Albert Einstein", "299,792,458 m/s"]
    },
    3: {
      questions: [
        "Who wrote 'To Kill a Mockingbird'?",
        "What is the main language spoken in Brazil?",
        "Who is known as the Father of Computers?",
        "What is the hardest natural substance?",
        "What is the boiling point of water in Celsius?",
      ],
      correctAnswers: ["Harper Lee", "Portuguese", "Charles Babbage", "Diamond", "100"]
    },
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const {
      correctAnswers
    } = quizData[roomNumber];
    let score = 0;

    answers.forEach((answer, index) => {
      if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
        score += 1;
      }
    });

    alert(`You scored ${score} out of ${correctAnswers.length}!`);
  };

  // Render the questions based on the room number
  const renderQuiz = () => {
    const {
      questions
    } = quizData[roomNumber];

    return questions.map((question, index) => (
      <div key={index} style={{
        marginBottom: "20px"
      }}>
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
      <Typography variant="h4" gutterBottom>Welcome to Quiz Room {roomNumber}</Typography>
      {renderQuiz()}
      <Button
        variant="contained"
        color="secondary"
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

const QuizDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const renderContent = () => {
    if (selectedRoom) {
      return <QuizRoom roomNumber={selectedRoom} goBack={() => setSelectedRoom(null)} />;
    }

    return (
      <div style={{
        textAlign: "center",
        marginTop: "20px"
      }}>
        <Typography variant="h4" gutterBottom>Quiz Dashboard</Typography>
        <Typography variant="subtitle1" gutterBottom>Select a quiz room to begin:</Typography>

        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "10px",
            padding: "15px 30px",
            fontSize: "18px"
          }}
          onClick={() => setSelectedRoom(1)}
        >
          Enter Quiz Room 1
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "10px",
            padding: "15px 30px",
            fontSize: "18px"
          }}
          onClick={() => setSelectedRoom(2)}
        >
          Enter Quiz Room 2
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "10px",
            padding: "15px 30px",
            fontSize: "18px"
          }}
          onClick={() => setSelectedRoom(3)}
        >
          Enter Quiz Room 3
        </Button>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default QuizDashboard;
