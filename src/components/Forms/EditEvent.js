import React from "react"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from "@material-ui/pickers";
import ThemeProvider from "../ThemeProvider"

export default function EditEventForm(props) {
    const {
        values: { ename, slug, description, capacity, elocation, facebookUrl, imageUrl, startDate, endDate },
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        setFieldTouched,
        submitCount
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const handleStartDateChange = (date) => {
        setFieldValue("startDate", date)
    }

    const handleEndDateChange = (date) => {
        setFieldValue("endDate", date)
    }

    const textFieldError = (id) => {
        return (errors[id] && submitCount > 0) || (touched[id] ? errors[id] : "")
    }

    return (
        <ThemeProvider>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="ename"
                            label="Event Name"
                            fullWidth
                            helperText={textFieldError("ename")}
                            error={!!textFieldError("ename")}
                            value={ename}
                            onChange={change.bind(null, "ename")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="slug"
                            label="Slug (Not editable)"
                            fullWidth
                            disabled
                            value={slug}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            fullWidth
                            helperText={textFieldError("description")}
                            error={!!textFieldError("description")}
                            value={description}
                            onChange={change.bind(null, "description")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="capacity"
                            label="Capacity"
                            type="number"
                            min="0"
                            fullWidth
                            helperText={textFieldError("capacity")}
                            error={!!textFieldError("capacity")}
                            value={capacity}
                            onChange={change.bind(null, "capacity")}
                        />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDateTimePicker
                                margin="normal"
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDateTimePicker
                                margin="normal"
                                label="End Date"
                                minDate={startDate}
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12}>
                        <TextField
                            id="elocation"
                            label="Location"
                            fullWidth
                            helperText={textFieldError("elocation")}
                            error={!!textFieldError("elocation")}
                            value={elocation}
                            onChange={change.bind(null, "elocation")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="facebookUrl"
                            label="Facebook Event Page"
                            fullWidth
                            helperText={textFieldError("facebookUrl")}
                            error={!!textFieldError("facebookUrl")}
                            value={facebookUrl}
                            onChange={change.bind(null, "facebookUrl")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="imageUrl"
                            label="Image URL"
                            fullWidth
                            helperText={textFieldError("imageUrl")}
                            error={!!textFieldError("imageUrl")}
                            value={imageUrl}
                            onChange={change.bind(null, "imageUrl")}
                        />
                    </Grid>
                </Grid>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </ThemeProvider>
    )
}


