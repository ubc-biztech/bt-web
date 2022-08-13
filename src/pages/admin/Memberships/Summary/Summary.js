import React from "react";
import { COLORS } from "../../../../constants/_constants/theme";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SummaryPieChart from "./SummaryPieChart";
import SummaryHBarChart from "./SummaryHBarChart";
import 'chartjs-plugin-datalabels';

const useStyles = makeStyles((theme) => ({
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
  numResponses: {
    color: "#AEC4F4",
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "bold",
  },
}));

const Summary = (props) => {
  const classes = useStyles();
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

        {/* 1. Type of Member */}
        <SummaryPieChart
          title="Type of Member"
          dataLabels={[
            "UBC student",
            "University student",
            "High school student",
            "Other",
          ]}
          dataSetLabel="students"
          data={[
            props.membershipData.filter((x) => x.education === "UBC").length,
            props.membershipData.filter((x) => x.education === "UNI").length,
            props.membershipData.filter((x) => x.education === "HS").length,
            props.membershipData.filter((x) => x.education === "NA").length,
          ]}
        />

        {/* 2. Academic Year Level */}
        <SummaryPieChart
          title="Academic Year Level"
          dataLabels={[
            "Year 1",
            "Year 2",
            "Year 3",
            "Year 4",
            "Year 5+",
            "Pre-university",
            "Other/Not Applicable",
          ]}
          dataSetLabel="students"
          data={[
            props.membershipData.filter((x) => x.year === "1st Year").length,
            props.membershipData.filter((x) => x.year === "2nd Year").length,
            props.membershipData.filter((x) => x.year === "3rd Year").length,
            props.membershipData.filter((x) => x.year === "4th Year").length,
            props.membershipData.filter((x) => x.year === "5+ Year").length,
            props.membershipData.filter((x) => x.year === "Grade 9").length +
            props.membershipData.filter((x) => x.year === "Grade 10").length +
            props.membershipData.filter((x) => x.year === "Grade 11").length +
            props.membershipData.filter((x) => x.year === "Grade 12").length +
            props.membershipData.filter((x) => x.year === "Pre-university").length,
            props.membershipData.filter((x) => x.year === "Other").length +
            props.membershipData.filter((x) => x.year === "").length,
          ]}
        />

        {/* 3. Faculty */}
        <SummaryPieChart
          title="Faculty"
          dataLabels={[
            "Commerce",
            "Science",
            "Arts",
            "Engineering",
            "LFS",
            "Kinesiology",
            "Forestry",
            "Other/Not Applicable",
          ]}
          dataSetLabel="students"
          data={[
            props.membershipData.filter((x) => x.faculty === "Commerce").length,
            props.membershipData.filter((x) => x.faculty === "Science").length,
            props.membershipData.filter((x) => x.faculty === "Arts").length,
            props.membershipData.filter((x) => x.faculty === "Engineering").length,
            props.membershipData.filter((x) => x.faculty === "Land and Food Systems").length,
            props.membershipData.filter((x) => x.faculty === "Kinesiology").length,
            props.membershipData.filter((x) => x.faculty === "Forestry").length,
            props.membershipData.filter((x) => x.faculty === "Other").length +
            props.membershipData.filter((x) => x.faculty === "Not Applicable").length +
            props.membershipData.filter((x) => x.faculty === "").length,
          ]}
        />

        {/* 4. Major */}
        <SummaryHBarChart
          title="Major"
          max={143}
          labels={[
            "Computer Science",
            "BUCS",
            "Undeclared",
            "BTM",
            "Finance",
            "Marketing",
            "COGS",
            "Accounting",
            "Electrical Engineering",
            "OpLog",
          ]}
          data={[
            props.membershipData.filter(
              (x) =>
                x.major.toLowerCase().includes("computer science") ||
                x.major.toLowerCase().includes("compsci") ||
                x.major.toLowerCase() === "cs" ||
                x.major.toLowerCase() === "cpsc"
            ).length,
            props.membershipData.filter(
              (x) =>
                x.major.toLowerCase().includes("bucs") ||
                x.major.toLowerCase().includes("business and computer science")
            ).length,
            props.membershipData.filter(
              (x) =>
                x.major.toLowerCase().includes("undeclared") ||
                x.major.toLowerCase().includes("undecided") ||
                x.major.toLowerCase().includes("n/a") ||
                x.major.toLowerCase().includes("yet") ||
                x.major.toLowerCase().includes("not")
            ).length,
            props.membershipData.filter(
              (x) =>
                x.major.toLowerCase().includes("btm") ||
                x.major.toLowerCase().includes("business technology management")
            ).length,
            props.membershipData.filter((x) =>
              x.major.toLowerCase().includes("finance")
            ).length,
            props.membershipData.filter((x) =>
              x.major.toLowerCase().includes("marketing")
            ).length,
            props.membershipData.filter(
              (x) =>
                x.major.toLowerCase().includes("cogs") ||
                x.major.toLowerCase().includes("cognitive systems")
            ).length,
            props.membershipData.filter((x) =>
              x.major.toLowerCase().includes("accounting")
            ).length,
            props.membershipData.filter((x) =>
              x.major.toLowerCase().includes("electrical")
            ).length,
            props.membershipData.filter(
              (x) =>
                x.major.toLowerCase().includes("oplog") ||
                x.major.toLowerCase().includes("operations") ||
                x.major.toLowerCase().includes("logistics")
            ).length,
          ]}
        />

        {/* 5. Preferred Pronouns */}
        <SummaryPieChart
          title="Preferred Pronouns"
          dataLabels={["He/Him/His", "She/Her/Hers", "They/Them/Their", "Other/Prefer not to say"]}
          dataSetLabel={null}
          data={[
            props.membershipData.filter((x) => x.pronouns === "He/Him/His").length,
            props.membershipData.filter((x) => x.pronouns === "She/Her/Hers").length,
            props.membershipData.filter((x) => x.pronouns === "They/Them/Their").length,
            props.membershipData.filter((x) => x.pronouns === "Other/Prefer not to say").length,
          ]}
        />

        {/* 6. Diet */}
        <SummaryPieChart
          title="Any dietary restrictions?"
          dataLabels={["None", "Vegetarian", "Vegan", "Gluten Free", "Pescetarian", "Kosher", "Halal"]}
          dataSetLabel={null}
          data={[
            props.membershipData.filter((x) => x.diet === "None").length,
            props.membershipData.filter((x) => x.diet === "Vegetarian").length,
            props.membershipData.filter((x) => x.diet === "Vegan").length,
            props.membershipData.filter((x) => x.diet === "Gluten Free").length,
            props.membershipData.filter((x) => x.diet === "Pescetarian").length,
            props.membershipData.filter((x) => x.diet === "Kosher").length,
            props.membershipData.filter((x) => x.diet === "Halal").length,
          ]}
        />

        {/* 7. Are you an international student? */}
        <SummaryPieChart
          title="Are you an international student"
          dataLabels={["Yes", "No"]}
          dataSetLabel={null}
          data={[
            props.membershipData.filter((x) => x.international === "Yes").length,
            props.membershipData.filter((x) => x.international === "No").length,
          ]}
        />

        {/* 8. Previous Member? */}
        <SummaryPieChart
          title="Were you a BizTech member last year"
          dataLabels={["Yes", "No"]}
          dataSetLabel={null}
          data={[
            props.membershipData.filter((x) => x.prevMember === "Yes").length,
            props.membershipData.filter((x) => x.prevMember === "No").length,
          ]}
        />

        {/* 9. What topics did you want to see the most discussed in the future? */}
        <SummaryHBarChart
          title="What topics did you want to see the most discussed in the future?"
          max={446}
          labels={[
            "Careers in Tech",
            "Tech Startups",
            "AI",
            "eCommerce",
            "Cyber Security",
            "Health Tech",
          ]}
          data={[
            props.membershipData.filter((x) =>
              x.topics.includes("Careers in the Tech Industry")
            ).length,
            props.membershipData.filter((x) =>
              x.topics.includes("Tech Startups")
            ).length,
            props.membershipData.filter((x) => x.topics.includes("AI")).length,
            props.membershipData.filter((x) => x.topics.includes("eCommerce"))
              .length,
            props.membershipData.filter((x) =>
              x.topics.includes("Cyber Security")
            ).length,
            props.membershipData.filter((x) => x.topics.includes("Health Tech"))
              .length,
          ]}
        />

        {/* 10. How did you hear about us? */}
        <SummaryHBarChart
          title="How did you hear about us?"
          max={236}
          labels={["Facebook", "Friends/Word of Mouth", "Events", "Instagram", "LinkedIn", "Boothing", "BizTech Newsletter", "Faculty Newsletter", "Posters", "Other"]}
          data={[
            props.membershipData.filter((x) => x.heardFrom === "Facebook")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Friends/Word of Mouth")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Events")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Instagram")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "LinkedIn")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Boothing")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "BizTech Newsletter")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Faculty Newsletter")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Posters")
              .length,
            props.membershipData.filter((x) => x.heardFrom === "Other")
              .length,
          ]}
        />
      </div>
    </Paper>
  );
};

export default Summary;
