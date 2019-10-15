import React, { Component } from 'react'
import Sheet from './Sheet'

export default class Event extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }
  render(){
    let event = this.props.event

    return (
      <div>
        <h1>Event: {event.ename}</h1>
        <p># Registered: {event.regNum}</p>
        <p># Checked In: {event.checkedNum}</p>
        <p># Waitlisted: {event.waitNum}</p>
        <Sheet users={event.users}/>
      </div>
    )
  }
}
