import React, {
  useEffect, useState
} from "react";
import {
  fetchBackend
} from "../../../utils";
import {
  Helmet
} from "react-helmet";
import MentorCard from "components/mentor/MentorCard";
import {
  Box, Chip, Grid
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  useTheme
} from "@material-ui/styles";
import {
  makeStyles
} from "@material-ui/core/styles";
import SearchBar from "components/inputs/SearchBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  COLORS
} from "constants/index";
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mentorsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    "&:after": {
      content: "",
      flex: "auto"
    }
  },
  mobileMentorsContainer: {
    display: "flex",
    gap: "5%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  filterContainer: {
    margin: "0% 2% 0% 2%",
    border: "solid white 2px",
    borderRadius: "10px",
    background: COLORS.WHITE,
    padding: "1%",
  },
  mobileFilterContainer: {
    margin: "0% 2% 0% 2%",
    border: "solid white 2px",
    borderRadius: "10px",
    background: COLORS.WHITE,
    padding: "1%",
  },
  chip: {
    borderRadius: "10px"
  },
  skillChip: {
    marginTop: "10px",
    marginLeft: "10px"
  },
  skillContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "50px",
    marginTop: "1%",
    marginBottom: "1%"
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  gridItem: {
    // border: "solid yellow 2px",
    overflow: "hidden"
  },
  backButton: {
    display: "flex",
    fontSize: "1.1rem",
    padding: "1% 0 1% 2%",
    color: "white"
  },
  mobileBackButton: {
    display: "flex",
    fontSize: "1.1rem",
    padding: "1% 0 2% 2%",
    color: "white"
  }
});

function Mentors({
  eventDetails
}) {
  const theme = useTheme();
  const classes = useStyles();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    eventName, eventYear
  } = eventDetails;

  const [searchQuery, setSearchQuery] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [possibleSkills, setPossibleSkills] = useState([]);
  const [skillsQuestionId, setSkillsQuestionId] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {
      const res = await fetchBackend(`/events/${eventName}/${eventYear}}`, "GET", undefined, false);
      res.partnerRegistrationQuestions.forEach(question => {
        if (question?.isSkillsQuestion) {
          setPossibleSkills(question.choices.split(", "));
          setSkillsQuestionId(question.questionId);
        }
      });
      return res;
    };
    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      const params = new URLSearchParams({
        eventID: eventName,
        year: eventYear,
        isPartner: true
      });
      const res = await fetchBackend(`/registrations?${params}`, "GET", undefined, false);
      const mentorsList = res.data.map(mentor => {
        return {
          ...mentor.basicInformation,
          profilePhoto: mentor.profilePhoto,
          skills: skillsQuestionId === "" ? [] :
            mentor.dynamicResponses[skillsQuestionId]
              .split(" ")
              .filter((skill) => skill !== "")
              .map((skill) => skill.replace(",", ""))
        };
      });
      setFilteredMentors(mentorsList);
      setMentors(mentorsList);
    };
    fetchMentors();
  }, [skillsQuestionId]);

  useEffect(() => {
    if (searchQuery.length <= 0) setFilteredMentors([...mentors]);
    else filterMentors();

    return () => {
      setFilteredMentors([]);
    };
  }, [searchQuery]);

  // TODO: Add data cleaning to ensure taht all partner skills are lowercase
  const filterMentors = () => {
    const newFilteredMentors = mentors.filter(mentor => {
      let skillMatch = false;
      searchQuery.forEach((skill) => {
        if (mentor.skills.includes(skill.toLowerCase())) skillMatch = true;
      });
      return skillMatch;
    });
    setFilteredMentors([...newFilteredMentors]);
  };

  const handleDeleteSkill = (e, skill) => {
    e.preventDefault();
    setSearchQuery([...searchQuery.filter((s) => s !== skill)]);
  };

  return (
    <>
      <Helmet>
        <title>{eventName} Mentors</title>
      </Helmet>
      <div className={ renderMobileOnly ? classes.mobileBackButton : classes.backButton}>
        <Link to="/companion">
          <ArrowBackIcon onClick={() => console.log("hi")} style={{
            cursor: "pointer"
          }}></ArrowBackIcon>
        </Link>
      </div>
      <div className={classes.mainContainer}>
        <div className={renderMobileOnly ? classes.mobileMentorsContainer : classes.mentorsContainer}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12} className={classes.gridItem}>
              <Box className={renderMobileOnly ? classes.mobileFilterContainer : classes.filterContainer}>
                <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
                <Box className={classes.skillContainer}>
                  {
                    searchQuery.map((skill, idx) => {
                      return (
                        <Chip
                          key={idx}
                          label={skill}
                          classes={{
                            root: classes.chip
                          }}
                          value={skill}
                          onDelete={(e) => handleDeleteSkill(e, skill)}
                          className={classes.skillChip}
                        />
                      );
                    })
                  }
                </Box>
              </Box>
            </Grid>
            {filteredMentors.map((mentor, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} className={classes.gridItem}>
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MentorCard key={idx} mentor={mentor} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Mentors;
