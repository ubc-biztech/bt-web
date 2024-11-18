import React, {
  useState
} from "react";
import {
  Typography, Button, TextField, FormControl
} from "@material-ui/core";
import {
  fetchBackend
} from "utils";

const quizData = {
  1: {
    questions: [
      "What is the capital of France?",
      "What is the largest country by area?",
      "Who painted the Mona Lisa?",
      "What is the smallest prime number?",
      "What is the tallest mountain in the world?",
    ],
    correctAnswers: ["Paris", "Russia", "Leonardo da Vinci", "2", "Mount Everest"],
  },
  2: {
    questions: [
      "Which planet is known as the Red Planet?",
      "What gas do plants absorb from the atmosphere?",
      "What is the chemical symbol for water?",
      "Who developed the theory of relativity?",
      "What is the speed of light?",
    ],
    correctAnswers: ["Mars", "Carbon dioxide", "H2O", "Albert Einstein", "299,792,458 m/s"],
  },
  3: {
    questions: [
      "Who wrote 'To Kill a Mockingbird'?",
      "What is the main language spoken in Brazil?",
      "Who is known as the Father of Computers?",
      "What is the hardest natural substance?",
      "What is the boiling point of water in Celsius?",
    ],
    correctAnswers: ["Harper Lee", "Portuguese", "Charles Babbage", "Diamond", "100"],
  },
};

const QuizRoom = ({
  roomNumber, goBack, userRegistration
}) => {
  const [answers, setAnswers] = useState(Array(5).fill("")); // Store answers for 5 questions

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const checkAnswers = async () => {
    const {
      correctAnswers, questions
    } = quizData[roomNumber];

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
      const scannedQRs = response.response.scannedQRs;

      let score = 0;
      const newlyScannedQuestions = [];

      answers.forEach((answer, index) => {
        const question = questions[index];
        const isCorrect = answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase();

        // Award points only if the question hasn't been answered correctly before
        if (isCorrect && !scannedQRs.includes(question)) {
          score += 1;
          newlyScannedQuestions.push(question);
        }
      });

      if (score > 0) {
        const updateResponse = await fetchBackend(
          "/team/points",
          "put",
          {
            eventID: "dataverse",
            year: 2024,
            user_id: "testDV@gmail.com",
            change_points: score || 0
          },
          false
        );

        // NOTE: using the scannedQRs field to store already answered correctly questions
        const addQRResponse = await fetchBackend(
          "/team/addQRs",
          "put",
          {
            eventID: "dataverse",
            year: 2024,
            user_id: "testDV@gmail.com",
            qr_code_ids: newlyScannedQuestions
          },
          false
        );

        alert(`Team points updated successfully: ${updateResponse.updatedPoints}`);
      } else {
        alert("No new points awarded :(");
      }
    } catch (error) {
      console.error("Error updating team points:", error);
      alert("Failed to update team points. Please try again.");
    }
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Quiz Room {roomNumber}
      </Typography>
      {quizData[roomNumber].questions.map((question, index) => (
        <div key={index} style={{
          marginBottom: "20px"
        }}>
          <Typography variant="h6">{question}</Typography>
          <FormControl fullWidth style={{
            marginTop: "10px"
          }}>
            <TextField
              label={`Your Answer to Question ${index + 1}`}
              variant="outlined"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </FormControl>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
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
          marginLeft: "10px",
        }}
        onClick={goBack}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default QuizRoom;
