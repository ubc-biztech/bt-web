import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
import Nav from './Nav'
import './Router.scss';
import { CircularProgress } from '@material-ui/core';
import { setPage } from "../actions/indexActions";
import { connect } from "react-redux";

const queryString = require('query-string');

class Router extends Component {
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
        <div className="content">
          { this.state.events ? ChooseBody(this.state, this.props.page) : <CircularProgress/> }
        </div>
      </div>
    )
  }
}

function ChooseBody(state, page){
  let events = state.events
  let event = state.event

  if (event)
    return <Event event={event}/>
  else switch(page) {
    case 'home':
      return <EventSelector events={events}/>
    default:
      return <p>Loading!</p>
  }

}

const mapStateToProps = state => {
  return {
    page: state.pageState.page,
  };
};

export default connect(mapStateToProps, { setPage })(Router);
