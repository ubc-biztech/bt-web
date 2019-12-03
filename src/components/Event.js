import React, { Component } from "react";
// import Sheet from "./Sheet";
import EventUserTable from "./EventUserTable";
import { connect } from "react-redux";
import { NewEventForm } from "./Forms";

class Event extends Component {
  render() {
    let event = this.props.event;

    return (
      <div>
        <NewEventForm />
        <h1>Event: {event.ename}</h1>
        <p># Registered: {event.regNum}</p>
        <p># Checked In: {event.checkedNum}</p>
        <p># Waitlisted: {event.waitNum}</p>
        <EventUserTable />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.pageState.event
  };
};

export default connect(
  mapStateToProps,
  null
)(Event);
