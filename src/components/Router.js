import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
const queryString = require('query-string');

export default class Router extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null,
      event: null
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_AMAZON_API+"/events/get", {
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        events: response
      })
      console.log(this.state.events)

      let eventId = queryString.parse(window.location.search)['event']
      if (eventId) {
        response.forEach(event => {
          if (event.id === eventId)
            this.setState({ event })
        })
      }
    })

  }

  render (){
    let events = this.state.events
    let event = this.state.event
    if (event) {
      return <Event event={event}/>
    } else if (!events) {
      return <p>Loading...</p>
    } else {
      return <EventSelector events={events}/>
    }
  }
}
