import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
import Nav from './Nav'
import './Router.scss';
import { CircularProgress } from '@material-ui/core';
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
      this.setState({eventSelected: eventId})
      if (eventId) {
        response.forEach(event => {
          if (event.id === eventId)
            this.setState({ event })
        })
      }
    })

  }

  render (){
    return (
      <div>
        <Nav events={this.state.events} eventSelected={this.state.eventSelected}/>
        {ChooseBody(this.state)}
      </div>
    )
  }
}

function ChooseBody(state){
  let events = state.events
  let event = state.event
  if (event) {
    return (
      <div className="content">
        <Event event={event}/>
      </div>
    )
  } else if (!events) 
      return <CircularProgress/>
    else 
      return <EventSelector events={events}/>
  
}