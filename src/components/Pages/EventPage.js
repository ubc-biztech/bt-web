import React, { Component } from 'react';
import { connect } from "react-redux";
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link'
import { BrowserRouter as Route } from 'react-router-dom';


export class EventPage extends Component {


    render() {
        console.log(this.state.events);
        return (

            <div>
                <Typography>Event Page</Typography>

                <ul>
                    {this.state.events.map((event) => (
                        <li key={event.id}>
                            <Link to={`/eventpage/${event.id}`}>{event.name}</Link>
                        </li>
                    ))}
                </ul>

                <Route path={`/eventpage/:id`} component={EventComponent} />
            </div>

        )
    }
}

function EventComponent({ match }) {
    const event = this.state.events.find(({ id }) => id === match.params.id);
    return (
        <div>
            <img alt='Event Banner' src={event.imageURL} />
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
