import React, {
  useState, useEffect
} from "react";
import {
  Typography,
  Button,
  TextField,
  FormControl,
  IconButton,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  fetchBackend
} from "utils";

const QuizRoom = ({
  roomNumber,
  goBack,
  userRegistration,
  setQuestions,
  quizData,
  datasetLink // Added DatasetLink as a prop
}) => {
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(Array(5).fill(null)); // To track the current status of answers
  const [openPopup, setOpenPopup] = useState(false); // State to control popup visibility

  const popupContent = {
    1: {
      title: "🏆 Room 1 Complete!",
      message: "Great job! Your string is: NSCC"
    },
    2: {
      title: "🎯 Room 2 Mastered!",
      message: "Fantastic! Your string is: winner"
    },
    3: {
      title: "🚀 Room 3 Achieved!",
      message: "Outstanding! Your string is: 2024"
    }
  };

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

        setCompletedQuestions(response.response.scannedQRs || []);
        setQuestions(response.response.scannedQRs || []);
      } catch (error) {
        console.error("Error fetching completed questions:", error);
      }
    };

    fetchCompletedQuestions();
  }, [userRegistration.id]);

  const handleAnswerChange = (index, value) => {
    if (
      completedQuestions.includes(quizData[roomNumber].questions[index]) ||
      answerStatus[index] === "correct"
    ) {
      alert("This question has already been answered correctly!");
      return;
    }

    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleMultipleChoiceAnswer = (index, option) => {
    if (
      completedQuestions.includes(quizData[roomNumber].questions[index]) ||
      answerStatus[index] === "correct"
    ) {
      alert("This question has already been answered correctly!");
      return;
    }

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);

    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const checkAnswers = async () => {
    const {
      correctAnswers, questions
    } = quizData[roomNumber];
    const newAnswerStatus = [...answerStatus];

    try {
      let score = 0;
      const newlyScannedQuestions = [];

      answers.forEach((answer, index) => {
        const question = questions[index];
        const isCorrect =
          answer.trim().toLowerCase() ===
          correctAnswers[index].trim().toLowerCase();

        if (isCorrect) {
          newAnswerStatus[index] = "correct";
          if (!completedQuestions.includes(question)) {
            score += 1;
            newlyScannedQuestions.push(question);
          }
        } else {
          newAnswerStatus[index] = "incorrect";
        }
      });

      setAnswerStatus(newAnswerStatus);

      if (score > 0) {
        await fetchBackend(
          "/team/points",
          "put",
          {
            eventID: "dataverse",
            year: 2024,
            user_id: userRegistration.id,
            change_points: score || 0
          },
          false
        );

        await fetchBackend(
          "/team/addQuestions",
          "put",
          {
            eventID: "dataverse",
            year: 2024,
            user_id: userRegistration.id,
            answered_questions: newlyScannedQuestions
          },
          false
        );

        setCompletedQuestions((prev) => [...prev, ...newlyScannedQuestions]);
      }

      const allGreen = questions.every(
        (question, index) =>
          completedQuestions.includes(question) ||
          newAnswerStatus[index] === "correct"
      );

      if (allGreen) {
        setOpenPopup(true);
      }
    } catch (error) {
      console.error("Error updating team points:", error);
      alert("Failed to update team points. Please try again.");
    }
  };

  const renderQuiz = () => {
    const {
      questions, questionType, options
    } = quizData[roomNumber];

    return questions.map((question, index) => {
      const isCompleted = completedQuestions.includes(question);
      const isCorrect = answerStatus[index] === "correct";
      const isDisabled = isCompleted || isCorrect;

      let borderColor = "white";
      let boxShadow = "none";

      if (isCompleted) {
        borderColor = "green";
        boxShadow = "0px 0px 10px green";
      } else if (answerStatus[index] === "incorrect") {
        borderColor = "red";
        boxShadow = "0px 0px 10px red";
      }

      return (
        <Card
          key={index}
          style={{
            width: "800px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: `2px solid ${borderColor}`,
            boxShadow
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{
              marginBottom: "10px"
            }}>
              {question}
            </Typography>

            {questionType[index] === "multiple-choice" ? (
              <Grid container spacing={2}>
                {options[index].map((option, i) => (
                  <Grid item xs={6} key={i}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleMultipleChoiceAnswer(index, option)}
                      disabled={isDisabled}
                      style={{
                        height: "75px",
                        fontSize: "16px",
                        backgroundColor:
                          selectedOptions[index] === option
                            ? "white"
                            : "transparent",
                        color:
                          selectedOptions[index] === option ? "black" : "white",
                        border: "2px solid white"
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
                  disabled={isDisabled}
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

      {/* Added Dataset Button */}
      <Button
        variant="contained"
        color="primary"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#1976d2",
          color: "#fff"
        }}
        onClick={() => {
          const anchor = document.createElement("a");
          anchor.href = datasetLink;
          anchor.download = `dataset${roomNumber}.xlsx`;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }}
      >
        Open Dataset
      </Button>

      <Typography variant="h4" style={{
        marginBottom: "20px"
      }}>
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

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>{popupContent[roomNumber]?.title}</DialogTitle>
        <DialogContent>
          <Typography>{popupContent[roomNumber]?.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizRoom;
