import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Container, Typography, Box, Chip } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
    makeStyles
} from "@material-ui/core/styles";
import {
    useTheme
  } from "@material-ui/styles";
import {
    COLORS
} from "constants/index";

const useStyles = makeStyles({
    profileContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderRadius: "10px",
        padding: "6%",
    },
    name: {
        marginTop: "2%",
        color: COLORS.LIGHT_BACKGROUND_COLOR,
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center"
    },
    position: {
        marginTop: "2%",
        color: COLORS.LIGHT_BACKGROUND_COLOR,
        fontSize: "1.2rem",
        textAlign: "center"
    },
    skill: {
        marginTop: "2%"
    },
    profilePicture: {
        width: "150px",
        height: "150px",
        backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR
    },
    container: {
        height: "100%",
        // minWidth: "350px",
        flex: "0 3 350px",
        display: "flex",
        // border: "solid red 2px"
    },
    skillsContainer: {
        display: "flex",
        justifyContent: "left",
        marginTop: "5%",
        flexWrap: "wrap",
        gap: "0.3vw 0.3vh"
    },
    mobileContainer: {
        width: "350px",
    },
    mobileProfileContainer: {
        // marginBottom: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderRadius: "10px",
        padding: "6%"
    },
});

function MentorCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));
    const { fname, lname, role, gender, companyName, skills } = props.mentor;

    return (
        <>
            <Box className={renderMobileOnly ? classes.mobileContainer : classes.container }>
                <Box className={renderMobileOnly ? classes.mobileProfileContainer : classes.profileContainer}>
                    <Avatar 
                        alt={`${fname}-profile-picture`}
                        src={""}
                        className={classes.profilePicture} />
                    <Typography className={classes.name}>
                        {fname + ", " + lname}
                    </Typography>
                    <Typography className={classes.position}>
                        {role + " at " + companyName}
                    </Typography>
                    <div className={classes.skillsContainer}>
                        {
                            skills.map((skill, idx) => <Chip key={idx} label={skill} variant="outlined"/>)
                        }
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default MentorCard;