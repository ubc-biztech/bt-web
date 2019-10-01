import React, { Component } from 'react'
import EventSelector from './EventSelector'
const queryString = require('query-string');

export default class Router extends Component {
  render (){
    let event = queryString.parse(window.location.search)['event']
    if (event) {
      return <p>{event}</p>
    } else {
      return (
        <EventSelector />
      )
    }
  }
}
