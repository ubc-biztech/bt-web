import React, {
  useEffect, useState
} from "react";
import MentorCard from "pages/public/Companion/components/mentor/MentorCard";
import {
  Box, Chip, Grid, Typography
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  useTheme
} from "@material-ui/styles";
import {
  makeStyles
} from "@material-ui/core/styles";
import Loading from "pages/Loading";
import SearchBar from "pages/public/Companion/components/mentor/SearchBar";

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
      flex: "auto",
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
  mentorsGridItem: {
    flex: "0 0 calc(33.33% - 15px)",
    marginBottom: "15px",
  },
  filterContainer: {
    margin: "1rem 0",
  },
  mobileFilterContainer: {
    padding: "1%",
  },
  chip: {
    borderRadius: "10px",
    backgroundColor: "transparent",
  },
  skillChip: {
    marginTop: "10px",
    marginLeft: "10px",
  },
  skillContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "50px",
    marginTop: "1%",
    marginBottom: "1%",
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  gridItem: {
    overflow: "hidden",
  },
});

function Mentors(props) {
  const {
    event, registrations, styles
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [skillsQuestionId, setSkillsQuestionId] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (event) {
      event.partnerRegistrationQuestions.forEach(question => {
        if (question?.isSkillsQuestion) {
          setSkillsQuestionId(question.questionId);
        }
      });
    }
  }, [event]);

  useEffect(() => {
    const fetchMentors = async () => {
      const mentorsList = registrations.filter(response => {
        return response.isPartner === true;
      });
      const optionsSet = new Set();
      const mentorsParsed = mentorsList.map(mentor => {
        return {
          ...mentor.basicInformation,
          profilePhoto: mentor.profilePhoto,
          skills: skillsQuestionId === "" || !mentor.dynamicResponses[skillsQuestionId] ? [] :
            mentor.dynamicResponses[skillsQuestionId]
              .filter((skill) => skill !== "" || skill.trim() !== "")
              .map((skill) => {
                optionsSet.add(skill.trim());
                return skill.trim();
              })
        };
      });
      setOptions(Array.from(optionsSet));
      setFilteredMentors(mentorsParsed);
      setMentors(mentorsParsed);
    };
    fetchMentors();
  }, [skillsQuestionId]);

  useEffect(() => {
    if (searchQuery.length <= 0 && mentors.length > 0) setFilteredMentors([...mentors]);
    else if (searchQuery.length > 0) filterMentors();

    return () => {
      setFilteredMentors([]);
    };
  }, [searchQuery]);

  const filterMentors = () => {
    const newFilteredMentors = mentors.filter(mentor => {
      let skillMatch = false;
      searchQuery.forEach((skill) => {
        if (mentor.skills.map(mentorSkill => mentorSkill.toLowerCase()).includes(skill.toLowerCase())) skillMatch = true;
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
      {event ?
        <>
          <div id="Mentors" className={classes.mainContainer} style={styles.column}>
            <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Mentors</h1>
            <div className={renderMobileOnly ? classes.mobileMentorsContainer : classes.mentorsContainer}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} className={classes.gridItem}>
                  <Box className={renderMobileOnly ? classes.mobileFilterContainer : classes.filterContainer}>
                    <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} options={options} />
                    {searchQuery.length !== 0 &&
                      <Box className={classes.skillContainer}>
                        {
                          searchQuery.map((skill, idx) => {
                            return (
                              <Chip
                                key={idx}
                                label={skill}
                                variant="outlined"
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
                      </Box>}
                  </Box>
                </Grid>
                {filteredMentors.length === 0 ? (
                  <Grid item xs={12} className={classes.gridItem}>
                    <Box
                      height="100%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1" color="textSecondary">
                        No mentors found. Please try another filter.
                      </Typography>
                    </Box>
                  </Grid>
                ) : (filteredMentors.map((mentor, idx) => (
                  <Grid key={idx} item xs={6} sm={6} md={3} className={classes.gridItem}>
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
                ))
                )}
              </Grid>
            </div>
          </div> </> : <Loading />}
    </>
  );
}

export default Mentors;
