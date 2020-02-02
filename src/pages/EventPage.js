import React, { Component } from 'react';
import { connect } from "react-redux";
import { List } from '@material-ui/core';
import Link from '@material-ui/core/Link'
import { setEvent } from "../actions/PageActions";
import EventFormWrapper from '../components/EventForm/EventFormWrapper';

const queryString = require('query-string');

export class EventPage extends Component {

    componentDidUpdate() {
        const params = queryString.parse(window.location.search);
        const eventID = params.id;
        if (eventID) {
            const events = this.props.events
            if (events) {
                this.props.setEvent(events.find(event => event.id === params.id))
            }
        }
    }

    render() {
        const events = this.props.events;
        const event = this.props.event;
        return (
            <div>
                {generateLinks(events)}
                {loadEvent(event)}
            </div>
        )
    }
}

function loadEvent(event) {
    if (event) {
        return (
            <div>
                <EventFormWrapper event={event}> </EventFormWrapper>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

function generateLinks(events) {
    const params = queryString.parse(window.location.search);
    const eventID = params.id;
    if (!eventID) {
        if (events) {
            return (
                <List>
                    {events.map((event) => {
                        const url = "/page?id=" + event.id;
                        return <Link href={url} key={event.id}>{event.ename}</Link>
                    })}
                </List>

            )
        }
    }
}

const mapStateToProps = state => {
    return {
        events: state.pageState.events,
        event: state.pageState.event
    };
};

export default connect(mapStateToProps, { setEvent })(EventPage);
