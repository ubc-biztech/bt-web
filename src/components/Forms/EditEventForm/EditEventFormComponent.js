import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import { connect } from "react-redux";
const slugify = require('slugify')

function EditEventFormComponent(props) {
    const {
        values: { ename, slug, description, capacity, location, imageUrl, startDate },
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

    const handleEventNameChange = (name, e) => {
        e.persist();
        console.log(props.event)
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

    return (
        <div>
            <Typography variant="h3">New Event Form</Typography>
            <form onSubmit={handleSubmit}>
                <Paper>
                    <TextField
                        id="ename"
                        label={props.event.ename}
                        fullWidth
                        helperText={touched.ename ? errors.ename : ""}
                        error={touched.ename && Boolean(errors.ename)}
                        value={ename}
                        onChange={handleEventNameChange.bind(null, "ename")}
                    />
                    <TextField
                        id="slug"
                        label={props.event.id}
                        fullWidth
                        helperText={touched.slug ? errors.slug : ""}
                        error={touched.slug && Boolean(errors.slug)}
                        value={slug}
                        onChange={change.bind(null, "slug")}
                    />
                    <TextField
                        id="description"
                        label={props.event.description}
                        multiline
                        fullWidth
                        helperText={touched.description ? errors.description : ""}
                        error={touched.description && Boolean(errors.description)}
                        value={description}
                        onChange={change.bind(null, "description")}
                    />
                    <TextField
                        id="capacity"
                        label={props.event.capac}
                        type="number"
                        min="0"
                        helperText={touched.capacity ? errors.capacity : ""}
                        error={touched.capacity && Boolean(errors.capacity)}
                        value={capacity}
                        onChange={change.bind(null, "capacity")}
                    />
                    {/* <TextField
                        id="partners"
                        label="Partners & Sponsors"
                        fullWidth
                        helperText={touched.partners ? errors.partners : ""}
                        error={touched.partners && Boolean(errors.partners)}
                        value={partners}
                        onChange={change.bind(null, "partners")}
                    /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            margin="normal"
                            label="Start Date"
                            minDate={new Date()}
                            value={props.event.startDate}
                            onChange={handleStartDateChange}
                        />
                        <KeyboardDateTimePicker
                            margin="normal"
                            label="End Date"
                            minDate={startDate}
                            value={props.event.endDate}
                            onChange={handleEndDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        id="location"
                        label={props.event.location}
                        fullWidth
                        helperText={touched.location ? errors.location : ""}
                        error={touched.location && Boolean(errors.location)}
                        value={location}
                        onChange={change.bind(null, "location")}
                    />
                    <TextField
                        id="imageUrl"
                        label={props.event.img}
                        fullWidth
                        helperText={touched.imageUrl ? errors.imageUrl : ""}
                        error={touched.imageUrl && Boolean(errors.imageUrl)}
                        value={imageUrl}
                        onChange={change.bind(null, "imageUrl")}
                    />
                </Paper>
                <Button type="submit" variant="raised">
                    Submit
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        event: state.pageState.event,
    };
};

export default connect(mapStateToProps)(EditEventFormComponent);