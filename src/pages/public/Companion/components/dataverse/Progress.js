import React, {
  useState, useRef, useEffect
} from "react";
import {
  Box, IconButton, TextField
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CharacterInput = ({
  onSubmit,
  correctAnswer = "never gonna give you up",
  disabled = true,
  setAnswered
}) => {
  const numChars = correctAnswer.length;
  const [chars, setChars] = useState(Array(numChars).fill(""));
  const [isTyping, setIsTyping] = useState(false);
  const [letterColors, setLetterColors] = useState(Array(numChars).fill(""));
  const inputRefs = useRef([]);

  const placeholderText = "final question answer";

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, numChars);
  }, [numChars]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newChars = [...chars];
      newChars[index] = value;
      setChars(newChars);

      if (!isTyping && value !== "") {
        setIsTyping(true);
      }

      if (index < numChars - 1 && value.length === 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newChars.every((char) => char === "")) {
        setIsTyping(false);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (chars[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newChars = [...chars];
        newChars[index] = "";
        setChars(newChars);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < numChars - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const updateColors = () => {
    const correctLetters = Array(numChars).fill(false);
    const newColors = Array(numChars).fill("red");

    // Mark green letters
    for (let i = 0; i < numChars; i++) {
      if (chars[i].toLowerCase() === correctAnswer[i].toLowerCase()) {
        newColors[i] = "green";
        correctLetters[i] = true;
      }
    }

    // Mark yellow letters
    for (let i = 0; i < numChars; i++) {
      if (newColors[i] === "green") continue;

      const letter = chars[i].toLowerCase();
      const remainingCount = correctAnswer.toLowerCase().split(letter).length - 1;

      // both green and yellow matches
      let usedCount = 0;
      for (let j = 0; j < numChars; j++) {
        if (chars[j].toLowerCase() === letter && newColors[j] !== "red") {
          usedCount++;
        }
      }

      if (remainingCount > usedCount) {
        newColors[i] = "yellow";
      }
    }

    setLetterColors(newColors);
  };


  const handleSubmit = () => {
    const input = chars.join("");
    if (input.length === numChars) {
      updateColors();
      const isAnswerCorrect = input.toLowerCase() === correctAnswer.toLowerCase();
      if (isAnswerCorrect) {
        setAnswered(true);
        onSubmit(input);
      }

      setChars(Array(numChars).fill(""));
      setIsTyping(false);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        overflowX: "hidden"
      }}
    >
      <Box sx={{
        display: "flex",
        gap: 1,
        alignItems: "center"
      }}>
        {chars.map((char, index) => {
          const placeholderChar =
            isTyping && !chars.every((char) => char === "")
              ? ""
              : placeholderText[index] || "";

          const inputColor = letterColors[index];

          return (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={char}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              variant="standard"
              autoComplete="off"
              disabled={disabled}
              inputProps={{
                maxLength: 1,
                style: {
                  width: "25px",
                  textAlign: "center",
                  fontFamily: "monospace",
                  fontSize: "1.5rem",
                  padding: "2px 0px",
                  color: "white"
                }
              }}
              placeholder={placeholderChar}
              sx={{
                width: "25px",
                "& .MuiInput-underline:before": {
                  borderBottomWidth: "2px",
                  borderBottomColor:
                    inputColor === "green"
                      ? "#6ca965"
                      : inputColor === "red"
                        ? "#787c7f"
                        : inputColor === "yellow"
                          ? "#c8b653"
                          : "#ffffff" // Default color before submission
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#ffffff"
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor:
                    inputColor === "green"
                      ? "#6ca965"
                      : inputColor === "red"
                        ? "#787c7f"
                        : inputColor === "yellow"
                          ? "#c8b653"
                          : "#ffffff" // Default color after submission
                }
              }}
            />
          );
        })}
        <IconButton
          onClick={handleSubmit}
          disabled={chars.some((char) => char === "")}
          sx={{
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#000000"
            },
            marginLeft: 2
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const ProgressBar = ({
  teamScore, maxScore
}) => {
  const percentage = (teamScore / maxScore) * 100;

  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        borderRadius: "10px",
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          background: "linear-gradient(to right, #FF00AE, #6CB5FF, #FF00AE)",
          borderRadius: "10px",
          animation: "gradientMove 3s linear infinite",
          backgroundSize: "200% 100%"
        }}
      />
    </div>
  );
};

const style = document.createElement("style");
style.innerHTML = `
    @keyframes gradientMove {
      0% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 100% 0%;
      }
      100% {
        background-position: 200% 0%;
      }
    }
  `;
document.head.appendChild(style);

const Percentage = ({
  teamScore, maxScore
}) => {
  const percentage = Math.round((teamScore / maxScore) * 100);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyItems: "center",
        gap: "0px",
        color: "#FFFFFF"
      }}
    >
      <span
        style={{
          fontSize: "3rem",
          fontWeight: "bold"
        }}
      >
        {percentage}%
      </span>
      <span
        style={{
          fontSize: "1.5rem",
          color: "#FFFFFF",
          marginLeft: "5px"
        }}
      >
        complete
      </span>
    </div>
  );
};

const Divider = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "1000px",
        height: "1px",
        backgroundColor: "#FFFFFF",
        marginTop: "50px"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-37px",
          left: "calc(16% - 39.5px)",
          width: "0px",
          height: "0px",
          display: "block"
        }}
      >
        <svg
          width="79"
          height="79"
          viewBox="0 0 79 79"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_563_161)">
            <path
              d="M39.5 18L40.8789 36.1211L59 37.5L40.8789 38.8789L39.5 57L38.1211 38.8789L20 37.5L38.1211 36.1211L39.5 18Z"
              fill="white"
            />
          </g>
        </svg>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "-37px",
          left: "calc(50% - 39.5px)",
          width: "0px",
          height: "0px",
          display: "block"
        }}
      >
        <svg
          width="79"
          height="79"
          viewBox="0 0 79 79"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_563_161)">
            <path
              d="M39.5 18L40.8789 36.1211L59 37.5L40.8789 38.8789L39.5 57L38.1211 38.8789L20 37.5L38.1211 36.1211L39.5 18Z"
              fill="white"
            />
          </g>
        </svg>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "-37px",
          left: "calc(84% - 39.5px)",
          width: "0px",
          height: "0px",
          display: "block"
        }}
      >
        <svg
          width="79"
          height="79"
          viewBox="0 0 79 79"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_563_161)">
            <path
              d="M39.5 18L40.8789 36.1211L59 37.5L40.8789 38.8789L39.5 57L38.1211 38.8789L20 37.5L38.1211 36.1211L39.5 18Z"
              fill="white"
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
};

const Progress = ({
  teamScore, maxScore, onCharacterSubmit, setAnswered, disabled
}) => {
  return (
    <>
      <Box
        sx={{
          width: "1000px",
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          flexDirection: "row",
          marginTop: "40px"
        }}
      >
        {/* Percentage on the left */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <Percentage teamScore={teamScore} maxScore={maxScore} />
        </Box>

        {/* ProgressBar and CharacterInput stacked vertically */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <CharacterInput onSubmit={onCharacterSubmit} setAnswered={setAnswered} disabled={disabled} />
          <ProgressBar teamScore={teamScore} maxScore={maxScore} />
        </Box>
      </Box>
      {/* White Divider Line */}
      <Divider />
    </>
  );
};

export default Progress;
