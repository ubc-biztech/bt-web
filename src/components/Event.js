import React from "react";
// import Sheet from "./Sheet";
import EventUserTable from "./EventUserTable";

export default function Event(event) {

  return (
    <div>
      <h1>Event: {event.ename}</h1>
      <p># Registered: {event.regNum}</p>
      <p># Checked In: {event.checkedNum}</p>
      <p># Waitlisted: {event.waitNum}</p>
      <EventUserTable />
    </div>
  );

}