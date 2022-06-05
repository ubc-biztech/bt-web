import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import HeartImage from "assets/heart.svg"
import Fyr from "assets/fyr.png"
import ProduHacks from "assets/produHacks.png"
import Laptop from "assets/laptop.png"

import { COLORS } from "constants/index";

const useStyles = makeStyles({

    image: {
        marginLeft: 5,
        marginRight: 5,
        width: "auto",
        maxHeight: 200,

    }, 
    role: {
              color: COLORS.BIZTECH_GREEN, 
              fontSize: 20,
              margin: 0,
              padding: 0,
              textAlign: "center",  
    },
    h2: {
              color: COLORS.WHITE, 
              fontSize: "2em",
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
            },
    h1: {
      color: COLORS.BIZTECH_GREEN, 
      fontSize: "5em",
      marginTop: 0,
      display: "flex",
      justifyContent: "center",
    },

    list: {
        listStyleType: "none",
        marginLeft: 0,
        paddingLeft: 0,
        float: "left",
        fontSize: "2em"
    },

    positions: {
        marginLeft: 155,
        margin: "0 auto",
        paddingTop: 60,
        alignItems: "center",
    },
  });

function Trial() {
    const classes = useStyles();
    return (
        <div>
        <Typography variant="h1" className={classes.h1}>
            I 
            <img src={HeartImage} alt="heart" className={classes.image} />
            BizTech!
        </Typography>
        
        <Typography variant="h2" className={classes.h2}>
                My BizTech Journey:
        </Typography>
            
            <div className={classes.positions}>
                <ul className={classes.ul}>
                    <li className={classes.list}>  
                        <img src={Fyr} alt="laptop" className={classes.image}></img>
                        <Typography className={classes.role}> 
                            First Year Rep
                        </Typography>
                    </li>
                    <li className={classes.list}>
                        <img src={ProduHacks} alt="laptop" className={classes.image}></img>
                        <Typography className={classes.role}> 
                            Events Director
                        </Typography>
                    </li>
                    <li className={classes.list}>
                    <img src={Laptop} alt="laptop" className={classes.image}></img>
                        <Typography className={classes.role}> 
                            Developer
                        </Typography>
                    </li>
                </ul>
                </div>
            </div>
    );
}

export default Trial;