import React from "react";
import {
  Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button
} from "@material-ui/core";

const Quiz = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Welcome to the Quiz Page</Typography>
      <p>Answer the questions below:</p>

      {/* Quiz 1 */}
      <div style={{
        marginBottom: "20px"
      }}>
        <Typography variant="h6">Quiz 1: What is the capital of France?</Typography>
        <FormControl component="fieldset">
          <RadioGroup name="quiz1">
            <FormControlLabel value="a" control={<Radio />} label="A) Berlin" />
            <FormControlLabel value="b" control={<Radio />} label="B) Madrid" />
            <FormControlLabel value="c" control={<Radio />} label="C) Paris" />
            <FormControlLabel value="d" control={<Radio />} label="D) Rome" />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Quiz 2 */}
      <div style={{
        marginBottom: "20px"
      }}>
        <Typography variant="h6">Quiz 2: Which planet is known as the Red Planet?</Typography>
        <FormControl component="fieldset">
          <RadioGroup name="quiz2">
            <FormControlLabel value="a" control={<Radio />} label="A) Earth" />
            <FormControlLabel value="b" control={<Radio />} label="B) Mars" />
            <FormControlLabel value="c" control={<Radio />} label="C) Jupiter" />
            <FormControlLabel value="d" control={<Radio />} label="D) Venus" />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Quiz 3 */}
      <div style={{
        marginBottom: "20px"
      }}>
        <Typography variant="h6">Quiz 3: What is the largest ocean on Earth?</Typography>
        <FormControl component="fieldset">
          <RadioGroup name="quiz3">
            <FormControlLabel value="a" control={<Radio />} label="A) Atlantic Ocean" />
            <FormControlLabel value="b" control={<Radio />} label="B) Indian Ocean" />
            <FormControlLabel value="c" control={<Radio />} label="C) Arctic Ocean" />
            <FormControlLabel value="d" control={<Radio />} label="D) Pacific Ocean" />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={() => alert("Quiz Submitted!")}>
        Submit Answers
      </Button>
    </div>
  );
};

export default Quiz;
