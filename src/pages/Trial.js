import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import SadImage from 'assets/sad.png';
import { COLORS } from 'constants/index';

const useStyles = makeStyles({
  layout: {
    position: 'absolute',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw'
  },
  h1: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: '5em',
    marginTop: 0,
    marginBottom: 0,
    display: 'flex'
  },
  textContent: {
    color: COLORS.WHITE,
    paddingTop: '1em',
    paddingBottom: '1em'
  },
  image: {
    height: '10em',
    filter:
      'invert(65%) sepia(79%) saturate(378%) hue-rotate(51deg) brightness(97%) contrast(88%)'
  }
});

function Trial () {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className = {classes.layout}>
      <img src={SadImage} alt='not-found' className={classes.image} />
      <Typography className = {classes.textContent}>
        Seems like you are on a private page ...
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/')}
      >
        Take me back home
      </Button>
    </div>
  )
}

export default Trial;
