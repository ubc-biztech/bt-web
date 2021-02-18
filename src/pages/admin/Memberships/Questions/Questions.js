import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { ReactComponent as LeftArrowIcon } from "../../../../assets/leftarrow.svg";
import { ReactComponent as RightArrowIcon } from "../../../../assets/rightarrow.svg";
import { COLORS } from "../../../../constants/_constants/theme";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import QuestionsBox from "./QuestionsBox";
import { IconButton } from "@material-ui/core";

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
  disabled: {},
  focused: {},
  error: {}
}));

const StyledOption = styled.option`
  background-color: #293B61 !important
`;

const Questions = (props) => {
  const classes = useStyles();

  const [questionIndex, setQuestionIndex] = useState(0);
  console.log(questionIndex)


  const handleQuestionChange = (event) => {
    setQuestionIndex(parseInt(event.target.value));
  };

  const handleNavigateBefore = () => {
    questionIndex === 0
      ? setQuestionIndex(7)
      : setQuestionIndex(questionIndex * 1 - 1);
  };

  const handleNavigateAfter = () => {
    questionIndex === 7
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
                      <StyledOption value={1}>Academic Year Level</StyledOption>
                      <StyledOption value={2}>Faculty</StyledOption>
                      <StyledOption value={3}>Major</StyledOption>
                      <StyledOption value={4}>
                        Were you a BizTech member last year?
                      </StyledOption>
                      <StyledOption value={5}>
                        Are you an international student?
                      </StyledOption>
                      <StyledOption value={6}>
                        What topics did you want to see the most discussed in
                        the future?
                      </StyledOption>
                      <StyledOption value={7}>How did you hear about us?</StyledOption>
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

        {questionIndex === 0 && (
          <Box px={4}>
            <QuestionsBox
              title="I am a current/prospective UBC student"
              filter={
                props.membershipData.filter((x) => x.education === "UBC").length
              }
            />
            <QuestionsBox
              title="I am a current/prospective university student"
              filter={
                props.membershipData.filter((x) => x.education === "UNI").length
              }
            />
            <QuestionsBox
              title="I am a high school student"
              filter={
                props.membershipData.filter((x) => x.education === "HS").length
              }
            />
            <QuestionsBox
              title="None of the above"
              filter={
                props.membershipData.filter((x) => x.education === "NA").length
              }
            />
          </Box>
        )}

        {questionIndex === 1 && (
          <Box px={4}>
            <QuestionsBox
              title="Year 1"
              filter={props.membershipData.filter((x) => x.year === "1").length}
            />
            <QuestionsBox
              title="Year 2"
              filter={props.membershipData.filter((x) => x.year === "2").length}
            />
            <QuestionsBox
              title="Year 3"
              filter={props.membershipData.filter((x) => x.year === "3").length}
            />
            <QuestionsBox
              title="Year 4"
              filter={props.membershipData.filter((x) => x.year === "4").length}
            />
            <QuestionsBox
              title="Year 5+"
              filter={
                props.membershipData.filter((x) => x.year === "5+").length
              }
            />
            <QuestionsBox
              title="Pre-University"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.year === "Grade 10" ||
                    x.year === "Grade 11" ||
                    x.year === "Grade 12" ||
                    x.year === "Pre-University"
                ).length
              }
            />
          </Box>
        )}

        {questionIndex === 2 && (
          <Box px={4}>
            <QuestionsBox
              title="Commerce"
              filter={
                props.membershipData.filter((x) => x.faculty === "Commerce")
                  .length
              }
            />
            <QuestionsBox
              title="Sciences"
              filter={
                props.membershipData.filter((x) => x.faculty === "Sciences")
                  .length
              }
            />
            <QuestionsBox
              title="Arts"
              filter={
                props.membershipData.filter((x) => x.faculty === "Arts").length
              }
            />
            <QuestionsBox
              title="Engineering"
              filter={
                props.membershipData.filter((x) => x.faculty === "Engineering")
                  .length
              }
            />
            <QuestionsBox
              title="LFS"
              filter={
                props.membershipData.filter((x) => x.faculty === "LFS").length
              }
            />
            <QuestionsBox
              title="Kinesiology"
              filter={
                props.membershipData.filter((x) => x.faculty === "Kinesiology")
                  .length
              }
            />
          </Box>
        )}

        {questionIndex === 3 && (
          <Box px={4}>
            <QuestionsBox
              title="Computer Science"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.major.toLowerCase().includes("computer science") ||
                    x.major.toLowerCase().includes("compsci") ||
                    x.major.toLowerCase() === "cs" ||
                    x.major.toLowerCase() === "cpsc"
                ).length
              }
            />
            <QuestionsBox
              title="Undeclared"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.major.toLowerCase().includes("undeclared") ||
                    x.major.toLowerCase().includes("undecided") ||
                    x.major.toLowerCase().includes("n/a") ||
                    x.major.toLowerCase().includes("yet") ||
                    x.major.toLowerCase().includes("not")
                ).length
              }
            />
            <QuestionsBox
              title="BTM"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.major.toLowerCase().includes("btm") ||
                    x.major
                      .toLowerCase()
                      .includes("business technology management")
                ).length
              }
            />
            <QuestionsBox
              title="BUCS"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.major.toLowerCase().includes("bucs") ||
                    x.major
                      .toLowerCase()
                      .includes("business and computer science")
                ).length
              }
            />
            <QuestionsBox
              title="Finance"
              filter={
                props.membershipData.filter((x) =>
                  x.major.toLowerCase().includes("finance")
                ).length
              }
            />
            <QuestionsBox
              title="Marketing"
              filter={
                props.membershipData.filter((x) =>
                  x.major.toLowerCase().includes("marketing")
                ).length
              }
            />
            <QuestionsBox
              title="COGS"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.major.toLowerCase().includes("cogs") ||
                    x.major.toLowerCase().includes("cognitive systems")
                ).length
              }
            />
            <QuestionsBox
              title="Accounting"
              filter={
                props.membershipData.filter((x) =>
                  x.major.toLowerCase().includes("accounting")
                ).length
              }
            />
            <QuestionsBox
              title="Electrical Engineering"
              filter={
                props.membershipData.filter((x) =>
                  x.major.toLowerCase().includes("electrical")
                ).length
              }
            />
            <QuestionsBox
              title="OPLOG"
              filter={
                props.membershipData.filter(
                  (x) =>
                    x.major.toLowerCase().includes("oplog") ||
                    x.major.toLowerCase().includes("operations") ||
                    x.major.toLowerCase().includes("logistics")
                ).length
              }
            />
          </Box>
        )}
        {questionIndex === 4 && (
          <Box px={4}>
            <QuestionsBox
              title="Yes"
              filter={props.membershipData.filter((x) => x.prev_member).length}
            />
            <QuestionsBox
              title="No"
              filter={props.membershipData.filter((x) => !x.prev_member).length}
            />
          </Box>
        )}
        {questionIndex === 5 && (
          <Box px={4}>
            <QuestionsBox
              title="Yes"
              filter={
                props.membershipData.filter((x) => x.international).length
              }
            />
            <QuestionsBox
              title="No"
              filter={
                props.membershipData.filter((x) => !x.international).length
              }
            />
          </Box>
        )}
        {questionIndex === 6 && (
          <Box px={4}>
            <QuestionsBox
              title="Careers in Tech"
              filter={
                props.membershipData.filter((x) =>
                  x.topics.includes("Careers in the Tech Industry")
                ).length
              }
            />
            <QuestionsBox
              title="Tech Startups"
              filter={
                props.membershipData.filter((x) =>
                  x.topics.includes("Tech Startups")
                ).length
              }
            />
            <QuestionsBox
              title="AI"
              filter={
                props.membershipData.filter((x) => x.topics.includes("AI"))
                  .length
              }
            />
            <QuestionsBox
              title="eCommerce"
              filter={
                props.membershipData.filter((x) =>
                  x.topics.includes("eCommerce")
                ).length
              }
            />
            <QuestionsBox
              title="Cyber Security"
              filter={
                props.membershipData.filter((x) =>
                  x.topics.includes("Cyber Security")
                ).length
              }
            />
            <QuestionsBox
              title="Health Tech"
              filter={
                props.membershipData.filter((x) =>
                  x.topics.includes("Health Tech")
                ).length
              }
            />
          </Box>
        )}
        {questionIndex === 7 && (
          <Box px={4}>
            <QuestionsBox
              title="Facebook"
              filter={
                props.membershipData.filter((x) => x.heard_from === "Facebook")
                  .length
              }
            />
            <QuestionsBox
              title="Friends"
              filter={
                props.membershipData.filter((x) => x.heard_from === "Friends")
                  .length
              }
            />
            <QuestionsBox
              title="Events"
              filter={
                props.membershipData.filter((x) => x.heard_from === "Events")
                  .length
              }
            />
            <QuestionsBox
              title="Instagram"
              filter={
                props.membershipData.filter((x) => x.heard_from === "Instagram")
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
