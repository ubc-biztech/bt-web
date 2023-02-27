import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Switch } from "react-router-dom";

import Route from "components/routing/Route";
import Loading from "pages/Loading";

import AdminHome from "./Home";
// import EventCreate from "./Event/EventCreate"
// import EventEdit from "./Event/EventEdit";
import EventStats from "./Event/EventStats";
import Memberships from "./Memberships/Memberships";
import Companion from "./Companion";

import { fetchEvents } from "store/event/eventActions";

// Dynamic form for creating events
import FormCreate from "./DynamicForm/FormCreate";

const AdminRoutes = (props) => {
  const { events, eventsLoading, user } = props;

  useEffect(() => {
    fetchEvents();
  }, []);

  // Loading state
  if (eventsLoading) return <Loading message="Loading events..." />;
  // After loaded
  return user.admin ? (
    <Switch>
      {/* <Route exact path="/admin/event/new" render={() => <EventCreate />} /> */}
      <Route exact path="/admin/event/new" render={() => <FormCreate />} />
      <Route
        exact
        path="/admin/event/:id/:year/edit"
        render={() => <FormCreate events={events} />}
        // render={() => <EventEdit events={events} />}
      />
      <Route
        exact
        path="/admin/event/:id/:year" // Need to make sure that this comes after 'new' and 'edit'
        render={() => <EventStats events={events} />}
      />
      <Route
        exact
        path="/admin/home"
        render={() => <AdminHome events={events} />}
      />
      <Route exact path="/admin/memberships" render={() => <Memberships />} />
      <Route exact path="/admin/edit-companion" render={() => <Companion />} />
      <Redirect to="/404" />
    </Switch>
  ) : (
    <Redirect to="/forbidden" />
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventState.events.data,
    eventsLoading: state.eventState.events.loading,
    user: state.userState.user.data,
  };
};

export default connect(mapStateToProps, {})(AdminRoutes);
