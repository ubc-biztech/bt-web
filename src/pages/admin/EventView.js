import React,  { useEffect } from "react";
import Event from "../../components/Event";
import { connect } from "react-redux";
import queryString from "query-string";
import { setEvent } from "../../actions/PageActions";

function EventView(props) {
  useEffect(() => {
      const params = queryString.parse(props.location.search);
      const events = props.events;
      if (events) {
        props.setEvent(events.find(event => event.id === params.id));
      }
  });

  return <Event event={props.event} />;
}

const mapStateToProps = state => {
  return {
    event: state.pageState.event,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, { setEvent })(EventView);
