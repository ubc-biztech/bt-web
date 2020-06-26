import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography'
import EventCard from './EventCard'
import { fetchBackend } from "../../utils";
import { COLOR } from '../../constants/Constants'
import House from '../../assets/house.svg'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
    home: {
        color: COLOR.TITLE_GREEN,
        fontStyle: 'normal',
        fontWeight: 'bold',
        paddingLeft: '85px',
        paddingTop: '50px',
    },
    page: {
        height: '100vh'
    },
    container: {
        display: 'flex'
    },
    header: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '76px',
        paddingTop: '45px'
    },
    reward: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '22px',
        paddingLeft: '76px',
        paddingTop: '15px',
    },
    house: {
        position: 'absolute',
        left: '685px',
        top: '110px'
    }
}

const useStyles = makeStyles({
    root: {
        width: '719px',
        marginTop: '27px'
    },
})

function UserHome(props) {
    const [featuredEvent, setFeaturedEvent] = useState()
    const [nextEvent, setNextEvent] = useState()
    const getFeaturedEvent = (events) => {
        if (events.length) {
            setFeaturedEvent(events[Math.floor(Math.random() * (events.length - 1))]);
        }
    }

    /**
     * gets the next event that the user is registered for
     * verifies that the event is after the current time
     * sets next event to 'None Registered!' if no events found
     */
    const getNextEvent = async (events) => {
        const params = new URLSearchParams({
            id: props.user.id
        })
        await fetchBackend(`/registrations?${params}`, 'GET')
            .then(async response => {
                if (response && response.size > 0) {
                    //iterate over events - the first one that is found in registrations is the closest event assuming that events are already sorted by date
                    let found = false;
                    events.forEach(event => {
                        if (!found) {
                            const index = response.data.findIndex(registration => registration.eventID === event.id)
                            if (index !== -1) {
                                found = true;
                                // if the event has not passed yet
                                if (new Date(event.startDate).getTime() > new Date().getTime()) {
                                    setNextEvent(event)
                                } else {
                                    setNextEvent({
                                        ename: 'None Registered!'
                                    })
                                }
                            }
                        }
                    })

                } else {
                    setNextEvent({
                        ename: 'None Registered!'
                    })
                }
            })
    }

    // set featured event and nextEvent on initial render
    const initialRender = async () => {
        if (!featuredEvent && !nextEvent) {
            await fetchBackend(`/events`, 'GET')
                .then(async events => {
                    getFeaturedEvent(events)
                    getNextEvent(events)
                })
        }
    }

    initialRender()

    function Greeting(props) {
        const classes = useStyles()

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography style={styles.header}>Hi {props.user.fname}!</Typography>
                    <Typography style={styles.reward}>You are X events away from a reward!</Typography>
                </CardContent>
                <img src={House} style={styles.house} alt='BizTech House' />
            </Card>
        )
    }

    function SubComponent(props) {
        const classes = useStyles()

        return (
            <Card classes={{ root: classes.root }}>
                <Typography style={styles.header}>{props.header}</Typography>
                {props.content}
            </Card>
        )
    }

    return (
        <div style={styles.page}>
            <Helmet>
                <title>Biztech User Dashboard</title>
            </Helmet>
            <Typography style={styles.home} variant='h3'>Home</Typography>
            <div style={styles.container}>
                <div style={{ marginLeft: '85px' }}>
                    <Greeting user={props.user} />
                    <SubComponent header='Progress' />
                </div>
                <div style={{ marginLeft: '34px' }}>
                    <SubComponent header='Sticker Collection' />
                    <SubComponent header='Prizes' />
                    <div style={styles.container}>
                        <EventCard type={'Next Event'} event={nextEvent} />
                        <EventCard type={'Featured'} event={featuredEvent} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserHome
