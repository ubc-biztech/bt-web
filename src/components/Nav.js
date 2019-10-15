import React, { Component } from 'react'

export default class Router extends Component {

    render() {
        let events = this.props.events;
        const createEventLinks =
                events.map(event =>
                    <p>
                      {event.ename}
                    </p>
                )

        return (
            <div>
              {createEventLinks}
            </div>
        )
    }

}
