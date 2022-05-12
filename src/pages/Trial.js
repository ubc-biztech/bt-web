import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import { COLORS } from "constants/index";
import HouseChef from "assets/housechef.svg";

const useStyles = makeStyles((theme) => ({
    p: {
      color: COLORS.WHITE,
      display: "flex",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "30vh",
    },
    houseChefs: {
        flexDirection: "row",
    },
    spinningImg: {
        animation: "$spin 2s linear infinite"
    },
    "@keyframes spin": {
        "0%": {
            transform: "rotate(360deg)"
        },
        "100%": {
            transform: "rotate(0deg)"
        }
    }
}));

function Trial() {
    const classes = useStyles();

    let houseChefs = [];
    for (let i = 0; i < 3; i++) {
        houseChefs.push(
            <img
                src={HouseChef}
                alt="House with Chef Hat"
                className={classes.spinningImg}
            />
        );
    }

    return (
        <div className={classes.container}>
            <Typography variant="p" className={classes.p}>
                we cookin'
            </Typography>
            <Button variant="contained" color="primary">
                yep
            </Button>

            <div className={'classes.houseChefs'}>
                {houseChefs}
            </div>
            
        </div>
    );
}

export default Trial;