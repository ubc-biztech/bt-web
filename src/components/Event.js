import React, { Component } from 'react'

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
      </div>
    )
  }
}
