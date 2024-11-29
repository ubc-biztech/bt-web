import React, {
  useState
} from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import {
  ReactComponent as LeftArrowIcon
} from "../../../../assets/leftarrow.svg";
import {
  ReactComponent as RightArrowIcon
} from "../../../../assets/rightarrow.svg";
import {
  COLORS
} from "../../../../constants/_constants/theme";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  makeStyles
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import QuestionsBox from "./QuestionsBox";
import {
  IconButton
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "15px 10px 15px 0px",
    backgroundColor: "#293B61",
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: COLORS.BACKGROUND_COLOR,
    },
    paddingBottom: "12px",
    marginTop: "60px",
  },
  content: {
    padding: theme.spacing(3),
  },
  navigateButton: {
    fontSize: "large",
  },
  questionsDropDown: {
    display: "flex",
    justifyContent: "center",
  },
  questionScrollBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  numResponses: {
    color: "#AEC4F4",
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "bold",
  },
  underline: {
    "&:before": {
      borderBottom: "1px solid white"
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: `2px solid ${COLORS.BIZTECH_GREEN}`
    },
    "&:after": {
      borderBottom: "1px solid white"
    }
  },
  disabled: {
  },
  focused: {
  },
  error: {
  }
}));

const StyledOption = styled.option`
  background-color: #293B61 !important
`;

const Questions = (props) => {
  const classes = useStyles();

  const [questionIndex, setQuestionIndex] = useState(0);

  const handleQuestionChange = (event) => {
    setQuestionIndex(parseInt(event.target.value));
  };

  const handleNavigateBefore = () => {
    questionIndex === 0
      ? setQuestionIndex(10)
      : setQuestionIndex(questionIndex * 1 - 1);
  };

  const handleNavigateAfter = () => {
    questionIndex === 10
      ? setQuestionIndex(0)
      : setQuestionIndex(questionIndex * 1 + 1);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.content}>
        <Box
          className={classes.numResponses}
          color="#AEC4F4"
          fontFamily="Gilroy"
          fontStyle="normal"
          fontWeight="bold"
          fontSize="26px"
        >
          {props.membershipData.length} Responses
        </Box>

        <div className={classes.questionScrollBox}>
          <IconButton
            className={classes.navigateButton}
            onClick={handleNavigateBefore}
          >
            <LeftArrowIcon />
          </IconButton>
          <div>
            <Box mx={2} px={4}>
              <Card className={classes.card}>
                <Box py={2} px={4} className={classes.questionsDropDown}>
                  <FormControl>
                    <NativeSelect
                      value={questionIndex}
                      onChange={handleQuestionChange}
                      name="questions"
                      className={classes.underline}
                      inputProps={{
                        "aria-label": "questions",
                        style: {
                          backgroundColor: "#293B61",
                          fontSize: 16,
                          fontWeight: "bold",
                          fontFamily: "Gilroy",
                          textAlignLast: "center"
                        },
                      }}
                    >
                      <StyledOption value={0}>
                        Please choose the option that's most relevant to you
                      </StyledOption>
                      <StyledOption value={1}>Preferred Pronouns</StyledOption>
                      <StyledOption value={2}>Level of study</StyledOption>
                      <StyledOption value={3}>Faculty</StyledOption>
                      <StyledOption value={4}>Major</StyledOption>
                      <StyledOption value={5}>
                        Are you an international student?
                      </StyledOption>
                      <StyledOption value={6}>
                        Any dietary restrictions?
                      </StyledOption>
                      <StyledOption value={7}>
                        Were you a BizTech member last year?
                      </StyledOption>
                      <StyledOption value={8}>
                        What topics do you want to see discussed in future events?
                      </StyledOption>
                      <StyledOption value={9}>How did you hear about us?</StyledOption>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Card>
            </Box>
          </div>
          <IconButton
            className={classes.navigateButton}
            onClick={handleNavigateAfter}
          >
            <RightArrowIcon />
          </IconButton>
        </div>
        {/* Education */}
        {questionIndex === 0 && (
          <Box px={4}>
            <QuestionsBox
              title="I am a current/prospective UBC student"
              filter={
                props.membershipData?.filter((x) => x?.education === "UBC").length
              }
            />
            <QuestionsBox
              title="I am a current/prospective university student"
              filter={
                props.membershipData?.filter((x) => x?.education === "UNI").length
              }
            />
            <QuestionsBox
              title="I am a high school student"
              filter={
                props.membershipData?.filter((x) => x?.education === "HS").length
              }
            />
            <QuestionsBox
              title="None of the above"
              filter={
                props.membershipData?.filter((x) => x?.education === "NA").length
              }
            />
          </Box>
        )}
        {/* Preferred Pronouns */}
        {questionIndex === 1 && (
          <Box px={4}>
            <QuestionsBox
              title="He/Him/His"
              filter={
                props.membershipData?.filter((x) => x?.education === "He/Him/His").length
              }
            />
            <QuestionsBox
              title="She/Her/Hers"
              filter={
                props.membershipData?.filter((x) => x?.education === "She/Her/Hers").length
              }
            />
            <QuestionsBox
              title="They/Them/Their"
              filter={
                props.membershipData?.filter((x) => x?.education === "They/Them/Their").length
              }
            />
            <QuestionsBox
              title="Other/Prefer not to say"
              filter={
                props.membershipData?.filter((x) => x?.education === "Other/Prefer not to say").length
              }
            />
          </Box>
        )}
        {/* Year */}
        {questionIndex === 2 && (
          <Box px={4}>
            <QuestionsBox
              title="1st Year"
              filter={props.membershipData?.filter((x) => x?.year === "1st Year").length}
            />
            <QuestionsBox
              title="2nd Year"
              filter={props.membershipData?.filter((x) => x?.year === "2nd Year").length}
            />
            <QuestionsBox
              title="3rd Year"
              filter={props.membershipData?.filter((x) => x?.year === "3rd Year").length}
            />
            <QuestionsBox
              title="4th Year"
              filter={props.membershipData?.filter((x) => x?.year === "4th Year").length}
            />
            <QuestionsBox
              title="5+ Year"
              filter={
                props.membershipData?.filter((x) => x?.year === "5+ Year").length
              }
            />
            <QuestionsBox
              title="Pre-university"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x?.year === "Grade 9" ||
                    x?.year === "Grade 10" ||
                    x?.year === "Grade 11" ||
                    x?.year === "Grade 12" ||
                    x?.year === "Pre-university"
                ).length
              }
            />
            <QuestionsBox
              title="Other/Not Applicable"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x?.year === "Other" ||
                    x?.year === ""
                ).length
              }
            />
          </Box>
        )}
        {/* Faculty */}
        {questionIndex === 3 && (
          <Box px={4}>
            <QuestionsBox
              title="Commerce"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Commerce")
                  .length
              }
            />
            <QuestionsBox
              title="Science"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Science")
                  .length
              }
            />
            <QuestionsBox
              title="Arts"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Arts").length
              }
            />
            <QuestionsBox
              title="Engineering"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Engineering")
                  .length
              }
            />
            <QuestionsBox
              title="LFS"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Land and Food Systems").length
              }
            />
            <QuestionsBox
              title="Kinesiology"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Kinesiology")
                  .length
              }
            />
            <QuestionsBox
              title="Forestry"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Forestry")
                  .length
              }
            />
            <QuestionsBox
              title="Other/Not Applicable"
              filter={
                props.membershipData?.filter((x) => x?.faculty === "Other" || x?.faculty === "Not Applicable")
                  .length
              }
            />
          </Box>
        )}
        {/* Major */}
        {questionIndex === 4 && (
          <Box px={4}>
            <QuestionsBox
              title="Computer Science"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x.major?.toLowerCase().includes("computer science") ||
                    x.major?.toLowerCase().includes("compsci") ||
                    x.major?.toLowerCase() === "cs" ||
                    x.major?.toLowerCase() === "cpsc"
                ).length
              }
            />
            <QuestionsBox
              title="Undeclared"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x.major?.toLowerCase().includes("undeclared") ||
                    x.major?.toLowerCase().includes("undecided") ||
                    x.major?.toLowerCase().includes("n/a") ||
                    x.major?.toLowerCase().includes("yet") ||
                    x.major?.toLowerCase().includes("not")
                ).length
              }
            />
            <QuestionsBox
              title="BTM"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x.major?.toLowerCase().includes("btm") ||
                    x.major?.toLowerCase()
                      .includes("business technology management")
                ).length
              }
            />
            <QuestionsBox
              title="BUCS"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x.major?.toLowerCase().includes("bucs") ||
                    x.major?.toLowerCase()
                      .includes("business and computer science")
                ).length
              }
            />
            <QuestionsBox
              title="Finance"
              filter={
                props.membershipData?.filter((x) =>
                  x.major?.toLowerCase().includes("finance")
                ).length
              }
            />
            <QuestionsBox
              title="Marketing"
              filter={
                props.membershipData?.filter((x) =>
                  x.major?.toLowerCase().includes("marketing")
                ).length
              }
            />
            <QuestionsBox
              title="COGS"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x.major?.toLowerCase().includes("cogs") ||
                    x.major?.toLowerCase().includes("cognitive systems")
                ).length
              }
            />
            <QuestionsBox
              title="Accounting"
              filter={
                props.membershipData?.filter((x) =>
                  x.major?.toLowerCase().includes("accounting")
                ).length
              }
            />
            <QuestionsBox
              title="Electrical Engineering"
              filter={
                props.membershipData?.filter((x) =>
                  x.major?.toLowerCase().includes("electrical")
                ).length
              }
            />
            <QuestionsBox
              title="OPLOG"
              filter={
                props.membershipData?.filter(
                  (x) =>
                    x.major?.toLowerCase().includes("oplog") ||
                    x.major?.toLowerCase().includes("operations") ||
                    x.major?.toLowerCase().includes("logistics")
                ).length
              }
            />
          </Box>
        )}
        {/* International */}
        {questionIndex === 5 && (
          <Box px={4}>
            <QuestionsBox
              title="Yes"
              filter={props.membershipData?.filter((x) => x?.international === "Yes").length}
            />
            <QuestionsBox
              title="No"
              filter={props.membershipData?.filter((x) => x?.international === "No").length}
            />
          </Box>
        )}
        {/* Diet */}
        {questionIndex === 6 && (
          <Box px={4}>
            <QuestionsBox
              title="None"
              filter={props.membershipData?.filter((x) => x?.diet === "None").length}
            />
            <QuestionsBox
              title="Vegetarian"
              filter={props.membershipData?.filter((x) => x?.diet === "Vegetarian").length}
            />
            <QuestionsBox
              title="Vegan"
              filter={props.membershipData?.filter((x) => x?.diet === "Vegan").length}
            />
            <QuestionsBox
              title="Gluten Free"
              filter={props.membershipData?.filter((x) => x?.diet === "Gluten Free").length}
            />
            <QuestionsBox
              title="Pescetarian"
              filter={props.membershipData?.filter((x) => x?.diet === "Pescetarian").length}
            />
            <QuestionsBox
              title="Kosher"
              filter={props.membershipData?.filter((x) => x?.diet === "Kosher").length}
            />
            <QuestionsBox
              title="Halal"
              filter={props.membershipData?.filter((x) => x?.diet === "Halal").length}
            />
          </Box>
        )}
        {/* Member Last Year */}
        {questionIndex === 7 && (
          <Box px={4}>
            <QuestionsBox
              title="Yes"
              filter={
                props.membershipData?.filter((x) => x?.prevMember === "Yes").length
              }
            />
            <QuestionsBox
              title="No"
              filter={
                props.membershipData?.filter((x) => x?.prevMember === "No").length
              }
            />
          </Box>
        )}
        {/* Topics */}
        {questionIndex === 8 && (
          <Box px={4}>
            <QuestionsBox
              title="Careers in Tech"
              filter={
                props.membershipData?.filter((x) =>
                  x.topics?.includes("Careers in the Tech Industry")
                ).length
              }
            />
            <QuestionsBox
              title="Tech Startups"
              filter={
                props.membershipData?.filter((x) =>
                  x.topics?.includes("Tech Startups")
                ).length
              }
            />
            <QuestionsBox
              title="AI"
              filter={
                props.membershipData?.filter((x) => x.topics?.includes("AI"))
                  .length
              }
            />
            <QuestionsBox
              title="eCommerce"
              filter={
                props.membershipData?.filter((x) =>
                  x.topics?.includes("eCommerce")
                ).length
              }
            />
            <QuestionsBox
              title="Cyber Security"
              filter={
                props.membershipData?.filter((x) =>
                  x.topics?.includes("Cyber Security")
                ).length
              }
            />
            <QuestionsBox
              title="Health Tech"
              filter={
                props.membershipData?.filter((x) =>
                  x.topics?.includes("Health Tech")
                ).length
              }
            />
          </Box>
        )}
        {/* heardFrom */}
        {questionIndex === 9 && (
          <Box px={4}>
            <QuestionsBox
              title="Facebook"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Facebook")
                  .length
              }
            />
            <QuestionsBox
              title="Friends/Word of Mouth"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Friends/Word of Mouth")
                  .length
              }
            />
            <QuestionsBox
              title="Events"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Events")
                  .length
              }
            />
            <QuestionsBox
              title="Instagram"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Instagram")
                  .length
              }
            />
            <QuestionsBox
              title="LinkedIn"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "LinkedIn")
                  .length
              }
            />
            <QuestionsBox
              title="Boothing"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Boothing")
                  .length
              }
            />
            <QuestionsBox
              title="BizTech Newsletter"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "BizTech Newsletter")
                  .length
              }
            />
            <QuestionsBox
              title="Faculty Newsletter"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Faculty Newsletter")
                  .length
              }
            />
            <QuestionsBox
              title="Posters"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Posters")
                  .length
              }
            />
            <QuestionsBox
              title="Other"
              filter={
                props.membershipData?.filter((x) => x?.heardFrom === "Other")
                  .length
              }
            />
          </Box>
        )}
      </div>
    </Paper>
  );
};

export default Questions;
