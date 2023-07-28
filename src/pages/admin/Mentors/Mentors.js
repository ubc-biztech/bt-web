import React, { useEffect, useState } from "react";
import { fetchBackend } from "../../../utils";
import {
    Helmet
} from "react-helmet";
import MentorCard from "components/mentor/MentorCard";
import { Avatar, Container, Typography, Box, Chip } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
    useTheme
  } from "@material-ui/styles";
import {
    makeStyles
} from "@material-ui/core/styles";
import SearchBar from "components/inputs/SearchBar";
import { DriveEtaSharp } from "@material-ui/icons";


const useStyles = makeStyles({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        border: "solid red 2px",
        justifyContent: "center",
        alignItems: "center",
    },
    mentorsContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5%",
        justifyContent: "center",
        alignItems: "center",
        border: "solid green 2px",
        width: "90%"
    },
    mobileMentorsContainer: {
        display: "flex",
        gap: "5%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    filterContainer: {
        width: "90%",
        border: "solid blue 2px"
    },
    mobileFilterContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    chip: {
        borderRadius: "10px"
    },
    skillChip: {
        marginRight: "10px",
        marginTop: "20px",
        marginBottom: "20px"
    },
    skillContainer: {
        display: "flex",
        alignItems: "center",
        height: "50px",
        marginTop: "1%",
        marginBottom: "1%"
    }
});

function Mentors({ eventDetails }) {
    const theme = useTheme();
    const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

    const classes = useStyles();
    // probably just pass in the event name as a prop
    const [mentors, setMentors] = useState([{
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["c#", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }, 
    {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["c++"],
        profilePicture: "https://example.com/profile-picture.jpg"
    },
    {
        firstName: "Longassname",
        lastName: "longasslastname", company: "PlsGiveMeJob",
        role: "Software Engineer",
        skills: ["c++"],
        profilePicture: "https://example.com/profile-picture.jpg"
    }]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]); // TODO: set this to all mentors initially
    
    const possibleSkills = ["react", "full stack", "nodejs", "flask", "python", "react", "full stack", "nodejs", "flask", "python"]
    
    // useEffect(() => {
        
    //     // fetch mentors from backend for given event
    //     const getMentors = async () => {
    //         const eventName = eventDetails.eventName;
    //         const params = new URLSearchParams({
    //             eventName
    //         })
    //         return await fetchBackend(`/registrations?${params}`, "GET");
    //     }

    //     // save mentors into state
    //     setMentors(getMentors());

    // }, [])

    useEffect(() => {
        if (searchQuery.length <= 0) setFilteredMentors([...mentors]);
        else filterMentors();
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
                <title>{eventDetails} Mentors</title>
            </Helmet>
            <div className={classes.mainContainer}>
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
                <div className={renderMobileOnly ? classes.mobileMentorsContainer : classes.mentorsContainer}>
                    {
                        filteredMentors.map((mentor, idx) => {
                            return (
                                <MentorCard key={idx} mentor={mentor} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Mentors;