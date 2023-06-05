import React from "react";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  Checkbox, MenuItem, Select, TextField, Tooltip
} from "@material-ui/core";
import {
  Delete, KeyboardArrowDown, KeyboardArrowUp
} from "@material-ui/icons";
import {
  useFormikContext
} from "formik";

// Styling Material UI Components
const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      margin: "auto"
    }
  },
  content: {
    padding: theme.spacing(3)
  },
  fab: {
    marginBottom: 0
  },
  button: {
    background: "#7EA4C8",
    color: "#FFFFFF",
    "&:hover": {
      background: "#5D8AB4"
    }
  },
  upDownFab: {
    background: "#172037",
    "&:hover": {
      background: "#11182B"
    }
  }
}));

// EDITOR QUESTION component - made separate component in case want to make a new file
const CustomQuestion = (props) => {
  const classes = useStyles();
  const {
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount
  } = useFormikContext();

  const {
    id, name, index, length
  } = props;

  const {
    type, label, choices, questionImageUrl, charLimit, required
  } = props.data;
  const questionStyles = {
    // -------- QUESTION COMPONENT STYLES ----------
    card: {
      background: "#1F2A47",
      borderRadius: 5,
      padding: "1rem",
      marginBottom: "1rem"
    },
    cardActions: {
      display: "flex",
      alignItems: "center"
    },
    iconsContainer: {
      flexGrow: 2,
      display: "flex",
      justifyContent: "flex-end"
    },
    deleteIcon: {
      borderRadius: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      background: "rgba(0,0,0,0.2)",
      padding: 5,
      "&:hover": {
        background: "rgba(0,0,0,0.5)"
      }
    },
    arrowIcon: {
      height: 16,
      borderRadius: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    },
    move: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    requiredContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      color: "rgba(255,255,255,0.8)"
    }
  };

  const showError = (field) => {
    return Boolean(
      errors.registrationQuestions &&
        errors.registrationQuestions[index] &&
        errors.registrationQuestions[index][field] &&
        ((touched.registrationQuestions &&
          touched.registrationQuestions[index] &&
          touched.registrationQuestions[index][field]) ||
          submitCount > 0)
    );
  };

  return (
    <div style={questionStyles.card}>
      <div style={questionStyles.cardActions}>
        <Select
          id={`${id}.type`}
          name={`${id}.type`}
          className={classes.select}
          labelId="q-type"
          variant="outlined"
          margin="dense"
          value={type}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <MenuItem value="TEXT">Text</MenuItem>
          <MenuItem value="CHECKBOX">Checkbox</MenuItem>
          <MenuItem value="SELECT">Selection</MenuItem>
          <MenuItem value="UPLOAD">Upload</MenuItem>
        </Select>
        <div style={questionStyles.iconsContainer}>
          <div style={questionStyles.move}>
            {!(index === 0) && (
              <div
                style={questionStyles.arrowIcon}
                onClick={() => props.fnMove(index - 1, index)}
              >
                <KeyboardArrowUp />
              </div>
            )}
            {!(index === length - 1) && (
              <div
                style={questionStyles.arrowIcon}
                onClick={() => props.fnMove(index, index + 1)}
              >
                <KeyboardArrowDown />
              </div>
            )}
          </div>
          <div
            style={questionStyles.deleteIcon}
            onClick={() => props.fnDelete(index)}
          >
            <Delete />
          </div>
        </div>
      </div>
      <div>
        <TextField
          id={`${id}.label`}
          name={`${name}.label`}
          label="Question"
          fullWidth
          required
          margin="normal"
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("label")}
          helperText={
            showError("label") && errors.registrationQuestions[index].label
          }
          value={label}
        />
        <TextField
          id={`${id}.questionImageUrl`}
          name={`${name}.questionImageUrl`}
          label="Question Image URL"
          fullWidth
          margin="normal"
          variant="filled"
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("questionImageUrl")}
          helperText={
            showError("questionImageUrl") &&
            errors.registrationQuestions[index].questionImageUrl
          }
          value={questionImageUrl}
        />
        {(type === "TEXT") && (
          <Tooltip title="If the character limit is left blank, there will be no limit." arrow>
            <TextField
              id={`${id}.charLimit`}
              name={`${name}.charLimit`}
              label="Character Limit"
              fullWidth
              margin="normal"
              variant="filled"
              onChange={handleChange}
              type="number"
              onBlur={handleBlur}
              error={showError("charLimit")}
              helperText={
                showError("charLimit") &&
                errors.registrationQuestions[index].charLimit
              }
              value={charLimit}
            />
          </Tooltip>
        )}

        {(type === "SELECT" || type === "CHECKBOX") && (
          <TextField
            id={`${id}.choices`}
            name={`${name}.choices`}
            label="Options"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("choices")}
            helperText={
              showError("choices") &&
              errors.registrationQuestions[index].choices
            }
            value={choices}
          />
        )}

        <div style={questionStyles.requiredContainer}>
          Required?
          <Checkbox
            id={`${id}.required`}
            name={`${name}.required`}
            color="primary"
            aria-label="Required question?"
            checked={required}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomQuestion;
