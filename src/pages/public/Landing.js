import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Background from 'assets/landingpagebg.svg'
import House from 'assets/house.svg'
import Signpost from 'assets/signpost.svg'
import SpeechBubble from 'assets/landingpagespeech.svg'

import IconContainer from 'components/layout/IconContainer'
import Markdown from 'components/layout/Markdown'

const useStyles = makeStyles(theme => ({
    main: {
        marginLeft: '-110px',
        marginTop: '-14px',
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'none',
        backgroundSize: 'cover',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            marginLeft: '-10px',
        },
    },
    images: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        width: '80%',
        transform: 'translate(-50%, -50%)',
    },
    houseImage: {
        position:'absolute',
        left: '50%', //anchor in the middle
        bottom: '0',
        transform: 'translate(-15%, 0%)',
        [theme.breakpoints.down('xs')]: {
            width: '40%',
        }
    },
    signpostImage: {
        position: 'absolute',
        bottom: '0',
        left: '50%', //anchor in the middle
        transform: 'translate(-50%, 20%)', 
        zIndex: 1,
        [theme.breakpoints.down('xs')]: {
            width: '15%',
        }
    }, 
    speechBubbleImage: {
        position: 'absolute',
        bottom: '0',
        left: '50%', //anchor in the middle
        transform: 'translate(-100%, -100%)',
        zIndex: 1,
        [theme.breakpoints.down('xs')]: {
            width: '40%',
        }
    },
    linkbar: {
        position: 'absolute',
        top: '80%',
        left: '50%', 
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            width: '60%',
            top: '70%', //avoids being hidden by bottom bar on mobile
        }
    },
    divider: {
        width: '100%'
    }


}))

function Landing(props) {

    const classes = useStyles();

    return (
        <div className={classes.main}>
            <div className={classes.images}>
                <img src={SpeechBubble} alt="Speech Bubble" className={classes.speechBubbleImage} />
                <img src={Signpost} alt='Signpost' className={classes.signpostImage} />
                <img src={House} alt='House' className={classes.houseImage} />
            </div>
            <div className={classes.linkbar}>
                <Markdown align="center">In the meantime, you can find us here: </Markdown>
                <hr className={classes.divider}/>
                <IconContainer />
            </div>
        </div>
        
    )
}

export default Landing