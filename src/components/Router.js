import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
import Nav from './Nav'
import './Router.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setPage, setEvent } from "../actions/indexActions";
import { connect } from "react-redux";

import CFN_GoogleForm from './EventForms/GoogleForm_CFN/MyForm';

const queryString = require('query-string');

class Router extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null
    }
  }

  componentDidMount() {
    // console.log(this.props)
    fetch(process.env.REACT_APP_AMAZON_API+"/events/get", {
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
            this.props.setEvent( event )
        })
      }
    })

  }

  render (){
    return (
      <div>
        <Nav events={this.state.events}/>
        <div className="content">
          {/* {console.log(this.props)} */}
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
      // return <CFN_GoogleForm/> //TODO: Ian I tried but can't seem to figure out exactly how you're importing the home page and what states you're changing. My form is here - Andy
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
