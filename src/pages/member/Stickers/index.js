import { Typography, Paper, Grid, Avatar, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';

import houseImage from '../../../assets/house.svg';

const useStyles = makeStyles({
    container: {
      maxWidth: "90%",
      display: "flex",
      flexWrap: "wrap",
      margin: "75px 110px 75px 0px",
      padding: "25px",
    },
    title: {
      fontSize: '36px',
    },
    stickerImage: {
      border: '3px solid gold',
      height: '125px',
      width: '125px',
    },
  });

function Stickers(props) {

    const classes = useStyles();
    
    let images = [];
    for(let i = 0; i < 24; i++) {
        images.push(houseImage);
    }
    
    return (
        <>
        <Paper className={classes.container}>
            <Box mb={4}>
                <Typography className={classes.title} variant="h1">Sticker Collection</Typography>
            </Box>
            <Grid container spacing={5}>
                {images.map((image) => {
                    return (
                        <Grid item md={2}>
                            <Avatar src={image} className={classes.stickerImage}></Avatar>
                        </Grid>
                        );
                    })}
                
            </Grid>
        </Paper>
        </>
    )
}

export default Stickers;
