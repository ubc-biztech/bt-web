import React from "react";
import { Container, Paper } from "@material-ui/core";
import ImagePlaceholder from "../../../assets/placeholder.jpg";
import QuestionPreview from "./components/QuestionPreview";

// Styling custom Components
const styles = {
  // Above the paper/dynamic form
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header1: {
    color: "white",
  },
  // Container for custom form image
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
  // Sections (divides image / basic info / custom questions)
  basicInfoSection: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  // Add question (bottom of the dynamic form)
  addQuestion: {
    display: "flex",
    justifyContent: "center",
  },
  // Preview pane
  preview: {
    marginTop: -80,
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "100px 0",
  },
  // Editor pane
  editor: {
    background: "#172037",
    marginTop: -80,
    height: "100vh",
    overflowY: "auto",
  },
  editorDivider: {
    width: "100%",
    height: 1,
    background: "#1F2A47",
  },
  editorSection: {
    padding: "1rem",
  },
  editorHeadmast: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editorTitle: {
    marginTop: 0,
    fontSize: "1.2rem",
    paddingTop: "1rem",
    color: "#FFFFFF",
  },
  editorSectionTitle: {
    color: "#FFFFFF",
    opacity: "0.63",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

// Reg form styles (for use on Register page)
const formStyles = {
  section: {
    padding: "1rem 2rem",
  },
  divider: {
    borderStyle: "none none solid none",
    borderWidth: "1px",
    borderColor: "#1F2A47",
  },
};

const FormCreatePreview = (props) => {
  const { imageUrl, eventName, description, questionsData } = props;

  const basicQuestions = [
    {
      type: "TEXT",
      label: "Email Address",
      choices: "",
      required: true
    },
    {
      type: "TEXT",
      label: "First Name",
      choices: "",
      required: true
    },
    {
      type: "TEXT",
      label: "Last Name",
      choices: "",
      required: true
    },
    {
      type: "SELECT",
      label: "Year Level",
      choices: "1st Year,2nd Year,3rd Year,4th Year,5+ Year,Other,Not Applicable",
      required: true,
    },
    {
      type: "SELECT",
      label: "Faculty",
      choices: "Arts,Commerce,Science,Engineering,Kinesiology,Land and Food Systems,Forestry,Other,Not Applicable",
      required: true,
    },
    {
      type: "TEXT",
      label: "Major/Specialization",
      choices: "",
      required: true,
    },
    {
      type: "SELECT",
      label: "Pronouns",
      choices: "He/Him/His,She/Her/Hers,They/Them/Their,Other/Prefer not to say",
      required: true,
    },
    {
      type: "SELECT",
      label: "How did you hear about this event?",
      choices: "Boothing,Facebook,Instagram,LinkedIn,Friends/Word of Mouth,BizTech Newsletter,Other",
      required: true,
    },
  ]

  const allQuestions = basicQuestions.concat(questionsData)

  const displayQuestions = allQuestions.map((question, index) => {
    return (
      <QuestionPreview
        key={index}
        type={question.type}
        label={question.label}
        choices={question.choices}
        required={question.required}
      />
    );
  });

  return (
    <div style={styles.preview} className="discrete-scrollbar">
      <Container maxWidth="sm">
        <Paper>
          {/* Image */}
          <div style={styles.imageContainer}>
            <img
              style={styles.image}
              src={imageUrl || ImagePlaceholder}
              alt="Registration Form"
            />
          </div>
          {(eventName || description) && (
            <div style={{ ...formStyles.section, ...formStyles.divider }}>
              <h2 style={{ marginTop: 0 }}>{eventName}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{description.split("<br/>").join("\n")}</p>
            </div>
          )}
          <div style={formStyles.section}>{displayQuestions}</div>
        </Paper>
      </Container>
    </div>
  );
};

export default FormCreatePreview;
