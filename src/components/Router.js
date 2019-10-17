import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
import Nav from './Nav'
import './Router.scss';
import { CircularProgress } from '@material-ui/core';
import { setPage, setEvent } from "../actions/indexActions";
import { connect } from "react-redux";

const queryString = require('query-string');

class Router extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null
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
            this.props.setEvent( event )
        })
      }
    })

  }

  render (){
    return (
      <div>
        <Nav events={this.state.events} eventSelected={this.state.eventSelected}/>
        <div className="content">
          { this.state.events ? ChooseBody(this.state.events, this.props.page, this.props.event ) : <CircularProgress/> }
        </div>
      </div>
    )
  }
}

function ChooseBody(events, page, event){
  switch(page) {
    case 'home':
      return <EventSelector events={events}/>
    case 'event':
      return <Event event={event}/>
    default:
      return <p>Loading!</p>
  }

}

const mapStateToProps = state => {
  return {
    page: state.pageState.page,
    event: state.pageState.event
  };
};

export default connect(mapStateToProps, { setPage, setEvent })(Router);
