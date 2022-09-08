import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import CloudUpload from '@material-ui/icons/CloudUpload';
import ImagePlaceholder from "../../../../assets/placeholder.jpg";

const styles = {
  imageContainer: {
    boxSizing: "border-box",
    padding: "1rem",
    display: "flex",
    justifyContent: "stretch",
    position: "relative",
  },
  image: {
    background: "#EEEEEE",
    borderRadius: 5,
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
}

// LIVE PREVIEW QUESTION component
const QuestionPreview = (props) => {
  const useStyles = makeStyles((theme) => ({
    textfield: {
      background: "#1F2A47",
      borderRadius: 10,
    },
    select: {
      background: "#1F2A47",
      borderRadius: 10,
    },
    uploadedFile: {
      marginBottom: 12,
    },
  }));
  const classes = useStyles();

  const { type, label, choices, questionImageUrl, required } = props;

  const choicesArr = choices ? choices.split(",") : [];

  // types: CHECKBOX, SELECT, TEXT
  if (type === "CHECKBOX") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          {questionImageUrl && (
            <div style={styles.imageContainer}>
              <img
                style={styles.image}
                src={questionImageUrl || ImagePlaceholder}
                alt="Registration Form"
              />
            </div>
          )}
          <FormGroup>
            {choicesArr.map((item) => {
              return (
                <FormControlLabel
                  key={item}
                  control={<Checkbox color="primary" />}
                  label={item}
                />
              );
            })}
          </FormGroup>
        </div>
      )
    );
  } else if (type === "SELECT") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          {questionImageUrl && (
            <div style={styles.imageContainer}>
              <img
                style={styles.image}
                src={questionImageUrl || ImagePlaceholder}
                alt="Registration Form"
              />
            </div>
          )}
          <Select
            className={classes.select}
            labelId="q-type"
            variant="outlined"
            margin="dense"
          >
            {choicesArr.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      )
    );
  } else if (type === "TEXT") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          {questionImageUrl && (
            <div style={styles.imageContainer}>
              <img
                style={styles.image}
                src={questionImageUrl || ImagePlaceholder}
                alt="Registration Form"
              />
            </div>
          )}
          <TextField
            className={classes.textfield}
            fullWidth
            multiline
            margin="dense"
            variant="outlined"
          />
        </div>
      )
    );
  } else if (type === "UPLOAD") {
    return (
      label && (
        <div style={{ paddingBottom: "1.5rem" }}>
          <p style={{ opacity: "0.7", fontSize: "1rem", margin: "0.5rem 0" }}>
            {label}
            {label && required && "*"}
          </p>
          {questionImageUrl && (
            <div style={styles.imageContainer}>
              <img
                style={styles.image}
                src={questionImageUrl || ImagePlaceholder}
                alt="Registration Form"
              />
            </div>
          )}
          <Typography className={classes.uploadedFile}>
            No file uploaded yet!
          </Typography>
          <Button variant="contained" color="primary" component="label">
            Upload
            <CloudUpload style={{ color: "black", marginLeft: 6 }}/>
          </Button>
        </div>
      )
    );
  } else {
    // Could just default to text but just in case
    return <div>Invalid question type</div>;
  }
};

export default QuestionPreview;
