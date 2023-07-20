import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Container, Typography, Box, Chip } from "@material-ui/core";
import {
    makeStyles
} from "@material-ui/core/styles";
import {
    COLORS
} from "constants/index";

const useStyles = makeStyles({
    profileContainer: {
        marginTop: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderRadius: "10px",
        padding: "6%"
    },
    name: {
        marginTop: "7%",
        color: COLORS.LIGHT_BACKGROUND_COLOR,
        fontSize: "1.5rem",
        fontWeight: "bold"
    },
    position: {
        color: COLORS.LIGHT_BACKGROUND_COLOR,
        fontSize: "1.2rem"
    },
    skill: {
        marginTop: ""
    },
    profilePicture: {
        width: "150px",
        height: "150px",
        backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR
    },
    container: {
        display: "grid",
        width: "25%"
    },
    skillsContainer: {
        display: "flex",
        justifyContent: "left",
        marginTop: "5%",
        flexWrap: "wrap",
        gap: "0.3vw 0.3vh"
    }
});

function MentorCard(props) {
    const classes = useStyles();
    const { firstName, lastName, company, role, skills, profilePicture } = props.mentor;
    const skillstest = ["React", "Node.js", "Express", "Firebase", "Python", "Java", "C++", "C", "C#"]

    return (
        <Box className={classes.container}>
            <div className={classes.profileContainer}>
                <Avatar 
                    alt={`${firstName}-profile-picture`}
                    src={profilePicture}
                    className={classes.profilePicture} />
                <Typography className={classes.name}>
                    {firstName + ", " + lastName}asdfad
                </Typography>
                <Typography className={classes.position}>
                    {role + " at " + company}
                </Typography>
                <div className={classes.skillsContainer}>
                    {
                        skillstest.map((skill, idx) => <Chip key={idx} label={skill} variant="outlined"/>)
                    }
                </div>
            </div>
        </Box>
    )
}

export default MentorCard;