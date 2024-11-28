import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  FormControl
} from "@mui/material";
import BackgroundGradient from "../../../../../assets/2024/dataverse/bg.png";
import { ArrowBack, Download, Timer as TimerIcon, CheckCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { fetchBackend } from "utils";
import { CheckCircle as CheckCircleMaterialUI } from "@material-ui/icons"; // Added import for CheckCircle from @material-ui/icons

const ScoreBox = styled("div")(({ theme, color }) => ({
  width: 18,
  height: 24,
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(0.5)
}));

export default function QuizRoom({
  roomNumber,
  goBack,
  userRegistration,
  setQuestions,
  quizData,
  datasetLink
}) {
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(Array(5).fill(null));
  const [openPopup, setOpenPopup] = useState(false);
  const [cooldown, setCooldown] = useState(0);

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
  }, [userRegistration.id, setQuestions]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleAnswerChange = (index, value) => {
    // Only allow changes if the answer was incorrect or not yet answered
    if (completedQuestions.includes(quizData[roomNumber].questions[index]) || 
        answerStatus[index] === "correct") {
      return;
    }
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleMultipleChoiceAnswer = (index, option) => {
    // Only allow changes if the answer was incorrect or not yet answered
    if (completedQuestions.includes(quizData[roomNumber].questions[index]) || 
        answerStatus[index] === "correct") {
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
    if (cooldown > 0) return;

    const { correctAnswers, questions } = quizData[roomNumber];
    const newAnswerStatus = [...answerStatus];

    try {
      let score = 0;
      const newlyScannedQuestions = [];

      answers.forEach((answer, index) => {
        // Skip already correct answers
        if (answerStatus[index] === "correct" || completedQuestions.includes(questions[index])) {
          newAnswerStatus[index] = "correct";
          return;
        }

        const isCorrect =
          answer.trim().toLowerCase() ===
          correctAnswers[index].trim().toLowerCase();

        if (isCorrect) {
          newAnswerStatus[index] = "correct";
          score += 1;
          newlyScannedQuestions.push(questions[index]);
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

      setCooldown(10);
    } catch (error) {
      console.error("Error updating team points:", error);
      alert("Failed to update team points. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getScoreCount = () => {
    const correct = answerStatus.filter(
      (status) => status === "correct"
    ).length;
    const incorrect = answerStatus.filter(
      (status) => status === "incorrect"
    ).length;
    return { correct, incorrect };
  };

  const renderQuiz = () => {
    const { questions, questionType, options } = quizData[roomNumber];

    return questions.map((question, index) => {
      const isCompleted = completedQuestions.includes(question);
      const isCorrect = answerStatus[index] === "correct";
      const isIncorrect = answerStatus[index] === "incorrect";
      // Only disable if completed or correct, allow re-answering if incorrect
      const isDisabled = isCompleted || isCorrect;

      let bgcolor = "#00000000";
      let borderColor = "white";
      let boxShadow = "none";

      if (isCompleted || isCorrect) {
        borderColor = "#00FFC6";
        bgcolor = "linear-gradient(to bottom, #00FFC666, #00FFC622)";
        boxShadow = "0px 0px 10px #00FFC6";
      } else if (isIncorrect) {
        borderColor = "red";
        bgcolor = "linear-gradient(to bottom, #FF4E4E66, #FF4E4E22)";
        boxShadow = "0px 0px 10px red";
      }

      return (
        <Card
          key={index}
          style={{
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#00000000",
            boxShadow: "none"
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              style={{
                marginBottom: "10px",
                color: "white",
                fontWeight: "bold",
                letterSpacing: "0.5px",
                whiteSpace: "pre-line"
              }}
            >
              {question}
            </Typography>

            {questionType[index] === "multiple-choice" ? (
              <Grid container spacing={2}>
                {options[index].map((option, i) => {
                  return (
                    <Grid item xs={6} key={i}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                          handleMultipleChoiceAnswer(index, option)
                        }
                        disabled={isDisabled}
                        style={{
                          height: "125px",
                          fontSize: "16px",
                          backgroundColor: bgcolor,
                          color: "white",
                          border: `2px solid ${borderColor}`,
                          boxShadow: boxShadow
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  );
                })}
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
                  inputProps={{
                    style: {
                      color: "white",
                      caretColor: "white"
                    },
                    autoComplete: "off",
                    spellCheck: "false"
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white"
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: isDisabled
                        ? "transparent"
                        : "transparent",
                      backgroundImage: isDisabled ? bgcolor : "none",
                      "& fieldset": {
                        borderColor: borderColor,
                        boxShadow: boxShadow
                      },
                      "&:hover fieldset": {
                        borderColor: borderColor
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: borderColor
                      },
                      "&.Mui-disabled": {
                        backgroundImage: bgcolor
                      }
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      borderColor: borderColor
                    }
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
        minHeight: "100vh",
        backgroundImage: `url(${BackgroundGradient})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff"
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: "40%",
          position: "fixed",
          height: "100vh",
          padding: "32px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, left: 16, color: "white" }}
          onClick={goBack}
        >
          <ArrowBack />
        </IconButton>

        <Button
          variant="outlined"
          sx={{
            mb: 4,
            mt: 8,
            width: 200,
            color: "white",
            borderColor: "white",
            textTransform: "none"
          }}
          startIcon={<Download />}
          onClick={() => {
            const anchor = document.createElement("a");
            anchor.href = datasetLink;
            anchor.download = `dataset${roomNumber}.xlsx`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
          }}
        >
          Download Dataset
        </Button>

        <Typography
          variant="h2"
          sx={{ mb: 4, fontWeight: "light", fontFamily: "Audiowide" }}
        >
          ROOM {roomNumber}
        </Typography>

        <Button
          variant="outlined"
          disabled={cooldown > 0}
          onClick={checkAnswers}
          startIcon={<CheckCircle />}
          sx={{
            width: 200,
            mb: 2,
            color: "white",
            borderColor: "white",
            textTransform: "none",
            "&:disabled": {
              color: "grey.500",
              borderColor: "grey.500"
            }
          }}
        >
          Check Answers
        </Button>

        {cooldown > 0 && (
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <TimerIcon sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              You can resubmit in {formatTime(cooldown)}
            </Typography>
          </div>
        )}

        <div style={{ display: "flex", marginBottom: 8 }}>
          {[...Array(getScoreCount().correct)].map((_, i) => (
            <ScoreBox
              key={`correct-${i}`}
              style={{ backgroundColor: "#00FFC6" }}
            />
          ))}
          {[...Array(getScoreCount().incorrect)].map((_, i) => (
            <ScoreBox
              key={`incorrect-${i}`}
              style={{ backgroundColor: "#FF4E4E" }}
            />
          ))}
        </div>

        <Typography variant="body2">
          {getScoreCount().correct} correct, {getScoreCount().incorrect}{" "}
          incorrect
        </Typography>
      </div>

      {/* Right Panel - Scrollable Questions */}
      <div
        style={{
          marginLeft: "40%",
          width: "60%",
          minHeight: "100vh",
          padding: "32px"
        }}
      >
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          {renderQuiz()}
        </div>
      </div>

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>{popupContent[roomNumber]?.title}</DialogTitle>
        <DialogContent>
          <Typography>{popupContent[roomNumber]?.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

