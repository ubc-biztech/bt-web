import React, { useEffect, useState, useMemo } from "react";
import { fetchBackend } from "../../../utils";
import {
    Helmet
} from "react-helmet";
import MentorCard from "components/mentor/MentorCard";
import { Avatar, Container, Typography, Box, Chip, Grid, Item } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
    useTheme
  } from "@material-ui/styles";
import {
    makeStyles
} from "@material-ui/core/styles";
import SearchBar from "components/inputs/SearchBar";
import {
    COLORS
} from "constants/index";

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
        margin: "5% 2% 0% 2%",
        border: "solid white 2px",
        borderRadius: "10px",
        background: COLORS.WHITE,
        padding: "1%",
        width: "100%",
        minWidth: "100%"
    },
    mobileFilterContainer: {
        margin: "5% 2% 0% 2%",
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
    }
});

function Mentors({ eventDetails }) {
    const theme = useTheme();
    const classes = useStyles();
    const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));
    const { eventName, eventYear } = eventDetails;

    const [searchQuery, setSearchQuery] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]); // TODO: set this to all mentors initially
    const [possibleSkills, setPossibleSkills] = useState([]);
    const [skillsQuestionId, setSkillsQuestionId] = useState("");

    const eventData = useMemo(async () => {
        const res = await fetchBackend(`/events/${eventName}/${eventYear}}`, "GET", undefined, false);
        res.partnerRegistrationQuestions.forEach(question => {
            if (question?.isSkillsQuestion) {
                setPossibleSkills(question.choices.split(", "));
                setSkillsQuestionId(question.questionId);
            }
        })
        return res;
    }, [eventDetails])

    const mentors = useMemo(async () => {
        const params = new URLSearchParams({
            eventID: eventName,
            year: eventYear,
            isPartner: true
        });
        const res = await fetchBackend(`/registrations?${params}`, "GET", undefined, false);
        setFilteredMentors(res.data.map(mentor => {
            return {
                ...mentor.basicInformation,
                skills: skillsQuestionId === "" ? [] : 
                    mentor.dynamicResponses[skillsQuestionId]
                    .split(" ")
                    .filter((skill) => skill !== "")
                    .map((skill) => skill.replace(',', ''))
            }
        }));
        return res;
    }, [eventDetails, skillsQuestionId])

    useEffect(() => {
        if (searchQuery.length <= 0) setFilteredMentors([...mentors]);
        else filterMentors();

        return () => {
            setFilteredMentors([]);
        };
    }, [searchQuery])

    // TODO: Add data cleaning to ensure taht all partner skills are lowercase
    const filterMentors = () => {
        const newFilteredMentors = mentors.filter(mentor => {
            let skillMatch = false;
            searchQuery.forEach((skill) => {
                if (mentor.skills.includes(skill.toLowerCase())) skillMatch = true;
            })
            return skillMatch;
        })
        setFilteredMentors([...newFilteredMentors]);
    };

    const handleDeleteSkill = (e, skill) => {
        e.preventDefault();
        setSearchQuery([...searchQuery.filter((s) => s !== skill)]);
    }

    return (
        <>
            <Helmet>
                <title>{eventName} Mentors</title>
            </Helmet>
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
                                            )
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
    )
}

export default Mentors;