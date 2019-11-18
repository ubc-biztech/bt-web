import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import Login from './Login';
import Logout from './Logout';
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";

export class Authenticate extends Component {

    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(user => this.props.setUser(user))
            .catch(() => console.log("Not signed in"));
    }

    render() {
        return this.props.user
        ? <Logout />
        : <Login />
    }

}

const mapStateToProps = state => {
    return {
      user: state.userState.user,
    };
  };
  
  export default connect(mapStateToProps, { setUser })(Authenticate);
  