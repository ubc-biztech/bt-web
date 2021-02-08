import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../../../constants/_constants/theme";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Divider from "@material-ui/core/Divider";
import Select from "react-dropdown-select";
import IndividualGrid from "./IndividualGrid";
import IndividualHeaderBox from "./IndividualHeaderBox";
import CheckBoxGrid from "./CheckBoxGrid";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "15px 10px 15px 0px",
    backgroundColor: "#293B61",
    textAlign: "left",
    width: "67vw",
    marginLeft: 25,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 10,
    paddingLeft: 25,
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
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "14px",
    paddingBottom: "14px",
  },
  individualDropDown: {
    background: "#d4e7fa",
    color: COLORS.BACKGROUND_COLOR,
  },
  numResponses: {
    color: "#AEC4F4",
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "bold",
  }
}));

const Individual = (props) => {
  const classes = useStyles();

  const [memberID, setMemberID] = useState(0);

  const selectMemberID = (num) => {
    setMemberID(num);
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
        <Grid container xs={12} align="center">
          <Grid item xs={2}></Grid>
          <Grid item xs={8} align="center">
            <Box paddingTop={1} marginBottom={1}>
              <Select
                className={classes.individualDropDown}
                options={props.membershipData}
                values={[]}
                border={COLORS.BACKGROUND_COLOR}
                color={COLORS.BIZTECH_GREEN}
                marginTop={50}
                placeholder="Enter email to search"
                clearable={true}
                searchBy="email"
                valueField="id"
                labelField="email"
                onChange={(value) => selectMemberID(value.map((x) => x.id)[0])}
              ></Select>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        {/* Type of Member */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="Type of Member" />
            </Grid>

            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.education)}
              condition="UBC"
              label="I am a current/prospective UBC student"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.education)}
              condition="UNI"
              label="I am a current/prospective university student"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.education)}
              condition="HS"
              label="I am a high school student"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.education)}
              condition="NA"
              label="Other"
            />
          </Grid>
        </Card>

        {/* First Name */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <IndividualHeaderBox label="First Name" />
            <Grid item xs={12}>
              <Box
                paddingLeft={1}
                paddingTop={1.5}
                alignItems="left"
                color="FFFFFF"
                fontFamily="Gilroy"
                fontStyle="normal"
                fontWeight="normal"
                fontSize="19px"
              >
                {props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.first_name)}
                <Divider color="DADADA"></Divider>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* Last Name */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <IndividualHeaderBox label="Last Name" />
            <Grid item xs={12}>
              <Box
                paddingLeft={1}
                paddingTop={1.5}
                alignItems="left"
                color="FFFFFF"
                fontFamily="Gilroy"
                fontStyle="normal"
                fontWeight="normal"
                fontSize="19px"
              >
                {props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.last_name)}
                <Divider color="DADADA"></Divider>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* Preferred Pronouns */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="Preferred Pronouns" />
            </Grid>

            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.pronouns)}
              condition="She/Her/Hers"
              label="She/Her/Hers"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.pronouns)}
              condition="He/Him/His"
              label="He/Him/His"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.pronouns)}
              condition="They/Them/Theirs"
              label="They/Them/Theirs"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.pronouns)}
              condition="Prefer not to answer"
              label="Prefer not to answer"
            />

            <Grid item spacing={0} xs={12} container>
              <Grid item xs={1}>
                <IconButton disabled={true}>
                  {props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.pronouns) === "She/Her/Hers" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.pronouns) === "He/Him/His" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.pronouns) === "They/Them/Theirs" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.first_name.length < 1) ? (
                      <RadioButtonUncheckedIcon
                        style={{ color: "C4C4C4", width: 25, height: 25 }}
                      />
                    ) : (
                      <RadioButtonCheckedIcon
                        style={{
                          color: COLORS.BIZTECH_GREEN,
                          width: 25,
                          height: 25,
                        }}
                      />
                    )}
                </IconButton>
              </Grid>
              <Grid item xs={11}>
                <Box
                  paddingTop={1.5}
                  alignItems="left"
                  color="C4C4C4"
                  fontFamily="Gilroy"
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize="19px"
                >
                  Other
                  {props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.pronouns) === "She/Her/Hers" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.pronouns) === "He/Him/His" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.pronouns) === "They/Them/Theirs"
                    ? ""
                    : ": " +
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.pronouns)}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        {/* UBC Student Number */}
        {props.membershipData
          .filter((x) => x.id === memberID)
          .map((x) => x.education) === "UBC" && (
            <Card className={classes.card}>
              <Grid container spacing={0} xs={12}>
                <IndividualHeaderBox label="UBC Student Number" />
                <Grid item xs={12}>
                  <Box
                    paddingLeft={1}
                    paddingTop={1.5}
                    alignItems="left"
                    color="FFFFFF"
                    fontFamily="Gilroy"
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize="19px"
                  >
                    {props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.student_number) !== 0 ? (
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.student_number)
                      ) : (
                        <p></p>
                      )}
                    <Divider color="DADADA"></Divider>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}

        {/* Academic Year Level */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="Academic Year Level" />
            </Grid>

            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.year)}
              condition="1"
              label="Year 1"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.year)}
              condition="2"
              label="Year 2"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.year)}
              condition="3"
              label="Year 3"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.year)}
              condition="4"
              label="Year 4"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.year)}
              condition="5+"
              label="Year 5+"
            />
            <IndividualGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.year) ===
                ("Grade 10" ||
                  "Grade 11" ||
                  "Grade 12" ||
                  "Pre-University") ||
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.education) === "HS"
              }
              condition={true}
              label="Pre-University"
            />

            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.year)}
              condition="Other"
              label="Other"
            />
          </Grid>
        </Card>

        {/* Faculty */}
        {props.membershipData
          .filter((x) => x.id === memberID)
          .map((x) => x.education) === ("UBC" || "UNI") && (
            <Card className={classes.card}>
              <Grid container spacing={0} xs={12}>
                <Grid item xs={12}>
                  <IndividualHeaderBox label="Faculty" />
                </Grid>

                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="Commerce"
                  label="Commerce"
                />
                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="Sciences"
                  label="Sciences"
                />
                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="Engineering"
                  label="Engineering"
                />
                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="Sciences"
                  label="Sciences"
                />
                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="LFS"
                  label="LFS"
                />
                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="Kinesiology"
                  label="Kinesiology"
                />
                <IndividualGrid
                  filter={props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.faculty)}
                  condition="Forestry"
                  label="Forestry"
                />

                <Grid item spacing={0} xs={12} container>
                  <Grid item xs={1}>
                    <IconButton disabled={true}>
                      {props.membershipData
                        .filter((x) => x.id === memberID)
                        .map((x) => x.faculty) === "Commerce" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Sciences" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Arts" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Engineering" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "LFS" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Kinesiology" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Forestry" ? (
                          <RadioButtonUncheckedIcon
                            style={{
                              color: "C4C4C4",
                              width: 25,
                              height: 25,
                            }}
                          />
                        ) : (
                          <RadioButtonCheckedIcon
                            style={{
                              color: COLORS.BIZTECH_GREEN,
                              width: 25,
                              height: 25,
                            }}
                          />
                        )}
                    </IconButton>
                  </Grid>
                  <Grid item xs={11}>
                    <Box
                      paddingTop={1.5}
                      alignItems="left"
                      color="C4C4C4"
                      fontFamily="Gilroy"
                      fontStyle="normal"
                      fontWeight="normal"
                      fontSize="19px"
                    >
                      Other
                    {props.membershipData
                        .filter((x) => x.id === memberID)
                        .map((x) => x.faculty) === "Commerce" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Sciences" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Arts" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Engineering" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "LFS" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Kinesiology" ||
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty) === "Forestry"
                        ? ""
                        : ": " +
                        props.membershipData
                          .filter((x) => x.id === memberID)
                          .map((x) => x.faculty)}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          )}

        {/* Major */}
        {props.membershipData
          .filter((x) => x.id === memberID)
          .map((x) => x.education) === ("UBC" || "UNI") && (
            <Card className={classes.card}>
              <Grid container spacing={0} xs={12}>
                <IndividualHeaderBox label="Major" />
                <Grid item xs={12}>
                  <Box
                    paddingLeft={1}
                    paddingTop={1.5}
                    alignItems="left"
                    color="FFFFFF"
                    fontFamily="Gilroy"
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize="19px"
                  >
                    {props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.major)}
                    <Divider color="DADADA"></Divider>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}

        {/* Were you a BizTech member last year? */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="Were you a BizTech member last year" />
            </Grid>
            <IndividualGrid
              filter={
                props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.prev_member)[0] &&
                props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.first_name).length > 0
              }
              condition={true}
              label="Yes"
            />
            <IndividualGrid
              filter={
                !props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.prev_member)[0] &&
                (props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.first_name).length > 0)
              }
              condition={true}
              label="No"
            />
          </Grid>
        </Card>

        {/* Are you an international student? */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="Are you an international student" />
            </Grid>

            <IndividualGrid
              filter={
                props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.international)[0] &&
                props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.first_name).length > 0
              }
              condition={true}
              label="Yes"
            />
            <IndividualGrid
              filter={
                !props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.international)[0] &&
                props.membershipData
                  .filter(x => x.id === memberID)
                  .map(x => x.first_name).length > 0
              }
              condition={true}
              label="No"
            />
          </Grid>
        </Card>

        {/* What topics do you want to see the most discussed in the future? */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="What topics do you want to see the most discussed in the future?" />
            </Grid>
            <CheckBoxGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.topics)
                  .filter((y) =>
                    ["Cyber Security"].some((topicList) =>
                      y.includes(topicList)
                    )
                  ).length >= 1
              }
              condition={true}
              label="Cyber Security"
            />
            <CheckBoxGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.topics)
                  .filter((y) =>
                    ["AI"].some((topicList) => y.includes(topicList))
                  ).length >= 1
              }
              condition={true}
              label="AI"
            />
            <CheckBoxGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.topics)
                  .filter((y) =>
                    ["Tech Startups"].some((topicList) => y.includes(topicList))
                  ).length >= 1
              }
              condition={true}
              label="Tech Startups"
            />
            <CheckBoxGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.topics)
                  .filter((y) =>
                    ["eCommerce"].some((topicList) => y.includes(topicList))
                  ).length >= 1
              }
              condition={true}
              label="eCommerce"
            />
            <CheckBoxGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.topics)
                  .filter((y) =>
                    ["Health Tech"].some((topicList) => y.includes(topicList))
                  ).length >= 1
              }
              condition={true}
              label="Health Tech"
            />
            <CheckBoxGrid
              filter={
                props.membershipData
                  .filter((x) => x.id === memberID)
                  .map((x) => x.topics)
                  .filter((y) =>
                    ["Careers in the Tech Industry"].some((topicList) =>
                      y.includes(topicList)
                    )
                  ).length >= 1
              }
              condition={true}
              label="Careers in the Tech Industry"
            />

            <Grid item spacing={0} xs={12} container>
              <Grid item xs={1}>
                <IconButton disabled={true}>
                  {props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.topics)
                    .filter(
                      (y) =>
                        ![
                          "Cyber Security",
                          "AI",
                          "Tech Startups",
                          "eCommerce",
                          "Health Tech",
                          "Careers in the Tech Industry",
                        ].some((topicList) => y.includes(topicList))
                    ).length >= 1 ? (
                      <CheckBoxIcon
                        style={{
                          color: COLORS.BIZTECH_GREEN,
                          width: 30,
                          height: 30,
                        }}
                      />
                    ) : (
                      <CheckBoxOutlineBlankIcon
                        style={{ color: "C4C4C4", width: 30, height: 30 }}
                      />
                    )}
                </IconButton>
              </Grid>
              <Grid item xs={11}>
                <Box
                  paddingTop={1.5}
                  alignItems="left"
                  color="FFFFFF"
                  fontFamily="Gilroy"
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize="19px"
                >
                  Other
                  {props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.topics)
                    .filter(
                      (y) =>
                        ![
                          "Cyber Security",
                          "AI",
                          "Tech Startups",
                          "eCommerce",
                          "Health Tech",
                          "Careers in the Tech Industry",
                        ].some((topicList) => y.includes(topicList))
                    ).length < 1
                    ? ""
                    : ": " +
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.topics)
                      .filter(
                        (y) =>
                          ![
                            "Cyber Security",
                            "AI",
                            "Tech Startups",
                            "eCommerce",
                            "Health Tech",
                            "Careers in the Tech Industry",
                          ].some((topicList) => y.includes(topicList))
                      )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        {/* How did you hear about us? */}
        <Card className={classes.card}>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={12}>
              <IndividualHeaderBox label="How did you hear about us?" />
            </Grid>

            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.heard_from)}
              condition="Facebook"
              label="Facebook"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.heard_from)}
              condition="Friends"
              label="Friends"
            />
            <IndividualGrid
              filter={props.membershipData
                .filter((x) => x.id === memberID)
                .map((x) => x.heard_from)}
              condition="Instagram"
              label="Instagram"
            />

            <Grid item spacing={0} xs={12} container>
              <Grid item xs={1}>
                <IconButton disabled={true}>
                  {props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.heard_from) === "Facebook" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.heard_from) === "Friends" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.heard_from) === "Instagram" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.first_name).length < 1 ? (
                      <RadioButtonUncheckedIcon
                        style={{ color: "C4C4C4", width: 25, height: 25 }}
                      />
                    ) : (
                      <RadioButtonCheckedIcon
                        style={{
                          color: COLORS.BIZTECH_GREEN,
                          width: 25,
                          height: 25,
                        }}
                      />
                    )}
                </IconButton>
              </Grid>
              <Grid item xs={11}>
                <Box
                  paddingTop={1.5}
                  alignItems="left"
                  color="C4C4C4"
                  fontFamily="Gilroy"
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize="19px"
                >
                  Other
                  {props.membershipData
                    .filter((x) => x.id === memberID)
                    .map((x) => x.heard_from) === "Facebook" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.heard_from) === "Friends" ||
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.heard_from) === "Instagram"
                    ? ""
                    : ": " +
                    props.membershipData
                      .filter((x) => x.id === memberID)
                      .map((x) => x.heard_from)}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Paper>
  );
};

export default Individual;
