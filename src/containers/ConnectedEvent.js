import React, { Component } from "react";
import Event from "../components/Event";
import { connect } from "react-redux";
import queryString from "query-string";
import { setEvent } from "../actions/PageActions";

class ConnectedEvent extends Component {
  componentDidUpdate() {
    console.log("component did update");
    const params = queryString.parse(this.props.location.search);
    const events = this.props.events;
    console.log("params", params);
    if (events) {
      this.props.setEvent(events.find(event => event.id === params.id));
    }
  }

  render() {
    console.log(this.props.event);
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
