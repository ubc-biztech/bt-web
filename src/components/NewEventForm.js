import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from "@material-ui/core/Paper";


export const NewEventForm = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [todaysDate, setTodaysDate] = React.useState("");

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleTodaysDate = () => {
        let today = new Date();
        let year = today.getFullYear();

        let month = (today.getMonth() + 1) + "";
        month = month.padStart(2, '0');

        let day = today.getDate() + "";
        day = day.padStart(2, '0');
        setTodaysDate(month + "-" + day + "-" + year);
    }



    return (
        <form onSubmit={() => { }}>
            <Paper>
                <TextField
                    id="name"
                    name="name"
                    label="Event Name"
                    fullWidth

                />
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                />
                <TextField
                    id="capacity"
                    name="capacity"
                    label="Capacity"
                    type="number"
                    min="0"
                    float="left"
                />
                <TextField
                    id="partners"
                    name="partners"
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
                        onClick={handleTodaysDate}
                        minDate={todaysDate}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <TextField
                    id="location"
                    name="location"
                    label="Location"
                    fullWidth
                />


            </Paper>

            <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
            >
                Submit
     </Button>
        </form>
    );
};
