import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Container } from "@material-ui/core";
import {
    Helmet
  } from "react-helmet";
import {
    makeStyles
  } from "@material-ui/core/styles";
import { COLORS } from "constants";
import {
    COLORS
  } from "constants/index";
  
const useStyles = makeStyles((theme) => ({
    profileContainer: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    name: {
        marginTop: "5px"
    },
    skill: {
        
    }
}));

function MentorCard(props) {
    const classes = useStyles();
    const { firstName, lastName, company, role, skills, profilePicture } = props;

    
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.profileContainer}>
                <Avatar 
                    alt={`${firstName}-profile-picture`} 
                    src={profilePicture} 
                    sx={{ width: 24, height: 24, bgcolor: COLORS.BACKGROUND_COLOR }} />
                <Typography style={styles.name}>
                    {firstName + ", " + lastName}
                </Typography>
                <Typography style={styles.name}>
                    {role + " at " + company}
                </Typography>
                {
                    skills.map(skill => <Typography style={styles.skill}>{skill}</Typography>)
                }
            </div>
        </Container>
    )
}