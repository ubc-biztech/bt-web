import React, { Component } from "react";
import Event from "./Event";
import { connect } from "react-redux";
import queryString from "query-string";
import { setEvent } from "../actions/PageActions";

class ConnectedEvent extends Component {
  componentDidUpdate() {
    const params = queryString.parse(this.props.location.search);
    const events = this.props.events;
    if (events) {
      this.props.setEvent(events.find(event => event.id === params.id));
    }
  }

  render() {
    return <Event event={this.props.event} />;
  }
}

const mapStateToProps = state => {
  return {
    event: state.pageState.event,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, { setEvent })(ConnectedEvent);
