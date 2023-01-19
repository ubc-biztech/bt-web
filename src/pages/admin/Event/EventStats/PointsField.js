import { TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { fetchBackend } from "../../../../utils";

class PointsField extends Component {
    constructor(props) {
        // console.log("PointsField constructor props: ", props);
        super(props)
        this.state = {
            value: props.points,
            editing: false
        }
    }

    componentDidMount() {
        console.log("pointsfield mounted, value: ", this.state.value, " points prop: ", this.props.points)
        this.setState({ value: this.props.points });
    }

    handleBlur = async (event) => {
        if (event.type === "blur" || event.key === "Enter") {
            this.setState({ editing: false });
            
            if (this.state.value !== this.props.points) {
                this.changeUserPoints();
            }
        }
    };

    changeUserPoints = async () => {
        try {
            this.validatePoints(this.state.value);

            if (window.confirm("Are you sure you want to change the points value?")) {
                await this.updateUserPoints(this.props.id, this.props.fname, this.state.value);
            } else {
                this.setState({ value: this.props.points });
            }
        } catch (error) {
            console.log(error);
            alert(error);
            this.setState({ value: this.props.points });
        }
    }

    validatePoints = (points) => {
        if (isNaN(points) || points == null || points === "") {
            throw new Error("Points must be a number");
        }
        return;
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleFocus = () => {
        this.setState({ editing: true });
    };

    render() {
        if (!this.state.editing) {
            return (
                <Typography
                    onClick={this.handleFocus}
                >
                    {this.state.value}
                </Typography>
            )
        } else {
            return (
                <TextField
                    autoFocus
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onKeyPress={this.handleBlur}
                />
            )
        }
    }

    updateUserPoints = async (id, fname, points) => {
        const body = {
            eventID: this.props.eventID,
            year: this.props.eventYear,
            registrationStatus: this.props.registrationStatus,
            points
        };
        await fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);

        this.props.refreshTable();
    }
}

export default PointsField;
