import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, MenuItem, Select, TextField } from "@material-ui/core";
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

// Styling Material UI Components
const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      margin: "auto",
    },
  },
  content: {
    padding: theme.spacing(3),
  },
  fab: {
    marginBottom: 0,
  },
  button: {
    background: "#7EA4C8",
    color: "#FFFFFF",
    "&:hover": {
      background: "#5D8AB4",
    },
  },
  upDownFab: {
    background: "#172037",
    "&:hover": {
      background: "#11182B",
    },
  },
}));

// EDITOR QUESTION component - made separate component in case want to make a new file
const CustomQuestion = (props) => {
  const classes = useStyles();

  const index = props.index;
  const length = props.length; // the length of entire questions array

  const [type, setType] = useState(props.data.type ? props.data.type : "");
  const [label, setLabel] = useState(props.data.label ? props.data.label : "");
  const [choices, setChoices] = useState(
    props.data.choices ? props.data.choices : ""
  );
  const [required, setRequired] = useState(
    props.data.required ? props.data.required : false
  );

  const questionStyles = {
    // -------- QUESTION COMPONENT STYLES ----------
    card: {
      background: "#1F2A47",
      borderRadius: 5,
      padding: "1rem",
      marginBottom: "1rem",
    },
    cardActions: {
      display: "flex",
      alignItems: "center",
    },
    iconsContainer: {
      flexGrow: 2,
      display: "flex",
      justifyContent: "flex-end",
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
        background: "rgba(0,0,0,0.5)",
      },
    },
    arrowIcon: {
      height: 16,
      borderRadius: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    move: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    requiredContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      color: "rgba(255,255,255,0.8)",
    },
  };

  useEffect(() => {
    setType(props.data.type);
    setLabel(props.data.label);
    setChoices(props.data.choices);
    setRequired(props.data.required);
  }, [props.data]);

  const handleEditQuestionType = (e) => {
    props.fnEdit(index, "type", e.target.value);
    if (e.target.value === "TEXT") {
      props.fnEdit(index, "choices", ""); // Clear options
      setChoices("");
    }
    setType(e.target.value);
  };

  const handleEditQuestionLabel = (e) => {
    props.fnEdit(index, "label", e.target.value);
    setLabel(e.target.value);
  };

  const handleEditChoices = (e) => {
    props.fnEdit(index, "choices", e.target.value);
    setChoices(e.target.value);
  };

  const handleEditRequired = (e) => {
    props.fnEdit(index, "required", e.target.checked);
    setRequired(e.target.checked);
  };

  return (
    <div style={questionStyles.card}>
      <div style={questionStyles.cardActions}>
        <Select
          className={classes.select}
          labelId="q-type"
          variant="outlined"
          margin="dense"
          value={type}
          onChange={handleEditQuestionType}
        >
          <MenuItem value="TEXT">Text</MenuItem>
          <MenuItem value="CHECKBOX">Checkbox</MenuItem>
          <MenuItem value="SELECT">Selection</MenuItem>
        </Select>
        <div style={questionStyles.iconsContainer}>
          <div style={questionStyles.move}>
            {!(index === 0) && (
              <div
                style={questionStyles.arrowIcon}
                onClick={() => props.fnMove(index, "up")}
              >
                <KeyboardArrowUp />
              </div>
            )}
            {!(index === length - 1) && (
              <div
                style={questionStyles.arrowIcon}
                onClick={() => props.fnMove(index, "down")}
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
          label="Question"
          fullWidth
          required
          margin="normal"
          variant="filled"
          onChange={handleEditQuestionLabel}
          value={label}
        />

        {(type === "SELECT" || type === "CHECKBOX") && (
          <TextField
            label="Options"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={handleEditChoices}
            value={choices}
          />
        )}

        <div style={questionStyles.requiredContainer}>
          Required?
          <Checkbox
            color="primary"
            aria-label="Required question?"
            checked={required}
            onChange={handleEditRequired}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomQuestion;
