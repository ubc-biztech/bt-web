import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import EventCard from '../../components/Cards/Event';
import { updateEvents } from '../../utils'

import { withStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';

import {
    StarBorder,
    PlaylistAddCheck,
    Search
} from '@material-ui/icons';

// States for the filters
const PANEL_STATES = {
    FAVORITES: 'FAVORITES',
    REGISTERED: 'REGISTERED',
    ALL: 'ALL',
}

const TAB_STATES = {
    UPCOMING: 0,
    PAST: 1,
    ALL: 2,
}

const styles = ({
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    sidePanel: {
        layout: {
            display: 'flex',
            float: 'right',
            flexDirection: 'column',
            textAlign: 'right',
            marginRight: '3em',
            minWidth: '15em',
        },
        title: {
            fontSize: '3em',
        },
        button: {
            textAlign: 'right'
        },
        activeButton: {
            textAlign: 'right',
            color: 'green',
        }
    },
    tabs: {
        layout: {
            marginBottom: '2em',
        },
        tab: {
            fontSize: '0.9rem',
            marginLeft: '1em',
            marginRight: '1em',
            textTransform: 'none',
            maxWidth: '5em',
            width: '100%',
        }
    },
    rows: {
        display: 'flex',
        flexWrap: 'wrap',
    }
})

function EventPanel(props) {
    const { children, currentIndex, index, ...rest } = props;

    return (
        <div
            role="tabpanel"
            hidden={currentIndex !== index}
            id={`tabpanel-${index}`}
            { ...rest }
        >
            {children}
        </div>
    )
}

function UserHome(props) {

    const [tabIndex, setTabIndex] = useState(TAB_STATES.UPCOMING);
    const [selectedPanel, setSelectedPanel] = useState(PANEL_STATES.ALL);

    const history = useHistory();
    
    if(!props.events) updateEvents()
    const { events = [], user } = props;
    
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex)
    }

    const handlePanelChange = (newIndex) => {
        setSelectedPanel(newIndex)
    }

    const redirectToEvent = (e, eventId) => {
        history.push(`/event/${eventId}/register`)
    }

    const AllEventCards = useMemo(() => {

        console.log({events})
        return events;
        // TODO: filter events by favorites and registered

    }, [events, selectedPanel]) // eslint-disable-line react-hooks/exhaustive-deps

    const UpcomingEventCards = useMemo(() => {

        // filter events by the date
        console.log({user}, {AllEventCards})
        const now = new Date();
        return AllEventCards.filter((event) => event.startDate && new Date(event.startDate) >= now)

    }, [AllEventCards, selectedPanel]) // eslint-disable-line react-hooks/exhaustive-deps

    const PastEventCards = useMemo(() => {

        // filter events by the date
        console.log({user}, {AllEventCards})
        const now = new Date();
        return AllEventCards.filter((event) => event.startDate && new Date(event.startDate) < now)

    }, [AllEventCards, selectedPanel]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Helmet>
                <title>Biztech User Events Dashboard</title>
            </Helmet>
            <div style={styles.flex}>
                <div style={styles.sidePanel.layout}>
                    <Typography style={styles.sidePanel.title}>Events</Typography>
                    <List>
                        <ListItem
                            style={selectedPanel === PANEL_STATES.FAVORITES
                                ? styles.sidePanel.activeButton
                                : styles.sidePanel.button}
                            onClick={() => handlePanelChange(PANEL_STATES.FAVORITES)}
                            button
                        >
                            <ListItemText><StarBorder fontSize="small" />&nbsp;Favorites</ListItemText>
                        </ListItem>
                        <ListItem
                            style={selectedPanel === PANEL_STATES.REGISTERED
                                ? styles.sidePanel.activeButton
                                : styles.sidePanel.button}
                            onClick={() => handlePanelChange(PANEL_STATES.REGISTERED)}
                            button
                        >
                            <ListItemText><PlaylistAddCheck fontSize="small" />&nbsp;Registered</ListItemText>
                        </ListItem>
                        <ListItem
                            style={selectedPanel === PANEL_STATES.ALL
                                ? styles.sidePanel.activeButton
                                : styles.sidePanel.button}
                            onClick={() => handlePanelChange(PANEL_STATES.ALL)}
                            button
                        >
                            <ListItemText><Search fontSize="small" />&nbsp;All</ListItemText>
                        </ListItem>
                    </List>
                </div>
                <div>

                    <Tabs
                        value={tabIndex}
                        indicatorColor="primary"
                        textColor="primary" // TODO: Set the primary color theme
                        onChange={handleTabChange}
                        style={styles.tabs.layout}
                    >
                        <Tab label="Upcoming" style={styles.tabs.tab} />
                        <Tab label="Past" style={styles.tabs.tab} />
                        <Tab label="All" style={styles.tabs.tab} />
                    </Tabs>

                    <EventPanel currentIndex={tabIndex} index={TAB_STATES.UPCOMING}>
                        <div style={styles.rows}>
                            {UpcomingEventCards.map((event) => (
                                <EventCard
                                    event={event}
                                    key={event.id}
                                    variant="user"
                                    handleClick={redirectToEvent}
                                    // handleFavorite={handleFavoriteEvent}
                                    cardStyle={{ width: '40%' }}
                                />
                            ))}
                        </div>
                    </EventPanel>
                    <EventPanel currentIndex={tabIndex} index={TAB_STATES.PAST}>
                        <div style={styles.rows}>
                            {PastEventCards.map((event) => (
                                <EventCard
                                    event={event}
                                    key={event.id}
                                    variant="user"
                                    handleClick={redirectToEvent}
                                    // handleFavorite={handleFavoriteEvent}
                                    cardStyle={{ width: '40%' }}
                                />
                            ))}
                        </div>
                    </EventPanel>
                    <EventPanel currentIndex={tabIndex} index={TAB_STATES.ALL}>
                        <div style={styles.rows}>
                            {AllEventCards.map((event) => (
                                <EventCard
                                    event={event}
                                    key={event.id}
                                    variant="user"
                                    handleClick={redirectToEvent}
                                    // handleFavorite={handleFavoriteEvent}
                                    cardStyle={{ width: '40%' }}
                                />
                            ))}
                        </div>
                    </EventPanel>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        events: state.pageState.events,
        user: state.userState.user,
    };
  };
  

export default connect(mapStateToProps, {})(withStyles(styles)(UserHome))
