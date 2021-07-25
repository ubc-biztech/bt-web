import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Switch } from "react-router-dom";

import Route from "components/routing/Route";

import MemberCreate from "./MemberCreate";
import MemberProfile from "./MemberProfile";
import MemberHome from "./Home";
import { fetchEvents } from "store/event/eventActions";

const MemberRoutes = (props) => {
  const { events, user, userEventsRegistered } = props;

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Switch>
      <Route
        exact
        path="/member/profile"
        featureFlag={"REACT_APP_SHOW_MAXVP"}
        render={() => (
          <MemberProfile
            user={user}
            registered={userEventsRegistered}
            events={events}
          />
        )}
      />
      <Route
        exact
        path="/member/create"
        featureFlag={"REACT_APP_SHOW_MAXVP"}
        render={() =>
          user.id ? (
            <Redirect to="/member/home" /> /* Allow create member only if user is not yet registered in DB */
          ) : (
            <MemberCreate user={user} />
          )
        }
      />
      <Route
        exact
        path="/member/home"
        featureFlag={"REACT_APP_SHOW_MAXVP"}
        render={() => (
          <MemberHome
            user={user}
            registered={userEventsRegistered}
            events={events}
          />
        )}
      />

      <Redirect to="/404" />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventState.events.data,
    user: state.userState.user.data,
    userEventsRegistered: state.userState.eventsRegistered,
  };
};

export default connect(mapStateToProps, {})(MemberRoutes);
