import React, { Component } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./Router.scss";

import Nav from "./Nav";
import ScrollToTop from "./ScrollToTop";
import RegisterAlert from "./Messages/RegisterAlert";
import Loading from "./Misc/Loading";

import Route from "./Authentication/Route";
import AdminRoute from "./Authentication/AdminRoute";
import Login from "./Authentication/Login";
import LoginRedirect from "./Authentication/LoginRedirect";

import Forbidden from "../pages/Forbidden";
import AdminHome from "../pages/admin/AdminHome";
import Memberships from "../pages/admin/Memberships";
import EventDetails from "../pages/member/EventDetails";
import EventEdit from "../pages/admin/EventEdit";
import EventNew from "../pages/admin/EventNew";
import EventRegister from "../pages/member/EventRegister";
import EventView from "../pages/admin/EventView";
import MemberProfile from "../pages/member/MemberProfile";
import NewMember from "../pages/member/NewMember";
import Signup from "../pages/member/Signup";
import UserEvents from "../pages/member/UserEvents";
import UserHome from "../pages/member/UserHome";
import IndividualMember from "../pages/member/IndividualMember";

import { setUser } from "../actions/UserActions";
import { log, updateUser, updateRegisteredEvents } from "../utils";

class Router extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  getAuthenticatedUser() {
    return Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(async (authUser) => {
        const email = authUser.attributes.email;
        if (
          email.substring(email.indexOf("@") + 1, email.length) ===
          "ubcbiztech.com"
        ) {
          this.props.setUser({
            // name: authUser.attributes.name, // we don't need admin name for now
            email: authUser.attributes.email,
            admin: true,
          });
        } else {
          const email = authUser.attributes.email;
          if (email) {
            // Perform redux actions to update user and registration states at the same time
            await Promise.all([
              updateUser(email),
              updateRegisteredEvents(email),
            ]);
          } else {
            // Parse first name and last name
            const initialName = authUser.attributes.name.split(" ");
            const fname = initialName[0];
            const lname = initialName[1];

            // save only essential info to redux
            this.props.setUser({
              email,
              fname,
              lname,
            });
          }
        }
      })
      .catch(() => log("Not signed in"));
  }

  // User needs to be checked before the page physically renders
  // (otherwise, the login page will initially show on every refresh)
  componentDidMount() {
    log(
      `Running biztech app in '${process.env.REACT_APP_STAGE || "local"
      }' environment`
    );

    if (!this.props.user) {
      // If the user doesn't already exist in react, get the authenticated user
      // also get events at the same time
      Promise.all([this.getAuthenticatedUser()]).then(() => {
        // Ultimately, after all is loaded, set the "loaded" state and render the component
        this.setState({ loaded: true });
      });
    } else {
      // If the user already exists, update the events and render the page
      this.setState({ loaded: true });
    }
  }

  render() {
    const { user, registrations } = this.props;
    const { loaded } = this.state;

    // Alert the user about the need to register if they haven't
    const userNeedsRegister = user && !user.admin && !user.id;

    // check if the user state has been updated
    if (!loaded) return <Loading />;
    else
      return user ? ( // eslint-disable-line curly
        <BrowserRouter>
          <ScrollToTop />
          <Nav admin={user.admin} />
          <div className="content">
            {userNeedsRegister && <RegisterAlert />}
            <Switch>
              {/* COMMON ROUTES */}
              <Route path="/login-redirect" render={() => <LoginRedirect />} />
              <Route path="/forbidden" render={() => <Forbidden />} />
              <Route
                path="/profile"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() => <MemberProfile />}
              />
              <Route
                path="/new-member"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() =>
                  user.id ? (
                    <Redirect to="/" /> /* Allow create member only if user is not yet registered in DB */
                  ) : (
                    <NewMember />
                  )
                }
              />
              <Route
                path="/event/:id/register"
                render={() => <EventRegister />}
              />
              <Route
                path="/event/:id"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={(props) => (
                  <EventDetails
                    {...props}
                    user={user}
                    registrations={registrations}
                  />
                )}
              />
              <Route
                path="/events"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() => <UserEvents />}
              />

              {/* ADMIN ROUTES */}
              <AdminRoute path="/exec/event/new" render={() => <EventNew />} />
              <AdminRoute
                path="/exec/event/:id/edit"
                render={() => <EventEdit />}
              />
              <AdminRoute
                path="/exec/event/:id" // Need to make sure that this comes after 'new' and 'edit'
                render={(props) => <EventView {...props} />}
              />
              <AdminRoute path="/exec/home" render={() => <AdminHome />} />
              <AdminRoute
                path="/exec/memberships"
                render={() => <Memberships />}
              />
              <AdminRoute
                path="/exec/indmembership"
                render={() => <IndividualMember />}
              />

              {/* HOME */}
              <Route
                exact
                path="/"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() => <UserHome user={user} />}
              />

              <Redirect to={user.admin ? "/exec/home" : "/"} />
            </Switch>
          </div>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route path="/event/:id/register" component={EventRegister} />
            <Route path="/login-redirect" component={LoginRedirect} />
            <Route
              path="/signup"
              featureFlag={"REACT_APP_SHOW_MAXVP"}
              component={Signup}
            />
            <Route path="/" component={Login} />

            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.pageState.page,
    user: state.userState.user,
    registrations: state.pageState.eventsRegistered,
  };
};

export default connect(mapStateToProps, { setUser })(Router);
