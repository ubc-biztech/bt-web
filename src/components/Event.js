import React from "react";
// import Sheet from "./Sheet";
import EventUserTable from "./EventUserTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "@material-ui/core";

export default function Event(props) {

  const event = props.event;
  return event ? (
    <div>
      <h1>Event: {event.ename}</h1>
      <Link href={"/edit-event"}>Edit Event</Link>
      <Link href={"/page?id=" + event.id} key={event.id}>Public Event Page</Link>
      <EventUserTable event={event} />
    </div>
  ) : (
      <CircularProgress />
    );
}