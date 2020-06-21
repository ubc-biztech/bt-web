import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography'
import Greeting from './subcomponents/Greeting'
import Progress from './subcomponents/Progress'
import Stickers from './subcomponents/Stickers'
import Prizes from './subcomponents/Prizes'
import EventCard from './subcomponents/EventCard'
import { fetchBackend } from "../../utils";
import { connect } from 'react-redux'
import { COLOR } from '../../constants/Constants'

const styles = {
    home: {
        color: COLOR.TITLE_GREEN,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        paddingLeft: '85px',
        paddingTop: '50px',
    },
    page: {
        height: '100vh'
    },
    container: {
        display: 'flex'
    }
}

function UserHome(props) {
    const [featuredEvent, setFeaturedEvent] = useState()
    const [nextEvent, setNextEvent] = useState()
    const getFeaturedEvent = () => {
        if (props.events && props.events.length) {
            setFeaturedEvent(props.events[Math.floor(Math.random() * (props.events.length - 1))]);
        }
    }

    /**
     * gets the next event that the user is registered for
     * verifies that the event is after the current time
     * sets next event to 'None Registered!' if no events found
     */
    const getNextEvent = async () => {
        const params = new URLSearchParams({
            id: props.user.id
        })
        await fetchBackend(`/registrations?${params}`, 'GET')
            .then(async response => {
                if (response && response.size > 0) {
                    //iterate over events - the first one that is found in registrations is the closest event assuming that events are already sorted by date
                    let found = false;
                    if (props.events) {
                        props.events.forEach(event => {
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
                    }
                } else {
                    setNextEvent({
                        ename: 'None Registered!'
                    })
                }
            })
    }

    // set featured event and nextEvent on initial render
    if (!featuredEvent && !nextEvent) {
        getFeaturedEvent()
        getNextEvent()
    }

    return (
        <div style={styles.page}>
            <Helmet>
                <title>Biztech User Dashboard</title>
            </Helmet>
            <Typography style={styles.home}>Home</Typography>
            <div style={styles.container}>
                <div>
                    <Greeting user={props.user} />
                    <Progress />
                </div>
                <div>
                    <Stickers />
                    <Prizes />
                    <div style={styles.container}>
                        <EventCard type={'Next Event'} event={nextEvent} />
                        <EventCard type={'Featured'} event={featuredEvent} />
                    </div>
                </div>
            </div>
        </div>

    )
}

function mapStateToProps(state) {
    return {
        events: state.pageState.events
    };
}

export default connect(mapStateToProps)(UserHome)
