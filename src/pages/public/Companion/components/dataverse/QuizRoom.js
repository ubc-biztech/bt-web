import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  FormControl,
  IconButton,
  Grid,
  Card,
  CardContent
} from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const QuizRoom = ({ roomNumber, goBack }) => {
  const [answers, setAnswers] = useState(Array(5).fill("")); // Array to hold answers for 5 questions
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null)); // To track selected options for multiple-choice questions
  const [answerStatus, setAnswerStatus] = useState(Array(5).fill(null)); // To track the status of each question (null = not checked, 'correct' or 'incorrect')

  const quizData = {
    1: {
      questions: [
        "Which player had the most rebounds in a single game?",
        "Which of the following teams scored the most points?",
        "Based on historical outcomes, if the Boston Celtics and Charlotte Hornets play against each other, who would you predict would win?",
        "Which of the following attributes is most positively correlated with Total Points Scored?",
        "What is this SQL query trying to do? \n\nSELECT player \nFROM NBA \nWHERE team = 'NYK' AND total_points >= 20"
      ],
      questionType: [
        "text", // Free text question
        "multiple-choice", // Free text question
        "multiple-choice", // Free text question
        "multiple-choice", // Free text question
        "multiple-choice" // Free text question
      ],
      correctAnswers: [
        "Victor Wembanyama",
        "TOR",
        "BOS",
        "Field Goal Attempts",
        "Retrieve all players who play for the New York Knicks and scored at least 20 points in a game"
      ],
      options: [
        [],
        ["ATL", "TOR", "WAS"],
        ["BOS", "CHO"],
        ["Field Goal Attempts", "3 Pointer Attempts", "Free Throw Attempts"],
        [
          "Retrieve all players who scored at least 20 points in a game",
          "Retrieve the total points scored by New York Knicks players who scored more than 20 points in a game",
          "Retrieve all players who play for the New York Knicks and scored at least 20 points in a game"
        ]
      ] // No multiple choice questions for this quiz
    },
    2: {
      questions: [
        "Which planet is known as the Red Planet?",
        "What gas do plants absorb from the atmosphere?",
        "What is the chemical symbol for water?",
        "Who developed the theory of relativity?",
        "What is the speed of light?"
      ],
      questionType: [
        "multiple-choice", // Multiple choice question
        "multiple-choice", // Multiple choice question
        "text", // Free text question
        "text", // Free text question
        "text" // Free text question
      ],
      correctAnswers: [
        "Mars",
        "Carbon dioxide",
        "H2O",
        "Albert Einstein",
        "299,792,458 m/s"
      ],
      options: [
        ["Mars", "Earth", "Venus", "Jupiter"],
        ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        [], // No options for this text question
        [], // No options for this text question
        [] // No options for this text question
      ]
    },
    3: {
      questions: [
        "Which planet is known as the Red Planet?",
        "What gas do plants absorb from the atmosphere?",
        "What is the chemical symbol for water?",
        "Who developed the theory of relativity?",
        "What is the speed of light?"
      ],
      questionType: [
        "multiple-choice", // Multiple choice question
        "multiple-choice", // Multiple choice question
        "text", // Free text question
        "text", // Free text question
        "text" // Free text question
      ],
      correctAnswers: [
        "Mars",
        "Carbon dioxide",
        "H2O",
        "Albert Einstein",
        "299,792,458 m/s"
      ],
      options: [
        ["Mars", "Earth", "Venus", "Jupiter"],
        ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        [], // No options for this text question
        [], // No options for this text question
        [] // No options for this text question
      ]
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleMultipleChoiceAnswer = (index, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const { correctAnswers } = quizData[roomNumber];
    const newAnswerStatus = answers.map((answer, index) => {
      if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
        return "correct"; // Correct answer
      } else {
        return "incorrect"; // Incorrect answer
      }
    });
    setAnswerStatus(newAnswerStatus);
  };

  // Render the questions based on the room number
  const renderQuiz = () => {
    const { questions, questionType, options } = quizData[roomNumber];

    return questions.map((question, index) => {
      const questionStatus = answerStatus[index];
      const isCorrect = questionStatus === "correct";
      const isIncorrect = questionStatus === "incorrect";

      return (
        <Card
          key={index}
          style={{
            width: "800px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // White with 30% opacity
            border: "2px solid white", // White border with 2px thickness
            backdropFilter: "blur(10px)", // Optional: Add blur effect to the background behind the card
            borderColor: isCorrect ? "green" : isIncorrect ? "red" : "white", // Set border color based on correctness
            boxShadow: isCorrect ? "0px 0px 10px green" : isIncorrect ? "0px 0px 10px red" : "none" // Add box shadow for highlight effect
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              {question.split("\n").map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < question.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>

            {questionType[index] === "multiple-choice" ? (
              <Grid container spacing={2}>
                {options[index].map((option, i) => (
                  <Grid item xs={6} key={i}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleMultipleChoiceAnswer(index, option)}
                      style={{
                        height: "75px",
                        fontSize: "16px",
                        backgroundColor:
                          selectedOptions[index] === option
                            ? "white"
                            : "transparent",
                        color:
                          selectedOptions[index] === option ? "black" : "white",
                        border:
                          selectedOptions[index] === option
                            ? "2px solid white"
                            : "2px solid white",
                        boxShadow:
                          selectedOptions[index] === option
                            ? "0px 0px 10px rgba(255, 255, 255, 0.5)"
                            : "none"
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <FormControl fullWidth>
                <TextField
                  label={`Your Answer to Question ${index + 1}`}
                  variant="outlined"
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  style={{
                    marginTop: "10px",
                    width: "100%"
                  }}
                />
              </FormControl>
            )}
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "120vh",
        background:
          "linear-gradient(135deg, #0d1b61, #0a143b, #081027, #000000)",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        position: "relative"
      }}
    >
      <IconButton
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#fff"
        }}
        onClick={goBack}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Quiz {roomNumber}
      </Typography>

      {renderQuiz()}

      <Button
        variant="contained"
        onClick={checkAnswers}
        style={{
          backgroundColor: "#0a143b",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "20px"
        }}
      >
        Check Answers
      </Button>
    </div>
  );
};

export default QuizRoom;
