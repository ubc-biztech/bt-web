import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import ThemeProvider from '../ThemeProvider'
const slugify = require('slugify')

export default function EditEventForm(props) {
    const {
        values: { ename, slug, description, capacity, elocation, imageUrl, facebookUrl, startDate, endDate },
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        setFieldTouched
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

    return (
        <ThemeProvider>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="ename"
                            label="Event Name"
                            fullWidth
                            helperText={touched.ename ? errors.ename : ""}
                            error={touched.ename && Boolean(errors.ename)}
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
                            helperText={touched.description ? errors.description : ""}
                            error={touched.description && Boolean(errors.description)}
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
                            helperText={touched.capacity ? errors.capacity : ""}
                            error={touched.capacity && Boolean(errors.capacity)}
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
                            helperText={touched.elocation ? errors.elocation : ""}
                            error={touched.elocation && Boolean(errors.elocation)}
                            value={elocation}
                            onChange={change.bind(null, "elocation")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="facebookUrl"
                            label="Facebook Event Page"
                            fullWidth
                            helperText={touched.facebookUrl ? errors.facebookUrl : ""}
                            error={touched.facebookUrl && Boolean(errors.facebookUrl)}
                            value={facebookUrl}
                            onChange={change.bind(null, "facebookUrl")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="imageUrl"
                            label="Image URL"
                            fullWidth
                            helperText={touched.imageUrl ? errors.imageUrl : ""}
                            error={touched.imageUrl && Boolean(errors.imageUrl)}
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


