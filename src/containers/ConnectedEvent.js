import React, { Component } from "react";
// import Sheet from "./Sheet";
import Event from "../components/Event";
import { connect } from "react-redux";

class ConnectedEvent extends Component {

    render() {
        return (
            <Event event={this.props.event} />
        );
    }
}

const mapStateToProps = state => {
    return {
        event: state.pageState.event
    };
};

export default connect(
    mapStateToProps,
    null
)(ConnectedEvent);
