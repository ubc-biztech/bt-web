import React,  { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { setEvent } from "../../actions/PageActions";
import { useHistory, withRouter } from "react-router-dom";
import EventUserTable from "../../components/EventUserTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import ThemeProvider from '../../components/ThemeProvider'
import { Helmet } from 'react-helmet';

function EventView(props) {
  const history = useHistory();
  const event = props.event;

  // Like componentDidUpdate/DidMount
  useEffect(() => {
      const params = queryString.parse(props.location.search);
      const events = props.events;
      if (events) {
        props.setEvent(events.find(event => event.id === params.id));
      }
  });

  function handleEditEventClick() {
    history.push({ pathname: "/edit-event" });
  }

  return event ? (
    <ThemeProvider>
      <Helmet>
          <title>{event.ename} - BizTech Admin</title>
      </Helmet>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <Link href={"/page?id=" + event.id} key={event.id}>Public Event Page</Link>
      <EventUserTable event={event} />
    </ThemeProvider>
  ) : (
    <CircularProgress />
  );
}

const mapStateToProps = state => {
  return {
    event: state.pageState.event,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, { setEvent })(withRouter(EventView));
