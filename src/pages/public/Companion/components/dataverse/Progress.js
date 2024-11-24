import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CharacterInput = ({ onSubmit, numChars = 21 }) => {
    const [chars, setChars] = useState(Array(numChars).fill("")); // Initialize with empty strings
    const [isTyping, setIsTyping] = useState(false); // To track if any character is typed
    const inputRefs = useRef([]);
  
    const placeholderText = "final question answer"; // Your placeholder phrase
  
    useEffect(() => {
      // Dynamically adjust the number of refs based on numChars
      inputRefs.current = inputRefs.current.slice(0, numChars);
    }, [numChars]);
  
    const handleChange = (index, value) => {
      if (value.length <= 1) {
        const newChars = [...chars];
        newChars[index] = value; // Set the current character
        setChars(newChars);
  
        // Set isTyping to true when any input is typed
        if (!isTyping && value !== "") {
          setIsTyping(true);
        }
  
        // Automatically focus on the next input if the current one is filled
        if (index < numChars - 1 && value.length === 1) {
          inputRefs.current[index + 1]?.focus();
        }
  
        // Check if all characters are cleared, reset isTyping to false
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
          newChars[index] = ""; // Clear the current character
          setChars(newChars);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < numChars - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handleSubmit = () => {
      const input = chars.join("");
      if (input.length === numChars) {
        onSubmit(input);
        setChars(Array(numChars).fill("")); // Reset the input fields
        setIsTyping(false); // Reset typing state
        inputRefs.current[0]?.focus(); // Focus the first input
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
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {chars.map((char, index) => {
            // If any input is typed, remove all placeholders; restore if all are cleared
            const placeholderChar = isTyping && !chars.every((char) => char === "") 
              ? "" 
              : placeholderText[index] || "";
  
            return (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={char}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                variant="standard"
                autoComplete="off" // Disable autofill
                inputProps={{
                  maxLength: 1,
                  style: {
                    width: "25px",
                    textAlign: "center",
                    fontFamily: "monospace",
                    fontSize: "1.5rem",
                    padding: "2px 0px",
                    color: "white",
                  },
                }}
                placeholder={placeholderChar} // Set the placeholder as the corresponding character
                sx={{
                  width: "25px",
                  "& .MuiInput-underline:before": {
                    borderBottomWidth: "2px",
                    borderBottomColor: char ? "#ffffff" : "#AAAAAA",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: "#ffffff",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#ffffff",
                  },
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
                color: "#000000",
              },
              marginLeft: 2,
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };
  
  
  

const ProgressBar = ({ teamScore, maxScore }) => {
  const percentage = (teamScore / maxScore) * 100;

  return (
    <div
      style={{
        width: "100%", // Full width
        height: "20px", // Set a fixed height
        borderRadius: "10px", // Rounded edges for the outer container
        backgroundColor: "transparent", // Transparent background for the unfiller portion
        border: "1px solid rgba(255, 255, 255, 0.5)", // Slightly transparent white border
        overflow: "hidden" // Clip the bar if it exceeds container width
      }}
    >
      <div
        style={{
          width: `${percentage}%`, // Fill based on percentage
          height: "100%",
          background: "linear-gradient(to right, #FF00AE, #6CB5FF)", // Gradient background
          borderRadius: "10px", // Rounded edges for the filled portion
          transition: "width 0.3s ease-in-out" // Smooth transition
        }}
      />
    </div>
  );
};

const Percentage = ({ teamScore, maxScore }) => {
  const percentage = Math.round((teamScore / maxScore) * 100); // Round to the nearest percent

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
          fontSize: "3rem", // Make percentage text much bigger
          fontWeight: "bold"
        }}
      >
        {percentage}%
      </span>
      <span
        style={{
          fontSize: "1.5rem", // Make "Completed" text smaller
          color: "#FFFFFF",
          marginLeft: "5px"
        }}
      >
        complete
      </span>
    </div>
  );
};

const Progress = ({ teamScore, maxScore, onCharacterSubmit }) => {
  return (
    <>
      {" "}
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
          <CharacterInput onSubmit={onCharacterSubmit} />
          <ProgressBar teamScore={teamScore} maxScore={maxScore} />
        </Box>
      </Box>
      {/* White Divider Line */}
      <Box
        sx={{
          width: "80%",
          height: "1px",
          backgroundColor: "#FFFFFF",
          marginTop: "50px"
        }}
      />
    </>
  );
};

export default Progress;
