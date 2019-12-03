import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export class NewEventFormComponent extends Component {
    state = {
        selectedDate: new Date()
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    todaysDate = () => {
        let today = new Date();
        let year = today.getFullYear();

        let month = (today.getMonth() + 1) + "";
        month = month.padStart(2, '0');

        let day = today.getDate() + "";
        day = day.padStart(2, '0');
        return month + "-" + day + "-" + year;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }

    render() {
        return (
            <div>
                <Typography variant="h3">New Event Form</Typography>
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                    <Paper>
                        <TextField
                            id="name"
                            label="Event Name"
                            fullWidth
                        />
                        <TextField
                            id="description"
                            label="Description"
                            multiline
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
                                minDate={this.todaysDate}
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
                            id="imageUrl"
                            label="Image URL"
                            fullWidth
                        />
                    </Paper>
                    <Button type="submit" variant="raised">
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default NewEventFormComponent
