import React, { Component } from "react";
import { Formik } from "formik";
import { NewEventForm } from "./NewEventForm";
import Paper from "@material-ui/core/Paper";



class NewEventInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper elevation={1} className={classes.paper}>
                        <h1>New Event Form</h1>
                        <Formik
                            render={props => <NewEventForm {...props} />}
                        />
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default NewEventInput;