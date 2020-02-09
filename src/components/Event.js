import React from "react";
// import Sheet from "./Sheet";
import EventUserTable from "./EventUserTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "@material-ui/core";
import ThemeProvider from './ThemeProvider'
import Typography from '@material-ui/core/Typography';
import { useHistory, withRouter } from "react-router-dom";

function Event(props) {

  const history = useHistory();
  function handleEditEventClick() {
    history.push({ pathname: "/edit-event" });
  }
  const event = props.event;
  return event ? (
    <ThemeProvider>
      <Typography variant="h1">Event: {event.ename}</Typography>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <Link href={"/page?id=" + event.id} key={event.id}>Public Event Page</Link>
      <EventUserTable event={event} />
    </ThemeProvider>
  ) : (
      <CircularProgress />
    );
}

export default withRouter(Event)