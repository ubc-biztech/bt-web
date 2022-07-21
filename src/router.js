import React, { Component } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import Nav from "components/layout/Navigation";
import ScrollToTop from "components/layout/ScrollToTop";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import RegisterAlert from "components/alerts/RegisterAlert";
import Route from "components/routing/Route";

import Login from "pages/public/Login";
import LoginRedirect from "pages/public/LoginRedirect";
import ForgotPassword from "pages/public/ForgotPassword";
import MembershipForm from "pages/public/MembershipForm";
import MembershipFormSuccess from "pages/public/MembershipForm/MembershipFormSuccess";
// import Signup from '../pages/public/Signup'
import EventsDashboard from "pages/public/EventsDashboard";

import Forbidden from "pages/Forbidden";
import Loading from "pages/Loading";
import NotFound from "pages/NotFound";
import AdminRoutes from "pages/admin";
import MemberRoutes from "pages/member";
import PublicEventRoutes from "pages/public/Event";
import Landing from "pages/public/Landing";

import {
  setUser,
  fetchUser,
  fetchUserRegisteredEvents
} from "store/user/userActions";
import { log } from "utils";
import FormRegister from "pages/admin/DynamicForm/FormRegister";

class Router extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
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
          await this.props.setUser({
            // name: authUser.attributes.name, // we don't need admin name for now
            email: authUser.attributes.email,
            admin: true
          });
        } else {
          if (email) {
            // Perform redux actions to update user and registration states at the same time
            await Promise.all([
              fetchUser({ userId: email }),
              fetchUserRegisteredEvents({ userId: email })
            ]);
          } else {
            // Parse first name and last name
            const initialName = authUser.attributes.name.split(" ");
            const fname = initialName[0];
            const lname = initialName[1];

            // save only essential info to redux
            await setUser({
              email: email,
              fname,
              lname
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
      `Running biztech app in '${
        process.env.REACT_APP_STAGE || "local"
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
    const { user } = this.props;
    const { loaded } = this.state;
    const pathname = window.location.pathname;

    // Alert the user about the need to register if they haven't
    const userNeedsRegister = user && !user.admin && !user.id;

    // check if the user state has been updated
    if (!loaded) return <Loading />;
    else {
      return (
        // eslint-disable-line curly
        <BrowserRouter>
          <ScrollToTop />
          {user && <Nav admin={user.admin} />}
          <div className="content">
            {user && userNeedsRegister && <RegisterAlert />}
            {pathname === "/" || pathname === "" ? null : <Header />}
            <Switch>
              {/* ADMIN ROUTES */}
              {user && <Route path="/admin" component={AdminRoutes} />}

              {/* MEMBER ROUTES */}
              {user && <Route path="/member" component={MemberRoutes} />}

              {/* PUBLIC EVENT-SPECIFIC ROUTES */}
              {<Route path="/event/:id/:year" component={PublicEventRoutes} />}
              <Route
                exact
                path="/register/:slug"
                render={() => <FormRegister />}
              />

              {/* COMMON ROUTES */}
              <Route
                exact
                path="/events"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() => <EventsDashboard />}
              />
              <Route
                exact
                path="/signup"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() => <MembershipForm />}
              />
              <Route
                exact
                path="/signup/success"
                featureFlag={"REACT_APP_SHOW_MAXVP"}
                render={() => <MembershipFormSuccess />}
              />

              {/* MISCELLANEOUS ROUTES */}
              <Route exact path="/forbidden" render={() => <Forbidden />} />
              <Route
                exact
                path="/404"
                render={() => (
                  <NotFound message="That page could not be found!" />
                )}
              />

              {/* AUTHENTICATION ROUTES */}
              {/* <Route (SIGNUP LOOKS UNUSED)
              exact
              path='/signup'
              featureFlag={'REACT_APP_SHOW_MAXVP'}
              render={() => <Signup />} /> */}
              <Route
                exact
                path="/login-redirect"
                render={() => <LoginRedirect />}
              />
              <Route exact path="/login" render={() => <Login />} />
              <Route
                exact
                path="/forgot-password"
                render={() => <ForgotPassword />}
              />
              {/*
            <Route
              path='/'
              render={() => user
                ? user.admin
                  ? <Redirect to='/admin/home' />
                  : <Redirect to='/member/home' />
                : <Redirect to='/login' />
              } />
              */}
              <Route
                path="/"
                render={() =>
                  user ? (
                    user.admin ? (
                      <Redirect to="/admin/home" />
                    ) : (
                      <Landing />
                    )
                  ) : (
                    <Landing />
                  )
                }
              />
            </Switch>
            {pathname === "/" || pathname === "" ? null : <Footer />}
          </div>
        </BrowserRouter>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data
  };
};

export default connect(mapStateToProps, { setUser })(Router);
