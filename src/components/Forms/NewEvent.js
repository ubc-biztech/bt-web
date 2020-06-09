import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import ThemeProvider from '../ThemeProvider'
const slugify = require('slugify')

export default function NewEventForm(props) {
    const {
        values: { slug, startDate, endDate }, // the only values we need to store as props are the ones that are programmatically modified
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        setFieldTouched,
        dirty,
        isSubmitting,
        submitCount
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const handleEventNameChange = (name, e) => {
        e.persist();
        const newSlug = slugify(e.target.value, { lower: true });
        setFieldValue('slug', newSlug)
        handleChange(e);
        setFieldTouched(name, true, false);
    }

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
                            onChange={handleEventNameChange.bind(null, "ename")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="slug"
                            label="Slug"
                            fullWidth
                            helperText={textFieldError("slug")}
                            error={!!textFieldError("slug")}
                            onChange={change.bind(null, "slug")}
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
                            onChange={change.bind(null, "description")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="capacity"
                            label="Capacity"
                            type="number"
                            min="0"
                            helperText={textFieldError("capacity")}
                            error={!!textFieldError("capacity")}
                            onChange={change.bind(null, "capacity")}
                        />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDateTimePicker
                                margin="normal"
                                label="Start Date"
                                minDate={new Date()}
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
                            helperText={textFieldError("location")}
                            error={!!textFieldError("location")}
                            onChange={change.bind(null, "location")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="facebookUrl"
                            label="Facebook Event Page"
                            fullWidth
                            helperText={textFieldError("facebookUrl")}
                            error={!!textFieldError("facebookUrl")}
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
                            onChange={change.bind(null, "imageUrl")}
                        />
                    </Grid>
                </Grid>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!dirty || isSubmitting}
                >
                    Submit
                </Button>
            </form>
        </ThemeProvider>
    )
}
