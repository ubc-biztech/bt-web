import React from "react";
import {
  makeWidthFlexible,
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  MarkSeries,
} from "react-vis";

import { LinearProgress, Typography } from "@material-ui/core";
import { COLORS } from "constants/index";

const EVENT_PROGRESS_GOAL = 10;

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const classes = {
  container: {
    display: "flex",
    margin: "12px 0 20px 0",
    alignItems: "center",
  },
};

const getData = () => {
  const data = {};
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  for (let i = 0; i < 6; i++) {
    data[`${year} ${month}`] = 0;
    --month;
    if (month < 0) {
      month = 11;
      --year;
    }
  }
  return data;
};

const sixMonthsAgo = () => {
  const today = new Date();
  const month = today.getMonth() - 5;
  if (month >= 0) {
    const year = today.getFullYear();
    return new Date(year, month);
  } else {
    const year = today.getFullYear() - 1;
    return new Date(year, 11 - month);
  }
};

const UserProgress = ({ registeredEvents, events }) => {
  // filter only checkedIn events, and only return event IDs
  const checkedInEventIDs = registeredEvents.flatMap((event) => {
    return event.registrationStatus === "checkedIn" ? [event.eventID] : [];
  });

  // Find events user is registered for
  const filteredEvents =
    events &&
    events.filter((event) => {
      return checkedInEventIDs.includes(event.id);
    });

  const data = getData();

  // Fill in data object
  filteredEvents &&
    filteredEvents.forEach((event) => {
      const parsedDate = new Date(event.startDate);
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth();
      data[`${year} ${month}`] += 1;
    });

  // convert 'date strings' to timestamped react-vis data
  const timestampData = Object.entries(data).map(([key, value]) => {
    const yearMonthToTimestamp = (yearMonth) => {
      const year = yearMonth.split(" ")[0];
      const month = yearMonth.split(" ")[1];
      return new Date(year, month);
    };

    return {
      x: yearMonthToTimestamp(key),
      y: value,
    };
  });

  return (
    <React.Fragment>
      <div style={classes.container}>
        <Typography style={{ marginRight: "14px" }}>Events Attended</Typography>
        <Typography style={{ marginRight: "14px" }}>
          <span style={{ color: COLORS.BIZTECH_GREEN }}>
            {checkedInEventIDs.length}
          </span>
          /{EVENT_PROGRESS_GOAL}
        </Typography>
        <LinearProgress
          style={{ flex: 2 }}
          variant="determinate"
          value={
            checkedInEventIDs.length * EVENT_PROGRESS_GOAL > 100
              ? 100
              : checkedInEventIDs.length * EVENT_PROGRESS_GOAL
          }
        />
      </div>
      <FlexibleXYPlot
        xType="time"
        xDomain={[sixMonthsAgo(), Date.now()]}
        yDomain={[0, 3]}
        height={250}
      >
        <XAxis
          tickTotal={6}
          tickSize={0}
          style={{
            text: { fill: "white" },
          }}
        />
        <YAxis
          tickTotal={3}
          tickSize={0}
          style={{
            text: { fill: "white" },
          }}
        />
        <LineSeries
          // animation
          data={timestampData}
          stroke={COLORS.FONT_COLOR}
          color={COLORS.BIZTECH_GREEN}
          style={{}}
        />
        <MarkSeries
          // animation
          data={timestampData}
          color={COLORS.BIZTECH_GREEN}
        />
      </FlexibleXYPlot>
    </React.Fragment>
  );
};

export default UserProgress;
