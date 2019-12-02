import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from "@material-ui/core/Paper";
import Typogrpahy from "@material-ui/core/Typography"

export class NewEventForm extends Component {
    state = {
        selectedDate: new Date(),
        todaysDate: ""
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    handleTodaysDate = () => {
        let today = new Date();
        let year = today.getFullYear();

        let month = (today.getMonth() + 1) + "";
        month = month.padStart(2, '0');

        let day = today.getDate() + "";
        day = day.padStart(2, '0');
        this.setState({ todaysDate: month + "-" + day + "-" + year });
    }

    render() {
        return (
            <React.Fragment>
                <Typogrpahy component="h4" variant="h3">New Event Form</Typogrpahy>
                <form onSubmit={() => { }}>
                    <Paper>
                        <TextField
                            id="name"
                            label="Event Name"
                            fullWidth

                        />
                        <TextField
                            id="description"
                            label="Description"
                            multiline="true"
                            fullWidth
                        />
                        <TextField
                            id="capacity"
                            label="Capacity"
                            type="number"
                            min="0"
                        />
                        <TextField
                            id="partners"
                            label="Partners & Sponsors"
                            fullWidth
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date"
                                onClick={this.handleTodaysDate}
                                minDate={this.state.todaysDate}
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange.bind(this)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange.bind(this)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <TextField
                            id="location"
                            label="Location"
                            fullWidth
                        />

                        <TextField
                            id="image"
                            label="Image URL"
                            fullWidth />


                    </Paper>

                    <Button
                        type="submit"
                        variant="raised"
                    >
                        Submit
                    </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default NewEventForm
