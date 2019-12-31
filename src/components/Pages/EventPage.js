import React, { Component } from 'react';
import { connect } from "react-redux";
import Link, { Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, useRouteMatch } from 'react-router-dom';


export class EventPage extends Component {


    render() {
        return (
            <div>
                <Typography>Event Page</Typography>
                <ul>
                    {events.map(({ name, id }) => {
                        <li key={id}>
                            <Link to={`/eventpage/${id}`}>{name}</Link>
                        </li>
                    })}
                </ul>

                <Route path={`/eventpage/:id`} component={EventComponent} />
            </div>

        )
    }
}

function EventComponent({ match }) {
    const event = events.find(({ id }) => id === match.params.id);
    return (
        <div>
            <img src={event.imageURL} />
            <Typography>{event.name}</Typography>
            <Typography>{event.description}</Typography>
            <p>placeholder form</p>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        events: state.pageState.events
    };
};

export default connect(mapStateToProps)(EventPage);
