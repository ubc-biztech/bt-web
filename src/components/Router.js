import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
import Nav from './Nav'
import Login from './Login'
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
    fetch(process.env.REACT_APP_AMAZON_API + "/events/get", {
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          events: response
        })

        let eventId = queryString.parse(window.location.search)['event']
        if (eventId) {
          response.forEach(event => {
            if (event.id === eventId)
              this.props.setEvent(event)
          })
        }
      })

  }

  render() {
    return (
      <div>
        {this.props.page === 'login' ? "" : <Nav events={this.state.events} />}
        <div className="content">
          {this.state.events ? ChooseBody(this.state.events, this.props.page, this.props.event) : <CircularProgress />}
        </div>
      </div>
    )
  }
}

function ChooseBody(events, page, event) {
  switch (page) {
    case 'login':
      return <Login />
    case 'home':
      return <EventSelector events={events} />
    case 'event':
      return <Event />
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
